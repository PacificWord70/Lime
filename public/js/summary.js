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
                str = str + "<hr><h4>" + bug.name + " " + "<a id=\"share\"name=\"" + bug.BID + "\"><button type=\"button\" class=\"btn btn-sm btn-outline-default waves-effect\">Share</button></a>" +
                    "</button><a href=\"message.html?BID=" + bug.BID + "\"><button type=\"button\" class=\"btn btn-sm btn-outline-success waves-effect\">Chat</button></a>" +
                    "</h4>"
                str = str + "<table class=\"table table-bordered\"><thead>" +
                    "<tr>" +
                    "<th>Category</th>" +
                    "<th>Left</th>" +
                    "<th>Total</th>" +
                    "</tr></thead>"
                var dt = new Date();
                var year = String(dt.getFullYear());
                var month = String(dt.getMonth());
                if (bug.Expenses == null) {
                    str = str + "</table>"
                } else {
                    console.log("Budget", bug.Expenses[year][month])

                    // console.log(bug.Expenses[dt.getFullYear()][dt.getMonth()][cat])

                    for (var cat in bug.categories) {
                        console.log("Cat", cat)
                        var spent;
                        if (bug.Expenses[dt.getFullYear()][dt.getMonth()].categories[cat] == undefined) {
                            spent = 0
                        } else {
                            spent = bug.Expenses[dt.getFullYear()][dt.getMonth()].categories[cat].spent
                        }
                        // console.log("Spent",bug.Expenses[dt.getFullYear()][dt.getMonth()].categories[cat].spent)
                        str = str +
                            "<tbody><tr>" +
                            "<td>" + cat + "</td>" +
                            "<td>$" + (bug.categories[cat].total - spent) + "</td>" +
                            "<td>$" + bug.categories[cat].total + "</td>" +
                            "</tr></tbody>"
                        console.log(cat)
                        console.log(bug.categories[cat])
                    }
                    console.log(bug.categories)
                    console.log(bug.name)
                    str = str + "</table>"
                }
            }

            console.log(str);
            budgetSummary.innerHTML = str;
            var share = document.getElementById('share');
            share.onclick = function () {
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
                    "</input><br><button class=\"btn btn-danger\"onclick=\"copyFunction()\">Copy to Clipboard</button>", "Share Link")


            }
        });
    }
});