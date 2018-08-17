function str1= SpectLabel_mat(fibre,pump, output)

% Label for output spectra for Matlab

  str1(1)= strcat({'beta: '}, fibre.BetaID);
  str1(2)= strcat({'gamma: '}, fibre.GammaID, ' W^{-1} km^{-1}');
  str1(3)= strcat({'alpha= '}, num2str(fibre.alpha,'%3.1f'), ' dB/km');
  str1(4)= strcat({'ZDW= '}, num2str(fibre.zdw,'%3.1f'), ' nm');
  str1(5)= strcat({'L= '}, num2str(fibre.L*1E3,'%3.2f'), ' m');
  str1(6)= strcat({'Pump shape: '}, pump.ShapeName);
  str1(7)= strcat({'\lambda_0= '}, num2str(pump.lambda), ' nm');
  str1(8)= strcat({'\Deltat= '}, num2str(pump.tfwhm* 1e3), ' fs  (FWHM)');
  str1(9)= strcat({'chirp= '}, num2str(pump.chirp* 1e6, '%3.1f'), ' fs^2');
  str1(10)= strcat({'P peak= '}, num2str(pump.Ppeak,'%3.1f'), ' W');
  str1(11)= strcat({'P mean teor= '}, num2str(pump.Pmean *1E3, '%3.1f'), ' mW');
  str1(12)= strcat({'P mean sim= '}, num2str(pump.InPower *1E3, '%3.1f'), ' mW');
  str1(13)= strcat({'out P mean= '}, num2str(output.OutPower *1E3, '%3.1f'), ' mW');