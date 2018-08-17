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
sim.save= 1;



%% Not sequential filtering
% % filt.Range= FiltManualRange(SpectHandle.OutSpect);  % manual wavelength range selection
filt.Range= FiltManualRange(SpectHandle.OutSpect);
WidthEndIndex = filt.Range(1);
WidthStartIndex = filt.Range(2);
WidthStartLambda = sim.lambdas(WidthStartIndex );
WidthEndLambda = sim.lambdas(WidthEndIndex );
WidthDeltaLamba= WidthEndLambda- WidthStartLambda;
curr= sim.lambdas(WidthStartIndex );


%% sequential filtering


%% manual filter width
% determine filt width (wavelength)
filt.Range= FiltManualRange(SpectHandle.OutSpect);
WidthEndIndex = filt.Range(1);
WidthStartIndex = filt.Range(2);
WidthStartLambda = sim.lambdas(WidthStartIndex );
WidthEndLambda = sim.lambdas(WidthEndIndex );
WidthDeltaLamba= WidthEndLambda- WidthStartLambda;


%% spectrum range to process
% determines filt span (wavelength)
filt.Range= FiltManualRange(SpectHandle.OutSpect);
SpanStartIndex= filt.Range(2);	% ix dec wl increses
SpanEndIndex= filt.Range(1);
SpanStartLambda = sim.lambdas(SpanStartIndex );
SpanEndLambda = sim.lambdas(SpanEndIndex );


%% calc
% estimacion lambda menor
RunStartLambda= WidthStartLambda- ceil((WidthStartLambda- SpanStartLambda)/ WidthDeltaLamba )* WidthDeltaLamba;
[RunStartDiff,RunStartIndex]=min(abs(bsxfun(@minus,sim.lambdas,RunStartLambda.'))); % RunStartDiff= pifie
% puede que no funcione, volver luego

RunEndLambda= WidthEndLambda+ ceil((SpanEndLambda- WidthEndLambda)/ WidthDeltaLamba )* WidthDeltaLamba;
[RunEndDiff,RunEndIndex]=min(abs(bsxfun(@minus,sim.lambdas,RunEndLambda.')));


%%%%%%% span region on half filter width steps
curr= sim.lambdas(RunStartIndex);
while curr+ WidthDeltaLamba< RunEndLambda

    %% main seq
% for curr= RunStartLambda: WidthDeltaLamba: filtend   % spans by full width steps
% for curr= filtstart: filtwidth/2: filtend   % spans by half width steps
    
    % name update
    filt.FileName= FileNameNext(ResultsPath, filt.FileName, LeadChar); % if 01 is present next qq
    
    % Square filter
    [Diff,currIndex]=min(abs(bsxfun(@minus,sim.lambdas,curr.')));
    filt.Range(2)= currIndex;
    [Diff,currIndex]=min(abs(bsxfun(@minus,sim.lambdas,(curr+ WidthDeltaLamba).')));
    filt.Range(1)= currIndex;
    [filt, pulse ]= FiltSquare(sim, filt, output );

    % filter vertical line marking filter position
    figure(SpectHandle.OutSpect);
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
    pulse= FiltToTime(sim, pump, pulse);

    % log
    FiltLog(ResultsPath, filt, pulse);

    % filtered pulse in time plot
    TimeHandle= FiltPlot(sim, filt, pulse);	% WARN: CAMBIAR HANDLE PORQUE LIMITES ESPECTRO EN ESTE GRAFICO

    if sim.save, print(TimeHandle,'-depsc', '-r600', strcat(ResultsPath, filt.FileName, 'tm', '.eps') ), end;   % save peak in time

    %% ends main seq
    curr= curr+ 0.5* WidthDeltaLamba;
end
