function [ handles ] = GenPlots( sim, fibre, pump, output )
%GenPlots Summary of this function goes here
%   Detailed explanation goes here

% spectrum -> power
specN= output.OutSpect.* conj(output.OutSpect);
specN = specN/ max(specN);        % normalised spectra to higher peak power
spec_ylabel= 'Normalised Spectrum (a.u.)';
% spec_ylabel= 'Power [W]';  % if no normalisation performed


%% PSD estimation
%{

sampling_freq= 1/sim.dt;
specPSD= (1/(sim.nt* sampling_freq))* specN;


% Total output pulse energy (frequency) -> No funciona, si da la suma sin sim.df/dt
specN= specN./ size(out_spec,2);                % ->[w] fft normalisation (sqrt(N) for each fft)
Pul_Ef= sim.df *sum(out_spec);
plot(sim.lambdas,specN./ 1e3,'b.-')           % ->[kW]?
%}

%% output spectrum plot
handles.OutSpect= figure(662);
set(handles.OutSpect, 'visible', sim.FigShow);
scrsz = get(0,'ScreenSize');
set(handles.OutSpect, 'OuterPosition', [1 scrsz(2) scrsz(3) scrsz(4)]);

plot(sim.lambdas,specN,'b.-');
grid on;
xlabel('\lambda [nm]','FontSize',18,'FontName','Times');
ylabel (spec_ylabel,'FontSize',18,'FontName','Times');
xlim(sim.LambdaRange);

% on graph input pulse data
text_x_pos= sim.LambdaRange(1)+ 0.05*(sim.LambdaRange(2)- sim.LambdaRange(1) );
y_pos= ylim;
if sim.octave
    str1= SpectLabel_oct(fibre, pump, output);
    text_y_pos= 0.9* y_pos(2);
else
    str1= SpectLabel_mat(fibre, pump, output);
    text_y_pos= 0.8* y_pos(2);
end
text(text_x_pos, text_y_pos, str1);
% txt_spr_hnld= text(text_x_pos, text_y_pos, str1);

%{
% saves output spectrum
print(handles.OutSpect,'-depsc', '-r600', strcat(ResultsPath, sim.FileName, '_sp', '.eps' ) );   % save spectrum as eps
% print('-depsc', '-r600', strcat(sim.FileName, 'sp', '.pdf' ) );   % save spectrum as pdf
% saveas(gcf, sim.FileName, 'fig');     % save spectrum as fig
%}


%% inside spectra plot
if sim.outputs> 0
    spect_pow= output.spectral.* conj(output.spectral);
    noise = max(max(spect_pow ) )/ 10000;
    mesh_in_time = 10*log10(1000*(spect_pow+ noise));   % ->[dB]

    dist_axis= output.distances* 1e5;
    lambda_lin= linspace(min(sim.lambdas), max(sim.lambdas), round(max(sim.lambdas )- min(sim.lambdas) ) )';
    y_lin= linspace(min(dist_axis ), max(dist_axis ), 2* size(dist_axis, 1 ) )';
    [X, Y ]= meshgrid(lambda_lin, y_lin );
    Z= griddata(sim.lambdas, dist_axis, mesh_in_time, X, Y, 'cubic' );

    handles.InSpect= figure(666);
    set(handles.InSpect, 'visible', sim.FigShow);

    imagesc(lambda_lin, y_lin, Z);
    axis([sim.LambdaRange, [0 fibre.L* 1e5] ]);     % twice lenght fibre
    % set(gca,'YDir','normal');      % 0 length at bottom

    xlabel('\lambda [nm]','FontSize',18,'FontName','Times');
    ylabel('Length [cm]','FontSize',18,'FontName','Times');
    % print('-depsc2', '-r600', strcat(results_path, img_name, 'map', '.eps' ) );   % eps
end

end
