function [ sim ] = zentrum( sim, pump, fibre )
%ZENTRUM Runs SSFM of pump in given fibre with parameters sim, generates graphs
%   Detailed explanation goes here

    pump.chirp= pump.chirp* 1E-6;	% [fs^2 -> ps^2]
    pump.Ppeak= pump.Pmean/( pump.tfwhm* 1E-12* pump.rate* pump.ShapeFactor);         % [W]

    % pump central wavelength (pump.lambda)
    % for it= 810:5:850 % [nm]
    %    pump.lambda= it;
    
    %% updates Input
    pump= InputField(sim,pump); % using variated parameters
    % sim.FileName= FileNameNext(sim.ResultsPath, sim.FileName, LeadChar); % if 01 is present next qq
    [sim.FileName, sim.ResultsPath]= expFileNameNext;
% 	disp(['b: ', sim.ResultsPath]);


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
