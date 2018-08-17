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

% debuggin help
sim.outputs= 1; % saves spectra inside fibre (0 default)
sim.FigShow= 'on';      % display generated figures (off default)
sim.save= 0;	% do not save output to .mat file nor plots (1 default)


%% Results FileName initialisation and path
date_str= datestr(now,20);
sim.FileName= strcat( date_str(7:8), date_str(4:5), date_str(1:2), '001');    %% yymmddqq (7 LeadChar)
LeadChar= 7;   % qq position in FileName string

% sim.ResultsPath= ('~/documents/Fiber/simulacion/results/');
sim.ResultsPath= ('~/Dropbox/Documentos/fibre/simulacion/results/');
% sim.ResultsPath= ('C:\vab\codes');   % windoze


%% kernal
% parameter variations go here

% pump power iteration [InputField REQUIRES Ppeak]
% %{
it.start=  1E-3;
it.step= 10E-4;
it.stop= 15E-3; % if =it.start -> single step regardless of step
for it= it.start:it.step:it.stop % [W]
    pump.Pmean= it;
% %}


	% pump.Pmean= 3E-3;  % [W] test value
    pump.Ppeak= pump.Pmean/( pump.tfwhm* 1E-12* pump.rate* pump.ShapeFactor);         % [W]

    % pump central wavelength (pump.lambda)
    % for it= 810:5:850 % [nm]
    %    pump.lambda= it;
    
    %% updates Input
    pump= InputField(sim,pump); % using variated parameters
    sim.FileName= FileNameNext(sim.ResultsPath, sim.FileName, LeadChar); % if 01 is present next qq

    %% NLSE run
%     tol= 1e-8;	% tolerance
    tol= 1e-3;	% tolerance
    output= NLSE(sim, fibre, pump, tol);    % ssfm run
    if sim.save, SimLog(sim, pump, fibre, output), end;	% save log: append a file with varied parametres
    
    %% Outputs save and plots
    if sim.save, save(strcat(sim.ResultsPath, sim.FileName, 'out', '.mat'), 'sim', 'pump', 'fibre', 'output'), end;	% saves output processable data as .mat file
    handles= GenPlots(sim, fibre, pump, output);    % generates plots

    % Output spectrum save plot
    if sim.save, print(handles.OutSpect,'-depsc2', '-r600', strcat(sim.ResultsPath, sim.FileName, 'sp', '.eps' ) ), end;   % save spectrum as eps

    % save spectra inside fibre
    if (sim.outputs && sim.save), print(handles.InSpect, '-depsc2', '-r600', strcat(sim.ResultsPath, sim.FileName, 'map', '.eps' ) ), end;   % eps

end
