    // Initialize Firebase
var config = {
    apiKey: "AIzaSyBjF93oNeV9xMebcstkjtr-rV2WoRy6eh0",
    authDomain: "letzchatenterprise.firebaseapp.com",
    databaseURL: "https://letzchatenterprise.firebaseio.com",
    projectId: "letzchatenterprise",
    storageBucket: "letzchatenterprise.appspot.com",
    messagingSenderId: "138258019105"
};
firebase.initializeApp(config);

var fullName = "";
var username = "";
var password = "";
var loginForm = document.getElementById('loginForm');

function onLoginSubmit() {
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;

    console.log("username = " + username + "\npassword = " + password);

    firebase.auth().signInWithEmailAndPassword(username, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode !== null) {
            console.log(errorCode + ": " + errorMessage);
        }
    });
    //window.location.href = 'hexagon.html';

    return false;
}

function onSignupSubmit() {

    fullName = document.getElementById('fullName').value;
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;

    console.log("fullName = " + fullName + "\nusername = " + username + "\npassword = " + password);

    firebase.auth().createUserWithEmailAndPassword(username, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode !== null) {
            window.alert(errorCode + ": " + errorMessage);
        }
    });

    console.log("Created user successfully");

    var user2 = "";
    firebase.auth().onAuthStateChanged(function (user) {
        user2 = user;
        if (user) {
            user.sendEmailVerification();
            console.log("Sent Email verification");
            user.fullName = fullName;
            writeUserData(user);
        }
    });

    return false;
}

function writeUserData(user) {
    printUser(user);
    var userRef = firebase.database().ref('userId/' + user.uid);
    console.log("userRef = " + userRef.toString());

    //var newData = userRef.push();
    
    userRef.set({
        email: user.email,
        fullName: user.fullName,
        location: user.location,
        password: user.password,
        photo_id: user.photo_id,
        prefix: user.prefix,
        title: user.title
    });
}

function printUser(user) {
    console.log("userId: " + user.uid +
        "\nemail: " + user.email +
        "\nfullName: " + user.fullName +
        "\nlocation: " + user.location +
        "\nphoto_id: " + user.photo_id +
        "\nprefix: " + user.prefix +
        "\ntitle: " + user.title);
}