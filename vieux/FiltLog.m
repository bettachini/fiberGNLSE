function FiltLog(ResultsPath, filt, pulse)

%% checks wheter log file is present, creates it otherwise
log_FileName= 'FiltLog2.txt';
LogFilePath= strcat(ResultsPath,log_FileName);
if exist( LogFilePath, 'file')
    LogFileId= fopen( LogFilePath, 'a');
else
    LogFileId= fopen( LogFilePath, 'w');
    fprintf(LogFileId, 'FileName\tF_Lamb1[nm]\tF_Lamb2[nm]\tF_DLamb[nm]\tP_Tfwhm[fs]\tP_peak[W]\tP_mean[mW]\n');
end

%% writes filenames and parameters
fprintf(LogFileId, '%s\t%.3e\t%.3e\t%.3e\t%.3e\t%.3e\t%.3e\n',filt.FileName, filt.Range(1), filt.Range(2), filt.DeltaLambda, pulse.Tfwhm*1E3, pulse.Ppeak, pulse.Pmean*1e3);


%% close log file
fclose(LogFileId);
