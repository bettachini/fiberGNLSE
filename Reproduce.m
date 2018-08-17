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
sim.FigShow= 'off';      % display generated figures (off default)
sim.graphsave= 1;	% saves spectrum plots (1 default)
sim.outputs= 0;	% saves spectra inside fibre (0 default)
sim.matsave= 1;	% save output .mat to further processing

%% kernal
% parameter variations go here

% pump power iteration [InputField REQUIRES Ppeak]
pump.Pmean= 10E-3;

it.chirpstart= -8E3;
it.chirpstep= 4E3;
% it.chirpstep= 5E2;
it.chirpstop= 8E3; % if =it.start -> single step regardless of step
pump.chir= it.chirpstart;
for chi= it.chirpstart:it.chirpstep:it.chirpstop % [fs^2]
	sim= zentrum(sim, pump, fibre);
end
