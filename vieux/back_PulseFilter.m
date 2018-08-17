function PulseFilter
%PulseFilter Spectrum manual filter and transform
%   1. Reads and plot spectrum
%   1. Manually select filter width
%   2. Span to filter with point 2 width
%   3. Transform
%   4. Saves filtered range and time pulse plot

close all;
clear all;


%% Load run results
[OutFile, ResultsPath]= uigetfile();
% ResultsPath= ('~/documents/Fiber/simulacion/neu/results/');
% [OutFile, ResultsPath]= uigetfile(ResultsPath);

load(strcat(ResultsPath,OutFile ) );
% load(strcat(ResultsPath,OutFile),'-ascii');   % trying to load octave mat

sim.FigShow='on';
SpectHandle= GenPlots(sim, fibre, pump, output);    % plot spectra in screen

% filtered data name
filt.FileName= strcat(OutFile(1:9),'pk001');
qNumber= 3; % qqq sequential numbering
LeadChar= 12;   % place of qqq in FileName

% run opts
% sim.FigShow='off';
sim.save= 1;
sim.sequential= 0;  % single or sequential filtering

%% Manual spectral range selection
% 1. Use 'Zoom' tool to look on required peak
% 2. With 'Data Cursor' tool select filter limits [linux: super+ alt, win: alt only]



%% Manual filter width (Run after point selection)
filt.Range= FiltManualRange(SpectHandle.OutSpect);  % manual wavelength range selection
WidthStartIndex = filt.Range(2);
WidthEndIndex = filt.Range(1);
WidthStartLambda = sim.lambdas(WidthStartIndex );
WidthEndLambda = sim.lambdas(WidthEndIndex );
WidthDeltaLamba= WidthEndLambda- WidthStartLambda;
% curr= sim.lambdas(WidthStartIndex );  % span filtering



%% spectrum span to process
% determines filt span (wavelength)

if sim.sequential, filt.Range= FiltManualRange(SpectHandle.OutSpect), end;  % comment for single not sequential filtering
SpanStartIndex= filt.Range(2);	% ix dec wl increses
SpanEndIndex= filt.Range(1);
SpanStartLambda = sim.lambdas(SpanStartIndex );
SpanEndLambda = sim.lambdas(SpanEndIndex );



%% calc
% estimacion lambda menor
RunStartLambda= WidthStartLambda- ceil((WidthStartLambda- SpanStartLambda)/ WidthDeltaLamba )* WidthDeltaLamba;
[RunStartDiff,RunStartIndex]= min(abs(bsxfun(@minus,sim.lambdas,RunStartLambda.'))); % RunStartDiff= pifie
% puede que no funcione, volver luego

RunEndLambda= WidthEndLambda+ ceil((SpanEndLambda- WidthEndLambda)/ WidthDeltaLamba )* WidthDeltaLamba;
[RunEndDiff,RunEndIndex]= min(abs(bsxfun(@minus,sim.lambdas,RunEndLambda.')));

curr= sim.lambdas(RunStartIndex);


%%%%%%%  span region on half filter width steps, if not single window
% while curr+ WidthDeltaLamba< RunEndLambda
%%%%%%%



    %% main seq
% for curr= RunStartLambda: WidthDeltaLamba: filtend   % spans by full width steps
% for curr= filtstart: filtwidth/2: filtend   % spans by half width steps
    
    % name update
    cuis= expFileNameNext(filt.FileName, ResultsPath, qNumber, LeadChar); % if 001 is present next qqq
    filt.FileName= cuis;
    
    % Square filter
    [Diff,currIndex]=min(abs(bsxfun(@minus,sim.lambdas,curr.')));   % lambda inferior mas proximo
    filt.Range(2)= currIndex;   % indice de dato en longitud de onda menor mas proximo
    [Diff,currIndex]=min(abs(bsxfun(@minus,sim.lambdas,(curr+ WidthDeltaLamba).')));    % lambda superior mas proximo
    filt.Range(1)= currIndex;   % indice de dato en longitud de onda menor mas proximo
    [filt, pulse ]= FiltSquare(sim, filt, output );

    % limite por transformada
    c = 299792.458;                         % [nm/ps] speed of light
    LambdaMenorTransf= sim.lambdas(filt.Range(2) );
    LambdaMayorTransf= sim.lambdas(filt.Range(1) );
    filt.DTtransf= 0.44* LambdaMayorTransf* LambdaMenorTransf/ (c* (LambdaMayorTransf- LambdaMenorTransf) ); % [ps]
    
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
    if sim.save, FiltLog(ResultsPath, filt, pulse), end;

    % 
    
    % filtered pulse in time plot
    pulse.Tfwhm= PeakFWHM( sim.t, pulse.time );
    TimeHandle= FiltPlot(sim, filt, pulse);	% WARN: CAMBIAR HANDLE PORQUE LIMITES ESPECTRO EN ESTE GRAFICO

    % INCLUIR medida Dt fwhm y comparacion con limite por transformadaDeltaTTransf
    % ALGO RARO HAY PUES OBTENGO PULSOS DE ANCHO MENOR
    if sim.save, print(TimeHandle,'-depsc', '-r600', strcat(ResultsPath, filt.FileName, 'tm', '.eps') ), end;   % save peak in time

    %% ends main seq
    if sim.sequential, curr= curr+ 0.5* WidthDeltaLamba, end;
% end

end
