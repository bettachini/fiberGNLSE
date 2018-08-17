/* Code to all hover dropdown for IE6 - Currently used for country nav and top navigation dropdown */

//Conditional to put script in IE6 browsers
var isIE6 = (navigator.userAgent.toLowerCase().substr(25,6)=="msie 6") ? true : false;

if (isIE6 == true ) {

	// JS used to make 
	
	function sfHover(element_id) {
		  var sfEls = document.getElementById(element_id).getElementsByTagName("li");
		  for (var i=0; i<sfEls.length; i++) {
              sfEls[i].onmouseover=function() {
                 this.className+=" sfhover";
              }
              sfEls[i].onmouseout=function() {
                 this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
    	}
 	  }
	}
// Add the IDs that you want to use the hover function below - CSS must have a hover "sfhover" class too
	function sfStart() {
	  sfHover("countrynav");
	  sfHover("navbar");
	}
	if (window.attachEvent) window.attachEvent("onload", sfStart);
}

/* Pop-up Window */
function openWindow ( url, width, height, options, name ) {
  if ( ! width ) width = 640;
  if ( ! height ) height = 420;
  if ( ! options ) options = "scrollbars=yes,menubar=yes,toolbar=yes,location=yes,status=yes,resizable=yes";
  if ( ! name ) name = "outsideSiteWindow";
  var newWin = window.open( url, name, "width=" + width + ",height=" + height + "," + options );
} // end function openWindow

function checkSiteSearchLanguage(){
  var form_name = 'search';
  var lang = document.forms[form_name].elements['search_lang_selection'].value;

  if (lang == 'en'){
     document.forms[form_name].setAttribute("target","_blank");
     submit_action = 'http://www.mathworks.com/cgi-bin/texis/webinator/search/';
  }else{
     document.forms[form_name].removeAttribute("target");
     submit_action = '/cgi-bin/texis/webinator/search_jp/';
  }

  document.forms[form_name].action = submit_action;
}

/* Print this Page */
function printWindow () {
   bV = parseInt(navigator.appVersion)
   if (bV >= 4) window.print()
} // end function printWindow


/* Onclick Omniture Code for Auto-Redirect testing */
/* REMOVED 6/25 - The onClick was removed from the global dropdown. 
To restart the test simply add onclick="addOmnitureCode('${item.code}')" 
back to the hyperlinks in the dropdown UL which can be found in /lib/user/pagelib.html*/
function addOmnitureCode(txt) {
	 var s =s_gi(s_account);  
	s.linkTrackVars='prop36';
//	s.linkTrackEvents='event56';
	
	s.prop36= domain + "_" + txt; //please pick appropriate value from the spreadsheet
	//s.events='event56';
	s.tl(this,'o','Redirects Cookie');
	
}


/* All jQuery calls - All the calls are in one document.ready call because more than one slows down the page */
$(document).ready(function(){


	/* BEGIN Rollover Delay */
	/* Top Navigation Rollover Delay - Works with jQuery hoverIntent - Add delay to top navigation and country navigation */

	$(".rollover_delay").addClass("inactive_state");						   
							   
	//On Hover Over
	function megaHoverOver(){
		$(this).addClass("active_state");
		$(this).removeClass("inactive_state");
	}
	//On Hover Out
	function megaHoverOut(){
		$(this).removeClass("active_state");
		$(this).addClass("inactive_state");
	}
	
	//Set custom configurations
	var config = {
		 sensitivity: 4, // number = sensitivity threshold (must be 1 or higher)
		 interval: 200, // number = milliseconds for onMouseOver polling interval
		 over: megaHoverOver, // function = onMouseOver callback (REQUIRED)
		 timeout: 500, // number = milliseconds delay before onMouseOut
		 out: megaHoverOut // function = onMouseOut callback (REQUIRED)
	};
	
	if ($.fn.hoverIntent) {
    $(".rollover_delay").hoverIntent(config); //Trigger Hover intent with custom configurations
	}

	/* END Rollover Delay */


	/* BEGIN Clear Text onFocus */
	/*This is for clearing text in a text field on focus.  Simply add class 'clear_text_onfocus' to the element*/

	var clearMePrevious = "";

	// clear input on focus
	$(".clear_text_onfocus").focus(function()
		{
		if($(this).val()==$(this).attr('value'))
		{
		clearMePrevious = $(this).val();
		$(this).val('');
		}
	});

	// if field is empty afterward, add text again
	$(".clear_text_onfocus").blur(function()
	{
		if($(this).val()=='')
		{
		$(this).val(clearMePrevious);
	}
	});
	
	/* END Clear Text onFocus */	


	/* BEGIN Toogle Content */
	/*This is for toggling content (expand/collapse) */	

	$(".toggle_content").hide();
	$(".toggle_container .toggle_selector").toggle(function(){
		$(this).addClass("active");
		}, function () {
			$(this).removeClass("active");
		});
	$(".toggle_container .toggle_selector").click(function(){
		$(this).next(".toggle_content").slideToggle("slow,");
	});
	
	/* END Toogle Content */



	/* BEGIN Zebra stripping */
	/* This adds classes of even and odd for datatables with the zebra class */	

	$(".zebra tbody tr:nth-child(even)").addClass("even");
	$(".zebra tbody tr:nth-child(odd)").addClass("odd");
	
	/* END Zebra stripping */	

	
});