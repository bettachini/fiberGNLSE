clear all
close all

format long e

%% code path
% addpath('~/documents/Fiber/simulacion/aux_codes/');   % durante el sdesarrrollo no se recurre a aux_codes
% addpath('~/Dropbox/Documentos/Fiber/simulacion/aux_codes/');   % durante el sdesarrrollo no se recurre a aux_codes
% addpath('~/documents/Fiber/simulacion/codes/');   % durante el sdesarrrollo no se recurre a aux_codes
% addpath('~/Dropbox/Documentos/fibre/simulacion/codes/');   % durante el sdesarrrollo no se recurre a aux_codes


%% standard parameters
[sim, pump, fibre]= Parameters;    % standard simulation parameters

% run options [overrides Parameters defaults]
sim.FigShow= 'on';      % display generated figures (off default)
sim.graphsave= 1;	% saves spectrum plots (1 default)
sim.outputs= 0;	% saves spectra inside fibre (0 default)
sim.matsave= 0;	% save output .mat to further processing

%% kernal
% parameter variations go here

% pump power iteration [InputField REQUIRES Ppeak]
% %{
it.powstart= 1E-3;
it.powstep= 10E-4;
it.powstop= 15E-3; % if =it.start -> single step regardless of step
% pump.Pmean= it.powstart; 

for pump.Pmean= it.powstart:it.powstep:it.powstop % [W]

% for pow= it.powstart:it.powstep:it.powstop % [W]
%     pump.Pmean= pow;
% %}

    % pump power iteration [InputField REQUIRES Ppeak]
    % %{
    it.chirpstart= -8E3;
    it.chirpstep= 5E2;
    it.chirpstop= 8E3; % if =it.start -> single step regardless of step
	pump.chir= it.chirpstart;
% for pump.chirp= it.chirpstart:it.chirpstep:it.chirpstop % [fs^2]

%     for chi= it.chirpstart:it.chirpstep:it.chirpstop % [fs^2]
		% disp([pump.Pmean, pump.chirp]);
        sim= zentrum(sim, pump, fibre);
		% disp(['a: ', sim.ResultsPath]);
        % sim= zentrum(pow, chi, sim, pump, fibre);
%     end
end
