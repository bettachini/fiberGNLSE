function [u1, distances, out_spect, shapes, nf] =  IP_CQEM_FD_Spectra_Complete(u0,dt,L,dz,alpha,betap,gamma,fox,fo,tol)

% This function solves the Generalized Nonlinear Schrodinger Equation with 
% thwe complete Raman response for pulse propagation in an optical fiber
% using the Interaction Picture Method in combination with the Conserved 
% Quantity Error method for the step-size determination and the frequency 
% domain integration of the nonlinear operator
%
% INPUTS
%
% u0 - starting field amplitude (vector)
% dt - time step
% L - propagation distance
% dz - initial step size
% alpha - power loss coefficient, ie, P=P0*exp(-alpha*z)
% betap - dispersion polynomial coefs, [beta_0 ... beta_m], or beta(w)
% gamma - nonlinearity coefficient
% fox - central frequency of the simulation (THz) [ZDW-> frequency]
% fo - central frequency of the simulation (THz) [ZDW-> frequency for photon loss error]
% tol - relative photon error
%
% OUTPUTS
%
% u1 - field at the output
% distances - fiber positions at which spectrum is updated
% shapes - spectra @distances positions
% nf - number of FFTs performed


%% parametros que puede pasarle el principal
nt = length(u0);                            % number of sample points
w = 2*pi*[(0:nt/2-1),(-nt/2:-1)]'/(dt*nt);  % angular frequencies
% w= fftshift(w);                           % when w_sim is externally provided
t = -(nt/2)*dt:dt:(nt/2-1)*dt;              % vector temporal (en ps)


%% Raman parameters and hr(t)
t1 = 12.2e-3;                 % raman parameter t1 [ps]
t2 = 32e-3;                   % raman parameter t2 [ps]
tb = 96e-3;                   % ps
fc = 0.04;
fb = 0.21;
fa = 1 - fc - fb;
fr = 0.245;                   % fraccion de respuesta retardada Raman
tres = t-t(1);                % time starting in 0

ha =((t1^2+t2^2)/(t1*t2^2)).*exp(-tres/t2).*sin(tres/t1);
hb = ((2*tb - tres)./tb^2).*exp(-tres/tb);
hr = (fa + fc)*ha + fb*hb;   %Raman responce function (ps^-1)

hrw = fft(hr);


%% constructing linear operator
linearoperator = -alpha/2;      % if single figure-> substracted as nt size vector 
if (length(betap) == nt)        % If the user manually specifies beta(w)
    linearoperator = linearoperator - 1i*betap;
    linearoperator = fftshift(linearoperator);
else
    for ii = 0:length(betap)-1;
        linearoperator = linearoperator - 1i*betap(ii+1)*(w').^ii/factorial(ii);
    end
    %     linearoperator = conj(linearoperator');        
end


%% SSFM ***********************************************
fprintf(1, '\nSimulation running...      ');
ufft = fft(u0);
propagedlength = 0;
u1 = u0;
nf = 1;

spectra_saved = 40;
saved_distance = L/spectra_saved;
ns = 1;
shapes(1,1:1:nt) = fftshift(ufft);
distances(1)=0;

while propagedlength < L,
    
    if (dz + propagedlength) > L,
        dz = L - propagedlength;
    end
    
    PhotonN = sum( (abs(ufft).^2)./(w' + 2*pi*fo) );
    
    halfstep = exp(linearoperator*dz/2);
    uip = halfstep.*ufft;

    k1 = -dz*1i*gamma*(1 + w'/(2*pi*fox)).*fft( u1.*((1-fr)*abs(u1).^2) + fr*dt*u1.*ifft(hrw.*fft( abs(u1).^2 )));
    k1 = halfstep.*k1;
    
    uhalf2 = ifft(uip + k1/2);
    k2 = -dz*1i*gamma*(1 + w'/(2*pi*fox)).*fft( uhalf2.*((1-fr)*abs(uhalf2).^2) + fr*dt*uhalf2.*ifft(hrw.*fft( abs(uhalf2).^2 )));
    
    uhalf3 = ifft(uip + k2/2);
    k3 = -dz*1i*gamma*(1 + w'/(2*pi*fox)).*fft( uhalf3.*((1-fr)*abs(uhalf3).^2) + fr*dt*uhalf3.*ifft(hrw.*fft( abs(uhalf3).^2 )));
    
    uhalf4 = ifft(halfstep.*(uip + k3));
    k4 = -dz*1i*gamma*(1 + w'/(2*pi*fox)).*fft( uhalf4.*((1-fr)*abs(uhalf4).^2) + fr*dt*uhalf4.*ifft(hrw.*fft( abs(uhalf4).^2 )));
    
    uaux = halfstep.*(uip + k1./6 + k2./3 + k3./3) + k4./6;    
    
    propagedlength = propagedlength + dz;
    fprintf(1, '\b\b\b\b\b\b%5.2f%%', propagedlength * 100.0 /L );
    
    % set dz for the next step
    error = abs(   sum( (abs(uaux).^2)./(w' + 2*pi*fo)) - PhotonN   ) / PhotonN;
    
    if error > 2 * tol,
        propagedlength = propagedlength - dz;
        dz = dz/2;
        %         ufft = uaux; nf = nf +1;
    else
        if error > tol,
            ufft = uaux;
            dz = dz/(2^0.2);
            if propagedlength > saved_distance * ns,
                shapes(ns + 1,1:1:nt) = fftshift(fft(u1));
                distances(ns + 1) = propagedlength;
                ns = ns + 1;
            end
        else
            if error < 0.1*tol,
                ufft = uaux;
                dz = dz*(2^0.2);
                if propagedlength > saved_distance * ns,
                    shapes(ns + 1,1:1:nt) = fftshift(fft(u1));
                    distances(ns + 1) = propagedlength;
                    ns = ns + 1;
                end
            else
                ufft = uaux;
                if propagedlength > saved_distance * ns,
                    shapes(ns + 1,1:1:nt) = fftshift(fft(u1));
                    distances(ns + 1) = propagedlength;
                    ns = ns + 1;
                end
            end
        end
    end
    u1 = ifft(ufft);
    nf = nf + 16;
end

% output spectra
shapes(ns + 1,1:1:nt) = fftshift(ufft);
out_spect= shapes(ns + 1,1:1:nt);
distances(ns + 1) = L;
distances= distances';