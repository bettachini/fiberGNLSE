function FileName= CurrDateFile(fibre_name, L, tfwhm, chirping, P_0)

% function FileName= CurrDateFile(FibreName, PulseWidth, Chirp, Peak_power)

date_str= datestr(now,20);
day_count= 1;
FileName= strcat( date_str(7:8), date_str(4:5), date_str(1:2),'_', num2str(day_count, '%.2i') );
while ( exist( FileName, 'file' )== 2 )
    day_count= day_count+ 1;
    FileName= strcat( date_str(7:8), date_str(4:5), date_str(1:2),'_', num2str(day_count, '%.2i') );
end

% verifica existencia log
log_FileName= 'log.txt';
if ( exist( log_FileName, 'file')~= 2 )
    fid_file= fopen( log_FileName, 'w');
    fprintf(fid_file, 'File\t Fibre\t Length[km]\t tfwhm[ps]\t chirp[fs^2]\t Power_in[W]\n');
else
    fid_file= fopen( log_FileName, 'a');
end
% FileName\t PulseWidth\t Chirp\t Peak_power

% test
%{
FibreName= 'Telco';
tfwhm= 1000;                        % [fs] pulse width @FWHM % ENSAYO TELCO
tfwhm= tfwhm* 1e-3;                 % ->[ps]
chirping= 0.007400;             % chirp= 7400fs^2
P_0= 500E-3/ (0.88* 1E-12* 1E9);        % [W] (unos 570 W)
sprintf('%s\t %s\t %.3e\t %.3e\t %.3e\t %.3e\n', FileName, FibreName, L, tfwhm, chirping, P_0)
%}
fprintf(fid_file, '%s\t %s\t %.3e\t %.3e\t %.3e\t %.3e\n', FileName, fibre_name, L, tfwhm, chirping, P_0);

% num2str(tfwhm* 1e3), num2str(chirping*1e6,'%1.0e'), num2str(P_0);
% fprintf(fid_file, '%s\t %s\t %s\t %s\n', FileName, PulseWidth, Chirp, Peak_power);
fclose( fid_file);