function TimeHandle= FiltPlot(sim, filt, pulse)

TimeHandle= figure(33);
scrsz = get(0,'ScreenSize');
set(TimeHandle, 'OuterPosition', [1 scrsz(2) scrsz(3) scrsz(4)]);
plot(sim.t, pulse.time, 'r.');
grid on;
xlabel('\tau [ps]','FontSize',18,'FontName','Times');
ylabel ('Power [w]','FontSize',18,'FontName','Times');

str2(1)= strcat({'file '},filt.FileName );
str2(2)= strcat({'filt \Delta\lambda= '}, num2str(filt.DeltaLambda, '%3.1f'), ' nm');
str2(3)= strcat({'\lambda= '}, num2str(filt.Lambda, '%3.1f'), ' nm');
str2(4)= strcat({'\Deltat= '}, num2str(pulse.Tfwhm* 1E3, '%3.1f'), ' fs (FWHM)');
str2(5)= strcat({'\Deltat (transf)= '}, num2str(filt.DTtransf* 1E3, '%3.1f'), ' fs (FWHM)');
str2(6)= strcat({'P peak= '}, num2str(pulse.Ppeak, '%3.1f'), ' W');
str2(7)= strcat({'P mean= '}, num2str(pulse.Pmean*1e3, '%3.1f'), ' mW');

y_pos= ylim;
text_y_pos= 0.7* y_pos(2);
x_pos= xlim;
text_x_pos= 0.7* x_pos(2) + 0.3* x_pos(1);
text(text_x_pos, text_y_pos, str2);