var allexpenses = document.getElementById('allexpenses');

firebase.auth().onAuthStateChanged(function (user) {
    // console.log(user.id);
    return firebase.database().ref('/UserInfo/' + user.uid + '/UserBudgets/').once('value').then(function (snapshot) {
        // console.log(snapshot.val());
        var reads = [];
        snapshot.forEach(function (childSnapshot) {
            var id = childSnapshot.key;
            // console.log(id);
            var promise = firebase.database().ref('/Budgets/' + id).once('value').then(function (snap) {
                return snap.val();
                // The Promise was fulfilled.
            }, function (error) {
                console.error(error);
            });
            // console.log(promise);
            reads.push(promise);
        });
        return Promise.all(reads);
    }, function (error) {
        console.error(error);
    }).then(function (values) {
        console.log("Values", values);
        var str = "";
        var dt = new Date();
        for (bug of values) {
            str = str + "<hr><h4>" + bug.name +" "+ "<img id=\"share\" name=\"" +  bug.BID + "\"style=\"width:3%;\" src=\"../img/share.png\">"+ "</h4>"
            str = str + "<table class=\"table table-bordered\"><thead>" +
                "<tr>" +
                "<th>Categories</th>" +
                "<th>Amount spent</th>" +
                "<th>Location</th>" +
                "<th>Date</th>" +
                "</tr></thead>"
            // console.log(bug)
            console.log("Bug", bug.Expenses[dt.getFullYear()][dt.getMonth()][dt.getDate()])
            for (exp in bug.Expenses[dt.getFullYear()][dt.getMonth()][dt.getDate()]) {
                console.log("Expense ID", exp);
                console.log(bug.Expenses[dt.getFullYear()][dt.getMonth()][dt.getDate()][exp])
                console.log(bug.Expenses);
                console.log(bug.Expenses);
                console.log(bug.Expenses);
            }
            for (exp in bug.Expenses[dt.getFullYear()][dt.getMonth()][dt.getDate()]) {
                console.log()
                str = str +
                    "<tbody><tr>" +
                    "<td>";
                    console.log()
                    for (cat of bug.Expenses[dt.getFullYear()][dt.getMonth()][dt.getDate()][exp].categories) {
                        // console.log(cat)
                        str = str + cat + " "
                    } 
                    str = str + "</td>" +
                    "<td>$" + bug.Expenses[dt.getFullYear()][dt.getMonth()][dt.getDate()][exp].moneyamt + "</td>" +
                    "<td>" + bug.Expenses[dt.getFullYear()][dt.getMonth()][dt.getDate()][exp].streetaddr + "</td>" +
                    "<td>" + bug.Expenses[dt.getFullYear()][dt.getMonth()][dt.getDate()][exp].date + "</td>" +
                    "</tr></tbody>"
                // console.log(cat)
                // console.log(bug.categories[cat])
            }
            // console.log(bug.categories)
            // console.log(bug.name)
            str = str + "</table>"

            console.log(bug.name);
            // console.log(bug.Expenses)

        }
        allexpenses.innerHTML = str
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

                  toastr.info("budgetlime.us/share.html?budget=" + this.name, "Share Link")

                }
    });
});