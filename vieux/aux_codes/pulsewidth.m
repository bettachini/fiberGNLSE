function [w_1e, w_fwhm]= pulsewidth(data_y, data_x, xInd_min, xInd_max)

[pow_peak, lamb_peak]= max(data_y);
y_half= pow_peak/ 2;     % for fwhm
y_1e= pow_peak* (1- (1/ exp(1) ) );     % for 1/e


%% FWHM
% lowers from peak towards left, rises from extreme right
ind_1= lamb_peak;
aux= pow_peak;
while (aux> y_half)
    ind_1= ind_1- 1;
    aux= data_y(ind_1);
end
ind_2= xInd_max;
aux= data_y(ind_2);
while (aux< y_half)
    ind_2= ind_2- 1;
    aux= data_y(ind_2);
end
w_fwhm= data_x(ind_2)- data_x(ind_1);

% lowers from peak towards right, rises from extreme left
ind_1= xInd_min;
aux= data_y(ind_1);
while (aux< y_half)
    ind_1= ind_1+ 1;
    aux= data_y(ind_1);
end
ind_2= lamb_peak;
aux= pow_peak;
while (aux> y_half)
    ind_2= ind_2+ 1;
    aux= data_y(ind_2);
end
w_fwhm= w_fwhm+ (data_x(ind_2)- data_x(ind_1) );
w_fwhm= w_fwhm/ 2;


%% 1/e
% lowers from peak towards left, rises from extreme right
ind_1= lamb_peak;
aux= pow_peak;
while (aux> y_1e)
    ind_1= ind_1- 1;
    aux= data_y(ind_1);
end
ind_2= xInd_max;
aux= data_y(ind_2);
while (aux< y_1e)
    ind_2= ind_2- 1;
    aux= data_y(ind_2);
end
w_1e= data_x(ind_2)- data_x(ind_1);

% lowers from peak towards right, rises from extreme left
ind_1= xInd_min;
aux= data_y(ind_1);
while (aux< y_1e)
    ind_1= ind_1+ 1;
    aux= data_y(ind_1);
end
ind_2= lamb_peak;
aux= pow_peak;
while (aux> y_1e)
    ind_2= ind_2+ 1;
    aux= data_y(ind_2);
end
w_1e= w_1e+ (data_x(ind_2)- data_x(ind_1) );
w_1e= w_1e/ 2;
