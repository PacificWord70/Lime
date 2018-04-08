      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyDOaLgGtZ4VyNLYcpDKA5Cj8GWgMOChmOA",
        authDomain: "lime-4e46e.firebaseapp.com",
        databaseURL: "https://lime-4e46e.firebaseio.com",
        projectId: "lime-4e46e",
        storageBucket: "lime-4e46e.appspot.com",
        messagingSenderId: "897464103789"
      };
      firebase.initializeApp(config);

var newAccountButton = document.getElementById('newAccount');
var email = document.getElementById('emailField');
var password = document.getElementById('passwordField');
var nameInput = document.getElementById('nameField');
var phone = document.getElementById('phoneField');

newAccountButton.onclick = function(){
    console.log("Function");
    console.log(email.value);
    console.log(password.value);
    console.log(nameInput.value);
    console.log(phone.value);
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      }).then(() => {
        window.location = "home.html";
      });
}

