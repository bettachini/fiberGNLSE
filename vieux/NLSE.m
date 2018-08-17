function output= NLSE(sim, fibre, pump, tol)

% This function solves the Generalized Nonlinear Schrodinger Equation with 
% thwe complete Raman response for pulse propagation in an optical fiber
% using the Interaction Picture Method in combination with the Conserved 
% Quantity Error method for the step-size determination and the frequency 
% domain integration of the nonlinear operator

% IP_CQEM_FD


% INPUTS
% pump.u0 - starting field amplitude (vector)
% sim.dt - time step
% fibre.L - propagation distance
% sim.dz - initial step size
% fibre.alpha - power loss coefficient, ie, P=P0*exp(-fibre.alpha*z)
% fibre.betap - dispersion polynomial coefs, [beta_0 ... beta_m], or beta(w)
% fibre.gamma - nonlinearity coefficient
% sim.wzdw - central frequency of the simulation (THz) [ZDW-> frequency]
% tol - relative photon error
% sim.outputs - 2: saves time intermediate steps


% OUTPUTS
% OutTime - field at the output
% OutSpect - sepctra at output
% distances - fiber positions at which spectrum is updated
% shapes - spectra @distances positions
% nf - number of FFTs performed


%% parametros que puede pasarle el principal
w= fftshift(sim.ws);


%% Raman parameters and hr(sim.t)
t1 = 12.2e-3;                 % raman parameter t1 [ps]
t2 = 32e-3;                   % raman parameter t2 [ps]
tb = 96e-3;                   % ps
fc = 0.04;
fb = 0.21;
fa = 1 - fc - fb;
fr = 0.245;                   % fraccion de respuesta retardada Raman
tres = sim.t- sim.t(1);                % time starting in 0

ha =((t1^2+t2^2)/(t1*t2^2)).*exp(-tres/t2).*sin(tres/t1);
hb = ((2*tb - tres)./tb^2).*exp(-tres/tb);
hr = (fa + fc)*ha + fb*hb;   %Raman responce function (ps^-1)

hrw = fft(hr);


%% constructing linear operator
linearoperator = -fibre.alpha/2;      % if single figure-> substracted as nt size vector 
if (length(fibre.betap) == sim.nt)        % If the user manually specifies beta(w)
    linearoperator = linearoperator - 1i*fibre.betap;
    linearoperator = fftshift(linearoperator);
else
    for ii = 0:length(fibre.betap)-1;
        linearoperator = linearoperator + 1i^(ii+1)* fibre.betap(ii)*(w).^ii/factorial(ii);
            % -fibre.alpha/2+ 1i beta_0- beta1 w- 1i* beta2* w^2/2+ beta3* w^3/3!+
            % 1i* beta_4* w^4/4!- beta_5* w^5/5!
    end
end


%% SSFM ***********************************************
% simulation progress shown in cli
more off;
progress= 0;
fprintf(1, '\n%s  ...  %%\n',sim.FileName)

ufft = fft(pump.u0);
propagedlength = 0;
OutTime = pump.u0;
nf = 1;

spectra_saved = 40;
saved_distance = fibre.L/spectra_saved;
ns = 1;
if (sim.outputs==1)
    shapes(1,1:1:sim.nt) = fftshift(ufft);
end
if (sim.outputs==2)
    shapes(1,1:1:sim.nt) = fftshift(ufft);
    shapes_time(1,1:1:sim.nt) = ufft;
end
distances(1)=0;

while propagedlength < fibre.L,
    
    if (sim.dz + propagedlength) > fibre.L,
        sim.dz = fibre.L - propagedlength;
    end
    
%    PhotonN = sum( (abs(ufft).^2)./(w + sim.wcent) );
    PhotonN = sum( (abs(ufft).^2)./ w);
    
    halfstep = exp(linearoperator*sim.dz/2);    % so -1i is included
    uip = halfstep.*ufft;

    k1 = -sim.dz*1i*fibre.gamma*(1 + w/sim.wcent).*fft( OutTime.*((1-fr)*abs(OutTime).^2) + fr*sim.dt*OutTime.*ifft(hrw.*fft( abs(OutTime).^2 )));
    k1 = halfstep.*k1;
    
    uhalf2 = ifft(uip + k1/2);
    k2 = -sim.dz*1i*fibre.gamma*(1 + w/sim.wcent).*fft( uhalf2.*((1-fr)*abs(uhalf2).^2) + fr*sim.dt*uhalf2.*ifft(hrw.*fft( abs(uhalf2).^2 )));
    
    uhalf3 = ifft(uip + k2/2);
    k3 = -sim.dz*1i*fibre.gamma*(1 + w/sim.wcent).*fft( uhalf3.*((1-fr)*abs(uhalf3).^2) + fr*sim.dt*uhalf3.*ifft(hrw.*fft( abs(uhalf3).^2 )));
    
    uhalf4 = ifft(halfstep.*(uip + k3));
    k4 = -sim.dz*1i*fibre.gamma*(1 + w/sim.wcent).*fft( uhalf4.*((1-fr)*abs(uhalf4).^2) + fr*sim.dt*uhalf4.*ifft(hrw.*fft( abs(uhalf4).^2 )));
    
    uaux = halfstep.*(uip + k1./6 + k2./3 + k3./3) + k4./6;    
    
    propagedlength = propagedlength + sim.dz;
    
    % display fibre length progress
    progress_part= round(propagedlength * 100.0 /fibre.L);
    if progress ~= progress_part
	progress= progress_part;
    	fprintf(1, '\b\b\b\b\b%3i %%', progress);
    	% fprintf(1, '\b\b\b\b\b\b%5.2f%%', propagedlength * 100.0 /fibre.L );
    end

    % set sim.dz for the next step
%    error = abs(   sum( (abs(uaux).^2)./(w + sim.wcent)) - PhotonN   ) / PhotonN;
    error = abs(   sum( (abs(uaux).^2)./w )- PhotonN )/ PhotonN;
    
    if error > 2 * tol,
        propagedlength = propagedlength - sim.dz;
        sim.dz = sim.dz/2;
        %         ufft = uaux; nf = nf +1;
    else
        if error > tol,
            ufft = uaux;
            sim.dz = sim.dz/(2^0.2);
            if propagedlength > saved_distance * ns,
                if (sim.outputs==1)
                    shapes(ns + 1,1:1:sim.nt) = fftshift(fft(OutTime));
                    distances(ns + 1) = propagedlength;
                end
                if (sim.outputs==2)
                    shapes(ns + 1,1:1:sim.nt) = fftshift(fft(OutTime));
                    shapes_time(ns + 1,1:1:sim.nt) = OutTime;
                    distances(ns + 1) = propagedlength;
                end
                ns = ns + 1;
            end
        else
            if error < 0.1*tol,
                ufft = uaux;
                sim.dz = sim.dz*(2^0.2);
                if propagedlength > saved_distance * ns,
                    if (sim.outputs==1)
                        shapes(ns + 1,1:1:sim.nt) = fftshift(fft(OutTime));
						distances(ns + 1) = propagedlength;
                    end
                    if (sim.outputs==2)
                        shapes(ns + 1,1:1:sim.nt) = fftshift(fft(OutTime));
                        shapes_time(ns + 1,1:1:sim.nt) = OutTime;
                        distances(ns + 1) = propagedlength;
                    end
					ns = ns + 1;
                end
            else
                ufft = uaux;
                if propagedlength > saved_distance * ns,
                    if (sim.outputs==1)
                        shapes(ns + 1,1:1:sim.nt) = fftshift(fft(OutTime));
						distances(ns + 1) = propagedlength;
                    end
                    if (sim.outputs==2)
                        shapes(ns + 1,1:1:sim.nt) = fftshift(fft(OutTime));
                        shapes_time(ns + 1,1:1:sim.nt) = OutTime;
                        distances(ns + 1) = propagedlength;
                    end
                	ns = ns + 1;
                end
            end
        end
    end
    OutTime = ifft(ufft);            % in time
    nf = nf + 16;
end
fprintf(1, '\nRun complete.\n\n');

%% output mean power (vera)
OutPower= pump.rate* (sim.dt* 1E-12)* sum(OutTime.* conj(OutTime) );  % [W]


%% output spectra
switch sim.outputs
    case 0, % out spectrum
      	OutSpect= fftshift(ufft);
        shapes=0;
        distances= 0;
        shapes_time= 0;
    case 1, % out and inside spectra
        OutSpect= fftshift(ufft);
        shapes(ns + 1,1:1:sim.nt) = fftshift(ufft);
        distances(ns + 1) = fibre.L;
        distances= distances';
        shapes_time= 1;
    case 2, % out and inside spectra + temporal inside... 
        OutSpect= shapes(ns + 1,1:1:sim.nt);
        shapes(ns + 1,1:1:sim.nt) = fftshift(ufft);
        distances(ns + 1) = fibre.L;
        distances= distances';
        shapes_time(ns + 1,1:1:sim.nt) = OutTime;
end

output= struct('OutSpect', OutSpect, 'OutTime', OutTime, 'spectral', shapes, 'temporal', shapes_time, 'OutPower', OutPower, 'distances', distances, 'nf', nf);
