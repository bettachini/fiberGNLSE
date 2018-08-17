function mesh_spectra = Espectrogram(u0,dt,fo,nspectra)

c = 299792.458;                             %speed of ligth nm/ps


nt = length(u0);                            % number of sample points
w = 2*pi*[(0:nt/2-1),(-nt/2:-1)]'/(dt*nt);  % angular frequencies
t = -(nt/2)*dt:dt:(nt/2-1)*dt;              %vector temporal (en ps)

spectra = [];
times = [];
lambda = fftshift(2*pi*c./(w + 2*pi*fo));

% Performig the SSFM ***********************************************
fprintf(1, '\nConstructing Espectrogram...      ');
points_per_spectra = nt/nspectra;


for ii = 1:1:nspectra,
    ventw = zeros(1,nt);
    ventw((ii-1)*points_per_spectra + 1: 1 :ii*points_per_spectra) = 1; 
    uf = u0.*ventw;
    ufft = fft(uf);
    spectra(ii,1:1:nt) = fftshift(abs(ufft).^2./(nt^2));
    times(ii)= t(0.5*points_per_spectra + (ii-1)*points_per_spectra);
end

noise = max(max(abs(spectra).^2))/10000;% W
mesh_spectra = 10*log10(1000*(spectra + noise));
figure(8000)
mesh(lambda,times,mesh_spectra)
axis([500 1300 -5 5])


