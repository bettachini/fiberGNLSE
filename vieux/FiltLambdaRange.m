function [Range, filt]= FiltLambdaRange(sim, filt, PlotHandle)

% 1. Use 'Zoom' tool to look on required peak
% 2. With 'Data Cursor' tool select filter limits [linux: win+ alt, win: alt only]
HandCursor = datacursormode(PlotHandle );
cursor = getCursorInfo(HandCursor );
delete(findall(gcf, 'Type', 'hggroup' ) );  % removes cursor from screen

% orders lambdas
if cursor(2).DataIndex< cursor(1).DataIndex, 
    Range= [cursor(2).DataIndex cursor(1).DataIndex ];
else
    Range= [cursor(1).DataIndex cursor(2).DataIndex ];
end