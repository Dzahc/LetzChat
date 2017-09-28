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
    firebase.auth().signOut();
    localStorage.setItem("user", null);
    localStorage.setItem("userId", null);

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log("username = " + username + "\npassword = " + password);

    if (username === "" || password === "") {

        displayError("Please enter an email and password");
        return false;

    }

    // Firebase user sign in method
    firebase.auth().signInWithEmailAndPassword(username, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode) {
            console.log(errorCode + ": " + errorMessage);
            displayError(errorMessage);
        }
    });

        // Once the user is authenticated, grab the user variable
    firebase.auth().onAuthStateChanged(function (user) {
        // Check if the user variable is not null and that it is the current user
        if (user && user.email === username) {

            console.log("Logged in successfully");

            // Store the uid
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("userId", user.uid);

            // Redirect to the hexagon.html page
            window.location.href = "chat.html";
        }
    });

    //console.log("localStorage user = " + localStorage.getItem("user"));

    return false;
}

/**
 * This method handles the signup functionality. It grabs the username and password
 * that the user entered and registers a new user with firebase. An authentication email
 * is sent to the user's email. The name that was entered is then updated in the database
 * via the writeUserData() method.
 */
function onSignupSubmit() {
    firebase.auth().signOut();

    var displayName = document.getElementById('fullName').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    //
    //  Deactivate the submit button
    //
    //$("#submit_button").prop("disabled", true);

    console.log(" displayName = " + displayName + " username = " + username + " password = " + password);

    if (displayName === "" || username === "" || password === "") {
        displayError("Please enter a name, email, and password");
       // $("#submit_button").prop("disabled", false);
        return false;
    }

    // The firebase method to register a new user
    firebase.auth().createUserWithEmailAndPassword(username, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode !== null) {
            // TODO: put the errorCode/Message in a div on the page
            console.log(errorCode + ": " + errorMessage);
            displayError(errorMessage);
           // $("#submit_button").prop("disabled", false);
        }
    });

    // Wait for the user to be authenticated
    firebase.auth().onAuthStateChanged(function (user) {
        if (user && user.email === username) {
            console.log("Created user successfully");
            user.updateProfile({
                displayName: displayName
            }).then(function() {
                console.log("Updated user profile");

                console.log("Adding user to the database");
                writeUserData(user);
                // Send the email verification
                user.sendEmailVerification();
                console.log("Sent Email verification");

                setTimeout(function(){
                    window.location.href = "login.html";
                }, 500);
            });
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
        user.displayName = name;
        user.location = location;
        user.photo_id = picture;
        user.prefix = prefix;
        user.title = jobTitle;

        localStorage.setItem("user", JSON.stringify(user));

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
    if (!user.displayName) {
        user.displayName = "";
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
        displayName: user.displayName,
        location: user.location,
        photo_id: user.photo_id,
        prefix: user.prefix,
        title: user.title
    });
}

function displayError(error) {
    var errorDiv = document.getElementById('errors');
    errorDiv.style.visibility = 'visible';
    errorDiv.innerHTML = error;
}

function logout() {
    console.log("Logging user out");
    firebase.auth().signOut();
    localStorage.setItem("user", null);
    localStorage.setItem("userId", null);

    window.location.href = "login.html";
}

/**
 * Debug method to verify data variables
 * @param {any} user The current user
 */
function printUser(user) {
    console.log("userId: " + user.uid +
        " email: " + user.email +
        " displayName: " + user.displayName +
        " location: " + user.location +
        " photo_id: " + user.photo_id +
        " prefix: " + user.prefix +
        " title: " + user.title);
}

function startConversation() {


    //
    //    Create conversation
    //
    var convoRef = firebase.database().ref('conversations/');
    var time = (new Date()).getTime();
    var owner = localStorage.getItem("userId");
    var key = '';
    if (owner) {
        key = convoRef.push({
            dateTime: time,
            owner_id: owner
        });
    }

    convoId = key.key;

    var partRef = firebase.database().ref('participants/');

    var user_id = [];

    user_id.push(localStorage.getItem("userId"));

    var conversation_id = convoId;

    $('.users:checkbox:checked').each(function (key, value) {

        if (value.value !== localStorage.getItem("userId")) {

            user_id.push(value.value);

        }

    });

    partRef.push({
        user_id: user_id,
        conversation_id: conversation_id
    });

    var redir = "chat.html?conversation_id=" + convoId;

    window.location.href = redir;

    return false;
}