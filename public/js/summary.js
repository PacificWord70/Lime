var budgetSummary = document.getElementById('budgetSummary');

firebase.auth().onAuthStateChanged(function (user) {
    if (window.location.pathname == '/home.html') {
        console.log("Here");
        return firebase.database().ref('/UserInfo/' + user.uid + '/UserBudgets/').once('value').then(function (snapshot) {
            var reads = [];
            snapshot.forEach(function (childSnapshot) {
                var id = childSnapshot.key;
                console.log(id);
                var promise = firebase.database().ref('/Budgets/' + id).once('value').then(function (snap) {
                    return snap.val();
                    // The Promise was fulfilled.
                }, function (error) {
                    console.error(error);
                });
                console.log(promise);
                reads.push(promise);
            });
            return Promise.all(reads);
        }, function (error) {
            console.error(error);
        }).then(function (values) {
            console.log(values);
            var str = ''
            for (var bug of values) {
                // TODO: Add MDBootstrap classes
                str = str + "<hr><h4>" + bug.name +" "+ "<img id=\"share\" name=\"" +  bug.BID + "\"style=\"width:1em;\" src=\"img/share.png\"><a href=\"message.html?BID=" + bug.BID + "\"><i class=\"fa fa-comments\" aria-hidden=\"true\"></i></a></h4>"
                str = str + ""
                str = str + "<table class=\"table table-bordered\"><thead>" +
                    "<tr>" +
                    "<th>Category</th>" +
                    "<th>Left</th>" +
                    "<th>Total</th>" +
                    "</tr></thead>"
                for (var cat in bug.categories) {
                    str = str +
                        "<tbody><tr>" +
                        "<td>" + cat + "</td>" +
                        "<td>$" + (bug.categories[cat].total - bug.categories[cat].spent) + "</td>" +
                        "<td>$" + bug.categories[cat].total + "</td>" +
                        "</tr></tbody>"
                    console.log(cat)
                    console.log(bug.categories[cat])
                }
                console.log(bug.categories)
                console.log(bug.name)
                str = str + "</table>"
            }

            console.log(str);
            budgetSummary.innerHTML = str;
            var share = document.getElementById('share');
            share.onclick = function() {
                console.log(this);
                toastr.options = {
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-bottom-right",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "1000",
                    "hideDuration": "1000",
                    "timeOut": 0,
                    "extendedTimeOut": 0,
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut",
                    "tapToDismiss": false
                  }
                  console.log($('#share').attr('name'))
                //   toastr.success("");

                  toastr.info("<input id=\"shareLink\" value=\"https://lime-4e46e.firebaseapp.com/share.html?budget=" + this.name + "\" readonly>" + 
                  "</input><br><button class=\"btn btn-danger\"onclick=\"copyFunction()\">Copy to Clipboard</button>"
                  , "Share Link")


            }
        });
    }
});