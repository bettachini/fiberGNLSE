function pulse= FiltToTime(sim, pump, pulse)

% IFFT
pulse.time= ifft(pulse.spectrum);                  % normalizacion + fase -
if (exist('OCTAVE_VERSION') ~= 0), pulse.time=fftshift(pulse.time);, end;

% pulse.time= fftshift(pulse.time);
pulse.time= pulse.time.* conj(pulse.time);           % -> power [w]

% pulse.Tfwhm [ps], pulse.Ppeak [?]
[pulse.Ppeak, max_pos]= max(pulse.time);

val=0;
i= size(pulse.time,2);
while (val< (pulse.Ppeak/2))
    i= i-1;
    val=(pulse.time(i));
end
pulse.Tfwhm= sim.t(i);
val=0;
i=1;
while (val< (pulse.Ppeak/2))
    i= i+1;
    val=(pulse.time(i));
end
pulse.Tfwhm= pulse.Tfwhm- sim.t(i);

pulse_ShapeFactor= 0.9; % gaussian
pulse.Pmean= pulse.Ppeak*( pulse.Tfwhm* 1E-12* pump.rate* pulse_ShapeFactor);         % [W]
