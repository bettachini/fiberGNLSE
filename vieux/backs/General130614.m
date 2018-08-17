clear all
close all

format long e

%% code path
% addpath('~/documents/Fiber/simulacion/aux_codes/');   % durante el sdesarrrollo no se recurre a aux_codes
% addpath('~/Dropbox/Documentos/Fiber/simulacion/aux_codes/');   % durante el sdesarrrollo no se recurre a aux_codes
% addpath('~/documents/Fiber/simulacion/codes/');   % durante el sdesarrrollo no se recurre a aux_codes
% addpath('~/Dropbox/Documentos/fibre/simulacion/codes/');   % durante el sdesarrrollo no se recurre a aux_codes


%% standard parameters
[sim,pump,fibre]= Parameters;    % standard simulation parameters

% run options
sim.FigShow= 'off';      % display generated figures (off default)
sim.graphsave= 1;	% saves spectrum plots (1 default)
sim.outputs= 0;	% saves spectra inside fibre (0 default)
sim.matsave= 1;	% save output .mat to further processing


%% kernal
% parameter variations go here

% pump power iteration [InputField REQUIRES Ppeak]
% %{
it.powstart=  1E-3;
it.powstep= 10E-4;
it.powstop= 15E-3; % if =it.start -> single step regardless of step
for pow= it.powstart:it.powstep:it.powstop % [W]
    pump.Pmean= pow;
% %}


% pump power iteration [InputField REQUIRES Ppeak]
% %{
it.chirpstart= -8E3;
it.chirpstep= 5E2;
it.chirpstop= 8E3; % if =it.start -> single step regardless of step
for chi= it.chirpstart:it.chirpstep:it.chirpstop % [fs^2]
    pump.chirp= chi* 1E-6;	% [fs^2 -> ps^2]
% %}

    % pump.Pmean= 3E-3;  % [W] test value
    pump.Ppeak= pump.Pmean/( pump.tfwhm* 1E-12* pump.rate* pump.ShapeFactor);         % [W]

    % pump central wavelength (pump.lambda)
    % for it= 810:5:850 % [nm]
    %    pump.lambda= it;
    
    %% updates Input
    pump= InputField(sim,pump); % using variated parameters
    % sim.FileName= FileNameNext(sim.ResultsPath, sim.FileName, LeadChar); % if 01 is present next qq
    [sim.FileName, sim.ResultsPath]= expFileNameNext;

    %% NLSE run
%     tol= 1e-8;	% tolerance
    tol= 1e-3;	% tolerance
    output= NLSE(sim, fibre, pump, tol);    % ssfm run
    if sim.save, SimLog(sim, pump, fibre, output), end;	% save log: append a file with varied parametres
    
    %% Outputs save and plots
    if sim.matsave, save(strcat(sim.ResultsPath, sim.FileName, 'out', '.mat'), 'sim', 'pump', 'fibre', 'output'), end;	% saves output processable data as .mat file
    handles= GenPlots(sim, fibre, pump, output);    % generates plots

    % Output spectrum save plot
    if sim.graphsave, print(handles.OutSpect,'-depsc2', '-r600', strcat(sim.ResultsPath, sim.FileName, 'sp', '.eps' ) ), end;   % save spectrum as eps

    % save spectra inside fibre
    if (sim.outputs && sim.graphsave), print(handles.InSpect, '-depsc2', '-r600', strcat(sim.ResultsPath, sim.FileName, 'map', '.eps' ) ), end;   % eps

end

end
