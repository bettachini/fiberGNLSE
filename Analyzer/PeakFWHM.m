function [ PeakFWHM ] = PeakFWHM( PeakDataX, PeakDataY )
%PeakFWHM FWHM of peak x,y data set
%   Assumes peak has the maximum in PeakDataY


% pulse.Tfwhm [ps], pulse.Ppeak [?]
Ppeak= max(PeakDataY);

val=0;
i= size(PeakDataY,2);
while (val< (Ppeak/2))
    i= i-1;
    val=(PeakDataY(i));
end
Freqfwhm= PeakDataX(i);
val=0;
i=1;
while (val< (Ppeak/2))
    i= i+1;
    val=(PeakDataY(i));
end

PeakFWHM= Freqfwhm- PeakDataX(i);
end