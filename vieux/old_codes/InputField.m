function pump= InputField(sim,pump,fibre)


%% INPUT FIELD ************************************************************
sim.deltaw= fibre.wzdw- 2* pi* sim.c/ pump.lambda;
[aux1a,aux1b] = min( abs (sim.ws - sim.deltaw) );
pump.u0 = sech(sim.t/ pump.tfwhm).* exp(-1i* sim.ws(aux1b)* sim.t);     % [w^0.5] pump shape

% input pulse shape
pump.ShapeFactor= 0.88;     % sech2

% %{
% Mean -> Peak power
% pump.Pmean= 100E-3;         % [w] -> L=0.01, shift: >500 nm
% pump.Pmean= 50E-3;         % [w] -> L=0.01, shift: 500 nm
% pump.Pmean= 30E-3;         % [w] -> L=0.01, shift-> 1884 nm
pump.Pmean= 3E-3;         % [w] -> L=0.01, no soliton
% pump.Pmean= 200E-3;         % [w] -> L=0.01, no soliton
pump.Ppeak= pump.Pmean/( pump.tfwhm* 1E-12* pump.rate* pump.ShapeFactor);         % [w]
% %}

% TELCO 1ps
% 1Gbit/s, 500mW input, sech2 -> pump.Ppeak= 500E-3/ (0.88* 1E-12* 1E9);
% pump.Ppeak= 500E-3/ (0.88* 1E-12* 1E9);        % [w] (unos 570 w)
% pump.Ppeak= 1E6;

%{
% TELCO as LEC test
pump.Ppeak= 1E3;           % [w]
pump.Pmean= pump.Ppeak* ( pump.tfwhm* 1E-12* pump.rate* pump.ShapeFactor);         % [w]
%}

% pump power -> amplitude
pump.u0 = sqrt(pump.Ppeak)* pump.u0;                 % [w^0.5]

%{
% mean input pulse power
pump.ShapeFactor= 0.88;     % sech2
E_pulse_in= pump.Ppeak* pump.tfwhm* 1E-12/ pump.ShapeFactor; % [j]
pump.Pmean= pump.rate* E_pulse_in* 1E3;            % [mW]
%}

% chirp
% pump.chirping= 0.007400;             % chirp= 7400fs^2
% pump.u0 = ifft(fft(pump.u0).*exp(1i* 0.5* (-pump.chirping)* fftshift(sim.ws).^2) ); % [w^0.5]

%{
% Total input pulse energy
Pul_Et0= pump.u0.* conj(pump.u0);
Pul_Et0= sim.dt *sum(Pul_Et0);
%}
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



