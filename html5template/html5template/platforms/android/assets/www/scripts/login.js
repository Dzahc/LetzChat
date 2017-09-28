// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
	
	function testsub() {
		
		return false;
	}
	
	$('div[data-include]').each(function() {
		$(this).load( $(this).attr('data-include') + '.html').trigger('create');
    });   
	
})();

function displayError(message) {

    $("#errors").html(message);

    $("#errors").css("visibility","visible");

    $("#errors").fadeIn(1000);

    $("#errors").fadeOut(4000);

}