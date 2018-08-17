function [filt, pulse ]= FiltSquare(sim, filt, output )
%FiltSquare Crops output between filt.Range
%   Detailed explanation goes here

pulse.spectrum= zeros(size(sim.ws, 2 ), 1 )';
pulse.spectrum(filt.Range(1): filt.Range(2) )= output.OutSpect(filt.Range(1): filt.Range(2) );
filt.Lambda= 0.5*(sim.lambdas(filt.Range(1) )+ sim.lambdas( filt.Range(2) ) );
filt.DeltaLambda= sim.lambdas(filt.Range(1) )- sim.lambdas( filt.Range(2) );


%{
pulse.spectrum= out_spect(filt.Range(2):filt.Range(1));
if isempty(pulse.spectrum)
    pulse.spectrum= out_spect(filt.Range(1):filt.Range(2));
end
%}

%{
% http://undocumentedmatlab.com/blog/undocumented-cursorbar-object 
hCursorbar = graphics.cursorbar(662); drawnow
hCursorbar.CursorLineColor = [.9,.3,.6]; % default=[0,0,0]='k'
hCursorbar.CursorLineStyle = '-.';       % default='-'
hCursorbar.CursorLineWidth = 2.5;        % default=1
hCursorbar.Orientation = 'vertical';     % =default
hCursorbar.TargetMarkerSize = 12;        % default=8
hCursorbar.TargetMarkerStyle = 'o';      % default='s' (square)
%}

%{
% copiar en vector de 2^n
siz_FiltSpectra= abs( filt.Range(2)- filt.Range(1) );
n2p= nextpow2(siz_FiltSpectra);
FreqFiltSpectra= [pulse.spectrum zeros(2^6- siz_FiltSpectra- 1,1)];

% establecer frecuencias para que IFFT sea correcta
nt_vis = length(u0);                            % number of sample points
w_vis = 2*pi*[(0:nt_vis/2-1),(-nt_vis/2:-1)]'/(dt*nt_vis);  % angular frequencies
t_vis = -(nt_vis/2)*dt:dt:(nt_vis/2-1)*dt;              % vector temporal (en ps)
%}

end

