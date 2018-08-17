function DateFilename(directorio)

%% genera nombre <fecha>_01
date_str= datestr(now,20);
day_count= 1;
FileName= strcat( date_str(7:8), date_str(4:5), date_str(1:2),'_', num2str(day_count, '%.2i') );
while ( exist( FileName, 'file' )== 2 )
    day_count= day_count+ 1;
    FileName= strcat( date_str(7:8), date_str(4:5), date_str(1:2),'_', num2str(day_count, '%.2i') );
end


%% verifica si existe el archivo y en tal caso actualiza numeracion


% Lee directorio y determina numero de archivos
cd(directorio);
archivos=dir(directorio);
Narch1=size(archivos);
Narch=Narch1(1,1);

% verifica existencia log
log_FileName= 'log.txt';
if ( exist( log_FileName, 'file')~= 2 )
    fid_file= fopen( log_FileName, 'w');
    fprintf(fid_file, 'File\t Fibre\t Length[km]\t tfwhm[ps]\t chirp[fs^2]\t Power_in[W]\n');
else
    fid_file= fopen( log_FileName, 'a');
end
% FileName\t PulseWidth\t Chirp\t Peak_power