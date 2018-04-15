var allexpenses = document.getElementById('allexpenses');

firebase.auth().onAuthStateChanged(function (user) {
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
            str = str + "<option value=\"" + bug.BID + "\">" + bug.name + "</option>"
        }
        console.log(values[0]);
        var str1 = ''
        for (var cat in values[0].categories) {
            console.log(cat)
            // console.log(bug.categories[cat])
            str1 = str1 + "<option value=\"" + cat + "\">" + cat + "</option>"
        }

        console.log(str);
    });
    allexpenses.innerHTML = "You spend the money"
});