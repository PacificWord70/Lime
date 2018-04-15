var allexpenses = document.getElementById('allexpenses');

firebase.auth().onAuthStateChanged(function (user) {
    console.log(user.id);
    return firebase.database().ref('/UserInfo/' + user.uid + '/UserBudgets/').once('value').then(function (snapshot) {
        console.log(snapshot.val());
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
    });
    allexpenses.innerHTML = "You spend the money"
});