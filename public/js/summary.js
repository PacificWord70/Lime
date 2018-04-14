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
                str = str + "<h1>" + bug.name + "</h1>"
                str = str + "<table>" +
                    "<tr>" +
                    "<th>Catagory</th>" +
                    "<th>Amount Set</th>" +
                    "</tr>"
                for (var cat in bug.categories) {
                    str = str +
                        "<tr>" +
                        "<th>" + cat + "</th>" +
                        "<th>" + bug.categories[cat] + "</th>" +
                        "</tr>"
                    console.log(cat)
                    console.log(bug.categories[cat])
                }
                console.log(bug.categories)
                console.log(bug.name)
                str = str + "</table>"
            }

            console.log(str);
            budgetSummary.innerHTML = str;
        });
    }
});