function str1= SpectLabel_oct(fibre, pump, output)

% Label for output spectra for Octave

  str1= strcat('beta: ', fibre.BetaID, "\n");
  str1= strcat(str1, 'gamma: ', fibre.GammaID, ' w^{-1} km^{-1}', "\n");
  str1= strcat(str1, 'alpha= ', num2str(fibre.alpha,'%3.1f'), ' dB/km', "\n");
  str1= strcat(str1, 'ZDW= ', num2str(fibre.zdw,'%3.1f'), ' nm', "\n");
  str1= strcat(str1, 'L= ', num2str(fibre.L*1E3,'%3.2f'), ' m', "\n");
  str1= strcat(str1, 'Pump shape: ', pump.ShapeName, "\n");
  str1= strcat(str1, '\lambda_0= ', num2str(pump.lambda), ' nm', "\n");
  str1= strcat(str1, '\Deltat= ', num2str(pump.tfwhm* 1e3), ' fs (FWHM)', "\n");
  str1= strcat(str1, 'chirp= ', num2str(pump.chirp* 1e6, '%3.1f'), ' fs^2', "\n");
  str1= strcat(str1, 'P peak= ', num2str(pump.Ppeak,'%3.1f'), ' W', "\n");
  str1= strcat(str1, 'P mean teor= ', num2str(pump.Pmean *1E3, '%3.1f'), ' mW', "\n");
  str1= strcat(str1, 'P mean sim= ', num2str(pump.InPower *1E3, '%3.1f'), ' mW', "\n");
  str1= strcat(str1, 'out P mean= ', num2str(output.OutPower *1E3, '%3.1f'), ' mW', "\n");
