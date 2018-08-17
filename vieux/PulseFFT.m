% pump.u0 filter \Delta\lambda transform limit \Delta\tau

clear all
close all

format long e
%% from Parameters.m

%% Input pulses (pump)
pump.lambda= 830; % [nm] 
pump.rate= 94E6; % [Hz]
pump.chirp= 0.007400;             % chirp= 7400fs^2
% pump.chirp= 0;	% [1E-6fs^2]
% to= pump.tfwhm/ 1.763;
% pump.w= 2* pi* sim.c/ pump.lambda;                   % [THz] frequency of the pulse, given to the SSFM.


%% simulation parameters
% general
sim.octave= exist('OCTAVE_VERSION','builtin') ~= 0;	% 1 if running in octave
sim.c = 299792.458;                         % [nm/ps] speed of light

% parameters
sim.nt= 2^14;                                   % number of spectral points
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

fibre.GammaID = '78*lambda0/zdw';              % [w^-1* km^-1]
fibre.gamma_zdw = 78;              % [w^-1* km^-1]
fibre.gamma= fibre.gamma_zdw* pump.lambda/ fibre.zdw;

fibre.L = 0.00075;                         % [km] fibre length


%% Numerical simulation calculations
sim.aux= -(sim.nt/2): (sim.nt/ 2- 1);
sim.dt= sim.time/ sim.nt;	% [ps] time step
sim.t= sim.dt* sim.aux; % [ps] time vector
% sim.df= 1/ sim.time;	% [THz] frequency step
sim.waux= 2* pi* sim.aux/ sim.time;	% [radE12/s] angular frequencies
sim.wcent= 2* pi* sim.c/ pump.lambda;  % [radE12/s] simulation (pump) angular frequency
sim.ws= sim.waux+ sim.wcent;  % [radE12/s] centred angular frequencies
sim.lambdas= (2* pi*sim.c./ sim.ws)';   % [nm] centred lambdas vector



%% pump pulse
pump.tfwhm= 0.05  % [ps] pulse width @FWHM

% Square
%{
pump.u0= zeros(sim.nt,1);
for i=1:sim.nt
    if abs( sim.t(i))< ( pump.tfwhm/2)
        pump.u0(i)= 1;
    else
        pump.u0(i)= 0;
    end
end
%}

% Gaussian
% pump.u0= exp(-(sim.t^2/(2* t_0^2 ) ); % AGR_NLFO exp. 3.2.7
% pump.u0= exp(-(sim.t^2/(2* (2* sqrt(log(2) ) T_)^2 ) ); % w/ AGR_NLFO exp.3.2.8
% pump.u0= exp(-(sim.t^2/(8* log(2)  ) );

pump.u0= exp(-(sim.t* 2* sqrt(log(2) )/ pump.tfwhm).^2 );     % normalised to 1 [w^0.5]



%% pump plot
figure(11);
Intensityt= pump.u0;
% Intensityt= pump.u0.^2;
plot(sim.t,Intensityt);
grid on;
xlabel('\tau [ps]','FontSize',18,'FontName','Times');
xlim([(-pump.tfwhm- 1) (pump.tfwhm+ 1) ] );

str2(1)= strcat({'\Delta\tau (t)= '}, num2str(pump.tfwhm, '%3.1f'), ' ps (fwhm)');
Intensityt_fwhm= PeakFWHM(sim.t,Intensityt);
str2(2)= strcat({'\Delta\tau (m)= '}, num2str(Intensityt_fwhm, '%3.1f'), ' ps (fwhm)');
y_pos= ylim;
text_y_pos= 0.7* y_pos(2);
x_pos= xlim;
text_x_pos= 0.7* x_pos(2) + 0.3* x_pos(1);
text(text_x_pos, text_y_pos, str2);

% print(11,'-depsc2', '-r600', strcat('tFFT', '.eps' ) )


%% transform
transf= fft(pump.u0);
shifted_transf= fftshift(transf);
% figure(12);
% plot(sim.ws, shifted_transf,'.-');
IntensityFreq= shifted_transf.*conj(shifted_transf);


%% width
% pulse.Tfwhm [ps], pulse.Ppeak [?]
[Ppeak, max_pos]= max(IntensityFreq);

val=0;
i= size(IntensityFreq,2);
while (val< (Ppeak/2))
    i= i-1;
    val=(IntensityFreq(i));
end
Freqfwhm= sim.ws(i);
val=0;
i=1;
while (val< (Ppeak/2))
    i= i+1;
    val=(IntensityFreq(i));
end
Freqfwhm= Freqfwhm- sim.ws(i)
DtDnu= Freqfwhm* pump.tfwhm/(2* pi)

%% transform plot
figure(13);
plot(sim.ws, IntensityFreq,'.-');
grid on;
xlabel('\omega [Trad/s]','FontSize',18,'FontName','Times');
xlim([(sim.wcent- 30) (sim.wcent+ 30) ] );

str2(1)= strcat({'\Delta\omega= '}, num2str(Freqfwhm, '%3.1f'), ' Trad/s (fwhm)');
y_pos= ylim;
text_y_pos= 0.7* y_pos(2);
x_pos= xlim;
text_x_pos= 0.7* x_pos(2) + 0.3* x_pos(1);
text(text_x_pos, text_y_pos, str2);

% print(13,'-depsc2', '-r600', strcat('wFFT', '.eps' ) );