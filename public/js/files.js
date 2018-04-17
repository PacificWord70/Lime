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
        for (bug of values) {
            str = str + "<hr><h4>" + bug.name +" "+ "<img style=\"width:3%;\" src=\"../img/share.png\">"+ "</h4>"
            str = str + "<table class=\"table table-bordered\"><thead>" +
                "<tr>" +
                "<th>Categories</th>" +
                "<th>Amount spent</th>" +
                "<th>Location</th>" +
                "<th>Date</th>" +
                "</tr></thead>"
            for (exp in bug.Expenses) {
                console.log("Expense ID", exp);
                console.log(bug.Expenses[exp].categories)
                console.log(bug.Expenses[exp].moneyamt);
                console.log(bug.Expenses[exp].streetaddr);
                console.log(bug.Expenses[exp].date);
            }
            for (exp in bug.Expenses) {
                str = str +
                    "<tbody><tr>" +
                    "<td>";
                    for (cat of bug.Expenses[exp].categories) {
                        console.log(cat)
                        str = str + cat + " "
                    } 
                    str = str + "</td>" +
                    "<td>$" + bug.Expenses[exp].moneyamt + "</td>" +
                    "<td>" + bug.Expenses[exp].streetaddr + "</td>" +
                    "<td>" + bug.Expenses[exp].date + "</td>" +
                    "</tr></tbody>"
                console.log(cat)
                console.log(bug.categories[cat])
            }
            console.log(bug.categories)
            console.log(bug.name)
            str = str + "</table>"

            console.log(bug.name);
            // console.log(bug.Expenses)

        }
        allexpenses.innerHTML = str
    });
});