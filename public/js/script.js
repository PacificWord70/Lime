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

      var resetPasswordButton = document.getElementById('resetPassword');
      var resetEmail = document.getElementById('resetEmail');

      var profileName = document.getElementById('profileName');
      var profileEmail = document.getElementById('profileEmail');
      var profilePhonenumber = document.getElementById('profilePhonenumber');
      var submitProfile = document.getElementById('submitProfile');

      var newBudgetName = document.getElementById('newBudgetName');
      var newCategories = document.getElementById('newCategories');
      var newLimit = document.getElementById('newLimit');


        $(document).ready(function() {
          $('#loadHeaderDiv').load("header.html");
        });

      var budgetSummary = document.getElementById('budgetSummary');
      var budget = {
        name: '',
        categories: {

        }
      }
      var profile;

      firebase.auth().onAuthStateChanged(function (user) {
        console.log(user);
        if (!user && !(window.location.pathname == '/index.html' || window.location.pathname == '/pswd.html' || window.location.pathname == '/newacc.html')) {
          window.location = '/index.html';
        } else {
          if (window.location.pathname == '/profile.html') {
            var uid = firebase.auth().currentUser.uid;
            firebase.database().ref('/UserInfo/' + uid).once('value').then(function (snapshot) {
              profile = snapshot.val();

              profileName.value = snapshot.val().name;
              profilePhonenumber.value = snapshot.val().phone;
              profileEmail.value = user.email;
            });
          }
        }
      });

      if (window.location.pathname == '/newbudget.html') {
        $(document).ready(function () {
            var newBudgetButton = document.getElementById('newBudgetButton');
            console.log(newBudgetButton)
            newBudgetButton.onclick = function () {
            budget.name = newBudgetName.value
            console.log(budget)
            $('#dialog1').addClass('animated fadeOutLeft');
            $('#dialog2').removeClass('invisible').addClass("animated fadeInRight");

          }
          })
          var submitBudget = document.getElementById('submitBudget');
          var addCategoryButton = document.getElementById('addCategoryButton');

          submitBudget.onclick = function () {
            var uid = firebase.auth().currentUser.uid;
            var budgetID = firebase.database().ref().child('Budgets').push().key;
            var updates = {};
            budget.BID = budgetID;
            updates['/Budgets/' + budgetID] = budget;
            firebase.database().ref().update(updates);
            console.log(uid);
            updates['/UserInfo/' + uid + '/UserBudgets/' + budgetID] = budgetID;
            return firebase.database().ref().update(updates).then(() => {
              window.location = '/home.html'
            });
          }
          
          addCategoryButton.onclick = function () {
            var str = newCategories.value;
            budget.categories[str] = {
              total: newLimit.value,
              spent: 0
            }
            newCategories.value = ""
            newLimit.value = ""
            console.log(budget)
          }

      }

      if (submitProfile != null) {
        submitProfile.onclick = function () {
          var user = firebase.auth().currentUser;
          console.log(user.uid);
          profile.uid = user.uid;
          profile.phone = profilePhonenumber.value;
          profile.name = profileName.value;
          var updates = {};
          updates['/UserInfo/' + user.uid] = profile;

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
          firebase.auth().sendPasswordResetEmail(resetEmail.value).finally(function () {
            window.location = '/index.html';
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
            "hideDuration": "500",
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

      function sleep(miliseconds) {
        var currentTime = new Date().getTime();
        while (currentTime + miliseconds >= new Date().getTime()) {}
      }

      function hello() {
        firebase.auth().signOut().then(function () {
          // Sign-out successful.
        }).catch(function (error) {
          // An error happened.
        });
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

      function copyFunction() {
        /* Get the text field */
        var copyText = document.getElementById("shareLink");
        /* Select the text field */
        copyText.select();
        /* Copy the text inside the text field */
        document.execCommand("Copy");
      }


      $("#phoneField").on("change keyup paste click", function () {
        console.log("Change")
        var current = $("#phoneField").val().substring(2).replace(/[\D]/g, '');
        $("#phoneField").val("+1" + current)
      })

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
              data = {
                "number": phone.value,
                "name": nameInput.value
              }
              jQuery.ajax({
                url: "https://us-central1-lime-4e46e.cloudfunctions.net/message/hello",
                type: "POST",
                data: {
                  number: phone.value,
                  name: nameInput.value
                },
                dataType: "json",
                beforeSend: function (x) {
                  if (x && x.overrideMimeType) {
                    x.overrideMimeType("application/j-son;charset=UTF-8");
                  }
                },
                success: function (result) {
                  //Write your code here
                  console.log("Success", success);

                },
                complete: function (data) {
                  window.location = "home.html";
                }
              });
              // window.location = "home.html";
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

