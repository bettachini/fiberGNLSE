function =ssfm(sim,pump,fibre)


%% ssfm run
% tstart= tic;
tic();
tol= 1e-8;                          % tolerance

% option graba pasos intermedios en el tiempo
[u1, distances, out_spect, shapes_time, nf]= IP_CQEM_FD_struct(pump.u0,sim.dt,fibre.L,sim.dz,fibre.alpha,fibre.betap,fibre.gamma,sim.wzdw,sim.wzdw,tol,sim.option);
spects= shapes_time.spects; 

telapsed= toc();
%{
% Total output pulse energy
Pul_Et1= u1.* conj(u1);
Pul_Et1= dt *sum(Pul_Et1);
%}


%% saves data for latter manual filtering
save( strcat(results_path, img_name) );      % saves .mat


%% Spectra at each step plot

plot_lambda_range(1)= pump.lambda- 200;
plot_lambda_range(2)= pump.lambda+ 200;

% %{
if (option==1)
    spect_pow= spects.* conj(spects);
    % spect_pow= spect_pow/ simulation.nt;                % ->[w] fft normalisation (sqrt(N) for each fft)
    noise = max(max(spect_pow ) )/ 10000;
    mesh_in_time = 10*log10(1000*(spect_pow+ noise));   % ->[dB]

    dist_axis= distances* 1e5;
    lambda_lin= linspace(min(sim.lambdas), max(sim.lambdas), round(max(sim.lambdas )- min(sim.lambdas) ) )';
    y_lin= linspace(min(dist_axis ), max(dist_axis ), 2* size(dist_axis, 1 ) )';
    [X, Y ]= meshgrid(lambda_lin, y_lin );
    Z= griddata(sim.lambdas, dist_axis, mesh_in_time, X, Y, 'cubic' );

    % ensayo fallido NO BORRAR, algun dia...
    %{
    auxMat=[];
    lambda_aux= [];
    for i=1:size(dist_axis,1);
        auxMat= [auxMat mesh_in_time(((i-1)*size(sim.lambdas, 1)+ 1): i*size(sim.lambdas, 1) ) ];
        lambda_aux= [lambda_aux;sim.lambdas ];
        dist_axis_aux((i-1)*size(sim.lambdas, 1)+ 1: i*size(sim.lambdas, 1))=  dist_axis(i);
    end
    auxMat= auxMat';
    cosa= TriScatteredInterp(lambda_aux, dist_axis_aux', auxMat);
    qz= cosa(X, Y);
    figure(668)
    mesh(X, Y, qz);
    %}

    figure(666)
    imagesc(lambda_lin, y_lin, Z);
    % axis([500 1200 0 L*1e5]);     % twice lenght fibre
    axis([plot_lambda_range, [0 fibre.L* 1e5] ]);     % twice lenght fibre
    % set(gca,'YDir','normal');      % 0 length at bottom

    xlabel('\lambda [nm]','FontSize',18,'FontName','Times');
    ylabel('Length [cm]','FontSize',18,'FontName','Times');
    print('-depsc', '-r600', strcat(results_path, img_name, 'map', '.eps' ) );   % eps
    % print('-depsc', '-r600', strcat(results_path, img_name, 'map','.pdf') );   % pdf
end
% %}


%% Outupt spectrum ************************************************************
fprintf(1,'\n\nPloting Results');
specN= out_spect.* conj(out_spect);
%{
% Total output pulse energy (frequency) -> No funciona, si da la suma sin sim.df/dt
specN= specN./ size(out_spec,2);                % ->[w] fft normalisation (sqrt(N) for each fft)
Pul_Ef= sim.df *sum(out_spec);
 plot(sim.lambdas,specN./ 1e3,'b.-')           % ->[kW]?
%}

specN = specN/ max(specN);        % normalised spectra to higher peak power
spec_ylabel= 'Normalised Spectrum (a.u.)';
% spec_ylabel= 'Power [kW]';  % if no normalisation performed

% plot
figure(662)
plot(sim.lambdas,specN,'b.-');
grid on;
xlabel('\lambda [nm]','FontSize',18,'FontName','Times');
ylabel (spec_ylabel,'FontSize',18,'FontName','Times');
xlim(plot_lambda_range);

% on graph input pulse data
str1(1)= strcat({'fibre: '}, fibre.name);
str1(2)= strcat({'L= '}, num2str(fibre.L*1E3,'%3.2f'), 'm');
str1(3)= strcat({'ZDW= '}, num2str(fibre.zdw,'%3.0f'), 'nm');
str1(4)= {'Pump shape: sech2'};
str1(5)= strcat({'\lambda_0= '}, num2str(pump.lambda), ' nm');
str1(6)= strcat({'\Deltat= '}, num2str(pump.tfwhm* 1e3), ' fs  (FWHM)');
str1(7)= strcat({'chirp= '}, num2str(chirping* 1e6, '%3.1f'), ' fs^2');
str1(8)= strcat({'P peak= '}, num2str(pump.Ppeak,'%3.1f'), ' w');
str1(9)= strcat({'P mean= '}, num2str(pump.Pmean *1E3, '%3.1f'), ' mW');
text_x_pos= plot_lambda_range(1)+ 0.05*(plot_lambda_range(2)- plot_lambda_range(1) );
y_pos= ylim;
text_y_pos= 0.7* y_pos(2);
txt_spr_hnld= text(text_x_pos, text_y_pos, str1);

% test octave
%{
str1a= strcat('fibre: ', fibre.name, '\n');
str1a= strcat(str1a, 'input shape: sech2', '\n');
txt_spr_hnld= text(plot_lambda_range(1), 0.75, str1a);
%}

% saves output spectrum
print(662,'-depsc', '-r600', strcat(results_path, img_name, 'sp', '.eps' ) );   % save spectrum as eps
% print('-depsc', '-r600', strcat(img_name, 'sp', '.pdf' ) );   % save spectrum as pdf
% saveas(gcf, img_name, 'fig');     % save spectrum as fig


fprintf(1,'\n\n----------------------------------------------');
fprintf(1,'\n');



% PONER UNA ESPERA (???) O IMPLEMENTAR ALGO TIPO CORTA-TRANSFORMA
% (AUX_CODES)

