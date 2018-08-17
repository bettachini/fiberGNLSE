function [ FileName, ResultsPath ] = CurrNext( FileName, ResultsPath, qNumber )
%CurrNext Adds 1 to a qNumber digits counter at FileName string end.
%   Detailed explanation goes here

if nargin()~=3
    qNumber= 3; % default digits at FileName string end
end
count= str2num( FileName(end- qNumber: end) );
files= dir(ResultsPath);  % reads ResultsPath file names

% If filename was used increases count
Narch= size(files,1);
for i=3:Narch
    CurrFile= files(i).name;
    % if (size(CurrFile,2)>= LeadChar+2
        if strcmp(CurrFile(end- qNumber:end), FileName)
            count= count+ 1;
            FileName= strcat(FileName(end- qNumber:end), num2str(day_count, '%.3i') );
        end
    % end
end

end

