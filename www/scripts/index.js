// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints,
// and then run "window.location.reload()" in the JavaScript Console.
(function () {

    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        function alertDismissed() {
            // do something
        }

        // navigator.globalization.getPreferredLanguage(
        //
        //     function (language) {
        //         //
        //         //  Save the language
        //         //
        //         localStorage.setItem("device_language", language.value);
        //     },
        //     function () {
        //         //
        //         //  No language found then display the original message
        //         //  without translating
        //         //
        //         //alert('Error getting language\n');
        //     }
        //
        // );
        //
        // // Beep twice!
        // navigator.notification.beep(1);

        //
        //  Initiate the push notification
        //  NOTE: https://console.firebase.google.com/project/letzchatenterprise/overview
        //
        //PushNotification.init();

		//var notificationOpenedCallback = function(jsonData) {
		//	//console.log('notreceivedificationOpenedCallback: ' + JSON.stringify(jsonData));
		//	window.alert("Notif received");
		//};

		//window.plugins.OneSignal
		//	.startInit("6f42939a-740a-4454-ad67-691e62a08bbc")
		//	.handleNotificationOpened(notificationOpenedCallback)
		//	.endInit();


		//window.plugins.OneSignal.setSubscription(true);

		//window.plugins.OneSignal.enableNotificationWhenActive(true);

        //
        //  Redirect to the main page
        //
        window.location.href = 'login.html';
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    }

    function onResume() {

        // TODO: This application has been reactivated. Restore application state here.
        navigator.notification.alert(
            'ACTIVATION\n',  // message
            alertDismissed,         // callback
            'Language',            // title
            'Done'                  // buttonName
        );
    }
} )();
