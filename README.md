# fiberGNLSE

Generalized Nonlinear Schrodinger Equation based simulation of nonlinear broadening of ultrashort pulses in optical fibers.
GNU Octave / Mathworks MATLAB compatible code.

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><span property="dct:title">fiberGNLSE</span> by <span property="cc:attributionName">Víctor A. Bettachini</span> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p> 

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

