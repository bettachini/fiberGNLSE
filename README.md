# fiberGNLSE

Further details at
Rieznik, A. A., A. M. Heidt, P. G. Konig, V. A. Bettachini, and D. F. Grosz.
‘Optimum Integration Procedures for Supercontinuum Simulation’.
Photonics Journal, IEEE 4, no. 2 (12 April 2012): 552–560.
https://doi.org/10.1109/JPHOT.2012.2188281.




Octave functions used

Generator (carpeta) Para generar espectros

General: (script) Spans sim parameters
	Parameters (function)	
	zentrum: (function) Runs SSFM of pump in given fibre with sim parameters, generates graphs
		InputField (function)	
		expFileNameNext: (function)
		NLSE: (function)
		GenPlots: (function)
			SpectLabel_oct.m (function)
		SimLog (function)
copie Parameters.m -> Parameters_lec.m
	Resguardo últimos parámetros para trabajar con reproducir Rieznik König
	"37 fs pulses (FWHM – sech2) centered at 830 nm launched into a 75 cm-length PCF fiber, with non-linear coefficient γ = 78 W-1km-1 and zero-dispersion wavelength at 790 nm."
		Reproduce (script) Busco reproducir corridas Rieznik/König de dos pulsos
