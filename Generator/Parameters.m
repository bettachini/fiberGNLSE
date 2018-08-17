function [ sim,pump,fibre ] = Parameters
%Parameters Summary of this function goes here
%   Detailed explanation goes here


%% general
sim.octave= exist('OCTAVE_VERSION','builtin') ~= 0;	% 1 if running in octave
sim.c = 299792.458;                         % [nm/ps] speed of light


%% Input pulses (pump)
pump.tfwhm= 37; % [fs] pulse width @FWHM
pump.tfwhm= pump.tfwhm* 1e-3; % ->[ps]
pump.lambda= 830; % [nm] 
pump.rate= 94E6; % [Hz]
% pump.chirp= 0.007400;             % chirp= 7400fs^2
pump.chirp= 0;	% [fs^2]
pump.chirp= pump.chirp* 1E-6;	% [ps^2]
% pump.w= 2* pi* sim.c/ pump.lambda;                   % [THz] frequency of the pulse, given to the SSFM.


%% numerical simulation parameters
% 120226 llega a w negativos, veo con sim.nt=2^13 % sim.nt= 2^14;                                   % number of spectral points
sim.nt= 2^13;                                   % number of spectral points
    % no alcanza a w negativos
% sim.nt= 2^12;                                   % number of spectral points
sim.time= 16;                                   % [ps] simulation window
sim.dz= 0.00000005;                    % [km] longitudinal step

% outputs
sim.outputs= 0;          % [0] only output [1] inner fibre spectral, [2] spectral+temporal
sim.FigShow= 'off';	% display generated figures
sim.save= 1;	% whether to save output to .mat file and save plots
sim.LambdaRange= [pump.lambda- 500 pump.lambda+ 300];   % for spectral plots


%% Fibre
fibre.zdw= 790;                               % [nm] fiber zero dispersion wavelength
fibre.wzdw= 2* pi* sim.c/ fibre.zdw;	% [THz] central simulation frequency

fibre.GammaID = '78*l0/zdw';              % [w^-1* km^-1]
fibre.gamma_zdw = 78;              % [w^-1* km^-1]
fibre.gamma= fibre.gamma_zdw* pump.lambda/ fibre.zdw;

fibre.L = 0.00065;	% [km] fibre length


%% Numerical simulation calculations
sim.aux= -(sim.nt/2): (sim.nt/ 2- 1);
sim.dt= sim.time/ sim.nt;	% [ps] time step
sim.t= sim.dt* sim.aux; % [ps] time vector
% sim.df= 1/ sim.time;	% [THz] frequency step
sim.waux= 2* pi* sim.aux/ sim.time;	% [radE12/s] angular frequencies
sim.wcent= 2* pi* sim.c/ pump.lambda;  % [radE12/s] simulation (pump) angular frequency
sim.ws= sim.waux+ sim.wcent;  % [radE12/s] centred angular frequencies
sim.lambdas= (2* pi*sim.c./ sim.ws)';   % [nm] centred lambdas vector


%% fiber dispersion (interpolates beta(w)M1? data into sim.waux)
%{
% load('/home/vbettachini/documents/Fiber/simulacion/LEC_simul/pcf_data/beta_w');	% [1/ps 1/km]
load('beta_w'); % local
fibre.BetaID= 'LECM1';
beta_fibreLEC= beta_w(:,2);
w_fibreLEC= beta_w(:,1);
fibre.betap = interp1(w_fibreLEC, beta_fibreLEC, sim.ws, 'spline', 'extrap');
% plot(sim.ws, fibre.betap, '.-r', beta_w(:,1), beta_w(:,2), '*b');  % beta check%
%}


%% fibre dispersion Datasheet Crystal Fibre -> beta2, beta3
% %{
% interpolates directly to sim.ws
fibre.BetaID= 'NL b2y3';
D_slope= 0.64;          % [ps/(nm^2 km)]
beta3zdw= (fibre.zdw^4/(2* pi* sim.c)^2)* D_slope;
Bw_ds= zeros(sim.nt,1);
for i=1:sim.nt
    Bw_ds(i)= (1/6)* beta3zdw* (sim.ws(i)- fibre.wzdw)^3;
end
fibre.betap= Bw_ds';
% %}

%{
% old version: loads beta(w) to interpolate
data_path='/oldhome/vbettachini/documents/fibre/simulacion/pcf_datasheets/NL-2_3-790-02/';
beta_w= load([data_path 'b2y3.dat']);            % [1/ps 1/km]
fibre.BetaID= 'beta2y3';
fibre.betap= interp1(beta_w(:,1), beta_w(:,2), sim.ws, 'spline', 'extrap');
%}


%% fiber dispersion (fit to 4 M1 provided beta2(w) )
% fibre.betap= beta_w_LECshifted(pump.lambda, sim.ws);


%% fiber dispersion as beta polynomial (datasheet PCF)
%{
fibre.BetaID= 'beta2y3 LEC';
fibre.beta2= 0;              % D @ZDW=0 -> fibre.beta2= 0
fibre.beta3= 0.0703;         % dD_lamb datasheet -> fibre.beta3 [ps nm^-2 km^-1]
fibre.betap= [0 0 fibre.beta2 fibre.beta3];
%}


%% fibre beta polynomial datasheet beta3 at zdw shifted -> pump



%% fibre dispersion plot
%{
load('/home/vbettachini/documents/Fiber/simulacion/LEC_simul/pcf_data/beta_w');            % [1/ps 1/km]
figure(323)
plot(sim.ws, fibre.betap, '.-r', beta_w(:,1), beta_w(:,2), '-b');
legend('shifted', 'Andres', 'Location', 'SouthEast');
xlabel('\omega [rad/ps]','FontSize',18,'FontName','Times');
ylabel('\beta [1/km]','FontSize',18,'FontName','Times');
grid on;
% print('-depsc', '-r600', strcat(results_path, sim.name, 'beta', '.eps' ) );   % save spectrum as eps
% print('-depsc', '-r600', strcat(results_path, sim.name, 'beta', '.pdf' ) );   % save spectrum as pdf
%}


%% fiber attenuation
fibre.alpha= 0;		% [dB/km]
% fibre.alpha= 11.22;               % 10.5 dB/km @1550 nm -> 11.22 1/km

%{
% interpolates fibre.alpha(sim.lambdas) in omegas of simulation
load alpha_lec;         % [nm dB/km]
% plot(alpha_lec(:,1), alpha_lec(:,2), '.-r');
alpha_w= 2* pi *simulation.c./ alpha_lec(:,1);                 % ->[1/ps]
alpha_att= 10.^(alpha_lec(:,2)./ 10);                 % ->[1/km]
fibre.alpha= interp1(alpha_w, alpha_att, sim.ws, 'cubic', 0);
% plot(sim.ws, fibre.alpha, '.-r', alpha_w, alpha_att, '*b');
%}


%% pump field shape

%{
% QUE CUERNOS ES EL OBJETIVO DE ESTO? 
% ESTO CORRIA EL LAMBDA DEL PUMP 830->879
sim.deltaw= fibre.wzdw- sim.wcent;
[aux1a,aux1b] = min( abs (sim.waux - sim.deltaw) );
pump.u0base= exp(-1i* sim.waux(aux1b)* sim.t);
%}

% sech pulse
aux= 2* log(1+sqrt(2) );
pump.u0base= sech(aux* (sim.t/ pump.tfwhm) );     % normalised to 1 [w^0.5]
% pump.u0base= sech(sim.t/ pump.tfwhm);     % Error no era para tfwhm
pump.ShapeFactor= 0.88;
pump.ShapeName= 'sech';


%% power
% %{
% Mean -> Peak power
% pump.Pmean= 100E-3;         % [W] -> L=0.01, shift: >500 nm
% pump.Pmean= 50E-3;         % [W] -> L=0.01, shift: 500 nm
% pump.Pmean= 30E-3;         % [W] -> L=0.01, shift-> 1884 nm
pump.Pmean= 3E-3;         % [W] -> L=0.01, no soliton
% pump.Pmean= 200E-3;         % [W] -> L=0.01, no soliton
pump.Ppeak= pump.Pmean/( pump.tfwhm* 1E-12* pump.rate* pump.ShapeFactor);         % [W]
% %}

end
