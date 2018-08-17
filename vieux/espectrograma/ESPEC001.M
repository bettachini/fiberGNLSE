function mesh_spectra = Espectrogram_Interp(u0,dt,fo,nspectra)

c = 299792.458;                             %speed of ligth nm/ps


nt = length(u0);                            % number of sample points
w = 2*pi*[(0:nt/2-1),(-nt/2:-1)]'/(dt*nt);  % angular frequencies
t = -(nt/2)*dt:dt:(nt/2-1)*dt;              %vector temporal (en ps)

% spectra = [];
% lambdaaux = [487:1:1800];
lambdaaux = [1800:-1:487];
spectra2 = zeros(nspectra,length(lambdaaux));
times = zeros(1,nspectra);
lambda = fftshift(2*pi*c./(w + 2*pi*fo));
% lambdaaux = [487:1:1500];

% Performig the SSFM ***********************************************
fprintf(1, '\nConstructing Espectrogram...      ');
points_per_spectra = nt/nspectra;


for ii = 1:1:nspectra,
    ventw = zeros(1,nt);
    ventw((ii-1)*points_per_spectra + 1: 1 :ii*points_per_spectra) = 1; 
    uf = u0.*ventw;
    ufft = fft(uf);
%     spectra(ii,1:1:nt) = fftshift(abs(ufft).^2./(nt^2));
    spectra2(ii,1:1:length(lambdaaux)) = interp1(lambda,fftshift(abs(ufft).^2./(nt^2)),lambdaaux,'spline','extrap');
    times(ii)= t(0.5*points_per_spectra + (ii-1)*points_per_spectra);
end

% noise = 0.0000001;
peak = max(max(abs(spectra2).^2));
noise = peak/100;% W
% noise = noise';
mesh_spectra = 10*log10(1000.*(spectra2 + noise));%/max(max(10*log10(1000.*(spectra2 + noise))));
figure(8005)
mesh(lambdaaux,times,mesh_spectra)
axis([500 1800 -32 32])


