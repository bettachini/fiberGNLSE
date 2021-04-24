# fiberGNLSE

Generalized Nonlinear Schrodinger Equation based simulation of nonlinear broadening of ultrashort pulses in optical fibers.
GNU Octave / Mathworks MATLAB compatible code.

Copyright 2008 Víctor A. Bettachini <bettachini@df.uba.ar>

> Further details at
> Rieznik, A. A., A. M. Heidt, P. G. Konig, V. A. Bettachini, and D. F. Grosz.
> ‘Optimum Integration Procedures for Supercontinuum Simulation’.
> Photonics Journal, IEEE 4, no. 2 (12 April 2012): 552–560.
> https://doi.org/10.1109/JPHOT.2012.2188281.

Octave functions used
- Generator (directory) generate spectra
- General: (script) Spans sim parameters
	- Parameters (function)	
		- Currently: "37 fs pulses (FWHM – sech2) centered at 830 nm launched into a 75 cm-length PCF fiber, with non-linear coefficient γ = 78 W-1km-1 and zero-dispersion wavelength at 790 nm."
	- zentrum: (function) Runs SSFM of pump in given fibre with sim parameters, generates graphs
	- InputField (function)	
	- expFileNameNext: (function)
	- NLSE: (function)
	- GenPlots: (function)
	- SpectLabel_oct.m (function)
	- SimLog (function)

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Licencia Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/InteractiveResource" property="dct:title" rel="dct:type">fibreGNLSE</span> por <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">Víctor A. Bettachini</span> se distribuye bajo una <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Licencia Creative Commons Atribución-CompartirIgual 4.0 Internacional</a>.
