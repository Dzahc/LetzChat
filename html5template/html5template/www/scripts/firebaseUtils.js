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


/**
 * This method handles the login functionality. It grabs the username and password
 * that the user entered and checks against the firebase database. The userId is then saved
 * to localStorage and the user is redirected to hexagon.html.
 */
function onLoginSubmit() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log("username = " + username + "\npassword = " + password);

    // Firebase user sign in method
    firebase.auth().signInWithEmailAndPassword(username, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode) {
            console.log(errorCode + ": " + errorMessage);
        }
    });
    console.log("Logged in successfully");

    // Once the user is authenticated, grab the user variable
    firebase.auth().onAuthStateChanged(function (user) {
        // Check if the user variable is not null and that it is the current user
        if (user && user.email === username) {
            // Store the uid
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("userId", user.uid);
        }
    });

    console.log("localStorage user = " + localStorage.getItem("user"));

    // Redirect to the hexagon.html page
    window.location.href = "hexagon.html";

    return false;
}

/**
 * This method handles the signup functionality. It grabs the username and password
 * that the user entered and registers a new user with firebase. An authentication email
 * is sent to the user's email. The name that was entered is then updated in the database
 * via the writeUserData() method.
 */
function onSignupSubmit() {
    var fullName = document.getElementById('fullName').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log("fullName = " + fullName + "\nusername = " + username + "\npassword = " + password);

    // The firebase method to register a new user
    firebase.auth().createUserWithEmailAndPassword(username, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode !== null) {
            // TODO: put the errorCode/Message in a div on the page
            window.alert(errorCode + ": " + errorMessage);
        }
    });

    console.log("Created user successfully");

    // Wait for the user to be authenticated
    firebase.auth().onAuthStateChanged(function (user) {
        if (user && user.email === username) {
            user.fullName = fullName;
            // Send the email verification
            user.sendEmailVerification();
            console.log("Sent Email verification");
            writeUserData(user);
        }
    });

    return false;
}

/**
 * This method handles the profile settings update functionality. It grabs the user set
 * variables and updates the stored user info in the firebase database.
 */
function onProfileSubmit() {
    var prefix = document.getElementById('title').value;
    var name = document.getElementById('name').value;
    var jobTitle = document.getElementById('job-title').value;
    var location = document.getElementById('location').value;
    var picture = document.getElementById('picture').value;

    //TODO: verify the data inputs

    console.log("prefix = " + prefix + "\nname = " + name + "\njobTitle = " + jobTitle + "\nlocation = " + location + "\npicture = " + picture);

    var user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        user.fullName = name;
        user.location = location;
        user.photo_id = picture;
        user.prefix = prefix;
        user.title = jobTitle;
        
        writeUserData(user);

        //TODO: Update an HTML field
        console.log("Updated user profile");

        window.location.href = "profile-view.html"; 
    }
    else {
        console.log("User not logged in.");
    }

    return false;
}

/**
 * This method handles adding/updating the data for the given user into the firebase database.
 * @param {any} user The user variable with the desired profile settings already set on it.
 */
function writeUserData(user) {
    // Default any undefined data elements to  ""
    if (!user.email) {
        user.email = "";
    }
    if (!user.fullName) {
        user.fullName = "";
    }
    if (!user.location) {
        user.location = "";
    }
    if (!user.photo_id) {
        user.photo_id = "";
    }
    if (!user.prefix) {
        user.prefix = "";
    }
    if (!user.title) {
        user.title = "";
    }
    printUser(user);

    // Grab a reference to the database at the specific user path
    var userRef = firebase.database().ref('userId/' + user.uid);
    console.log("userRef = " + userRef.toString());

    // The firebase method to set the data in the database
    userRef.set({
        email: user.email,
        fullName: user.fullName,
        location: user.location,
        photo_id: user.photo_id,
        prefix: user.prefix,
        title: user.title
    });
}

    function onMessageSubmitted() {
        console.log("function called");
        var user = JSON.parse(localStorage.getItem("user"));
        var user_id = user.uid;

        var text = document.getElementById('message').value;
        var conversation_id = "";
        var dateTime = new Date().toString();
        var language = localStorage.getItem("device_language");

        console.log("the time is " + dateTime);
        console.log("the language is " + language);
        console.log("the message is " + text);

        if (language === null) {
            language = "";
        }
        if (!conversation_id) {
            conversation_id = "";
        }
        if (!dateTime) {
            dateTime = "";
        }
        if (!text) {
            text = "";
        }
        if (!user_id) {
            user_id = "";
        }

        var messageRef = firebase.database().ref('messages/');
        messageRef.push({
            conversation_id: conversation_id,
            dateTime: dateTime,
            language: language,
            text: text,
            user_id: user_id
        });
        return false;
    }

/**
 * Debug method to verify data variables
 * @param {any} user The current user
 */
function printUser(user) {
    console.log("userId: " + user.uid +
        "\nemail: " + user.email +
        "\nfullName: " + user.fullName +
        "\nlocation: " + user.location +
        "\nphoto_id: " + user.photo_id +
        "\nprefix: " + user.prefix +
        "\ntitle: " + user.title);
}