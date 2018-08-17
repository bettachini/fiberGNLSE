function PulseFilter
%PulseFilter Spectrum manual filter and transform
%   1. Reads and plot spectrum
%   1. Manually select filter width
%   2. Span to filter with point 2 width
%   3. Transform
%   4. Saves filtered range and time pulse plot

% function [idx, closest]= nearest(vector, value)
% 	tmp = abs(vector- value)
% 	[idx idx] = min(tmp) %index of closest value
% 	closest = vector(idx) %closest value
% end

close all;
clear all;
%% Load run results
[OutFile, ResultsPath]= uigetfile();
load(strcat(ResultsPath, OutFile ) );
% ResultsPath= ('~/documents/Fiber/simulacion/neu/results/');
% [OutFile, ResultsPath]= uigetfile(ResultsPath);
% load(strcat(ResultsPath,OutFile),'-ascii');   % trying to load octave mat

% run opts	% after loading .mat as it overwrites sim structure
sim.FigShow='on';
sim.save= 1;
sim.sequential= 0;  % single or sequential filtering
sim.MouseRange= 0;

SpectHandle= GenPlots(sim, fibre, pump, output);    % plot spectra in screen

% filtered data name and path
filt.FileName= strcat(OutFile(1:9),'pk001');
qNumber= 3; % qqq sequential numbering
LeadChar= 12;   % place of qqq in FileName
AnalysisPath= [ResultsPath '/analysis/'];
if ~exist(AnalysisPath), system(['mkdir ' AnalysisPath]), end; 

%% Filter width [Matlab]
if sim.MouseRange
	keyboard('Ancho del filtro\nAjuste el zoom y escriba "return" para continuar\nLuego seleccione límites y presione"return"\n\n')    
	% Choisir manuellement le range!
	x= ginput;  % after pointing two press 'return'
	x= sort(x);
	[diff, filt.StartIndex]= min(abs(bsxfun(@minus,sim.lambdas,x(1).')));
	filt.StartLambda= sim.lambdas(filt.StartIndex);
	[diff, filt.EndIndex]= min(abs(bsxfun(@minus,sim.lambdas,x(2).')));
	filt.EndLambda= sim.lambdas(filt.EndIndex);
%{
    % Mouse input (Run after point selection) [Matlab]
	% 1. Use 'Zoom' tool to look on required peak
	% 2. With 'Data Cursor' tool select filter limits [linux: super+ alt, win: alt only]
    filt.idx= FiltManualRange(SpectHandle.OutSpect);  % manual wavelength range selection 
    WidthStartIndex = filt.idx(2);
    WidthEndIndex = filt.idx(1);
    WidthStartLambda = sim.lambdas(WidthStartIndex );
    WidthEndLambda = sim.lambdas(WidthEndIndex );
%}
	filt.width= filt.EndLambda- filt.StartLambda;
	
else
    WidthStartLambda= 715; %[nm]
    WidthEndLambda= 727; %[nm]
	filt.width= WidthEndLambda- WidthStartLambda;
	filt.StartLambda= WidthStartLambda;
	filt.EndLambda= WidthEndLambda;
end



%% spectrum span to process
% determines filt span (wavelength)

if sim.sequential
    if sim.MouseRange
		keyboard('Rango de barrido\nAjuste el zoom y escriba "return" para continuar\nLuego seleccione límites y presione"return"\n\n')    
	    % Choisir manuellement le range!
		x2= ginput;  % after pointing two press 'return'
		x2= sort(x2);
	    [diff, span.StartIndex]= min(abs(bsxfun(@minus,sim.lambdas,x2(1).')));
		span.StartLambda= sim.lambdas(span.StartIndex);
		[diff, span.EndIndex]= min(abs(bsxfun(@minus,sim.lambdas,x2(2).')));
		span.EndLambda= sim.lambdas(span.EndIndex);
		cuiq= span.StartLambda;
		cuaq= span.EndLambda;
    else
        cuiq= 615; % [nm]
        cuaq= 645; % [nm]
    end
	span.StartLambda= cuiq;
	span.EndLambda= cuaq;
else
	span.StartLambda= filt.StartLambda;
	span.EndLambda= filt.EndLambda;
end


%% main seq
FiltCentre= [];
PulsesMatrix= [];
TimeMatrix= [];

for curr= span.StartLambda : filt.width/2 : span.EndLambda   % spans by half filter width steps
	% name update
	cuis= expFileNameNext(filt.FileName, AnalysisPath, qNumber, LeadChar); % if 001 is present next qqq
	filt.FileName= cuis;
	
	% Square filter
	[Diff,currIndex]=min(abs(bsxfun(@minus,sim.lambdas,curr.')));   % lambda inferior mas proximo
	filt.Range(2)= currIndex;   % indice de dato en longitud de onda menor mas proximo
	[Diff,currIndex]=min(abs(bsxfun(@minus,sim.lambdas,(curr+ filt.width).')));    % lambda superior mas proximo
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
	% LlineHand= line([sim.lambdas(filt.idx(1) ) sim.lambdas(filt.idx(1) )],yL,'Color','r');
	RlineHand= line([sim.lambdas(filt.Range(2) ) sim.lambdas(filt.Range(2) )],yL,'Color','r');
	% RlineHand= line([sim.lambdas(filt.idx(2) ) sim.lambdas(filt.idx(2) )],yL,'Color','r');
    
    % saves spectrum with filter mark
    % zoom out;
    if sim.save, print(SpectHandle.OutSpect,'-depsc', '-r600', strcat(AnalysisPath, filt.FileName, 'sp', '.eps') );, end;   % saves peak spectrum
    % delete filter line marker
	if sim.sequential
		delete (LlineHand);
		delete (RlineHand);
	end

% close(SpectHandle.OutSpect);
    
    % Pulse -> time space
    pulse= FiltToTime(sim, pump, pulse);
    PulsesMatrix= [PulsesMatrix; pulse.time];
	TimeMatrix= [TimeMatrix; sim.t];
    FiltCentre= [ FiltCentre; curr* ones(sim.nt,1)'];

    % log
    if sim.save, FiltLog(AnalysisPath, filt, pulse), end;
    
    % filtered pulse in time plot
    pulse.Tfwhm= PeakFWHM( sim.t, pulse.time );
    TimeHandle= FiltPlot(sim, filt, pulse);	% WARN: CAMBIAR HANDLE PORQUE LIMITES ESPECTRO EN ESTE GRAFICO

    % INCLUIR medida Dt fwhm y comparacion con limite por transformadaDeltaTTransf
    % ALGO RARO HAY PUES OBTENGO PULSOS DE ANCHO MENOR
    if sim.save, print(TimeHandle,'-depsc', '-r600', strcat(AnalysisPath, filt.FileName, 'tm', '.eps') );, end;   % saves peak in time

    %% ends main seq
    % if sim.sequential, curr= curr+ 0.5* filt.width, end;

	if ~sim.sequential, break, end;	% avoids loop for single filtering
end

%% plot3 compatible output
EnsHandle= figure(331);
scrsz = get(0,'ScreenSize');
set(EnsHandle, 'OuterPosition', [1 scrsz(2) scrsz(3) scrsz(4)]);
for i=1: size(PulsesMatrix, 1), aux_t(i,:)= sim.t;, end 
plot3(aux_t', FiltCentre', PulsesMatrix');
grid on;
title(['run:' filt.FileName(1:9) ' / filter \Delta\lambda ' num2str(filt.width) 'nm'],'FontSize',18,'FontName','Times')
xlabel('\tau [ps]','FontSize',18,'FontName','Times');
ylabel('Filter central \lambda [nm]','FontSize',18,'FontName','Times');
zlabel ('Power [w]','FontSize',18,'FontName','Times');
if sim.save, print(EnsHandle,'-depsc', '-r600', strcat(AnalysisPath, filt.FileName, 'all', '.eps') ), end;   % save peak in time


end
