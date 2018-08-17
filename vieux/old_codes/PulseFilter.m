function PulseFilter

% seleccionar con cursor multiples puntos
% linux: win +alt
% win: solo alt
HandCursor = datacursormode(662);
cursor = getCursorInfo(HandCursor);
FiltRange= [cursor(1).DataIndex cursor(2).DataIndex];

print(662,'-depsc', '-r600', strcat(img_name, 'fl', '.eps' ) );   % save spectrum as eps with chosen cursors

% corte
FiltSpectra= zeros(size(w_sim,2),1)';
if (cursor(1).DataIndex> cursor(2).DataIndex)
    FiltSpectra(FiltRange(2):FiltRange(1) )= out_spect(FiltRange(2):FiltRange(1));
else
    FiltSpectra(FiltRange(1):FiltRange(2) )= out_spect(FiltRange(1):FiltRange(2));
end

%{
FiltSpectra= out_spect(FiltRange(2):FiltRange(1));
if isempty(FiltSpectra)
    FiltSpectra= out_spect(FiltRange(1):FiltRange(2));
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
siz_FiltSpectra= abs( FiltRange(2)- FiltRange(1) );
n2p= nextpow2(siz_FiltSpectra);
FreqFiltSpectra= [FiltSpectra zeros(2^6- siz_FiltSpectra- 1,1)];

% establecer frecuencias para que IFFT sea correcta
nt_vis = length(u0);                            % number of sample points
w_vis = 2*pi*[(0:nt_vis/2-1),(-nt_vis/2:-1)]'/(dt*nt_vis);  % angular frequencies
t_vis = -(nt_vis/2)*dt:dt:(nt_vis/2-1)*dt;              % vector temporal (en ps)
%}

%% Transformacion a tiempo

% IFFT
TimeVis= ifft(FiltSpectra);                  % normalizacion + fase -
% TimeVis= ifft(FreqFiltSpectra);                  % normalizacion + fase -
% TimeVis= fftshift(TimeVis);
TimeVis= TimeVis.* conj(TimeVis);           % -> power [w]

% pulseduration_fwhm [ps], power_peak [?]
pulse_lamba= 0.5*( sim.lambdas(cursor(1).DataIndex) + sim.lambdas(cursor(2).DataIndex) );

[power_peak, max_pos]= max(TimeVis);
val=0;
i= size(TimeVis,2);
while (val< (power_peak/2))
    i= i-1;
    val=(TimeVis(i));
end
pulseduration_fwhm= sim.t(i);
val=0;
i=1;
while (val< (power_peak/2))
    i= i+1;
    val=(TimeVis(i));
end
pulseduration_fwhm= pulseduration_fwhm- sim.t(i);


% plots pulse from inverse transformed filtered spectrum
figure(33);
plot(sim.t, TimeVis, 'r.');
% plot(t_vis, TimeVis, 'r.');
grid on;
xlabel('\tau [ps]','FontSize',18,'FontName','Times');
ylabel ('Power [w]','FontSize',18,'FontName','Times');

str2(1)= strcat({'\sim.lambdas= '}, num2str(pulse_lamba, '%3.1f'), ' nm');
str2(2)= strcat({'\Deltat= '}, num2str(pulseduration_fwhm*1E3, '%3.1f'), ' fs  (FWHM)');
y_pos= ylim;
text_y_pos= 0.7* y_pos(2);
x_pos= xlim;
text_x_pos= 0.7* y_pos(1) + 0.3* x_pos(2);
txt_spr_hnld= text(text_x_pos, text_y_pos, str2);

print(33,'-depsc', '-r600', strcat(img_name, 'ps', '.eps' ) );   % eps pulse duration






%%         SAVE RESULTS
% eval(['save ' 'APE_n16_A' num2str(100*A) 'Chirp' num2str(10*chirp) ' u'])
% save ape2 u
% save 'S_att.mat';