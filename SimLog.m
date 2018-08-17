function SimLog(sim, pump, fibre, output)

%% checks wheter log file is present, creates it otherwise
log_FileName= 'SimLog.txt';
LogFilePath= strcat(sim.ResultsPath,log_FileName);
if exist( LogFilePath, 'file')
    LogFileId= fopen( LogFilePath, 'a');
else
    LogFileId= fopen( LogFilePath, 'w');
    fprintf(LogFileId, 'FileName\tBetaID\tGammaID[w^-1 km^-1]\tAlpha[dB/km]\tp_lambda[nm]\tp_tfwhm[ps]\tp_chirp[fs^2]\tp_meanT[W]\tp_meanS[W]\tO_meanS[W]\n');
end

%% writes filenames and parameters
fprintf(LogFileId, '%s\t%s\t%s\t%.3e\t%.3e\t%.3e\t%.3e\t%.3e\t%.3e\t%.3e\n',sim.FileName, fibre.BetaID, fibre.GammaID, fibre.alpha, pump.lambda, pump.tfwhm, pump.chirp*1E6, pump.Pmean, pump.InPower, output.OutPower);


%% close log file
fclose(LogFileId);
