// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
    console.log("Before");
    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    console.log("middle");

    function alertDismissed() {
        // do something
    }



    function onDeviceReady() {

        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        //
        //  Get language that was setup in index.js
        //
        var device_language = localStorage.getItem("device_language");

        $("#device_language").html(device_language);

        $('div[data-include]').each(function () {
            $(this).load($(this).attr('data-include') + '.html').trigger('create');
        });

        navigator.notification.alert(
            'LOADED\n',      // message
            alertDismissed,  // callback
            'Language',      // title
            'Done'           // buttonName
        );
        console.log("after");

        
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    }

    function onResume() {

        navigator.globalization.getPreferredLanguage(

            function (language) {
                //
                //  Save the language
                //
                localStorage.setItem("device_language", language.value);
            },
            function () {
                //
                //  No language found then display the original message 
                //  without translating
                //
                //alert('Error getting language\n');
            }

        );

    }
	
} )();