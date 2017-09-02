(function () {
    'use strict';
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBjF93oNeV9xMebcstkjtr-rV2WoRy6eh0",
        authDomain: "letzchatenterprise.firebaseapp.com",
        databaseURL: "https://letzchatenterprise.firebaseio.com",
        projectId: "letzchatenterprise",
        storageBucket: "",
        messagingSenderId: "138258019105"
    };
    firebase.initializeApp(config);
    var username = "";
    var password = "";
    var loginForm = document.getElementById('loginForm');

    function onLoginSubmit() {
        window.alert("onLoginSubmit hit");
        username = document.getElementById('username').value;
        password = document.getElementById('password').value;

        window.alert("username = " + username + "\npassword = " + password);
        return false;
    }
    /*
    var username = "";
    var password = "";
    var loginButton = document.getElementById('login');
    loginButton.onclick = function(){
        username = document.getElementById('username');
        password = document.getElementById('password');
        	
        window.alert("username = " + username + "\npassword = " + password);
    };
    
    firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    */
})();