function FileName= CurrDateFile_seq(directorio)
% checks wheter yymmdd_qq being qq sequential order is present
% in order to provide next sequential yymmdd_qq

%% genera FileName para primer ocurrencia del dia
date_str= datestr(now,20);
day_count= 1;
FileName= strcat( date_str(7:8), date_str(4:5), date_str(1:2),'_', num2str(day_count, '%.2i') );


%% lee nombre de archivos del directorio actual
% directorio= cd;
archivos= dir(directorio);
Narch1= size(archivos);
Narch= Narch1(1,1);
for i=3:Narch
    CurrFile= archivos(i).name;
    if (size(CurrFile,2)>= 9)
        if strcmp(archivos(i).name(1:9), FileName)
            day_count= day_count+ 1;
            FileName= strcat( date_str(7:8), date_str(4:5), date_str(1:2),'_', num2str(day_count, '%.2i') );
        end
    end
end
