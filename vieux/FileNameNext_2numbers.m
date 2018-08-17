function FileName= FileNameNext(Dir, FileName, LeadChar)
% Adds 1 to qq number in position LeadChar
% yymmdd05mat.mat= FileNameNext(Dir, yymmdd04mat.mat, 7)

files= dir(Dir);  % reads Dir file names
Narch= size(files,1);
day_count= str2double(strcat(FileName(LeadChar), FileName(LeadChar+ 1) ) );
for i=3:Narch
    CurrFile= files(i).name;
    if (size(CurrFile,2)>= LeadChar+1)
        if strcmp(CurrFile(1:LeadChar+ 1), FileName)
            day_count= day_count+ 1;
            FileName= strcat(FileName(1: (LeadChar- 1) ), num2str(day_count, '%.2i') );
        end
    end
end
