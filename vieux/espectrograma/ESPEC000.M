function mesh_spectra = Espectrogram_Interp(u0,dt,fo,nspectra)

c = 299792.458;                             %speed of ligth nm/ps


nt = length(u0);                            % number of sample points
w = 2*pi*[(0:nt/2-1),(-nt/2:-1)]'/(dt*nt);  % angular frequencies
t = -(nt/2)*dt:dt:(nt/2-1)*dt;              %vector temporal (en ps)

spectra = [];
spectra2 = [];
times = [];
lambda = fftshift(2*pi*c./(w + 2*pi*fo));
lambdaaux = [487:1:1200];

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
noise = peak/10000;% W
% noise = noise';
mesh_spectra = 10*log10(1000.*(spectra2 + noise))/max(max(10*log10(1000.*(spectra2 + noise))));
% figure(1)
% axis([600 1100 -10 10]);
% axis tight;
% grid;
% set(gca,'XTick',-10:20:150);
% set(gca,'nextplot','replacechildren');
figure(9)
% set(gca,'XTick',487:1:1200);
axis([500 1250 min(min(mesh_spectra)) max(max(mesh_spectra))])
for ii = 1:1:nspectra,
    plot(lambdaaux,mesh_spectra(ii,1:1:length(lambdaaux)));
    axis([500 1250 min(min(mesh_spectra)) max(max(mesh_spectra))])
    F(ii) = getframe;
end
% figure(11)
movie(F);
% figure(8001)
% mesh(lambdaaux,times,mesh_spectra)
% axis([400 2500 -20 20])


