function Diego_fixedb2_shift(lambda_pulse, w_sim)
c = 299792.458;                         % [nm/ps] speed of light
aux_cnst= 2* pi* c;

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
ZDw_sim= 790;                               % [nm] fiber zero dispersion wavelength
% TELCO_lambda_pulse= 1550;                 % [nm] pulse central lambda
ZDW_TELCO= lambda_pulse- (lambda_pulse_LEC- ZDw_sim);
w_sim= w+ 2* pi* c/ ZDW_TELCO;               % [rad/ps]
%}
lambda_pulse_LEC= 830;                      % [nm] pulse central lambda


%% simulation omegas/lambdas
% fo_TELCO= c/ ZDW_TELCO;                  % [THz] central simulation frequency
% w_TELCO= 2* pi* f;                         % [1E12/s] angular frequencies vector
% w_TELCO= w_TELCO+ 2* pi* fo_TELCO;                %[1/ps]
% lambda_TELCO= (c./ (f+ fo_TELCO) )';               % [nm] lambdas vector

%% beta2_fixed constant
siz= size(w_sim,2);
beta2_fixed= -20;    % [ps^2/km]
beta2_fixed= beta2_fixed.* ones(siz,1);

lambdas_sim= aux_cnst./ w_sim;
D_fixed= -(w_sim.^2/aux_cnst)* beta2_fixed;


%% beta2_fixed(w) -> beta_fixed(w)
omega_ZDW= 2* pi* c/ ZDW_TELCO;
% beta(w)= beta_0+ beta_2(w) (w-w_0)^2/2!
beta_0= 0;
omegas_menos_cero= w_sim- omega_ZDW;
omegas_menos_cero= omegas_menos_cero.* omegas_menos_cero;
omegas_menos_cero= omegas_menos_cero/ 2;
% omegas_menos_cero= omegas_menos_cero/ 4;    % pega mucho mejor a Andres!!!
beta_fixed= omegas_menos_cero'.* beta2_fixed;
beta_fixed= beta_fixed+ beta_0;


%% Traslación rígida beta_fixed(w)

% util para una traslación rígida
lambda_shift= lambda_pulse- lambda_pulse_LEC;

% aprox w_shift
% w_shift= (lambda_pulse+ lambda_pulse_LEC)^2* aux_cnst* lambda_shift/ 4;
w_shift= aux_cnst* lambda_shift/ (lambda_pulse* lambda_pulse_LEC);

% traslacion todos los beta
indice_ZDW_sim=1;
beta_w_shifted= zeros(siz- indice_ZDW_sim+ 1,1);
w_shifted= zeros(siz- indice_ZDW_sim+ 1,1);
lamb_shifted= zeros(siz- indice_ZDW_sim+ 1,1);
for i=1: siz
    beta_w_shifted(i)= beta_fixed(i- 1+ indice_ZDW_sim);
    
    %{
    % traslacion rígida en lambda
    lamb_shifted(i)= lamb_LEC(i- 1+ indice_ZDW_sim)+ lambda_shift;
    w_shifted(i)= aux_cnst/ lamb_shifted(i);
    %}
    
    % %{
    % traslacion rígida en omega
    w_shifted(i)= w_sim(i- 1+ indice_ZDW_sim)- w_shift;
    lamb_shifted(i)= aux_cnst/ w_shifted(i);
    % %}
end


%% beta_fixed_shifted(w) -> D_fixed_shifted(w)

% ajuste beta_fixed_shifted(w)
fit_order=5;
poly_beta_w= polyfit(w_shifted, beta2_fixed, fit_order );

% derivacion ajuste ->beta_2(w)
poly_beta_2_w= zeros(fit_order-2,1);
for i=1: fit_order-1
    div_aux= factorial(fit_order+ 1- i)/ factorial(fit_order- 1- i);
    poly_beta_2_w(i)= poly_beta_w(i)* div_aux;
end
beta_2_shifted= polyval(poly_beta_2_w, w_shifted);   %-> beta_2(lamb)

% beta_2_lamb->D_shifted
D_shifted= 1./lamb_shifted;
D_shifted= D_shifted.* D_shifted;
D_shifted= D_shifted.* (-aux_cnst);
D_shifted= D_shifted.* beta_2_shifted;

% plot D(lambda)
figure(55)
plot(lamb_shifted, D_shifted, '.r',  lambdas_sim, D_fixed, '.b')
legend('shifted','fixed');
grid on;
xlabel('\lambda [nm]','FontSize',18,'FontName','Times');
ylabel('D [ps/(nm km)]','FontSize',18,'FontName','Times');