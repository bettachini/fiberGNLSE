/* SiteCatalyst code version: H.24.2.
Copyright 1996-2012 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */

/* Set report suite ID dynamically based on domain */
function cfCheckRSID(cvURL) {
	var cvHostName = cfUtility(cvURL,'server');
	switch ( cvHostName ) {
		case "www.mathworks.com": 
		case "mathworks.com": 
			ReportSuiteID = "mathwgbl,mathwmain";
			break;
		case "www.mathworks.com.au": 
		case "mathworks.com.au": 
			ReportSuiteID = "mathwgbl,mathwau";
			break;
		case "www.mathworks.ch": 
		case "mathworks.ch": 
			ReportSuiteID = "mathwgbl,mathwch";
			break;		
		case "www.mathworks.cn": 
		case "mathworks.cn": 
			ReportSuiteID = "mathwgbl,mathwcn";
			break;
		case "www.mathworks.de": 
		case "mathworks.de": 
			ReportSuiteID = "mathwgbl,mathwde";
			break;
		case "www.mathworks.es": 
		case "mathworks.es": 
			ReportSuiteID = "mathwgbl,mathwes";
			break;
		case "www.mathworks.fr": 
		case "mathworks.fr": 
			ReportSuiteID = "mathwgbl,mathwfr";
			break;
		case "www.mathworks.in": 
		case "mathworks.in": 
			ReportSuiteID = "mathwgbl,mathwin";
			break;
		case "www.mathworks.it": 
		case "mathworks.it": 
			ReportSuiteID = "mathwgbl,mathwit";
			break;
		case "www.mathworks.co.jp": 
		case "mathworks.co.jp": 
			ReportSuiteID = "mathwgbl,mathwjp";
			break;
		case "www.mathworks.co.kr": 
		case "mathworks.co.kr": 
			ReportSuiteID = "mathwgbl,mathwkr";
			break;
		case "www.mathworks.nl": 
		case "mathworks.nl": 
			ReportSuiteID = "mathwgbl,mathwnl";
			break;
		case "www.mathworks.se": 
		case "mathworks.se": 
			ReportSuiteID = "mathwgbl,mathwnordic";
			break;
		case "www.mathworks.co.uk": 
		case "mathworks.co.uk": 
			ReportSuiteID = "mathwgbl,mathwuk";
			break;
		default:
			ReportSuiteID = "mathwgbl,mathwmain";
			break;
	}
	
	ReportSuiteID = ReportSuiteID.toLowerCase();
	return ReportSuiteID;
}


function cfUtility(cvURL,cvAction) {
	cvURL = unescape(cvURL.toLowerCase());
	cvURL=cvURL.replace("searchresults?","searchresults/?");
	switch (cvAction) {
	case "server":	
		var a = cvURL.split(/\/+/g)[1];
		if (typeof(a) !== 'undefined') {
			var b = a.split("."); if (b.length == 2) { var c = 'www.' + a; } else { c = a; } TheResult = c;
		} else {
			TheResult = "";
		}
		break;
	case "domain":	
		var a = cfUtility(cvURL,"server")
		if (typeof(a) !== 'undefined') {
			var b  = a.split("."); b_len = b.length;
			var TheResult = String(b[b_len - 2] + '.' + b[b_len - 1]);
		} else {
			TheResult = "";
		}
		break;
		
	case "filename":
		var a = cvURL.split("?")[0]; var b = a.substring(a.lastIndexOf('/')+1);
		TheResult = b;
		break;
	case "pagename":
		var a = cvURL.split("?")[0];
		a = a.replace("http://","");
		a = a.replace("https://","");
		a = a.replace(cfUtility(cvURL,"server"),""); 
		var b = a.substring(a.lastIndexOf('/')+1);
		a = a.replace(b,"");
		//a=cfUtility(cvURL,"server").replace("www.mathworks","")+a+cfUtility(cvURL,"filename");
		a= a+cfUtility(cvURL,"filename");
		if ((cfUtility(cvURL,"filename") == "") || (!cfUtility(cvURL,"filename"))){
			if (cvURL.search("searchresults/?")<0 && cvURL.search("/company/jobs/")<0 && cvURL.search("/matlabcentral/")<0 && cvURL.search("/downloads/web_downloads/")<0 && cvURL.search("/support/bugreports/")<0 																																&& cvURL.search("/training-schedule/")<0 && cvURL.search("blogs.mathworks.")<0){
				a= a+"index.html"; //adding index.html when filename not present
			}
		}
		TheResult = a;
		break;	
	case "channel":
		var a = cvURL.split("?")[0];
		a = a.replace("http://","");
		a = a.replace("https://","");
		a = a.replace(cfUtility(cvURL,"server"),""); 
		var b = a.substring(a.lastIndexOf('/')+1);
		a = a.replace(b,"");
		//a = a.replace(cvURL.split(/\/+/g)[1],cfUtility(cvURL,"server"));
		TheResult = a;
		break;	
	case "filenameparameters":
		var cvParamPos = cvURL.indexOf("?"); if (cvParamPos != -1) { var cvParam = cvURL.substring(cvParamPos); } else { var cvParam = ""; }
		TheResult = cfUtility(cvURL,"filename") + cvParam;
		break;		
	case "se":
		var cvReferrer_Server = cvURL.split(/\/+/g)[1]; 
		var cvReferrer_Server_Splitted = cvReferrer_Server.split("."); 
		cvReferrer_Server_Splitted_Length = cvReferrer_Server_Splitted.length;
		var TheResult = String('.' + cvReferrer_Server_Splitted[cvReferrer_Server_Splitted_Length - 2] + '.');
		break;
	case "ext":
		var TheResult = cvURL.substring(cvURL.lastIndexOf('/') + 1, cvURL.length).substring(cvURL.substring(cvURL.lastIndexOf('/') + 1, cvURL.length).lastIndexOf('.') + 1, cvURL.substring(cvURL.lastIndexOf('/') + 1, cvURL.length).length);
		break;
	default:
		var TheResult = "";
	}
	return TheResult;
}


function undorewrite(origurl) {
	
	omniurl=unescape(origurl.toLowerCase());
	domain=cfUtility(omniurl,'server');
	if (domain.indexOf("mathworks.de")>-1 || domain.indexOf("mathworks.in")>-1 || domain.indexOf("mathworks.co.jp")>-1 || domain.indexOf("mathworks.co.uk")>-1 || domain.indexOf("mathworks.fr")>-1
   		|| domain.indexOf("mathworks.cn")>-1 || domain.indexOf("mathworks.nl")>-1 || domain.indexOf("mathworks.se")>-1 || domain.indexOf("mathworks.it")>-1 || domain.indexOf("mathworks.com.au")>-1
 	    || domain.indexOf("mathworks.co.kr")>-1 || domain.indexOf("mathworks.es")>-1 || domain.indexOf("mathworks.ch")>-1){
 		if(omniurl.indexOf("mathworks.de/de/")>-1 || omniurl.indexOf("mathworks.in/in/")>-1 || omniurl.indexOf("mathworks.co.uk/uk/")>-1 || omniurl.indexOf("mathworks.co.jp/jp/")>-1 || omniurl.indexOf("mathworks.fr/fr/")>-1 			        || omniurl.indexOf("mathworks.cn/cn/")>-1 || omniurl.indexOf("mathworks.nl/nl/")>-1 || omniurl.indexOf("mathworks.se/se/")>-1 || omniurl.indexOf("mathworks.it/it/")>-1 || omniurl.indexOf("mathworks.com.au/au/")>-1 																																																																																																									    	|| omniurl.indexOf("mathworks.co.kr/kr/")>-1 || omniurl.indexOf("mathworks.es/es/")>-1 || omniurl.indexOf("mathworks.ch/ch/")>-1){	
			channel=cfUtility(omniurl,'channel');
			foldersplit = channel.split("/");
			omniurl= omniurl.replace("/"+foldersplit[1]+"/","/");
		}
	}
	return omniurl;
}




function cfGetQParam(a, b) {	// Custom Function to Get Query Parameters
	var c = a.indexOf('?'); var d = a.indexOf('#');
	if (c < 0) { return ""; }
	var e = a.substr(c + 1);
	if (d > 0) { e = a.substring(c + 1, d); }
	var f = e.split('&');
	for (var i = 0; i < f.length; i++) {
		var g = f[i].split('=');
		g[0] = unescape(g[0]);
		if (g[0] == b) {
			g[1] = unescape(g[1]);
			if (g[1].indexOf('"') > -1) {
				var h = /"/g;
				g[1] = g[1].replace(h, '\\"')
			}
			if (g[1].indexOf('+') > -1) {
				var j = /\+/g;
				g[1] = g[1].replace(j, ' ')
			}
			return g[1]
		}
	}
	return ""
}

function cfLeft(str, n){
	if (n <= 0) { return ""; } else if (n > String(str).length) { return str; } else { return String(str).substring(0,n); }
}

function cfRight(str, n){
    if (n <= 0) { return ""; } else if (n > String(str).length) { return str; } else { var iLen = String(str).length; return String(str).substring(iLen, iLen - n); }
}

function cfClean(cvURL) {
	if (cvURL) {
		cvURL = cvURL.replace("http://","/");
		cvURL = cvURL.replace("https://","/");
	}
	return cvURL;
}

function removeHTMLTags(strInputCode) {
	if (strInputCode) {
		strInputCode = strInputCode.replace(/&(lt|gt);/g, function (strMatch, p1) {
			return (p1 == "lt") ? "<" : ">";
		});
		var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
		return strTagStrippedText;
	}
}

function chnlshrink(chnl) {
	chan=chnl.toLowerCase();
	switch (chan) {
		case "paid search": 
			chanl = "ppc";
			break;
		case "paid social ad":
			chanl = "psb";
			break;
		case "paid social media":
			chanl = "psm";
			break;
		case "external promotion":
			chanl = "pep";
			break;
		case "partner promotion":
			chanl = "prp";
			break;
		case "direct load":
			chanl = "dl";
			break;
		case "email":
			chanl = "eml";
			break;
		case "paid non-search":
			chanl = "pns";
			break;
		case "natural search":
			chanl = "nats";
			break;
		case "referrers":
			chanl = "ref";
			break;
		default:
		chanl = "unk";
			break;
	}
	return chanl;
}

function prodassign(type){
	if (type=='urly'){
		if (s.prop4.indexOf('products/curvefitting/')>-1 || s.prop4.indexOf('/help/curvefit/')>-1 || s.prop4.indexOf('/help/toolbox/curvefit/')>-1) {prod="Curve Fitting Toolbox";}
		else if (s.prop4.indexOf('products/communications/')>-1 || s.prop4.indexOf('/help/ja_JP/comm/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/comm/')>-1) {prod="Communications System Toolbox";}
		else if (s.prop4.indexOf('products/communications/')>-1 || s.prop4.indexOf('/help/comm/')>-1 || s.prop4.indexOf('/help/toolbox/comm/')>-1) {prod="Communications System Toolbox";}
		else if (s.prop4.indexOf('products/compiler/')>-1 || s.prop4.indexOf('/help/ja_JP/compiler/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/compiler/')>-1) {prod="MATLAB Compiler";}
		else if (s.prop4.indexOf('products/compiler/')>-1 || s.prop4.indexOf('/help/compiler/')>-1 || s.prop4.indexOf('/help/toolbox/compiler/')>-1) {prod="MATLAB Compiler";}
		else if (s.prop4.indexOf('products/control/')>-1 || s.prop4.indexOf('/help/ja_JP/control/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/control/')>-1) {prod="Control System Toolbox";}
		else if (s.prop4.indexOf('products/control/')>-1 || s.prop4.indexOf('/help/control/')>-1 || s.prop4.indexOf('/help/toolbox/control/')>-1) {prod="Control System Toolbox";}
		else if (s.prop4.indexOf('products/daq/')>-1 || s.prop4.indexOf('/help/daq/')>-1 || s.prop4.indexOf('/help/toolbox/daq/')>-1) {prod="Data Acquisition Toolbox";}
		else if (s.prop4.indexOf('products/database/')>-1 || s.prop4.indexOf('/help/database/')>-1 || s.prop4.indexOf('/help/toolbox/database/')>-1) {prod="Database Toolbox";}
		else if (s.prop4.indexOf('products/derivatives/')>-1 || s.prop4.indexOf('/help/finderiv/')>-1 || s.prop4.indexOf('/help/toolbox/finderiv/')>-1) {prod="Financial Derivatives Toolbox";}
		else if (s.prop4.indexOf('products/datafeed/')>-1 || s.prop4.indexOf('/help/datafeed/')>-1 || s.prop4.indexOf('/help/toolbox/datafeed/')>-1) {prod="Datafeed Toolbox";}
		else if (s.prop4.indexOf('products/gauges/')>-1 || s.prop4.indexOf('/help/gauges/')>-1 || s.prop4.indexOf('/help/toolbox/gauges/')>-1) {prod="Gauges Blockset";}
		else if (s.prop4.indexOf('products/dsp-system/')>-1 || s.prop4.indexOf('/help/dsp/')>-1 || s.prop4.indexOf('/help/toolbox/dsp/')>-1) {prod="DSP System Toolbox";}
		else if (s.prop4.indexOf('products/embedded-coder/')>-1 || s.prop4.indexOf('/help/ecoder/')>-1 || s.prop4.indexOf('/help/toolbox/ecoder/')>-1) {prod="Embedded Coder";}
		else if (s.prop4.indexOf('products/excellink/')>-1 || s.prop4.indexOf('/help/exlink/')>-1 || s.prop4.indexOf('/help/toolbox/exlink/')>-1) {prod="Spreadsheet Link EX";}
		else if (s.prop4.indexOf('products/finance/')>-1 || s.prop4.indexOf('/help/finance/')>-1 || s.prop4.indexOf('/help/toolbox/finance/')>-1) {prod="Financial Toolbox";}
		else if (s.prop4.indexOf('products/fuzzy-logic/')>-1 || s.prop4.indexOf('/help/fuzzy/')>-1 || s.prop4.indexOf('/help/toolbox/fuzzy/')>-1) {prod="Fuzzy Logic Toolbox";}
		else if (s.prop4.indexOf('products/instrument/')>-1 || s.prop4.indexOf('/help/instrument/')>-1 || s.prop4.indexOf('/help/toolbox/instrument/')>-1) {prod="Instrument Control Toolbox";}
		else if (s.prop4.indexOf('products/sysid/')>-1 || s.prop4.indexOf('/help/ident/')>-1 || s.prop4.indexOf('/help/toolbox/ident/')>-1) {prod="System Identification Toolbox";}
		else if (s.prop4.indexOf('products/image/')>-1 || s.prop4.indexOf('/access/helpdesk/help/images/')>-1 || s.prop4.indexOf('/access/helpdesk/help/toolbox/images/')>-1) {prod="Image Processing Toolbox";}
		else if (s.prop4.indexOf('products/image/')>-1 || s.prop4.indexOf('/help/ja_JP/images/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/images/')>-1) {prod="Image Processing Toolbox";}
		else if (s.prop4.indexOf('products/mapping/')>-1 || s.prop4.indexOf('/help/map/')>-1 || s.prop4.indexOf('/help/toolbox/map/')>-1) {prod="Mapping Toolbox";}
		else if (s.prop4.indexOf('products/mpc/')>-1 || s.prop4.indexOf('/help/mpc/')>-1 || s.prop4.indexOf('/help/toolbox/mpc/')>-1) {prod="Model Predictive Control Toolbox";}
		else if (s.prop4.indexOf('products/ML_reportgenerator/')>-1 || s.prop4.indexOf('/help/rptgen/')>-1 || s.prop4.indexOf('/help/toolbox/rptgen/')>-1) {prod="MATLAB Report Generator";}
		else if (s.prop4.indexOf('products/neural-network/')>-1 || s.prop4.indexOf('/help/nnet/')>-1 || s.prop4.indexOf('/help/toolbox/nnet/')>-1) {prod="Neural Network Toolbox";}
		else if (s.prop4.indexOf('products/optimization/')>-1 || s.prop4.indexOf('/help/ja_JP/optim/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/optim/')>-1) {prod="Optimization Toolbox";}
		else if (s.prop4.indexOf('products/optimization/')>-1 || s.prop4.indexOf('/help/optim/')>-1 || s.prop4.indexOf('/help/toolbox/optim/')>-1) {prod="Optimization Toolbox";}
		else if (s.prop4.indexOf('products/pde/')>-1 || s.prop4.indexOf('/help/pde/')>-1 || s.prop4.indexOf('/help/toolbox/pde/')>-1) {prod="Partial Differential Equation Toolbox";}
		else if (s.prop4.indexOf('products/simpower/')>-1 || s.prop4.indexOf('/help/ja_JP/physmod/powersys/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/physmod/powersys/')>-1) {prod="SimPowerSystems";}
		else if (s.prop4.indexOf('products/simpower/')>-1 || s.prop4.indexOf('/help/physmod/powersys/')>-1 || s.prop4.indexOf('/help/toolbox/physmod/powersys/')>-1) {prod="SimPowerSystems";}
		else if (s.prop4.indexOf('products/robust/')>-1 || s.prop4.indexOf('/help/robust/')>-1 || s.prop4.indexOf('/help/toolbox/robust/')>-1) {prod="Robust Control Toolbox";}
		else if (s.prop4.indexOf('products/simulink-coder/')>-1 || s.prop4.indexOf('/help/ja_JP/rtw/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/rtw/')>-1) {prod="Simulink Coder";}
		else if (s.prop4.indexOf('products/simulink-coder/')>-1 || s.prop4.indexOf('/help/rtw/')>-1 || s.prop4.indexOf('/help/toolbox/rtw/')>-1) {prod="Simulink Coder";}
		else if (s.prop4.indexOf('products/stateflow/')>-1 || s.prop4.indexOf('/help/ja_JP/stateflow/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/stateflow/')>-1) {prod="Stateflow";}
		else if (s.prop4.indexOf('products/stateflow/')>-1 || s.prop4.indexOf('/help/stateflow/')>-1 || s.prop4.indexOf('/help/toolbox/stateflow/')>-1) {prod="Stateflow";}
		else if (s.prop4.indexOf('products/signal/')>-1 || s.prop4.indexOf('/help/ja_JP/signal/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/signal/')>-1) {prod="Signal Processing Toolbox";}
		else if (s.prop4.indexOf('products/signal/')>-1 || s.prop4.indexOf('/help/signal/')>-1 || s.prop4.indexOf('/help/toolbox/signal/')>-1) {prod="Signal Processing Toolbox";}
		else if (s.prop4.indexOf('products/simulink/')>-1 || s.prop4.indexOf('/help/ja_JP/simulink/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/simulink/')>-1) {prod="Simulink";}
		else if (s.prop4.indexOf('products/simulink/')>-1 || s.prop4.indexOf('/help/simulink/')>-1 || s.prop4.indexOf('/help/toolbox/simulink/')>-1) {prod="Simulink";}
		else if (s.prop4.indexOf('products/symbolic/')>-1 || s.prop4.indexOf('/help/ja_JP/symbolic/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/symbolic/')>-1) {prod="Symbolic Math Toolbox";}
		else if (s.prop4.indexOf('products/symbolic/')>-1 || s.prop4.indexOf('/help/symbolic/')>-1 || s.prop4.indexOf('/help/toolbox/symbolic/')>-1) {prod="Symbolic Math Toolbox";}
		else if (s.prop4.indexOf('products/SL_reportgenerator/')>-1 || s.prop4.indexOf('/help/rptgenext/')>-1 || s.prop4.indexOf('/help/toolbox/rptgenext/')>-1) {prod="Simulink Report Generator";}
		else if (s.prop4.indexOf('products/statistics/')>-1 || s.prop4.indexOf('/help/ja_JP/stats/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/stats/')>-1) {prod="Statistics Toolbox";}
		else if (s.prop4.indexOf('products/statistics/')>-1 || s.prop4.indexOf('/help/stats/')>-1 || s.prop4.indexOf('/help/toolbox/stats/')>-1) {prod="Statistics Toolbox";}
		else if (s.prop4.indexOf('products/3d-animation/')>-1 || s.prop4.indexOf('/help/sl3d/')>-1 || s.prop4.indexOf('/help/toolbox/sl3d/')>-1) {prod="Simulink 3D Animation";}
		else if (s.prop4.indexOf('products/wavelet/')>-1 || s.prop4.indexOf('/help/wavelet/')>-1 || s.prop4.indexOf('/help/toolbox/wavelet/')>-1) {prod="Wavelet Toolbox";}
		else if (s.prop4.indexOf('products/rtwt/')>-1 || s.prop4.indexOf('/help/rtwin/')>-1 || s.prop4.indexOf('/help/toolbox/rtwin/')>-1) {prod="Real-Time Windows Target";}
		else if (s.prop4.indexOf('products/xpcembedded/')>-1 || s.prop4.indexOf('/help/xpc/')>-1 || s.prop4.indexOf('/help/toolbox/xpc/')>-1) {prod="xPC Target Embedded Option";}
		else if (s.prop4.indexOf('products/xpctarget/')>-1 || s.prop4.indexOf('/help/xpc/')>-1 || s.prop4.indexOf('/help/toolbox/xpc/')>-1) {prod="xPC Target";}
		else if (s.prop4.indexOf('products/aeroblks/')>-1 || s.prop4.indexOf('/help/aeroblks/')>-1 || s.prop4.indexOf('/help/toolbox/aeroblks/')>-1) {prod="Aerospace Blockset";}
		else if (s.prop4.indexOf('products/matlabxl/')>-1 || s.prop4.indexOf('/help/matlabxl/')>-1 || s.prop4.indexOf('/help/toolbox/matlabxl/')>-1) {prod="MATLAB Builder EX";}
		else if (s.prop4.indexOf('products/simmechanics/')>-1 || s.prop4.indexOf('/help/physmod/sm/')>-1 || s.prop4.indexOf('/help/toolbox/physmod/sm/')>-1) {prod="SimMechanics";}
		else if (s.prop4.indexOf('products/mbc/')>-1 || s.prop4.indexOf('/help/mbc/')>-1 || s.prop4.indexOf('/help/toolbox/mbc/')>-1) {prod="Model-Based Calibration Toolbox";}
		else if (s.prop4.indexOf('products/imaq/')>-1 || s.prop4.indexOf('/help/imaq/')>-1 || s.prop4.indexOf('/help/toolbox/imaq/')>-1) {prod="Image Acquisition Toolbox";}
		else if (s.prop4.indexOf('products/fixedincome/')>-1 || s.prop4.indexOf('/help/finfixed/')>-1 || s.prop4.indexOf('/help/toolbox/finfixed/')>-1) {prod="Fixed-Income Toolbox";}
		else if (s.prop4.indexOf('products/bioinfo/')>-1 || s.prop4.indexOf('/help/bioinfo/')>-1 || s.prop4.indexOf('/help/toolbox/bioinfo/')>-1) {prod="Bioinformatics Toolbox";}
		else if (s.prop4.indexOf('products/filterhdl/')>-1 || s.prop4.indexOf('/help/hdlfilter/')>-1 || s.prop4.indexOf('/help/toolbox/hdlfilter/')>-1) {prod="Filter Design HDL Coder";}
		else if (s.prop4.indexOf('products/fixed/')>-1 || s.prop4.indexOf('/help/ja_JP/fixedpoint/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/fixedpoint/')>-1) {prod="Fixed-Point Toolbox";}
		else if (s.prop4.indexOf('products/fixed/')>-1 || s.prop4.indexOf('/help/fixedpoint/')>-1 || s.prop4.indexOf('/help/toolbox/fixedpoint/')>-1) {prod="Fixed-Point Toolbox";}
		else if (s.prop4.indexOf('products/simfixed/')>-1 || s.prop4.indexOf('/help/ja_JP/fixpoint/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/fixpoint/')>-1) {prod="Simulink Fixed Point";}
		else if (s.prop4.indexOf('products/simfixed/')>-1 || s.prop4.indexOf('/help/fixpoint/')>-1 || s.prop4.indexOf('/help/toolbox/fixpoint/')>-1) {prod="Simulink Fixed Point";}
		else if (s.prop4.indexOf('products/simverification/')>-1 || s.prop4.indexOf('/help/slvnv/')>-1 || s.prop4.indexOf('/help/toolbox/slvnv/')>-1) {prod="Simulink Verification and Validation";}
		else if (s.prop4.indexOf('products/simcontrol/')>-1 || s.prop4.indexOf('/help/ja_JP/slcontrol/')>-1 || s.prop4.indexOf('/help/ja_JP/toolbox/slcontrol/')>-1) {prod="Simulink Control Design";}
		else if (s.prop4.indexOf('products/simcontrol/')>-1 || s.prop4.indexOf('/help/slcontrol/')>-1 || s.prop4.indexOf('/help/toolbox/slcontrol/')>-1) {prod="Simulink Control Design";}
		else if (s.prop4.indexOf('products/opc/')>-1 || s.prop4.indexOf('/help/opc/')>-1 || s.prop4.indexOf('/help/toolbox/opc/')>-1) {prod="OPC Toolbox";}
		else if (s.prop4.indexOf('products/simrf/')>-1 || s.prop4.indexOf('/help/simrf/')>-1 || s.prop4.indexOf('/help/toolbox/simrf/')>-1) {prod="SimRF";}
		else if (s.prop4.indexOf('products/rftoolbox/')>-1 || s.prop4.indexOf('/help/rf/')>-1 || s.prop4.indexOf('/help/toolbox/rf/')>-1) {prod="RF Toolbox";}
		else if (s.prop4.indexOf('products/computer-vision/')>-1 || s.prop4.indexOf('/help/vision/')>-1 || s.prop4.indexOf('/help/toolbox/vision/')>-1) {prod="Computer Vision System Toolbox";}
		else if (s.prop4.indexOf('products/simdrive/')>-1 || s.prop4.indexOf('/help/physmod/sdl/')>-1 || s.prop4.indexOf('/help/toolbox/physmod/sdl/')>-1) {prod="SimDriveline";}
		else if (s.prop4.indexOf('products/parallel-computing/')>-1 || s.prop4.indexOf('/help/distcomp/')>-1 || s.prop4.indexOf('/help/toolbox/distcomp/')>-1) {prod="Parallel Computing Toolbox";}
		else if (s.prop4.indexOf('products/distriben/')>-1 || s.prop4.indexOf('/help/mdce/')>-1 || s.prop4.indexOf('/help/toolbox/mdce/')>-1) {prod="MATLAB Distributed Computing Server";}
		else if (s.prop4.indexOf('products/simbiology/')>-1 || s.prop4.indexOf('/help/simbio/')>-1 || s.prop4.indexOf('/help/toolbox/simbio/')>-1) {prod="SimBiology";}
		else if (s.prop4.indexOf('products/systemtest/')>-1 || s.prop4.indexOf('/help/systemtest/')>-1 || s.prop4.indexOf('/help/toolbox/systemtest/')>-1) {prod="SystemTest";}
		else if (s.prop4.indexOf('products/simevents/')>-1 || s.prop4.indexOf('/help/simevents/')>-1 || s.prop4.indexOf('/help/toolbox/simevents/')>-1) {prod="SimEvents";}
		else if (s.prop4.indexOf('products/netbuilder/')>-1 || s.prop4.indexOf('/help/dotnetbuilder/')>-1 || s.prop4.indexOf('/help/toolbox/dotnetbuilder/')>-1) {prod="MATLAB Builder NE";}
		else if (s.prop4.indexOf('products/simhydraulics/')>-1 || s.prop4.indexOf('/help/physmod/hydro/')>-1 || s.prop4.indexOf('/help/toolbox/physmod/hydro/')>-1) {prod="SimHydraulics";}
		else if (s.prop4.indexOf('products/aerotb/')>-1 || s.prop4.indexOf('/help/aerotbx/')>-1 || s.prop4.indexOf('/help/toolbox/aerotbx/')>-1) {prod="Aerospace Toolbox";}
		else if (s.prop4.indexOf('products/javabuilder/')>-1 || s.prop4.indexOf('/help/javabuilder/')>-1 || s.prop4.indexOf('/help/toolbox/javabuilder/')>-1) {prod="MATLAB Builder JA";}
		else if (s.prop4.indexOf('products/hdl-coder/')>-1 || s.prop4.indexOf('/help/hdlcoder/')>-1 || s.prop4.indexOf('/help/toolbox/hdlcoder/')>-1) {prod="HDL Coder";}
		else if (s.prop4.indexOf('products/simscape/')>-1 || s.prop4.indexOf('/access/helpdesk/help/physmod/simscape/')>-1 || s.prop4.indexOf('/access/helpdesk/help/toolbox/physmod/simscape/')>-1) {prod="Simscape";}
		else if (s.prop4.indexOf('products/sldesignverifier/')>-1 || s.prop4.indexOf('/help/sldv/')>-1 || s.prop4.indexOf('/help/toolbox/sldv/')>-1) {prod="Simulink Design Verifier";}
		else if (s.prop4.indexOf('products/polyspaceclientc/')>-1 || s.prop4.indexOf('/help/polyspace/')>-1 || s.prop4.indexOf('/help/toolbox/polyspace/')>-1) {prod="Polyspace Client for C/C++";}
		else if (s.prop4.indexOf('products/polyspaceclientada/')>-1 || s.prop4.indexOf('/help/polyspace/')>-1 || s.prop4.indexOf('/help/toolbox/polyspace/')>-1) {prod="Polyspace Client for Ada";}
		else if (s.prop4.indexOf('products/polyspaceserverc/')>-1 || s.prop4.indexOf('/help/polyspace/')>-1 || s.prop4.indexOf('/help/toolbox/polyspace/')>-1) {prod="Polyspace Server for C/C++";}
		else if (s.prop4.indexOf('products/polyspaceserverada/')>-1 || s.prop4.indexOf('/help/polyspace/')>-1 || s.prop4.indexOf('/help/toolbox/polyspace/')>-1) {prod="Polyspace Server for Ada";}
		else if (s.prop4.indexOf('products/polyspacemodelsl/')>-1 || s.prop4.indexOf('/help/polyspace/')>-1 || s.prop4.indexOf('/help/toolbox/polyspace/')>-1) {prod="Polyspace Model Link SL";}
		else if (s.prop4.indexOf('products/polyspacemodeltl/')>-1 || s.prop4.indexOf('/help/polyspace/')>-1 || s.prop4.indexOf('/help/toolbox/polyspace/')>-1) {prod="Polyspace Model Link TL";}
		else if (s.prop4.indexOf('products/polyspaceumlrh/')>-1 || s.prop4.indexOf('/help/polyspace/')>-1 || s.prop4.indexOf('/help/toolbox/polyspace/')>-1) {prod="Polyspace UML Link RH";}
		else if (s.prop4.indexOf('products/simelectronics/')>-1 || s.prop4.indexOf('/help/physmod/elec/')>-1 || s.prop4.indexOf('/help/toolbox/physmod/elec/')>-1) {prod="SimElectronics";}
		else if (s.prop4.indexOf('products/econometrics/')>-1 || s.prop4.indexOf('/help/econ/')>-1 || s.prop4.indexOf('/help/toolbox/econ/')>-1) {prod="Econometrics Toolbox";}
		else if (s.prop4.indexOf('products/vehicle-network/')>-1 || s.prop4.indexOf('/help/vnt/')>-1 || s.prop4.indexOf('/help/toolbox/vnt/')>-1) {prod="Vehicle Network Toolbox";}
		else if (s.prop4.indexOf('products/sl-design-optimization/')>-1 || s.prop4.indexOf('/help/sldo/')>-1 || s.prop4.indexOf('/help/toolbox/sldo/')>-1) {prod="Simulink Design Optimization";}
		else if (s.prop4.indexOf('products/do-178/')>-1 || s.prop4.indexOf('/help/qualkitdo/')>-1 || s.prop4.indexOf('/help/toolbox/qualkitdo/')>-1) {prod="DO Qualification Kit";}
		else if (s.prop4.indexOf('products/iec-61508/')>-1 || s.prop4.indexOf('/help/certkitiec/')>-1 || s.prop4.indexOf('/help/toolbox/certkitiec/')>-1) {prod="IEC Certification Kit";}
		else if (s.prop4.indexOf('products/hdl-verifier/')>-1 || s.prop4.indexOf('/help/edalink/')>-1 || s.prop4.indexOf('/help/toolbox/edalink/')>-1) {prod="HDL Verifier";}
		else if (s.prop4.indexOf('products/matlab/')>-1 || s.prop4.indexOf('/help/ja_JP/techdoc/')>-1 || s.prop4.indexOf('/help/ja_JP/techdoc/')>-1) {prod="MATLAB";}
		else if (s.prop4.indexOf('products/matlab/')>-1 || s.prop4.indexOf('/help/techdoc/')>-1 || s.prop4.indexOf('/help/techdoc/')>-1) {prod="MATLAB";}
		else if (s.prop4.indexOf('products/sl-plc-coder/')>-1 || s.prop4.indexOf('/help/plccoder/')>-1 || s.prop4.indexOf('/help/toolbox/plccoder/')>-1) {prod="Simulink PLC Coder";}
		else if (s.prop4.indexOf('products/global-optimization/')>-1 || s.prop4.indexOf('/help/gads/')>-1 || s.prop4.indexOf('/help/toolbox/gads/')>-1) {prod="Global Optimization Toolbox";}
		else if (s.prop4.indexOf('products/matlab-coder/')>-1 || s.prop4.indexOf('/help/coder/')>-1 || s.prop4.indexOf('/help/toolbox/coder/')>-1) {prod="MATLAB Coder";}
		else if (s.prop4.indexOf('products/phased-array/')>-1 || s.prop4.indexOf('/help/phased/')>-1 || s.prop4.indexOf('/help/toolbox/phased/')>-1) {prod="Phased Array System Toolbox";}
		else if (s.prop4.indexOf('products/simulink-code-inspector/')>-1 || s.prop4.indexOf('/help/slci')>-1 || s.prop4.indexOf('/help/toolbox/slci')>-1) {prod="Simulink Code Inspector";}
		else prod = "unknown";

		prod = prod.toLowerCase();
		return prod;		
	}
	else {
		queryval=s.getQueryParam(type);
		queryval=queryval.toLowerCase();
		switch (queryval) {
		case "cm": prod = "communications system toolbox"; break;
		case "ct": prod = "control system toolbox"; break;
		case "db": prod = "database toolbox"; break;
		case "ds": prod = "dsp system toolbox"; break;
		case "el": prod = "spreadsheet link ex"; break;
		case "fi": prod = "financial toolbox"; break;
		case "fp": prod = "simulink fixed point"; break;
		case "fl": prod = "fuzzy logic toolbox"; break;
		case "ip": prod = "image processing toolbox"; break;
		case "mg": prod = "mapping toolbox"; break;
		case "ml": prod = "matlab"; break;
		case "co": prod = "matlab compiler"; break;
		case "mp": prod = "model predictive control toolbox"; break;
		case "nn": prod = "neural network toolbox"; break;
		case "op": prod = "optimization toolbox"; break;
		case "pd": prod = "partial differential equation toolbox"; break;
		case "ps": prod = "simpowersystems"; break;
		case "rt": prod = "simulink coder"; break;
		case "rc": prod = "robust control toolbox"; break;
		case "sg": prod = "signal processing toolbox"; break;
		case "sl": prod = "simulink"; break;
		case "sf": prod = "stateflow"; break;
		case "st": prod = "statistics toolbox"; break;
		case "sm": prod = "symbolic math toolbox"; break;
		case "id": prod = "system identification toolbox"; break;
		case "wa": prod = "wavelet toolbox"; break;
		case "da": prod = "data acquisition toolbox"; break;
		case "dg": prod = "gauges blockset"; break;
		case "mr": prod = "matlab report generator"; break;
		case "sr": prod = "simulink report generator"; break;
		case "wt": prod = "real-time windows target"; break;
		case "sv": prod = "matlab & simulink student version"; break;
		case "df": prod = "datafeed toolbox"; break;
		case "xp": prod = "xpc target"; break;
		case "xe": prod = "xpc target embedded option"; break;
		case "cf": prod = "curve fitting toolbox"; break;
		case "ic": prod = "instrument control toolbox"; break;
		case "de": prod = "financial derivatives toolbox"; break;
		case "ec": prod = "embedded coder"; break;
		case "vr": prod = "simulink 3d animation"; break;
		case "eb": prod = "matlab builder ex"; break;
		case "mb": prod = "model-based calibration toolbox"; break;
		case "ms": prod = "simmechanics"; break;
		case "ae": prod = "aerospace blockset"; break;
		case "ia": prod = "image acquisition toolbox"; break;
		case "fx": prod = "fixed-income toolbox"; break;
		case "sd": prod = "simulink control design"; break;
		case "bi": prod = "bioinformatics toolbox"; break;
		case "gd": prod = "global optimization toolbox"; break;
		case "vv": prod = "simulink verification and validation"; break;
		case "rf": prod = "rf toolbox"; break;
		case "rb": prod = "simrf"; break;
		case "fh": prod = "filter design hdl coder"; break;
		case "ot": prod = "opc toolbox"; break;
		case "po": prod = "fixed-point toolbox"; break;
		case "sb": prod = "simbiology"; break;
		case "vp": prod = "computer vision system toolbox"; break;
		case "ld": prod = "simdriveline"; break;
		case "dm": prod = "parallel computing toolbox"; break;
		case "dw": prod = "matlab distributed computing server"; break;
		case "se": prod = "simevents"; break;
		case "mn": prod = "matlab builder ne"; break;
		case "sh": prod = "simhydraulics"; break;
		case "sy": prod = "systemtest"; break;
		case "hd": prod = "hdl coder"; break;
		case "mj": prod = "matlab builder ja"; break;
		case "at": prod = "aerospace toolbox"; break;
		case "dv": prod = "simulink design verifier"; break;
		case "ss": prod = "simscape"; break;
		case "pf": prod = "polyspace server for ada"; break;
		case "pg": prod = "polyspace model link sl"; break;
		case "pc": prod = "polyspace client for c/c++"; break;
		case "ph": prod = "polyspace model link tl"; break;
		case "pi": prod = "polyspace uml link rh"; break;
		case "pa": prod = "polyspace client for ada"; break;
		case "pb": prod = "polyspace server for c/c++"; break;
		case "aa": prod = "al's toolbox"; break;
		case "bx": prod = "bryans toolbox"; break;
		case "sn": prod = "simelectronics"; break;
		case "et": prod = "econometrics toolbox"; break;
		case "vn": prod = "vehicle network toolbox"; break;
		case "so": prod = "simulink design optimization"; break;
		case "ar": prod = "phased array system toolbox"; break;
		case "do": prod = "do qualification kit"; break;
		case "ie": prod = "iec certification kit"; break;
		case "es": prod = "hdl verifier"; break;
		case "pl": prod = "simulink plc coder"; break;
		case "ci": prod = "simulink code inspector"; break;
		case "me": prod = "matlab coder"; break;
		case "hm": prod = "simulink hmi design"; break;
		case "it": prod = "financial instruments toolbox"; break;
		case "pr": prod = "matlab production server"; break;

		default:
			prod = "unknown";
			break;
		}
		prod = prod.toLowerCase();
		return prod;
		
	}
}

function prodgroup (prod){
		prod = prod.toLowerCase();
		switch (prod) {
		case "aerospace blockset": prodgrp="v1 control systems"; break;
		case "aerospace toolbox": prodgrp="v1 control systems"; break;
		case "al's toolbox": prodgrp="unknown"; break;
		case "bioinformatics toolbox": prodgrp="v5 computational biology"; break;
		case "bryans toolbox": prodgrp="unknown"; break;
		case "communications system toolbox": prodgrp="v2 signal processing and communications"; break;
		case "computer vision system toolbox": prodgrp="v3 image processing and computer vision"; break;
		case "control system toolbox": prodgrp="v1 control systems"; break;
		case "curve fitting toolbox": prodgrp="m2 math, statistics, and optimization"; break;
		case "data acquisition toolbox": prodgrp="v4 test and measurement"; break;
		case "database toolbox": prodgrp="v6 computational finance"; break;
		case "datafeed toolbox": prodgrp="v6 computational finance"; break;
		case "do qualification kit": prodgrp="s6 embedded code generation"; break;
		case "dsp system toolbox": prodgrp="v2 signal processing and communications"; break;
		case "econometrics toolbox": prodgrp="v6 computational finance"; break;
		case "embedded coder": prodgrp="s6 embedded code generation"; break;
		case "filter design hdl coder": prodgrp="s7 hdl code generation and verification"; break;
		case "financial derivatives toolbox": prodgrp="v6 computational finance"; break;
		case "financial instruments toolbox": prodgrp="unknown"; break;
		case "financial toolbox": prodgrp="v6 computational finance"; break;
		case "fixed-income toolbox": prodgrp="v6 computational finance"; break;
		case "fixed-point toolbox": prodgrp="s6 embedded code generation"; break;
		case "fuzzy logic toolbox": prodgrp="v1 control systems"; break;
		case "gauges blockset": prodgrp="s1 simulink and stateflow"; break;
		case "global optimization toolbox": prodgrp="m2 math, statistics, and optimization"; break;
		case "hdl coder": prodgrp="s7 hdl code generation and verification"; break;
		case "hdl verifier": prodgrp="s7 hdl code generation and verification"; break;
		case "iec certification kit": prodgrp="s6 embedded code generation"; break;
		case "image acquisition toolbox": prodgrp="v3 image processing and computer vision"; break;
		case "image processing toolbox": prodgrp="v3 image processing and computer vision"; break;
		case "instrument control toolbox": prodgrp="v4 test and measurement"; break;
		case "mapping toolbox": prodgrp="v3 image processing and computer vision"; break;
		case "matlab": prodgrp="m1 matlab"; break;
		case "matlab & simulink student version": prodgrp="e1 edu"; break;
		case "matlab builder ex": prodgrp="m3 application deployment"; break;
		case "matlab builder ja": prodgrp="m3 application deployment"; break;
		case "matlab builder ne": prodgrp="m3 application deployment"; break;
		case "matlab coder": prodgrp="s6 embedded code generation"; break;
		case "matlab compiler": prodgrp="m3 application deployment"; break;
		case "matlab distributed computing server": prodgrp="m4 parallel computing"; break;
		case "matlab production server": prodgrp="unknown"; break;
		case "matlab report generator": prodgrp="s1 simulink and stateflow"; break;
		case "model predictive control toolbox": prodgrp="v1 control systems"; break;
		case "model-based calibration toolbox": prodgrp="m2 math, statistics, and optimization"; break;
		case "neural network toolbox": prodgrp="m2 math, statistics, and optimization"; break;
		case "opc toolbox": prodgrp="v4 test and measurement"; break;
		case "optimization toolbox": prodgrp="m2 math, statistics, and optimization"; break;
		case "parallel computing toolbox": prodgrp="m4 parallel computing"; break;
		case "partial differential equation toolbox": prodgrp="m2 math, statistics, and optimization"; break;
		case "phased array system toolbox": prodgrp="v2 signal processing and communications"; break;
		case "polyspace client for ada": prodgrp="p1 polyspace embedded code verification"; break;
		case "polyspace client for c/c++": prodgrp="p1 polyspace embedded code verification"; break;
		case "polyspace model link sl": prodgrp="p1 polyspace embedded code verification"; break;
		case "polyspace model link tl": prodgrp="p1 polyspace embedded code verification"; break;
		case "polyspace server for ada": prodgrp="p1 polyspace embedded code verification"; break;
		case "polyspace server for c/c++": prodgrp="p1 polyspace embedded code verification"; break;
		case "polyspace uml link rh": prodgrp="p1 polyspace embedded code verification"; break;
		case "real-time windows target": prodgrp="s4 rapid prototyping and hil simulation"; break;
		case "rf toolbox": prodgrp="v2 signal processing and communications"; break;
		case "robust control toolbox": prodgrp="v1 control systems"; break;
		case "signal processing toolbox": prodgrp="v2 signal processing and communications"; break;
		case "simbiology": prodgrp="v5 computational biology"; break;
		case "simdriveline": prodgrp="s3 physical modeling"; break;
		case "simelectronics": prodgrp="s3 physical modeling"; break;
		case "simevents": prodgrp="s2 discrete event simulation"; break;
		case "simhydraulics": prodgrp="s3 physical modeling"; break;
		case "simmechanics": prodgrp="s3 physical modeling"; break;
		case "simpowersystems": prodgrp="s3 physical modeling"; break;
		case "simrf": prodgrp="v2 signal processing and communications"; break;
		case "simscape": prodgrp="s3 physical modeling"; break;
		case "simulink": prodgrp="s1 simulink and stateflow"; break;
		case "simulink 3d animation": prodgrp="s1 simulink and stateflow"; break;
		case "simulink code inspector": prodgrp="s6 embedded code generation"; break;
		case "simulink coder": prodgrp="s6 embedded code generation"; break;
		case "simulink control design": prodgrp="v1 control systems"; break;
		case "simulink design optimization": prodgrp="v1 control systems"; break;
		case "simulink design verifier": prodgrp="s5 model verification and validation"; break;
		case "simulink fixed point": prodgrp="s6 embedded code generation"; break;
		case "simulink hmi design": prodgrp="s1 simulink and stateflow"; break;
		case "simulink plc coder": prodgrp="s6 embedded code generation"; break;
		case "simulink report generator": prodgrp="s1 simulink and stateflow"; break;
		case "simulink verification and validation": prodgrp="s5 model verification and validation"; break;
		case "spreadsheet link ex": prodgrp="v6 computational finance"; break;
		case "stateflow": prodgrp="s1 simulink and stateflow"; break;
		case "statistics toolbox": prodgrp="m2 math, statistics, and optimization"; break;
		case "symbolic math toolbox": prodgrp="m2 math, statistics, and optimization"; break;
		case "system identification toolbox": prodgrp="v1 control systems"; break;
		case "systemtest": prodgrp="s5 model verification and validation"; break;
		case "unknown tmw": prodgrp="z2 obsolete"; break;
		case "vehicle network toolbox": prodgrp="v4 test and measurement"; break;
		case "wavelet toolbox": prodgrp="v2 signal processing and communications"; break;
		case "xpc target": prodgrp="s4 rapid prototyping and hil simulation"; break;
		case "xpc target embedded option": prodgrp="s4 rapid prototyping and hil simulation"; break;
	
		default:
			prodgrp = "unknown";
			break;
		}
		prodgrp = prodgrp.toLowerCase();
		return prodgrp;
}


var cvURL = unescape(document.URL);
cvURL = cvURL.toLowerCase();
cvURL = undorewrite(cvURL);

var refURL = unescape(document.referrer);
refURL = refURL.toLowerCase();
refURL = undorewrite(refURL);
/* Set report suite ID dynamically based on domain */
//var s_account="mathglobaltest";
ReportSuiteID = cfCheckRSID(cvURL);
var s_account = ReportSuiteID;

if (cvURL.indexOf('www-external-')>-1 || cvURL.indexOf('.dhcp.mathworks.')>-1){
	var s_account = "mathglobaltest";
}



var s=s_gi(s_account);


// Function to return s_account for Flash Video tracking
s.bcAccount = function(){
	return s_account;
}
s.bcInfo = function(){
	var s=this;
	return "prop24|"+s.pageName+"^prop27|"+s.pageURL+"^prop25|"+document.referrer.toString();
}

/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.charSet="UTF-8";
/* Conversion Config */
s.currencyCode="USD";
/* Link Tracking Config */

s.trackDownloadLinks	=	true;
s.trackExternalLinks	=	true;
s.trackInlineStats		=	true;
s.linkDownloadFileTypes	=	"exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx,dmg";
s.linkInternalFilters	=	"javascript:,mathworks.";
s.linkLeaveQueryString	=	false;
s.linkTrackVars			=	"None";
s.linkTrackEvents		=	"None";
s.visitorNamespace		=	"mathworks";

/* Channel Manager Plugin Config */
/*Left out -'Internal Banner Ad' then 'IBA_ Remove adw_ in production*/
s._channelPattern="Paid Search|ppc_>Paid Social Ad|psb_>Paid Social Media|psm_>External Promotion|pep_>Partner Promotion|prp_>Paid Search|adw_"
s._channelParameter="Email|s_v1"
s._channelDomain="Social Media|facebook.com,linkedin.com,twitter.com,orkut.com,friendster.com,livejournal.com,blogspot.com,wordpress.com,friendfeed.com,myspace.com,digg.com,reddit.com,stumbleupon.com,twine.com,yelp.com,mixx.com,delicious.com,tumblr.com,disqus.com,intensedebate.com,plurk.com,slideshare.net,backtype.com,netvibes.com,mister-wong.com,diigo.com,flixster.com,youtube.com,vimeo.com,12seconds.tv,zooomr.com,identi.ca,jaiku.com,flickr.com,imeem.com,dailymotion.com,photobucket.com,fotolog.com,smugmug.com,classmates.com,myyearbook.com,mylife.com,tagged.com,brightkite.com,ning.com,bebo.com,hi5.com,yuku.com,cafemom.com,xanga.com"

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
// FPC Migration
s.trackingServer="metrics.mathworks.com"
s.trackingServerSecure="smetrics.mathworks.com"
s.visitorMigrationKey="51AA1C7A"
s.visitorMigrationServer="mathworks.com.ssl.sc.omtrdc.net"
s.visitorMigrationServerSecure="mathworks.com.ssl.d1.sc.omtrdc.net"

/************************** CONFIG SECTION END **************************/


s.usePlugins	=	true;
function s_doPlugins(s) 
{

	/*	Set PageName	*/
	if (!window.s.pageType) {
		s.pageName=cfUtility(cvURL,'pagename');
	}
	
	/*	Set Channel	*/
	s.channel=cfUtility(cvURL,'channel');
	
	/*	Set Server	*/
	s.server=cfUtility(cvURL,'server');

	if ((cvURL.indexOf('blogs.mathworks.')>-1) && (s.channel=="/")) 
	{
		s.channel="blogs index page";
		if (!window.s.pageType){
			s.pageName="blogs index page";
		}
		s.prop32="blogs";
		
	}
	else if (s.channel=="/") 
	{
		s.channel="homepage";
		if (!window.s.pageType){
			s.pageName="homepage"; 
		}
	}

	/* Set URL Page Name */
	if (s.channel=="homepage" || s.channel=="blogs index page"){
		s.prop4 = s.server;
	}
	else {
		s.prop4 = s.server+ cfUtility(cvURL,'pagename');
	}
	
	/* Some exceptions when file= query string param is present */
	if (s.getQueryParam('file') != "")
	{
		if (!window.s.pageType){
			s.pageName=cfUtility(cvURL,'pagename')+"?file="+s.getQueryParam('file');
		}
	s.prop4 = s.server+s.channel+"?file="+s.getQueryParam('file');
	}
	
	String.prototype.replaceAll = function(str1, str2, ignore){
   		return this.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function(c){return "\\" + c;}), "g"+(ignore?"i":"")), str2);
	};

	/* setting prop33 for WSM URL Pagename*/
	s.prop33=s.prop4.replaceAll("/","::"); 
	
	/*setting blank prop17 for WSM lead generator type*/
	s.prop17="BLANK";
			
	/*  Set Site Section, Sub Sections */
	cvSplit = s.channel.split("/");
	if ((s.prop5 == null || s.prop5 == "") && cvSplit[1] != null && cvSplit[1] != "") s.prop5 = cvSplit[1];
	if (cvSplit[2] != null && cvSplit[2] != "") s.prop6 = s.prop5 + "/" + cvSplit[2]; 
	if (cvSplit[3] != null && cvSplit[3] != "") s.prop7 = s.prop6 + "/" + cvSplit[3]; 
	
	/* Get new and legacy campaign parameters from URL */
	if (s.getQueryParam('s_eid') != "") {
		s.campaign = s.eVar13=s.getValOnce(s.getQueryParam('s_eid')); // wrap getValonce plugin
	} 
	else if (s.getQueryParam('s_v1') != "") {
		var tmpv1 = s.getQueryParam('s_v1');
		if(tmpv1.indexOf('_') > 0) {
	      	s.campaign=tmpv1.substring(0,tmpv1.indexOf('_'));
		}
        else {
        	s.campaign=tmpv1;
        }
		//Email opened - prop56
		s.prop56=s.getQueryParam('s_v1');
        // de-duplicate campaign variable to keep from inflating values
        s.campaign=s.getValOnce(s.campaign,'s_campaign',0);
		//s.eVar1=s.campaign;
		s.eVar1='D=v0';
		//s.campaign = s.eVar1=s.getValOnce(s.getQueryParam('s_v1'));
	} 
	
	if (s.getQueryParam('s_tid') != "") {
		s.eVar14 = s.getValOnce(s.getQueryParam('s_tid'));
		//s.prop22=s.eVar14;
		s.prop22='D=v14';
	} 
	if (s.getQueryParam('s_iid') != "") {
		s.eVar15 = s.getValOnce(s.getQueryParam('s_iid'));
		//s.prop23=s.eVar15;
		s.prop23='D=v15';
	} 
	if (s.getQueryParam('s_cid') != "") {
		s.eVar35 = s.getValOnce(s.getQueryParam('s_cid'));
	} 

	if (s.campaign != '') {
		s.prop1=s.getAndPersistValue(s.campaign,'s_cmp_pages',0); 
	}
	if (s.prop1 != '') { 
		if (!window.s.pageType){
			//s.prop2=s.prop1 +"||"+ s.pageName; 
			s.prop2='D=c1+"||"+pageName';
		}
	}
	
	if (s.eVar1 != '') {
		s.prop12=s.getAndPersistValue(s.eVar1,'s_email_pages',0); 
	}
	if (s.prop12 != '') { 
		if (!window.s.pageType){
			//s.prop13=s.prop12 +"||"+ s.pageName; 
			s.prop13='D=c12+"||"+pageName';
		}
	}
	
	if (s.eVar35 != '') {s.prop8=s.getAndPersistValue(s.eVar35,'s_old_pages',0); }
	if (s.prop8 != '') { 
		if (!window.s.pageType){
			//s.prop9=s.prop8 +"||"+ s.pageName; 
			s.prop9='D=c8+"||"+pageName';
		}
	}
	
	/*	Set Page Title and Full URL*/
	s.prop35=document.title.toLowerCase();
	//s.prop34="D=g";
	s.prop34=decodeURI(cvURL);
	
	
	/*	Capturing referrer and previous page information	*/
	if (cfUtility(refURL,'server').search("mathworks.") != -1){
		s.prop10= cfUtility(refURL,'server');
		s.prop28= s.getPreviousValue(s.prop35,'c_c35','');
		refSplit = cfUtility(refURL,'channel').split("/");
		if ((s.prop19 == null || s.prop19 == "") && refSplit[1] != null && refSplit[1] != "") s.prop19 = refSplit[1];
		if (refSplit[2] != null && refSplit[2] != "") s.prop20 = s.prop19 + "/" + refSplit[2]; 
		if (refSplit[3] != null && refSplit[3] != "") s.prop21 = s.prop20 + "/" + refSplit[3]; 
		//s.prop42="D=r";
		s.prop42=decodeURI(refURL);
		s.prop29=cfUtility(refURL,'server')+cfUtility(refURL,'channel')+cfUtility(refURL,'filename');
		/* Get previous value of product name, group, artifact type and lead generator. Copied from old s_code	*/
		s.prop38= s.getPreviousValue(s.prop30,'c_c30','');
		s.prop39= s.getPreviousValue(s.prop31,'c_c31','');
		s.prop40= s.getPreviousValue(s.prop32,'c_c32','');
		//s.prop41= s.getPreviousValue(s.prop33,'c_c33','');
		/* Capturing CTA location	*/
		if (s.prop29 && s.getQueryParam('s_iid') != ""){
			//s.eVar28=s.prop29;	
			s.eVar28='D=c29';
			s.eVar54='D=c40';
		}
	}
	
	
	/* Set Internal Search Phrase	*/
	if (s.getQueryParam('q') != '') { 
		s.eVar3=s.getQueryParam('q'); 
		s.prop3=s.getQueryParam('q'); 
	}
	if (s.getQueryParam('qdoc') != '') { 
		s.eVar3=s.getQueryParam('qdoc')+':: lucene'; 
		s.prop3=s.getQueryParam('qdoc')+':: lucene';
	}
	
	/* Set MWA Unique ID, Omniture Visitor ID & MW Gen. Unique Visit ID	*/
	if (document.cookie.match('MW_AL')) { 
		s.eVar4='logged in'; 
	}
	else { 
		s.eVar4='not logged in'; 
	}
	if (document.cookie.match('MW_AL')) { 
		s.eVar5=s.c_r('MW_AL'); 
		s.prop16=s.c_r('MW_AL'); 
	}
	
	/* New or Repeat Visit and Days Since Last Visit*/
	s.eVar6=s.getNewRepeat();
	s.eVar9=s.getDaysSinceLastVisit();
	
	
	/*	Identify first page of visit	*/
	var tmp	= s.getVisitStart('c_vs');	 
	if (tmp == 1)	{
		s.prop15 = 'Yes';
		s.eVar29= Math.floor(Math.random()*1000000); // Random number
		//s.eVar25=s.prop35;
		s.eVar25='D=c35';
		if (!window.s.pageType){
			//s.eVar26=s.pageName;
			s.eVar26='D=pageName';
		}
		//s.eVar27=s.server;
		s.eVar27='D=server';
		var ts = Math.round((new Date()).getTime() / 1000);
		s.eVar34=s.eVar29+'::'+ts; // Random number+Unix time stamp
	}
	
	if (s.eVar29 != '') {
		s.prop26=s.getAndPersistValue(s.eVar29,'c_rand',0); 
	}
	if (s.eVar34 != '') {
		s.prop14=s.getAndPersistValue(s.eVar34,'c_sess',0); 
	}	
	
	/*	Last Seminar Viewed	*/
	if (s.prop4.search("/company/events/seminars/seminar") != -1) { 
		//s.eVar12 = s.prop35;
		s.eVar12='D=c35';
	}
	
	/*	Recruiting source	*/
	if (s.prop4.search("/company/jobs/") != -1 && s.getQueryParam('src') != '')	{ 
		s.eVar19 =s.getQueryParam('src');
	}
	
	
	/* Setting MW Lead Submit ID on confirmation pages */
	if (s.getQueryParam('wfsid') != ''){
		s.prop53 = s.getQueryParam('wfsid');
	}
	
	/*	Success Events - Pls. work in Korean Conf. event59 & event51 in old code	*/
		
	// Trial Confirmation
	if (s.prop53){
		if (s.prop4.search("/programs/trials/trial_confirmation.html") != -1 ||
			s.prop4.search("-trial-request-conf") != -1||
			s.prop4.search("/programs/trials/earlyvv_trials_confirmation.html") != -1||
			s.prop4.search("/programs/nrd/matlab-trial-request-conf") != -1 ||
			s.prop4.search("/programs/nrd/buy-matlab-get-price-request-conf") !=-1 ||
			s.prop35.search("trial software request confirmation") != -1){
			s.events='event1:'+s.prop53+',event24:'+s.prop53; 
			s.eVar8='Trial Requested';
		}
	
		// Contact Sales
		if (s.prop4.search("/company/aboutus/contact_us/confirmation.html") != -1) { 
			s.events='event2:'+s.prop53+',event24:'+s.prop53; 
			s.eVar8='Contact Sales';
		}
	
		// TechKit Requested
		if (s.prop4.search("/cmspro/conf") != -1 || 
			s.prop4.search("/techkit/conf") != -1 || 
			s.prop4.search("conf_techkit") != -1 ||
			(s.prop4.search("/techkits/") != -1 && s.prop4.search("conf") != -1) ||
			(s.prop4.search("techkits") != -1 && s.prop4.search("conf") != -1) ||
			s.prop4.search("/student_version/techkit_conf") != -1) {
			s.events='event3:'+s.prop53+',event24:'+s.prop53;  
			s.eVar8='Techkit Requested';
		}	
	
		// Event Registration
		if (s.prop4.search("/company/events/seminars/intl_reg_conf_page.html") != -1) {
			s.events ='event4:'+s.prop53+',event6:'+s.prop53+',event24:'+s.prop53;  
			s.eVar8 = 'Seminar Registration';
		}
		else if (s.prop4.search("/webinars/webinarconf.html") != -1) { 
			//var id= s.getQueryParam('id'); // to be used for deduping - not required because of wfsid
			s.events='event4:'+s.prop53+',event7:'+s.prop53+',event24:'+s.prop53; 
			s.eVar8 = 'Recorded Webinar Registration';
		}	
		else if (s.prop4.search("/webinars/upcomingconf.html") != -1) { 
			//var id= s.getQueryParam('id'); // to be used for deduping - not required because of wfsid
			s.events='event4:'+s.prop53+',event8:'+s.prop53+',event24:'+s.prop53;  
			s.eVar8 = 'Live Webinar Registration'; 
		}
		else if ( s.prop4.search("events/conferences/matlab-tour/confirmation.html") !=-1 ||
			(s.prop4.search("/company/events/") != -1 && s.prop4.search("tour") != -1 && s.prop4.search("confirmation.html") != -1)) { 
			s.events='event4:'+s.prop53+',event9:'+s.prop53+',event24:'+s.prop53;  //tour registration 
			s.eVar8 = 'Tour Registration'; 
		}
		else if (s.prop4.search("company/events/conferences/") != -1 && s.prop4.search("confirmation.html") !=-1){
			s.events='event4:'+s.prop53+',event10:'+s.prop53+',event24:'+s.prop53; //conference registration
			s.eVar8='Conference Registration';
		}
		else if (s.prop4.search("services/training/confirm_training.html") != -1) {
			s.events='event11:'+s.prop53+',event24:'+s.prop53;  // Contacted Training
			s.eVar8='Contacted Training';
		}
		else if (s.prop4.search("services/training/conf_brochure.html") != -1) {
			s.events='event13:'+s.prop53+',event24:'+s.prop53;  // Training Brochure Requested
			s.eVar8='Training Brochure Requested';
		}
		else if (s.prop4.search("/academia/student_center/tutorials/") != -1 && s.prop4.search("launchpad") != -1) { 
			s.events='event14:'+s.prop53+',event24:'+s.prop53;  // Tutorial Registration
			s.eVar8='Tutorial Registration';
		}
		else if (s.prop4.search("support/contact_us/renewal_confirm.html") != -1) {
			s.events='event16:'+s.prop53+',event24:'+s.prop53;  // SMS Renewal Requested
			s.eVar8='SMS Renewal Requested';
		}
		else if (s.prop4.search("company/aboutus/contact_us/quote_confirmation.html") != -1) {
			s.events='event17:'+s.prop53+',event24:'+s.prop53;  // Sales Quote Requested
			s.eVar8='Sales Quote Requested';
		}
		else if (s.prop4.search("academia/student_version/eval_confirmation.html") != -1){
			s.events='event21:'+s.prop53+',event24:'+s.prop53;  //SV Evaluation Requested
			s.eVar8='SV Eval Requested';
		}
	}
	
	if (s.prop4.search("/company/jobs/apply/job_bids/confirmation") != -1 || s.prop4.search("/company/jobs/apply/quick_apply/verify")!=-1) { 
			s.events='event20'; // Resume Submitted
		}
	else if (s.prop4.search("emailoptions/mailings/confirmation") !=-1) {
		s.events='event12'; // Email Opt-Out Confirmation
	
	}
	else if (s.prop4.search("/support/service_requests/submitaction.do") != -1) {
		s.events='event15'; // Service Request Submitted
	}
	/*else if (s.server.search(".co.kr") != -1 && s.prop4.search("company/events/conferences/technology-conference-korea/proceedings") !=-1 &&
		(s.prop4.search("i1-model-based-design.html")!= -1 || s.prop4.search("d4-image-video-processing.html") !=-1 || 
		s.prop4.search("v2-early-verification.html")!= -1 || s.prop4.search("i2-signal-processing.html")!= -1||
		s.prop4.search("i4-vihecle-design-optimization.html")!= -1||s.prop4.search("d1-sytem-toolbox.html")!= -1 )) {
			s.events='event22'; //KR Conf Proceedings Watched
			//s.eVar8 = 'Korean Conference Proceedings Watched';
	}*/
	else if (s.prop4.search("/programs/customersat/confirmation.html") != -1) { 
		s.events='event23'; // CustomerSat Confirmation
	}
	else if (s.prop4.search("/expert_contact_conf.html") !=-1 || s.prop4.search("/expert-contact-confirmation.html") != -1) {
		s.events='event25'; // Expert contacted
	}
	
	/*	Code to get Google referrer information	*/
	s.getGoogleRank('event18','event19','eVar17','eVar18');
	if(s.events){
		if((s.events+',').indexOf('event18,')>-1){
			if (!window.s.pageType){
				s.hier1=s.eVar17+"|"+s.pageName+"|"+s.eVar18;
				s.hier2=s.pageName+"|"+s.eVar18+"|"+s.eVar17+"|";
			}
		}
	}
	
	
	/* Channel Manager v2.4	*/
		s.channelManager('s_eid,s_v1',':','c_cm','','s_dl',0);
		if (s._channel != "" || s._channel != undefined){
			s.eVar37=s._referringDomain;
			s.eVar38=s._partner;
			//s.campaign=s._campaignID;
			s.eVar39=s.campaign;
			s.eVar2=s._keywords;
			s.eVar40=s._channel;
			s.eVar36=s._referrer;
		}
		
		
	if (s.eVar2 != '') {
		s.prop11=s.getAndPersistValue(s.eVar2,'c_srch',0); 
	}
	
	/*Setting the Campaign Touches counter*/		
		if(s.eVar39){
			s.eVar41='+1'; s.eVar42='+1'; s.eVar43='+1'; s.eVar44='+1';
			s.events=s.apl(s.events,'event5',',',2);
		}

	/*Setting getTimeToComplete plugin to measure time from campaign click-through to registration completion*/
/*	if(s.events){
		if((s.events+',').indexOf('event5,')>-1){s.eVar45=s.eVar46=s.eVar47=s.eVar48='start';}
		if((s.events+',').indexOf('event1,')>-1){s.eVar45='stop';}
		if((s.events+',').indexOf('event2,')>-1){s.eVar46='stop';}
		if((s.events+',').indexOf('event3,')>-1){s.eVar47='stop';}
		if((s.events+',').indexOf('event4,')>-1){s.eVar48='stop';}
	}*/
	if(s.events){
		if(s.eVar39){s.eVar45=s.eVar46=s.eVar47=s.eVar48='start';}
		if(s.events.indexOf('event1:')>-1){s.eVar45='stop';}
		if(s.events.indexOf('event2:')>-1){s.eVar46='stop';}
		if(s.events.indexOf('event3:')>-1){s.eVar47='stop';}
		if(s.events.indexOf('event4:')>-1){s.eVar48='stop';}
	}
	
	s.eVar45=s.getTimeToComplete(s.eVar45,'ttc45',0);
	s.eVar46=s.getTimeToComplete2(s.eVar46,'ttc46',0);
	s.eVar47=s.getTimeToComplete3(s.eVar47,'ttc47',0);
	s.eVar48=s.getTimeToComplete4(s.eVar48,'ttc48',0);
	

	if (s.eVar40){
		/*Trial Requested - Campaign Stacking Channel*/	
		s.eVar49=s.crossVisitParticipation(chnlshrink(s.eVar40),'v49','365','20','>','event1',1);
		
		/*Contacted Sales - Campaign Stacking Channel*/
		s.eVar50=s.crossVisitParticipation(chnlshrink(s.eVar40),'v50','365','20','>','event2',1);
		
		/*TechKit Requested - Campaign Stacking Channel*/
		s.eVar51=s.crossVisitParticipation(chnlshrink(s.eVar40),'v51','365','20','>','event3',1);
			
		/*Event Registration - Campaign Stacking Channel*/
		s.eVar52=s.crossVisitParticipation(chnlshrink(s.eVar40),'v52','365','20','>','event4',1);
	}
	
	/* The following functions set product name into propN(30) and product group into propN(31) */
	s.prop30= prodassign('urly');
	if ((!s.prop30 || s.prop30=="unknown")&& s.getQueryParam('ref') != '' ){
		s.prop30=prodassign('ref');
	}
	else if ((!s.prop30 || s.prop30=="unknown") && s.getQueryParam('product') != ''){
		s.prop30=prodassign('product');
	}
	if (s.prop30){
		s.prop31=prodgroup(s.prop30);
	}
	
	/*	Additional product name, group, artifact type assignment	*/
	if(s.prop5 == 'solutions'){
		s.prop30 = 'unknown'; 
		s.prop31 = 'unknown'; 
		s.prop32 = 'solution';
	}
	else if(s.prop5 == 'data-acquisition' || s.prop5== 'data-analysis' || s.prop5 == 'mathematical-modeling' || s.prop5 == 'algorithm-development' || s.prop5 == 'parallel-computing' || s.prop5 == 'desktop-web-deployment'){
		s.prop30 = 'unknown'; 
		s.prop31 = 'unknown'; 
		s.prop32 = 'solution-capabilities';
	}
	else if(s.prop5=='system-design-simulation'||s.prop5=='physical-modeling'||s.prop5=='discrete-event-simulation'||s.prop5=='rapid-prototyping'||s.prop5=='embedded-code-generation'||s.prop5=='hdl-code-generation-verification'||s.prop5=='verification-validation'){
		s.prop30 = 'unknown'; 
		s.prop31 = 'unknown'; 
		s.prop32 = 'solution-capabilities';
	}
	else if(s.prop5=='embedded-systems'||s.prop5=='control-systems'||s.prop5=='dsp'||s.prop5=='communications-systems'||s.prop5=='image-video-processing'||s.prop5=='fpga-design'||s.prop5=='mechatronics'||s.prop5=='test-measurement'||s.prop5=='computational-biology'||s.prop5=='computational-finance'){
		s.prop30 = 'unknown'; 
		s.prop31 = 'unknown'; 
		s.prop32='solution-application';
	}
	else if(s.prop5=='aerospace-defense'||s.prop5=='automotive'||s.prop5=='biotech-pharmaceutical'||s.prop5=='communications'||s.prop5=='electronics-semiconductors'||s.prop5=='energy-production'||s.prop5=='financial-services'||s.prop5=='industry-automation-machinery'){
		s.prop30 = 'unknown'; 
		s.prop31 = 'unknown'; 
		s.prop32 = 'solution-industry';
	}
	else if(s.prop5=='industries' && s.prop6 == 'other'){
		s.prop30 = 'unknown'; 
		s.prop31 = 'unknown'; 
		s.prop32 = 'solution-industry';
	}
	else if (s.prop5 == 'matlabcentral'){
		s.prop30 = 'unknown'; 
		s.prop31 = 'unknown'; 
		s.prop32 = 'matlabcentral';
		
	}
	
	else if(s.prop5=='company'){
		if (s.prop7){
			if (s.prop7 == 'company/aboutus/contact_us' || s.prop7== 'company/events/webinars' || s.prop7 == 'company/events/seminars' ){
				if (s.prop38 != 'no value'){
					s.prop30=s.prop38;
					s.prop31=s.prop39;
				}
				else {
					s.prop30 = 'unknown'; 
					s.prop31 = 'unknown'; 
				}
				s.prop32= cvSplit[3];
			}
			else if (s.prop6== 'company/events'){
				if (s.prop38 != 'no value'){
					s.prop30=s.prop38;
					s.prop31=s.prop39;
				}
				else {
					s.prop30 = 'unknown'; 
					s.prop31 = 'unknown'; 
				}
				s.prop32= cvSplit[2];
			}
			else {
			s.prop30 = 'unknown'; 
			s.prop31 = 'unknown'; 
			s.prop32=cvSplit[1];
			}
		}
/*		else if (s.prop6){
			var filename=cfUtility(cvURL,'filename');
			if (filename.indexOf('.')!=-1){
				s.prop30=filename.substring(0,filename.indexOf('.'));
			}
			else {
				s.prop30=cvSplit[2];
			}
			s.prop31=cvSplit[2];
			s.prop32=cvSplit[1];
		}*/
		else {
			s.prop30=s.prop31='unknown';
			s.prop32='company';
		}
		
	}
	
	else if (s.prop5=='programs'){
		if (s.prop6 == 'programs/techkits' || s.prop6 == 'programs/trial' || s.prop6 == 'programs/trials'){
			if (!s.prop30){
				if (s.prop38 != 'no value'){
					s.prop30 =  s.prop38;
					s.prop31 =  s.prop39;
				}
				else {
					s.prop30=s.prop31='unknown';
				}
			}
			s.prop32 = cvSplit[2];
		}
	}
	
	
	else if (s.channel=="homepage") {
			s.prop30=s.prop31='unknown';
			s.prop32='homepage';
	}
	
	
	else if (s.prop30 && s.prop5=='products') {
		var filename=cfUtility(cvURL,'filename');
		if(filename.search('description') > -1){
			s.prop32="product_info";
		}
		/*
		else if (filename.search('demos') > -1){
			var show = s.getQueryParam('show');
			if (show){
			s.prop32='product_demos_'+show;
			}
			else {
			s.prop32='product_demos';
			}
		}*/
		else if ((filename == 'index.html') || (filename == '')){
			if(s.prop6){
				s.prop32='product_main';
			}
			else {
				s.prop32='product';
			}
		}
		else {
			if (filename.indexOf('.')!=-1){
			//s.prop32='product_'+filename.substring(0,filename.indexOf('.'));
			s.prop32='product_other';
			}
		}
	}
	else if (s.prop5 == 'products'){
		if (cfUtility(cvURL,'filename')=='login_pricing.html'){
			if (s.prop38 != 'no value'){
					s.prop30=s.prop38;
					s.prop31=s.prop39;
				}
				else {
					s.prop30=s.prop31='unknown';
				}
				s.prop32= 'Get Pricing';
		
		}
	}
	else if (s.prop5 == 'store'){
		if (cfUtility(cvURL,'filename')=='productindexsubmit.do'){
				if (s.prop38 != 'no value'){
					s.prop30=s.prop38;
					s.prop31=s.prop39;
				}
				else {
					s.prop30=s.prop31='unknown';
				}
				s.prop32= 'Store - Get Pricing';
		}
		else if (cfUtility(cvURL,'filename')=='productindexlink.do'){
				if (s.prop38 != 'no value'){
					s.prop30=s.prop38;
					s.prop31=s.prop39;
				}
				else {
					s.prop30=s.prop31='unknown';
				}
				s.prop32= 'Store - Buy Now';
		}
	
	}
	
	else if (cvURL.indexOf('blogs.mathworks.')>-1){
		s.prop30=s.prop31='unknown';
		s.prop32='blogs';
	}
	
	if (!s.prop30){
		s.prop30='unknown';
	}
	if (!s.prop31){
		s.prop31='unknown';
	}
	
	if (!s.prop32){
		if (s.prop5){
				s.prop32=s.prop5;
		}
		else {
			s.prop32='unknown';
		}
	}

	
	/*	Copy product name, product grp and artifact type props into eVars	*/
	if(s.prop30) {s.eVar30=s.prop30;}
	if(s.prop31) {s.eVar31=s.prop31;}
	if(s.prop32) {s.eVar32=s.prop32;}
	
	//Extra page title prop for WSM reporting
	if (s.prop35) {s.prop55 = s.prop35;}
	//Extra artifact type prop for reporting as eVar32 has been used by videos
	if (s.eVar32) {s.eVar33=s.eVar32;}
}

/************************** PLUGINS SECTION - START *************************/
s.doPlugins=s_doPlugins;



/*
 * Plugin: getQueryParam 2.3
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");

/*
 * s.join: 1.0 - Joins an array into a string
 */

s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");

/*
 * Plugin: getVisitStart v2.0 - returns 1 on first page of visit
 * otherwise 0
 */
s.getVisitStart=new Function("c",""
+"var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(s.c_r(c"
+")){v=0}if(!s.c_w(c,1,t)){s.c_w(c,1,0)}if(!s.c_r(c)){v=0}return v;"); 


/*
 * Plugin: getNewRepeat 1.0 - Return whether user is new or repeat
 */
s.getNewRepeat=new Function(""
+"var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
+"(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
+"'s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s"
+".c_w('s_nr',ct,e);return 'New';}if(cval<1123916400001){e.setTime(cv"
+"al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'Repeat';}else retur"
+"n 'Repeat';");

s.getDaysSinceLastVisit=new Function(""
+"var s=this,e=new Date(),cval,ct=e.getTime(),c='s_lastvisit',day=24*"
+"60*60*1000;e.setTime(ct+3*365*day);cval=s.c_r(c);if(!cval){s.c_w(c,"
+"ct,e);return 'First page view or cookies not supported';}else{var d"
+"=ct-cval;if(d>30*60*1000){if(d>30*day){s.c_w(c,ct,e);return 'More t"
+"han 30 days';}if(d<30*day+1 && d>7*day){s.c_w(c,ct,e);return 'More "
+"than 7 days';}if(d<7*day+1 && d>day){s.c_w(c,ct,e);return 'Less tha"
+"n 7 days';}if(d<day+1){s.c_w(c,ct,e);return 'Less than 1 day';}}els"
+"e return '';}");

/*
 * Plugin: getValOnce_v1.0
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");

/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("l","v","d","u",""
+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)l=l?l+d+v:v;return l");

/*
 * Plugin: getTimeToComplete 0.4 - return the time from start to stop
 */
s.getTimeToComplete=new Function("v","cn","e",""
+"var s=this,d=new Date,x=d,k;if(!s.ttcr){e=e?e:0;if(v=='start'||v=='"
+"stop')s.ttcr=1;x.setTime(x.getTime()+e*86400000);if(v=='start'){s.c"
+"_w(cn,d.getTime(),e?x:0);return '';}if(v=='stop'){k=s.c_r(cn);if(!s"
+".c_w(cn,'',d)||!k)return '';v=(d.getTime()-k)/1000;var td=86400,th="
+"3600,tm=60,r=5,u,un;if(v>td){u=td;un='days';}else if(v>th){u=th;un="
+"'hours';}else if(v>tm){r=2;u=tm;un='minutes';}else{r=.2;u=1;un='sec"
+"onds';}v=v*r/u;return (Math.round(v)/r)+' '+un;}}return '';");
s.getTimeToComplete2=new Function("v","cn","e",""
+"var s=this,d=new Date,x=d,k;if(!s.ttcr2){e=e?e:0;if(v=='start'||v=='"
+"stop')s.ttcr2=1;x.setTime(x.getTime()+e*86400000);if(v=='start'){s.c"
+"_w(cn,d.getTime(),e?x:0);return '';}if(v=='stop'){k=s.c_r(cn);if(!s"
+".c_w(cn,'',d)||!k)return '';v=(d.getTime()-k)/1000;var td=86400,th="
+"3600,tm=60,r=5,u,un;if(v>td){u=td;un='days';}else if(v>th){u=th;un="
+"'hours';}else if(v>tm){r=2;u=tm;un='minutes';}else{r=.2;u=1;un='sec"
+"onds';}v=v*r/u;return (Math.round(v)/r)+' '+un;}}return '';");
s.getTimeToComplete3=new Function("v","cn","e",""
+"var s=this,d=new Date,x=d,k;if(!s.ttcr3){e=e?e:0;if(v=='start'||v=='"
+"stop')s.ttcr3=1;x.setTime(x.getTime()+e*86400000);if(v=='start'){s.c"
+"_w(cn,d.getTime(),e?x:0);return '';}if(v=='stop'){k=s.c_r(cn);if(!s"
+".c_w(cn,'',d)||!k)return '';v=(d.getTime()-k)/1000;var td=86400,th="
+"3600,tm=60,r=5,u,un;if(v>td){u=td;un='days';}else if(v>th){u=th;un="
+"'hours';}else if(v>tm){r=2;u=tm;un='minutes';}else{r=.2;u=1;un='sec"
+"onds';}v=v*r/u;return (Math.round(v)/r)+' '+un;}}return '';");
s.getTimeToComplete4=new Function("v","cn","e",""
+"var s=this,d=new Date,x=d,k;if(!s.ttcr4){e=e?e:0;if(v=='start'||v=='"
+"stop')s.ttcr4=1;x.setTime(x.getTime()+e*86400000);if(v=='start'){s.c"
+"_w(cn,d.getTime(),e?x:0);return '';}if(v=='stop'){k=s.c_r(cn);if(!s"
+".c_w(cn,'',d)||!k)return '';v=(d.getTime()-k)/1000;var td=86400,th="
+"3600,tm=60,r=5,u,un;if(v>td){u=td;un='days';}else if(v>th){u=th;un="
+"'hours';}else if(v>tm){r=2;u=tm;un='minutes';}else{r=.2;u=1;un='sec"
+"onds';}v=v*r/u;return (Math.round(v)/r)+' '+un;}}return '';");

/*
 *	Plug-in: crossVisitParticipation v1.6 - stacks values from
 *	specified variable in cookie and returns value
 */

s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!='')arry=eval(c);var e=new Date();e.setFullYear(e.getFullY"
+"ear()+5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[ar"
+"ry.length-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new"
+" Date().getTime()];var start=arry.length-ct<0?0:arry.length-ct;var "
+"td=new Date();for(var x=start;x<arry.length;x++){var diff=Math.roun"
+"d((td.getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arr"
+"y[x][0]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{deli"
+"m:',',front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join"
+"(h,{delim:dl});if(ce)s.c_w(cn,'');return r;");

/*
 * channelManager v2.4 - Tracking External Traffic
 */
s.channelManager = new Function("a", "b", "c", "d", "e", "f", "var s=this,A,B,g,l,m,M,p,q,P,h,k,u,S,i,O,T,j,r,t,D,E,F,G,H,N,U,v=0,X,Y,W,n=new Date;n.setTime(n.getTime()+1800000);if(e){v=1;if(s.c_r(e))v=0;if(!s.c_w(e,1,n))s.c_w(e,1,0);if(!s.c_r(e))v=0;}g=s.referrer?s.referrer:document.referrer;g=g.toLowerCase();if(!g)h=1;i=g.indexOf('?')>-1?g.indexOf('?'):g.length;j=g.substring(0,i);k=s.linkInternalFilters.toLowerCase();k=s.split(k,',');l=k.length;for(m=0;m<l;m++){B=j.indexOf(k[m])==-1?'':g;if(B)O=B;}if(!O&&!h){p=g;U=g.indexOf('//');q=U>-1?U+2:0;Y=g.indexOf('/',q);r=Y>-1?Y:i;t=g.substring(q,r);t=t.toLowerCase();u=t;P='Referrers';S=s.seList+'>'+s._extraSearchEngines;if(d==1){j=s.repl(j,'oogle','%');j=s.repl(j,'ahoo','^');g=s.repl(g,'as_q','*');}A=s.split(S,'>');T=A.length;for(i=0;i<A.length;i++){D=A[i];D=s.split(D,'|');E=s.split(D[0],',');for(G=0;G<E.length;G++){H=j.indexOf(E[G]);if(H>-1){if(D[2])N=u=D[2];else N=t;if(d==1){N=s.repl(N,'#',' - ');g=s.repl(g,'*','as_q');N=s.repl(N,'^','ahoo');N=s.repl(N,'%','oogle');}i=s.split(D[1],',');for(k=0;k<i.length;k++){M=s.getQueryParam(i[k],'',g).toLowerCase();if(M)break;}}}}}if(!O||f!='1'){O=s.getQueryParam(a,b);if(O){u=O;if(M)P='Paid Search';else P='Paid Non-Search';}if(!O&&N){u=N;P='Natural Search'}}if(h==1&&!O&&v==1)u=P=t=p='Direct Load';X=M+u+t;c=c?c:'c_m';if(c!='0'){X=s.getValOnce(X,c,0);}g=s._channelDomain;if(g&&X){k=s.split(g,'>');l=k.length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r.length;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=j.indexOf(Y);if(i>-1)P=q[0];}}}g=s._channelParameter;if(g&&X){k=s.split(g,'>');l=k.length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r.length;for(T=0;T<S;T++){U=s.getQueryParam(r[T]);if(U)P=q[0]}}}g=s._channelPattern;if(g&&X){k=s.split(g,'>');l=k.length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r.length;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=O.toLowerCase();H=i.indexOf(Y);if(H==0)P=q[0];}}}if(X)M=M?M:N?'Keyword Unavailable':'n/a';p=X&&p?p:'';t=X&&t?t:'';N=X&&N?N:'';O=X&&O?O:'';u=X&&u?u:'';M=X&&M?M:'';P=X&&P?P:'';s._referrer=p;s._referringDomain=t;s._partner=N;s._campaignID=O;s._campaign=u;s._keywords=M;s._channel=P;");

/* Top 130 Search Engines (used by Channel Manager) */
s.seList="altavista.co|q,r|AltaVista>aol.co.uk,search.aol.co.uk|query"
+"|AOL - United Kingdom>search.aol.com,search.aol.ca|query,q|AOL.com "
+"Search>ask.com,ask.co.uk|ask,q|Ask Jeeves>www.baidu.com|wd|Baidu>da"
+"um.net,search.daum.net|q|Daum>google.co,googlesyndication.com|q,as_"
+"q|Google>google.com.ar|q,as_q|Google - Argentina>google.com.au|q,as"
+"_q|Google - Australia>google.at|q,as_q|Google - Austria>google.com."
+"bh|q,as_q|Google - Bahrain>google.com.bd|q,as_q|Google - Bangladesh"
+">google.be|q,as_q|Google - Belgium>google.com.bo|q,as_q|Google - Bo"
+"livia>google.ba|q,as_q|Google - Bosnia-Hercegovina>google.com.br|q,"
+"as_q|Google - Brasil>google.bg|q,as_q|Google - Bulgaria>google.ca|q"
+",as_q|Google - Canada>google.cl|q,as_q|Google - Chile>google.cn|q,a"
+"s_q|Google - China>google.com.co|q,as_q|Google - Colombia>google.co"
+".cr|q,as_q|Google - Costa Rica>google.hr|q,as_q|Google - Croatia>go"
+"ogle.cz|q,as_q|Google - Czech Republic>google.dk|q,as_q|Google - De"
+"nmark>google.com.do|q,as_q|Google - Dominican Republic>google.com.e"
+"c|q,as_q|Google - Ecuador>google.com.eg|q,as_q|Google - Egypt>googl"
+"e.com.sv|q,as_q|Google - El Salvador>google.ee|q,as_q|Google - Esto"
+"nia>google.fi|q,as_q|Google - Finland>google.fr|q,as_q|Google - Fra"
+"nce>google.de|q,as_q|Google - Germany>google.gr|q,as_q|Google - Gre"
+"ece>google.com.gt|q,as_q|Google - Guatemala>google.hn|q,as_q|Google"
+" - Honduras>google.com.hk|q,as_q|Google - Hong Kong>google.hu|q,as_"
+"q|Google - Hungary>google.co.in|q,as_q|Google - India>google.co.id|"
+"q,as_q|Google - Indonesia>google.ie|q,as_q|Google - Ireland>google."
+"is|q,as_q|Google - Island>google.co.il|q,as_q|Google - Israel>googl"
+"e.it|q,as_q|Google - Italy>google.com.jm|q,as_q|Google - Jamaica>go"
+"ogle.co.jp|q,as_q|Google - Japan>google.jo|q,as_q|Google - Jordan>g"
+"oogle.co.ke|q,as_q|Google - Kenya>google.co.kr|q,as_q|Google - Kore"
+"a>google.lv|q,as_q|Google - Latvia>google.lt|q,as_q|Google - Lithua"
+"nia>google.com.my|q,as_q|Google - Malaysia>google.com.mt|q,as_q|Goo"
+"gle - Malta>google.mu|q,as_q|Google - Mauritius>google.com.mx|q,as_"
+"q|Google - Mexico>google.co.ma|q,as_q|Google - Morocco>google.nl|q,"
+"as_q|Google - Netherlands>google.co.nz|q,as_q|Google - New Zealand>"
+"google.com.ni|q,as_q|Google - Nicaragua>google.com.ng|q,as_q|Google"
+" - Nigeria>google.no|q,as_q|Google - Norway>google.com.pk|q,as_q|Go"
+"ogle - Pakistan>google.com.py|q,as_q|Google - Paraguay>google.com.p"
+"e|q,as_q|Google - Peru>google.com.ph|q,as_q|Google - Philippines>go"
+"ogle.pl|q,as_q|Google - Poland>google.pt|q,as_q|Google - Portugal>g"
+"oogle.com.pr|q,as_q|Google - Puerto Rico>google.com.qa|q,as_q|Googl"
+"e - Qatar>google.ro|q,as_q|Google - Romania>google.ru|q,as_q|Google"
+" - Russia>google.st|q,as_q|Google - Sao Tome and Principe>google.co"
+"m.sa|q,as_q|Google - Saudi Arabia>google.com.sg|q,as_q|Google - Sin"
+"gapore>google.sk|q,as_q|Google - Slovakia>google.si|q,as_q|Google -"
+" Slovenia>google.co.za|q,as_q|Google - South Africa>google.es|q,as_"
+"q|Google - Spain>google.lk|q,as_q|Google - Sri Lanka>google.se|q,as"
+"_q|Google - Sweden>google.ch|q,as_q|Google - Switzerland>google.com"
+".tw|q,as_q|Google - Taiwan>google.co.th|q,as_q|Google - Thailand>go"
+"ogle.bs|q,as_q|Google - The Bahamas>google.tt|q,as_q|Google - Trini"
+"dad and Tobago>google.com.tr|q,as_q|Google - Turkey>google.com.ua|q"
+",as_q|Google - Ukraine>google.ae|q,as_q|Google - United Arab Emirat"
+"es>google.co.uk|q,as_q|Google - United Kingdom>google.com.uy|q,as_q"
+"|Google - Uruguay>google.co.ve|q,as_q|Google - Venezuela>google.com"
+".vn|q,as_q|Google - Viet Nam>google.co.vi|q,as_q|Google - Virgin Is"
+"lands>icqit.com|q|icq>bing.com|q|Microsoft Bing>myway.com|searchfor"
+"|MyWay.com>naver.com,search.naver.com|query|Naver>netscape.com|quer"
+"y,search|Netscape Search>reference.com|q|Reference.com>seznam|w|Sez"
+"nam.cz>abcsok.no|q|Startsiden>tiscali.it|key|Tiscali>virgilio.it|qs"
+"|Virgilio>yahoo.com,search.yahoo.com|p|Yahoo!>ar.yahoo.com,ar.searc"
+"h.yahoo.com|p|Yahoo! - Argentina>au.yahoo.com,au.search.yahoo.com|p"
+"|Yahoo! - Australia>ca.yahoo.com,ca.search.yahoo.com|p|Yahoo! - Can"
+"ada>fr.yahoo.com,fr.search.yahoo.com|p|Yahoo! - France>de.yahoo.com"
+",de.search.yahoo.com|p|Yahoo! - Germany>hk.yahoo.com,hk.search.yaho"
+"o.com|p|Yahoo! - Hong Kong>in.yahoo.com,in.search.yahoo.com|p|Yahoo"
+"! - India>yahoo.co.jp,search.yahoo.co.jp|p,va|Yahoo! - Japan>kr.yah"
+"oo.com,kr.search.yahoo.com|p|Yahoo! - Korea>mx.yahoo.com,mx.search."
+"yahoo.com|p|Yahoo! - Mexico>ph.yahoo.com,ph.search.yahoo.com|p|Yaho"
+"o! - Philippines>sg.yahoo.com,sg.search.yahoo.com|p|Yahoo! - Singap"
+"ore>es.yahoo.com,es.search.yahoo.com|p|Yahoo! - Spain>telemundo.yah"
+"oo.com,espanol.search.yahoo.com|p|Yahoo! - Spanish (US : Telemundo)"
+">tw.yahoo.com,tw.search.yahoo.com|p|Yahoo! - Taiwan>uk.yahoo.com,uk"
+".search.yahoo.com|p|Yahoo! - UK and Ireland>yandex|text|Yandex.ru>s"
+"earch.cnn.com|query|CNN Web Search>search.earthlink.net|q|Earthlink"
+" Search>search.comcast.net|q|Comcast Search>search.rr.com|qs|RoadRu"
+"nner Search>optimum.net|q|Optimum Search";

s.getGoogleRank=new Function("ce,ie,ev1,ev2,dn",""
+"var s=this,dr,rd,p,pa,kr,kw,dn=dn||'';qp='resnum,cd';dr=s.referrer|"
+"|typeof s.referrer!='undefined'?s.referrer:document.referrer;if(!dr"
+"||!ce||!ie)return;rd=s.split(dr,'/');if(rd[2].substring(0,11)!='www"
+".google.')return;kw=s.getQueryParam('q,as_q',' ',dr);if(!kw)return;"
+"if(ev1)s[ev1]=kw;kr=rd[3].substring(0,4)=='url?'?s.getQueryParam(qp"
+",'|',dr):'';if(kr.indexOf('|')>-1)kr=kr.substring(0,kr.indexOf('|')"
+");if(!kr||kr=='0'){if(ev2)s[ev2]='no rank available';return;}if(ev2"
+")s[ev2]=kr;p=s.products;pa=s.split(p,',');pa[0]=s.split(pa[0],';');"
+"pa[0][0]=pa[0][0]||'';pa[0][1]=pa[0][1]||dn;pa[0][2]=pa[0][2]||'';p"
+"a[0][3]=pa[0][3]||'';pa[0][4]=s.apl(pa[0][4],ie+'='+kr,'|',2);pa[0]"
+"=s.join(pa[0],{delim:';'});pa=s.join(pa,{delim:','});s.events=s.apl"
+"(s.events,ce,',',2);s.events=s.apl(s.events,ie,',',2);s.products=pa"
+";return;");

/* Function - read combined cookies v 0.36 */
if(!s.__ccucr)
{
s.c_rr=s.c_r;
s.__ccucr = true;
function c_r(k)
{
var s=this,d=new Date,v=s.c_rr(k),c=s.c_rr('s_pers'),i,m,e;
if(v)return v;k=s.ape(k);i=c.indexOf(' '+k+'=');c=i<0?s.c_rr('s_sess'):c;
i=c.indexOf(' '+k+'=');m=i<0?i:c.indexOf('|',i);e=i<0?i:c.indexOf(';',i);
m=m>0?m:e;v=i<0?'':s.epa(c.substring(i+2+k.length,m<0?c.length:m));
if(m>0&&m!=e)if(parseInt(c.substring(m+1,e<0?c.length:e))<d.getTime())
{d.setTime(d.getTime()-60000);s.c_w(s.epa(k),'',d);v='';}return v;
}
s.c_r=c_r;
}

/* Function - write combined cookies v 0.36 */
if(!s.__ccucw)
{
s.c_wr=s.c_w;
s.__ccucw = true;
function c_w(k,v,e)
{
var s=this,d=new Date,ht=0,pn='s_pers',sn='s_sess',pc=0,sc=0,pv,sv,c,i,t;
d.setTime(d.getTime()-60000);if(s.c_rr(k)) s.c_wr(k,'',d);k=s.ape(k);
pv=s.c_rr(pn);i=pv.indexOf(' '+k+'=');if(i>-1)
{pv=pv.substring(0,i)+pv.substring(pv.indexOf(';',i)+1);pc=1;}sv=s.c_rr(sn);
i=sv.indexOf(' '+k+'=');if(i>-1){sv=sv.substring(0,i)+sv.substring(sv.indexOf(';',i)+1);
sc=1;}d=new Date;if(e){if(e.getTime()>d.getTime()){pv+=' '+k+'='+s.ape(v)+'|'+e.getTime()+';';
pc=1;}}else{sv+=' '+k+'='+s.ape(v)+';';sc=1;}sv=sv.replace(/%00/g,'');
pv=pv.replace(/%00/g,'');if(sc) s.c_wr(sn,sv,0);if(pc){t=pv;while(t&&t.indexOf(';')!=-1){
var t1=parseInt(t.substring(t.indexOf('|')+1,t.indexOf(';')));
t=t.substring(t.indexOf(';')+1);ht=ht<t1?t1:ht;}d.setTime(ht);s.c_wr(pn,pv,d);}
return v==s.c_r(s.epa(k));
}
s.c_w=c_w;
}

/************************** PLUGINS SECTION - END *************************/

/* Module: Media */
s.m_Media_c="var m=s.m_i('Media');if(m.completeByCloseOffset==undefined)m.completeByCloseOffset=1;if(m.completeCloseOffsetThreshold==undefined)m.completeCloseOffsetThreshold=1;m.cn=function(n){var m="
+"this;return m.s.rep(m.s.rep(m.s.rep(n,\"\\n\",''),\"\\r\",''),'--**--','')};m.open=function(n,l,p,b){var m=this,i=new Object,tm=new Date,a='',x;n=m.cn(n);if(!l)l=-1;if(n&&p){if(!m.l)m.l=new Object;"
+"if(m.l[n])m.close(n);if(b&&b.id)a=b.id;if(a)for (x in m.l)if(m.l[x]&&m.l[x].a==a)m.close(m.l[x].n);i.n=n;i.l=l;i.o=0;i.x=0;i.p=m.cn(m.playerName?m.playerName:p);i.a=a;i.t=0;i.ts=0;i.s=Math.floor(tm"
+".getTime()/1000);i.lx=0;i.lt=i.s;i.lo=0;i.e='';i.to=-1;i.tc=0;i.fel=new Object;i.vt=0;i.sn=0;i.sx=\"\";i.sl=0;i.sg=0;i.sc=0;i.us=0;i.co=0;i.cot=0;i.lm=0;i.lom=0;m.l[n]=i}};m._delete=function(n){var"
+" m=this,i;n=m.cn(n);i=m.l[n];m.l[n]=0;if(i&&i.m)clearTimeout(i.m.i)};m.close=function(n){this.e(n,0,-1)};m.play=function(n,o,sn,sx,sl){var m=this,i;i=m.e(n,1,o,sn,sx,sl);if(i&&!i.m){i.m=new Object;"
+"i.m.m=new Function('var m=s_c_il['+m._in+'],i;if(m.l){i=m.l[\"'+m.s.rep(i.n,'\"','\\\\\"')+'\"];if(i){if(i.lx==1)m.e(i.n,3,-1);i.m.i=setTimeout(i.m.m,1000)}}');i.m.m()}};m.complete=function(n,o){th"
+"is.e(n,5,o)};m.stop=function(n,o){this.e(n,2,o)};m.track=function(n){this.e(n,4,-1)};m.bcd=function(vo,i){var m=this,ns='a.media.',v=vo.linkTrackVars,e=vo.linkTrackEvents,pe='m_i',pev3,c=vo.context"
+"Data,x;c['a.contentType']='video';c[ns+'name']=i.n;c[ns+'playerName']=i.p;if(i.l>0){c[ns+'length']=i.l;}c[ns+'timePlayed']=Math.floor(i.ts);if(!i.vt){c[ns+'view']=true;pe='m_s';i.vt=1}if(i.sx){c[ns"
+"+'segmentNum']=i.sn;c[ns+'segment']=i.sx;if(i.sl>0)c[ns+'segmentLength']=i.sl;if(i.sc&&i.ts>0)c[ns+'segmentView']=true}if(!i.cot&&i.co){c[ns+\"complete\"]=true;i.cot=1}if(i.lm>0)c[ns+'milestone']=i"
+".lm;if(i.lom>0)c[ns+'offsetMilestone']=i.lom;if(v)for(x in c)v+=',contextData.'+x;pev3='video';vo.pe=pe;vo.pev3=pev3;var d=m.contextDataMapping,y,a,l,n;if(d){vo.events2='';if(v)v+=',events';for(x i"
+"n d){if(x.substring(0,ns.length)==ns)y=x.substring(ns.length);else y=\"\";a=d[x];if(typeof(a)=='string'){l=m.s.sp(a,',');for(n=0;n<l.length;n++){a=l[n];if(x==\"a.contentType\"){if(v)v+=','+a;vo[a]="
+"c[x]}else if(y){if(y=='view'||y=='segmentView'||y=='complete'||y=='timePlayed'){if(e)e+=','+a;if(c[x]){if(y=='timePlayed'){if(c[x])vo.events2+=(vo.events2?',':'')+a+'='+c[x];}else if(c[x])vo.events"
+"2+=(vo.events2?',':'')+a}}else if(y=='segment'&&c[x+'Num']){if(v)v+=','+a;vo[a]=c[x+'Num']+':'+c[x]}else{if(v)v+=','+a;vo[a]=c[x]}}}}else if(y=='milestones'||y=='offsetMilestones'){x=x.substring(0,"
+"x.length-1);if(c[x]&&d[x+'s'][c[x]]){if(e)e+=','+d[x+'s'][c[x]];vo.events2+=(vo.events2?',':'')+d[x+'s'][c[x]]}}}vo.contextData=0}vo.linkTrackVars=v;vo.linkTrackEvents=e};m.bpe=function(vo,i,x,o){v"
+"ar m=this,pe='m_o',pev3,d='--**--';pe='m_o';if(!i.vt){pe='m_s';i.vt=1}else if(x==4)pe='m_i';pev3=m.s.ape(i.n)+d+Math.floor(i.l>0?i.l:1)+d+m.s.ape(i.p)+d+Math.floor(i.t)+d+i.s+d+(i.to>=0?'L'+Math.fl"
+"oor(i.to):'')+i.e+(x!=0&&x!=2?'L'+Math.floor(o):'');vo.pe=pe;vo.pev3=pev3};m.e=function(n,x,o,sn,sx,sl,pd){var m=this,i,tm=new Date,ts=Math.floor(tm.getTime()/1000),c,l,v=m.trackVars,e=m.trackEvent"
+"s,ti=m.trackSeconds,tp=m.trackMilestones,to=m.trackOffsetMilestones,sm=m.segmentByMilestones,so=m.segmentByOffsetMilestones,z=new Array,j,t=1,w=new Object,x,ek,tc,vo=new Object;n=m.cn(n);i=n&&m.l&&"
+"m.l[n]?m.l[n]:0;if(i){if(o<0){if(i.lx==1&&i.lt>0)o=(ts-i.lt)+i.lo;else o=i.lo}if(i.l>0)o=o<i.l?o:i.l;if(o<0)o=0;i.o=o;if(i.l>0){i.x=(i.o/i.l)*100;i.x=i.x>100?100:i.x}if(i.lo<0)i.lo=o;tc=i.tc;w.name"
+"=n;w.length=i.l;w.openTime=new Date;w.openTime.setTime(i.s*1000);w.offset=i.o;w.percent=i.x;w.playerName=i.p;if(i.to<0)w.mediaEvent=w.event='OPEN';else w.mediaEvent=w.event=(x==1?'PLAY':(x==2?'STOP"
+"':(x==3?'MONITOR':(x==4?'TRACK':(x==5?'COMPLETE':('CLOSE'))))));if(!pd){if(i.pd)pd=i.pd}else i.pd=pd;w.player=pd;if(x>2||(x!=i.lx&&(x!=2||i.lx==1))) {if(!sx){sn=i.sn;sx=i.sx;sl=i.sl}if(x){if(x==1)i"
+".lo=o;if((x<=3||x==5)&&i.to>=0){t=0;v=e=\"None\";if(i.to!=o){l=i.to;if(l>o){l=i.lo;if(l>o)l=o}z=tp?m.s.sp(tp,','):0;if(i.l>0&&z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&(l/i"
+".l)*100<c&&i.x>=c){t=1;j=z.length;w.mediaEvent=w.event='MILESTONE';i.lm=w.milestone=c}}z=to?m.s.sp(to,','):0;if(z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&l<c&&o>=c){t=1;j=z"
+".length;w.mediaEvent=w.event='OFFSET_MILESTONE';i.lom=w.offsetMilestone=c}}}}if(i.sg||!sx){if(sm&&tp&&i.l>0){z=m.s.sp(tp,',');if(z){z[z.length]='100';l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat('"
+"'+z[j]):0;if(c){if(i.x<c){sn=j+1;sx='M:'+l+'-'+c;j=z.length}l=c}}}}else if(so&&to){z=m.s.sp(to,',');if(z){z[z.length]=''+(i.l>0?i.l:'E');l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if("
+"c||z[j]=='E'){if(o<c||z[j]=='E'){sn=j+1;sx='O:'+l+'-'+c;j=z.length}l=c}}}}if(sx)i.sg=1}if((sx||i.sx)&&sx!=i.sx){i.us=1;if(!i.sx){i.sn=sn;i.sx=sx}if(i.to>=0)t=1}if(x>=2&&i.lo<o){i.t+=o-i.lo;i.ts+=o-"
+"i.lo}if(x<=2||(x==3&&!i.lx)){i.e+=(x==1||x==3?'S':'E')+Math.floor(o);i.lx=(x==3?1:x)}if(!t&&i.to>=0&&x<=3){ti=ti?ti:0;if(ti&&i.ts>=ti){t=1;w.mediaEvent=w.event='SECONDS'}}i.lt=ts;i.lo=o}if(!x||i.x>"
+"=100){x=0;m.e(n,2,-1,0,0,-1,pd);v=e=\"None\";w.mediaEvent=w.event=\"CLOSE\"}if(x==5||(m.completeByCloseOffset&&(!x||i.x>=100)&&i.l>0&&o>=i.l-m.completeCloseOffsetThreshold)){w.complete=i.co=1;t=1}e"
+"k=w.mediaEvent;if(ek=='MILESTONE')ek+='_'+w.milestone;else if(ek=='OFFSET_MILESTONE')ek+='_'+w.offsetMilestone;if(!i.fel[ek]) {w.eventFirstTime=true;i.fel[ek]=1}else w.eventFirstTime=false;w.timePl"
+"ayed=i.t;w.segmentNum=i.sn;w.segment=i.sx;w.segmentLength=i.sl;if(m.monitor&&x!=4)m.monitor(m.s,w);if(x==0)m._delete(n);if(t&&i.tc==tc){vo=new Object;vo.contextData=new Object;vo.linkTrackVars=v;vo"
+".linkTrackEvents=e;if(!vo.linkTrackVars)vo.linkTrackVars='';if(!vo.linkTrackEvents)vo.linkTrackEvents='';if(m.trackUsingContextData)m.bcd(vo,i);else m.bpe(vo,i,x,o);m.s.t(vo);if(i.us){i.sn=sn;i.sx="
+"sx;i.sc=1;i.us=0}else if(i.ts>0)i.sc=0;i.e=\"\";i.lm=i.lom=0;i.ts-=Math.floor(i.ts);i.to=o;i.tc++}}}return i};m.ae=function(n,l,p,x,o,sn,sx,sl,pd,b){var m=this,r=0;if(n&&(!m.autoTrackMediaLengthReq"
+"uired||(length&&length>0)) &&p){if(!m.l||!m.l[n]){if(x==1||x==3){m.open(n,l,p,b);r=1}}else r=1;if(r)m.e(n,x,o,sn,sx,sl,pd)}};m.a=function(o,t){var m=this,i=o.id?o.id:o.name,n=o.name,p=0,v,c,c1,c2,x"
+"c=m.s.h,x,e,f1,f2='s_media_'+m._in+'_oc',f3='s_media_'+m._in+'_t',f4='s_media_'+m._in+'_s',f5='s_media_'+m._in+'_l',f6='s_media_'+m._in+'_m',f7='s_media_'+m._in+'_c',tcf,w;if(!i){if(!m.c)m.c=0;i='s"
+"_media_'+m._in+'_'+m.c;m.c++}if(!o.id)o.id=i;if(!o.name)o.name=n=i;if(!m.ol)m.ol=new Object;if(m.ol[i])return;m.ol[i]=o;if(!xc)xc=m.s.b;tcf=new Function('o','var e,p=0;try{if(o.versionInfo&&o.curre"
+"ntMedia&&o.controls)p=1}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetQuickTimeVersion();if(t)p=2}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o'"
+",'var e,p=0,t;try{t=o.GetVersionInfo();if(t)p=3}catch(e){p=0}return p');p=tcf(o)}}v=\"var m=s_c_il[\"+m._in+\"],o=m.ol['\"+i+\"']\";if(p==1){p='Windows Media Player '+o.versionInfo;c1=v+',n,p,l,x=-"
+"1,cm,c,mn;if(o){cm=o.currentMedia;c=o.controls;if(cm&&c){mn=cm.name?cm.name:c.URL;l=cm.duration;p=c.currentPosition;n=o.playState;if(n){if(n==8)x=0;if(n==3)x=1;if(n==1||n==2||n==4||n==5||n==6)x=2;}"
+"';c2='if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}}';c=c1+c2;if(m.s.isie&&xc){x=m.s.d.createElement('script');x.language='jscript';x.type='text/javascript';x.htmlFor=i;x.event='PlayStateC"
+"hange(NewState)';x.defer=true;x.text=c;xc.appendChild(x);o[f6]=new Function(c1+'if(n==3){x=3;'+c2+'}setTimeout(o.'+f6+',5000)');o[f6]()}}if(p==2){p='QuickTime Player '+(o.GetIsQuickTimeRegistered()"
+"?'Pro ':'')+o.GetQuickTimeVersion();f1=f2;c=v+',n,x,t,l,p,p2,mn;if(o){mn=o.GetMovieName()?o.GetMovieName():o.GetURL();n=o.GetRate();t=o.GetTimeScale();l=o.GetDuration()/t;p=o.GetTime()/t;p2=o.'+f5+"
+"';if(n!=o.'+f4+'||p<p2||p-p2>5){x=2;if(n!=0)x=1;else if(p>=l)x=0;if(p<p2||p-p2>5)m.ae(mn,l,\"'+p+'\",2,p2,0,\"\",0,0,o);m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}if(n>0&&o.'+f7+'>=10){m.ae(mn,l"
+",\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;o.'+f5+'=p;setTimeout(\"'+v+';o.'+f2+'(0,0)\",500)}';o[f1]=new Function('a','b',c);o[f4]=-1;o[f7]=0;o[f1](0,0)}if(p==3){p='RealPlayer '"
+"+o.GetVersionInfo();f1=n+'_OnPlayStateChange';c1=v+',n,x=-1,l,p,mn;if(o){mn=o.GetTitle()?o.GetTitle():o.GetSource();n=o.GetPlayState();l=o.GetLength()/1000;p=o.GetPosition()/1000;if(n!=o.'+f4+'){if"
+"(n==3)x=1;if(n==0||n==2||n==4||n==5)x=2;if(n==0&&(p>=l||p==0))x=0;if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}if(n==3&&(o.'+f7+'>=10||!o.'+f3+')){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'"
+"+f7+'=0}o.'+f7+'++;o.'+f4+'=n;';c2='if(o.'+f2+')o.'+f2+'(o,n)}';if(m.s.wd[f1])o[f2]=m.s.wd[f1];m.s.wd[f1]=new Function('a','b',c1+c2);o[f1]=new Function('a','b',c1+'setTimeout(\"'+v+';o.'+f1+'(0,0)"
+"\",o.'+f3+'?500:5000);'+c2);o[f4]=-1;if(m.s.isie)o[f3]=1;o[f7]=0;o[f1](0,0)}};m.as=new Function('e','var m=s_c_il['+m._in+'],l,n;if(m.autoTrack&&m.s.d.getElementsByTagName){l=m.s.d.getElementsByTag"
+"Name(m.s.isie?\"OBJECT\":\"EMBED\");if(l)for(n=0;n<l.length;n++)m.a(l[n]);}');if(s.wd.attachEvent)s.wd.attachEvent('onload',m.as);else if(s.wd.addEventListener)s.wd.addEventListener('load',m.as,fal"
+"se);if(m.onLoad)m.onLoad(s,m)";
s.m_i("Media");

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.24.4';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\""
+"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){retur"
+"n x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p"
+"<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toU"
+"pperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h"
+".substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('"
+"%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x)"
+"{var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substri"
+"ng(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a"
+"=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var"
+" s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l="
+"s.sp('webkitvisibilitychange,visibilitychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilitySta"
+"te;if(s.mpq&&v==\"visible\"){while(s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,"
+"c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'"
+"}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){v"
+"ar s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf"
+"('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':"
+"s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='N"
+"ONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString"
+"()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i"
+"].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.a"
+"pv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.w"
+"d,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c"
+"=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tf"
+"s=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=thi"
+"s,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s."
+"trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.ne"
+"t';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mob"
+"ile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if"
+"(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;"
+"r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_"
+"il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dl"
+"n<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-"
+"b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf="
+"function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='"
+"',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+="
+"8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if"
+"(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c='"
+"'}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\""
+";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nf"
+"l.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substr"
+"ing(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f"
+".indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')s"
+"k='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=f"
+"unction(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrac"
+"kEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',e"
+"vents,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf"
+"(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=="
+"'referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visit"
+"orMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visit"
+"orNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';el"
+"se if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else i"
+"f(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=="
+"'events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSe"
+"conds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';els"
+"e if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier"
+"'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0"
+"?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s"
+".lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lf"
+"t,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','v"
+"ar s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cpp"
+"XYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=functi"
+"on(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l"
+".protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o)"
+"{var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type."
+"toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&("
+"!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o."
+"value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s="
+"this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return '"
+"'};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('="
+"'),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c"
+"_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s"
+".sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Funct"
+"ion('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0|"
+"|oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachE"
+"vent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplin"
+"gGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=fu"
+"nction(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))re"
+"turn n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLower"
+"Case)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',argument"
+"s))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s."
+"m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il"
+"','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]]"
+")r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",a"
+"rguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if(("
+"\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)f"
+"or(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){"
+"if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g["
+"i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.subs"
+"tring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_"
+"c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.m"
+"axDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.t"
+"ype=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o"
+"=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=funct"
+"ion(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}"
+"}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s."
+"dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDel"
+"ay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s"
+".track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt="
+"tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',v"
+"b=new Object;if(s.mpc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn"
+"=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new "
+"Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v"
+"=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if("
+"s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage"
+"(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}i"
+"f(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidt"
+"h=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.documen"
+"t.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o"
+"),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.o"
+"nclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.link"
+"Name;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageUR"
+"L;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape("
+"t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referre"
+"r=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if("
+"s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,"
+"i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i"
+"];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml"
+")for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if"
+"(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.loc"
+"ation.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6"
+"=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer')"
+";s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=par"
+"seFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpp"
+"erCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='timestamp,dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServer"
+"Secure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,"
+"deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,"
+"lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',"
+"prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,jav"
+"ascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,tra"
+"ckingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExte"
+"rnalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s."
+"sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(un,1,1).t("
+")};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()

