var config = {
    apiKey: "AIzaSyDOaLgGtZ4VyNLYcpDKA5Cj8GWgMOChmOA",
    authDomain: "lime-4e46e.firebaseapp.com",
    databaseURL: "https://lime-4e46e.firebaseio.com",
    projectId: "lime-4e46e",
    storageBucket: "lime-4e46e.appspot.com",
    messagingSenderId: "897464103789"
  };
  firebase.initializeApp(config);

var loginButton = document.getElementById('loginButton');
var loginEmail = document.getElementById('loginemail');
var loginPassword = document.getElementById('loginpassword');

loginButton.onclick = function(){
    firebase.auth().signInWithEmailAndPassword(loginEmail.value, loginPassword.value).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    var user = firebase.auth().currentUser;
    console.log(user);
  }