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

      var loginEmail = document.getElementById('loginemail');
      var loginPassword = document.getElementById('loginpassword');
      var loginButton = document.getElementById('loginButton');
      var logoutButton = document.getElementById('logout');

      var resetPasswordButton = document.getElementById('resetPassword');
      var resetEmail = document.getElementById('resetEmail');

      var profileName = document.getElementById('profileName');
      var profileEmail = document.getElementById('profileEmail');
      var profilePhonenumber = document.getElementById('profilePhonenumber');
      var submitProfile = document.getElementById('submitProfile');

      var newBudgetName = document.getElementById('newBudgetName');
      var newCategories = document.getElementById('newCategories');
      var newLimit = document.getElementById('newLimit');
      var newBudgetButton = document.getElementById('newBudgetButton');
      var addCategoryButton = document.getElementById('addCategoryButton');
      var budget = {
        name: '',
        categories : {

        }
      }

      firebase.auth().onAuthStateChanged(function (user) {
        console.log(user);
        if (!user && !(window.location.pathname == '/index.html' || window.location.pathname == '/pswd.html' || window.location.pathname == '/newacc.html')) {
          window.location = '/index.html';
        } else {
          if (window.location.pathname == '/profile.html') {
            uid = firebase.auth().currentUser.uid;
            firebase.database().ref('/UserInfo/' + uid).once('value').then(function (snapshot) {
              //prints a json of courses to the console
              //Course id is the value, the keys are meaning less
              profileName.value = snapshot.val().name;
              profilePhonenumber.value = snapshot.val().phone
              profileEmail.value = user.email;
            });
          }
        }
      });

      if (window.location.pathname == '/home.html') {
        newBudgetButton.onclick = function () {
          budget.name = newBudgetName.value
          console.log(budget)
          var budgetID = firebase.database().ref().child('Budgets').push().key;
          var updates = {};
          updates['/Budgets/' + budgetID] = budget;
          firebase.database().ref().update(updates);

          var uid = firebase.auth().currentUser.uid;
          console.log(uid);
          updates['/UserInfo/' + uid + '/UserBudgets/' + budgetID] = budgetID;
          return firebase.database().ref().update(updates);
        }
        addCategoryButton.onclick = function () {
          var str = newCategories.value;
          budget.categories[str] = newLimit.value;
          console.log(budget)
        }
      }


      if (submitProfile != null) {
        submitProfile.onclick = function () {
          var user = firebase.auth().currentUser;
          console.log(uid);
          var userObject = {
            uid: user.uid,
            phone: profilePhonenumber.value,
            name: profileName.value
          }
          var updates = {};
          updates['/UserInfo/' + uid] = userObject;

          if (user.email != profileEmail.value) {
            console.log(profileEmail.value)
            user.updateEmail(profileEmail.value).then(function () {
              // Update successful.
            }).catch(function (error) {
              console.log(error)
            });
          }
          toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-bottom-center",
            "preventDuplicates": false,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }
          toastr.success("Info Updated");
          return firebase.database().ref().update(updates);
        }
      }


      if (resetPasswordButton != null) {

        resetPasswordButton.onclick = function () {
          firebase.auth().sendPasswordResetEmail(resetEmail.value).then(function () {

          }).catch(function (error) {
            console.log(error)
          });
          resetEmail.value = "";
          toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-bottom-center",
            "preventDuplicates": false,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }
          toastr.success("The email should be in your inbox", "Sent");
        }
      }

      if (logoutButton != null) {
        logoutButton.onclick = function () {
          firebase.auth().signOut().then(function () {
            // Sign-out successful.
          }).catch(function (error) {
            // An error happened.
          });
        }
      }

      if (loginButton != null) {
        loginButton.onclick = function () {
          console.log("Function");
          console.log(loginEmail.value);
          console.log(loginPassword.value);
          firebase.auth().signInWithEmailAndPassword(loginEmail.value, loginPassword.value).then(() => {
              window.location = "home.html";
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;

              console.log(errorMessage);
              // ...
            });
        }
      }

      if (newAccountButton != null) {
        console.log("Here");
        newAccountButton.onclick = function () {
          firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then(() => {
              var uid = firebase.auth().currentUser.uid;
              console.log(uid);

              var userObject = {
                uid: uid,
                phone: phone.value,
                name: nameInput.value
              }
              var updates = {};
              updates['/UserInfo/' + uid] = userObject;
              return firebase.database().ref().update(updates);
            })
            .then(() => {
              window.location = "home.html";
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
              console.log(errorMessage);
            });
        }
      }