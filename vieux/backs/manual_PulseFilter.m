function PulseFilter

close all;
clear all;


%% Load run results
ResultsPath= ('~/documents/Fiber/simulacion/neu/results/');
[OutFile, ResultsPath]= uigetfile(ResultsPath);
load(strcat(ResultsPath,OutFile ) );
% load(strcat(ResultsPath,OutFile),'-ascii');   % trying to load octave mat

sim.FigShow='on';
SpectHandle= GenPlots(sim, fibre, pump, output);    % plot spectra in screen

% filtered data name
filt.FileName= strcat(OutFile(1:8),'pk01');
LeadChar= 11;

% run opts
% sim.FigShow='off';
sim.save= 0;


%% Manual filtering
% % filt.Range= FiltManualRange(SpectHandle.OutSpect);  % manual wavelength range selection

%% sequential filtering

% filtwidth must be based on wavelength width, not index

% something that looks for index with nearest wavelength



% based on the wrong assumption that wavelength are equaly spaced

% determine filt width (indices not wavelength)
filt.Range= FiltManualRange(SpectHandle.OutSpect);
widthstart= filt.Range(1);
widthend= filt.Range(2);
filtwidth= widthend- widthstart;

% determines filt span (indices not wavelength)
filt.Range= FiltManualRange(SpectHandle.OutSpect);
spanstart= filt.Range(1);
spanend= filt.Range(2);
% SpectZoomHandle= zoom(SpectHandle);

filtstart= widthstart- ceil((widthstart- spanstart)/ filtwidth )* filtwidth;
filtend= widthend+ ceil((spanend- widthend)/ filtwidth )* filtwidth;

% spans by half width steps
for curr= filtstart: filtwidth/2: filtend
    % filter limits
    filt.Range(1)= curr;
    filt.Range(2)= curr+ filtwidth;
    
    %% manual filtering works from here
    
    % name update
    filt.FileName= FileNameNext(ResultsPath, filt.FileName, LeadChar); % if 01 is present next qq
    
    % Square filter
    [filt, pulse ]= FiltSquare(sim, filt, output );

    % filter vertical line marking filter position
    yL = get(gca,'YLim');
    LlineHand= line([sim.lambdas(filt.Range(1) ) sim.lambdas(filt.Range(1) )],yL,'Color','r');
    RlineHand= line([sim.lambdas(filt.Range(2) ) sim.lambdas(filt.Range(2) )],yL,'Color','r');
    
    % saves spectrum with filter mark
    % zoom out;
    if sim.save, print(SpectHandle.OutSpect,'-depsc', '-r600', strcat(ResultsPath, filt.FileName, 'sp', '.eps') ), end;   % save peak spectrum
    % close(SpectHandle.OutSpect);
    
    % delete filter line marker
    delete (LlineHand, RlineHand);

    % Pulse -> time space
    pulse= FiltToTime(sim, pulse);

    % log
    FiltLog(ResultsPath, filt, pulse);

    % filtered pulse in time plot
    TimeHandle= FiltPlot(sim, filt, pulse);

    if sim.save, print(TimeHandle,'-depsc', '-r600', strcat(ResultsPath, filt.FileName, 'tm', '.eps') ), end;   % save peak in time
end
