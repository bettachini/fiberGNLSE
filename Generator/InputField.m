function  pump= InputField(sim, pump)

% modifies pump.u0base defined in Parameters function


%% INPUT FIELD ************************************************************

% TELCO 1ps
% 1Gbit/s, 500mW input, sech2 -> pump.Ppeak= 500E-3/ (0.88* 1E-12* 1E9);
% pump.Ppeak= 500E-3/ (0.88* 1E-12* 1E9);        % [W] (unos 570 W)
% pump.Ppeak= 1E6;

%{
% TELCO as LEC test
pump.Ppeak= 1E3;           % [w]
pump.Pmean= pump.Ppeak* ( pump.tfwhm* 1E-12* pump.rate* pump.ShapeFactor);         % [W]
%}

%% pump power -> amplitude
pump.u0 = sqrt(pump.Ppeak)* pump.u0base;                 % [W^0.5]

%{
% mean input pulse power
pump.ShapeFactor= 0.88;     % sech2
E_pulse_in= pump.Ppeak* pump.tfwhm* 1E-12/ pump.ShapeFactor; % [j]
pump.Pmean= pump.rate* E_pulse_in* 1E3;            % [mW]
%}

%% chirp
pump.u0 = ifft(fft(pump.u0).*exp(1i* 0.5* (-pump.chirp)* fftshift(sim.waux).^2) ); %  Agrawal NLFO exp 3.2.6 [W^0.5]


%% mean power at PCF input (vera)
pump.InPower= pump.rate* (sim.dt* 1E-12)* sum(pump.u0.* conj(pump.u0) );    % [W]

%% spectrum PSD check
%{

%{
% Total input pulse energy
u0TimeEnergy= pump.u0.* conj(pump.u0);
u0TimeEnergy= sim.dt *sum(u0TimeEnergy);
%}

% PSD manual
u0fft= fft(pump.u0);
u0fft= fftshift(u0fft);
Fs= 1/ sim.dt;
PSDu0= (1/ (sim.nt* Fs) )* u0fft.* conj(u0fft);
figure(75)
plot(sim.lambdas, PSDu0)

% periodogram approach -> DIFFERENT POWER OBTAINED
% TENGO QUE ENTENDER COMO CONTROLAR EL PASO DE FREQUENCIA
[Pxx,w]= periodogram(pump.u0);
figure(76)
plot(sim.lambdas, fftshift(Pxx ) );

%{
% input pulse spectrum
figure(75)
inp= fft(pump.u0);
inp= fftshift(inp);
inp= inp.* conj(inp);
inp= inp./ max(inp);
plot(sim.lambdas, inp);
xlim([sim.lambdas(simulation.nt) sim.lambdas(1)]);
xlabel('\lambda [nm]','FontSize',18,'FontName','Times');
ylabel ('Normalised Spectrum (a.u.)','FontSize',18,'FontName','Times');
%}

%}