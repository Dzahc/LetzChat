// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    // Initialize Firebase with our configuration
    var config = {
        apiKey: "AIzaSyBjF93oNeV9xMebcstkjtr-rV2WoRy6eh0",
        authDomain: "letzchatenterprise.firebaseapp.com",
        databaseURL: "https://letzchatenterprise.firebaseio.com",
        projectId: "letzchatenterprise",
        storageBucket: "letzchatenterprise.appspot.com",
        messagingSenderId: "138258019105"
    };
    firebase.initializeApp(config);



	$('div[data-include]').each(function() {
		$(this).load( $(this).attr('data-include') + '.html').trigger('create');
	});

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();