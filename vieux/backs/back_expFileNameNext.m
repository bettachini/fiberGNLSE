function [FileName, ResultsPath] = expFileNameNext(FileName, ResultsPath, qNumber, LeadChar)
% Adds 1 to qq number in position LeadChar
% yymmdd05mat.mat= FileNameNext(ResultsPath, yymmdd04mat.mat, 7)

% if no base directory and filename given, start own
if ~nargin()
    date_str= datestr(now,20);
    date_str= strcat( date_str(7:8), date_str(4:5), date_str(1:2) );
    day_count= 001;
    FileName= strcat( date_str, num2str(day_count, '%.3i') );    %% yymmddqqq (7 LeadChar)

    % Base directory for results
    cd ..
    curr= pwd;
    ResultsPath= [curr '/results/'];
    files= dir(ResultsPath);
    cd codes
else
    if nargin()==2
        LeadChar= 7;   % qqq position in FileName yymmddqqq string
    end
    files= dir(ResultsPath);  % reads ResultsPath file names
    day_count= str2num(FileName(LeadChar:LeadChar+ 2) );
end

% checks if filename was used, in that case increases day_count
Narch= size(files,1);
for i=3:Narch
    CurrFile= files(i).name;
    if (size(CurrFile,2)>= LeadChar+2)
        if strcmp(CurrFile(1:LeadChar+ 2), FileName)
            day_count= day_count+ 1;
            FileName= strcat(FileName(1: (LeadChar- 1) ), num2str(day_count, '%.3i') );
        end
    end
end
