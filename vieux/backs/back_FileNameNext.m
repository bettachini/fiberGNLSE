function FileName= FileNameNext(Dir, FileName, LeadChar)

% Checks wheter FileNameqq is present in order to provide next sequential qq


%% next occurrence if FileName present
% Dir= cd;
files= dir(Dir);  % reads Dir file names
Narch1= size(files);
Narch= Narch1(1,1);
% day_count= 1; % this goes
day_count= str2double(strcat(FileName(7), FileName(8) ) );
for i=3:Narch
    CurrFile= files(i).name;
    if (size(CurrFile,2)>= LeadChar)
        if strcmp(CurrFile(1:LeadChar), FileName)
            day_count= day_count+ 1;
            FileName= strcat(FileName(1:(LeadChar-2) ), num2str(day_count, '%.2i') );
        end
    end
end
