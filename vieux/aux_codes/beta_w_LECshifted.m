function betap= beta_w_LECshifted(lambda_pulse, w_sim)

% ensayo con beta2 fijo
% graficar D(lambda) desplazo vs no desplazo

c = 299792.458;                         % [nm/ps] speed of light
aux_cnst= 2* pi* c;
lambda_pulse_LEC= 830;                      % [nm] pulse central lambda

%{
%% test
clear all;
close all;
nt= 2^12;                                   % number of spectral points
time= 16;                                   % [ps] simulation window
dt= time/ nt;                               % [ps]
t= -time/ 2 : dt : (time/ 2- dt);           % [ps]
df= 1/(nt*dt);                     % [THz] frequencies separation
f= -(nt/2)* df : df : (nt/ 2- 1)* df;      % [THz] frequencies vector
w= 2* pi* f;                         % [1E12/s] angular frequencies vector
lambda_pulse= 1550;      % [nm]  % test


%% ZDW
lambda_pulse_LEC= 830;
ZDW_LEC= 790;                               % [nm] fiber zero dispersion wavelength
% TELCO_lambda_pulse= 1550;                 % [nm] pulse central lambda
ZDW_TELCO= lambda_pulse- (lambda_pulse_LEC- ZDW_LEC);
w_sim= w+ 2* pi* c/ ZDW_TELCO;               % [rad/ps]
%}


%% simulation omegas/lambdas
% fo_TELCO= c/ ZDW_TELCO;                  % [THz] central simulation frequency
% w_TELCO= 2* pi* f;                         % [1E12/s] angular frequencies vector
% w_TELCO= w_TELCO+ 2* pi* fo_TELCO;                %[1/ps]
% lambda_TELCO= (c./ (f+ fo_TELCO) )';               % [nm] lambdas vector


%% loads fiber dispersion (Andres)
load('/home/vbettachini/documents/Fiber/simulacion/LEC_simul/pcf_data/beta_w');            % [1/ps 1/km]
beta_w_LEC= beta_w(:,2);
w_LEC= beta_w(:,1);


%% Traslación rígida
siz_Andres= size(w_LEC,1);

% util para una traslación rígida
lambda_shift= lambda_pulse- lambda_pulse_LEC;

% aprox w_shift
% w_shift= (lambda_pulse+ lambda_pulse_LEC)^2* aux_cnst* lambda_shift/ 4;
w_shift= aux_cnst* lambda_shift/ (lambda_pulse* lambda_pulse_LEC);
lamb_LEC= aux_cnst./ w_LEC;

%{
% busqueda delta_indice traslacion
indice_ZDW_sim=0;
delta_lambda=1000;
for i=1:siz_Andres;
   if delta_lambda< (abs(lamb_LEC(i)- ZDW_TELCO ) );
       indice_ZDW_sim= i;
       delta_lambda= abs(lamb_LEC(i)- ZDW_TELCO );
   end
end

% beta_w_shifted= zeros(siz_Andres- indice_ZDW_sim,1);
% w_shifted= zeros(siz_Andres- indice_ZDW_sim,1);
% lamb_shifted= zeros(siz_Andres- indice_ZDW_sim,1);
%}

% traslacion todos los beta
indice_ZDW_sim=1;
beta_w_shifted= zeros(siz_Andres- indice_ZDW_sim+ 1,1);
w_shifted= zeros(siz_Andres- indice_ZDW_sim+ 1,1);
lamb_shifted= zeros(siz_Andres- indice_ZDW_sim+ 1,1);
for i=1: siz_Andres
    beta_w_shifted(i)= beta_w_LEC(i- 1+ indice_ZDW_sim);
    
    %{
    % traslacion rígida en lambda
    lamb_shifted(i)= lamb_LEC(i- 1+ indice_ZDW_sim)+ lambda_shift;
    w_shifted(i)= aux_cnst/ lamb_shifted(i);
    %}
    
    % %{
    % traslacion rígida en omega
    w_shifted(i)= w_LEC(i- 1+ indice_ZDW_sim)- w_shift;
    lamb_shifted(i)= aux_cnst/ w_shifted(i);
    % %}
end

%% borra frecuencias negativas
%{
aux=(w_shifted<0);
w_shifted(aux)=[];
lamb_shifted(aux)=[];
beta_w_shifted(aux)=[];
%}

%{
% check shift
figure(991)
plot(lamb_LEC, beta_w_LEC, 'b', lamb_shifted, beta_w_shifted, 'r');
legend('Andres', 'shifted');
xlabel('\lambda [nm]','FontSize',18,'FontName','Times');
ylabel('\beta [1/km]','FontSize',18,'FontName','Times');
grid on;
%}

%{
figure(992)
plot(w_LEC, beta_w_LEC, 'b', w_shifted, beta_w_shifted, 'r');
legend( 'Andres', 'shifted');
xlabel('\omega [rad/ps]','FontSize',18,'FontName','Times');
ylabel('\beta [1/km]','FontSize',18,'FontName','Times');
grid on;
%}


%% interpolates beta(omega) in those of simulation
betap = interp1(w_shifted, beta_w_shifted, w_sim, 'spline', 'extrap');

%{
% borra frecuencias negativas
aux=(w_sim<0);
betap(aux)=[];
w_sim_pos=w_sim;
w_sim_pos(aux)=[];
%}

%{
% beta(w) plot
figure(993)
plot(beta_w(:,1), beta_w(:,2), '.b', w_shifted, beta_w_shifted, '.r', w_sim_pos, betap, '-k');  % beta check
legend('Andres', 'shifted', 'extrap', 'Location', 'SouthEast');
xlabel('\omega [rad/ps]','FontSize',18,'FontName','Times');
ylabel('\beta [1/km]','FontSize',18,'FontName','Times');
grid on;
%}

%{
% beta(lambda) plot
lamb_sim_pos= aux_cnst./ w_sim_pos;
figure(994)
plot(lamb_LEC, beta_w_LEC, 'b', lamb_shifted, beta_w_shifted, '.r',lamb_sim_pos, betap, 'k');
legend('Andres', 'shifted, 'extrap');
xlabel('\lambda [nm]','FontSize',18,'FontName','Times');
ylabel('\beta [1/km]','FontSize',18,'FontName','Times');
grid on;
%}
