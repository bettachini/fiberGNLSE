function savem_z
% SAVEM_Z saves a copy of the current active *.m file in editor, with the
% file name suffixed by '_data_time' string under the same directory.
%
% Syntax:
%       savem_z;  %% tested on MATLAB 7.9.0 (R2009b)
%
% Description:
%   Too simple to be stated here.
%
% Programmed and Copyright by J. Zhang: xyzhangj@physics.ucla.edu
% 
% $Version=0.1 $Date=2010/07/25
% 
% $Version=0.2 $Data=2010/09/08
% bug fixed:
%   backup file is named as *_yyyymmdd_104.m @time 10:04 AM
%   it should be named as *_yyyymmdd_1004.m instead

es = com.mathworks.mlservices.MLEditorServices;
ad = char(es.builtinGetActiveDocument);
javaMethod('saveDocument',es,ad);
timevec = clock;
timestr = sprintf('_%s_%s%s.m',datestr(date,'yyyymmdd'),num2str(timevec(4)),num2str(timevec(5)));
filename_backup = strrep(ad,'.m',timestr);
copyfile(ad,filename_backup);
dispstr = sprintf('@%s## A copy of ##%s## has been saved under the same directory',...
    sprintf('%s_%02d%02d',datestr(date,'yyyymmdd'),timevec(4),timevec(5)),ad);
disp(dispstr);
end