function CT2
% function CortaTransforma(lambda,spec)
% no corre sin cargar .mat de corrida


h=datacursormode(gcf);
% holhold on;
% limites iniciales
l_min= size(lambda,2);
l_max= 1;
l_cent= l_min;
NL= sprintf('\n');
% menu
valida= 1;
while valida== 1
    % lim_lamb= [lambda(l_min) lambda(l_max) ];
    % % plot(lambda(l_max,l_min),spec(l_max,l_min)./ 1e6,'r.');
    % lim_str= num2str(lim_lamb, '% 4.2f');
    t_str= ['lambdas', NL];
    t_aux= num2str(lambda(l_min), '% 4.2f');
    t_str= [t_str, 'min ',t_aux, ' nm', NL];
    t_aux= num2str(lambda(l_cent), '% 4.2f');
    t_str= [t_str, 'cent ',t_aux, ' nm', NL];
    t_aux= num2str(lambda(l_max), '% 4.2f');
    t_str= [t_str, 'may ',t_aux, ' nm'];
    % t_str= ['Lambdas:',NL,lim_str];
    valida=menu(t_str, 'Procesar', 'Mayor', 'Central', 'Menor');
    switch valida
        case 1  % procesar
            seguir=menu('Proceder a FFT?','Si','Cancelar');
            if seguir==1
                valida=5;   % sale del loop
                break;  % sale del switch
            end
        case 2 % levanta l_max
            info=getCursorInfo(h);
            l_max=info.DataIndex;
            valida=1;
        case 3 % levanta l_cent
            info=getCursorInfo(h);
            l_cent=info.DataIndex;
            valida=1;
        case 4 % levanta l_min
            info=getCursorInfo(h);
            l_min=info.DataIndex;
            valida=1;
    end
end


%% plots filtered spectrum
Samp_Spec2(1:l_max-1)= 0;
Samp_Spec2(l_max:l_min)= shapes(size(distances,1), l_max: l_min);
Samp_Spec2(l_min+1:nt)= 0;
Samp_SpecN= Samp_Spec2./ sqrt(nt);                  % fft normalisation
Samp_SpecN= Samp_SpecN.* conj(Samp_SpecN );         % -> spectral power [W]
%{
figure(32);
plot(lambda, Samp_SpecN, '.');
grid on;
xlabel('\lambda [nm]','FontSize',18,'FontName','Times');
ylabel ('Power [a.u.]','FontSize',18,'FontName','Times');
%}


%% bandwidth
data_y= Samp_SpecN;
data_x= lambda;
xInd_min= l_max;            % lambdas grow with descending index
xInd_max= l_min;            % lambdas grow with descending index
[w_1e, w_fwhm]= pulsewidth(data_y, data_x, xInd_min, xInd_max);
bw_fwhm= -w_fwhm;           % lambdas grow with descending index
bw_1e= -w_1e;               % lambdas grow with descending index


%% filtered specrtrum transformation into time domain
Samp_t2= ifft(Samp_Spec2);                  % normalizacion + fase -
Samp_t2= fftshift(Samp_t2);
Samp_t2= Samp_t2.* conj(Samp_t2);           % -> power [W]

%{
%% ancho temporal (transformacion de sample)-> No se normalizar esto!!
N_SampSpec= l_min- l_max+ 1;
Samp_Spec= spec(l_max:l_min);
Samp_t= fft(Samp_Spec);
Samp_t= fftshift(Samp_t);
Norm_Samp_t= sqrt(Samp_t.*conj(Samp_t))/ N_SampSpec;        % verificar normalizacion FFT

f_range= df* N_SampSpec;                                    % [THz]
dt2= 1/f_range;                                             % [ps] sample time step
temp_vect=( ( -N_SampSpec/ 2 : ( N_SampSpec/ 2 )- 1 )/ N_SampSpec)'* (1/ dt2);

figure(3);
plot(temp_vect, Norm_Samp_t, '.');
%}


%{
%% transformada centrada en pulso
aux_siz= size(distances,2)
Samp_Spec_cent= zeros(1, aux_siz );
mid= floor(aux_siz/ 2 );
Samp_Spec_cent[mid: mid+( l_min- l_cent) ]= shapes(size(distances, 1 ), l_cent: l_min);
Samp_Spec_cent[mid:(l_-l_cent)]= shapes(size(distances,1), l_cent: l_min);
%}
% NO DA LA MISMA ENERGIA: VER NORMALIZACION!!!!


%% pulsewidth
data_y= Samp_t2;
data_x= t;
xInd_min= 1;
xInd_max= nt;
[w_1e, w_fwhm]= pulsewidth(data_y, data_x, xInd_min, xInd_max);
Dt_fwhm= w_fwhm;        % [ps]
Dt_1e= w_1e;        % [ps]


%% verificacion sech
% BW* dt >= 0.315 -> BW* Dt >= 0.315* (lambda_0^2/ c )
c = 299792.458;                         % [nm/ps] speed of light
aux=0.315* (l_cent^2/ c );              % [nm ps]
% algo falla porque el soliton de la simulacion dio 5.667055901091711e-02 >= 4.966025329429735e+00
% p/ soliton sech^2 ancho temporal * ancho espectra Dnu*Dt (fwhm)= 0.315


%% pulse mean power
pulse_rate=94E6;        % [Hz]
shape_factor= 0.88;     % sech2
P_peak= max(Samp_t2);   % [W]
E_pulse_out= P_peak* Dt_fwhm* 1E-12/ shape_factor; % [j]
P_mean_out= pulse_rate* E_pulse_out* 1E3;            % [mW]


%% plots pulse from transformed filtered spectrum
figure(33);
plot(t, Samp_t2, 'r.');
grid on;
xlabel('\tau [ps]','FontSize',18,'FontName','Times');
ylabel ('Power [W]','FontSize',18,'FontName','Times');

% on graph output pulse data
str1(1)= strcat({'fibre: '}, fibre_name);
str2(2)= {'output pulse: sech2'};
str2(3)= strcat({'\lambda= '}, num2str(lambda(l_cent), '%3.0f\n'), 'nm');
str2(4)= strcat({'filter= '}, num2str(lambda(l_min), '%3.0f\n'), '-', num2str(lambda(l_max), '%3.0f\n'), '(', num2str(lambda(l_max)- lambda(l_min) , '%3.0f\n'), ')','nm');
str2(5)= strcat({'\Deltat= '}, num2str(Dt_fwhm* 1e3, '%3.1f\n'), 'fs (FWHM)');
str2(6)= strcat({'\Delta\lambda= '}, num2str(bw_fwhm, '%3.1f\n'), 'nm (FWHM)');
str2(7)= strcat({'P_0= '}, num2str(P_peak, '%3.0f\n'), 'W');
str2(8)= strcat({'P= '}, num2str(P_mean_out, '%3.0f\n'), 'mW');
txt_pul_hnld= text(-6,300,str2);

% save spectrum as eps
print('-depsc', '-r600', strcat(img_name, 'out', '.eps') );
