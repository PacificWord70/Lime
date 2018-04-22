var url = new URL(window.location.href);
console.log(url.searchParams.get("BID"));


// var messages = firebase.database().ref("/Budgets/" + url.searchParams.get("BID") + "/messages")
// messages.once('value', function (snapshot) {
//     newMessage(snapshot.val())
// });

var messages = firebase.database().ref("/Budgets/" + url.searchParams.get("BID") + "/messages")
messages.on('child_added', function (snapshot) {
    console.log("Limit Last", snapshot.val())
    newMessage(snapshot.val())
});

function newMessage(message) {
    console.log("In message")
    console.log(message)
    var user = firebase.auth().currentUser;
    if(message.uid == user.uid) {
        $("#messages").append(
            "<div class=\"row justify-content-start\">" + 
                "<div class=\"col-md-6 col-sm-6\">" + 
                    "<div class=\"animated fadeInLeft card \" style=\"color:black !important;\">" +
                        "<div class=\"card-body\">" + 
                        "<div>" + message.name + " @ " + message.time +"<hr>"+ message.content + "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>" + 
            "</div><br />"
        )
    }
    else {
        $("#messages").append(
            "<div class=\"row justify-content-end\">" + 
            "<div class=\"col-md-6 col-sm-6\">" + 
                    "<div class=\"animated fadeInRight card grey lighten-3\" style=\"color:black !important;\">" +
                        "<div class=\"card-body\">" + 
                            "<div>" + message.name + " @ " + message.time +"<hr>"+ message.content + "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>" + 
            "</div>"
        )
    }
    window.scrollTo(0,9999999999999999999999);
}
$("#messageInput").on('keyup', function (e) {
    if (e.keyCode == 13) {
        console.log(this.value)
        var user = firebase.auth().currentUser;
        console.log(user.uid)
        firebase.database().ref('/UserInfo/' + user.uid).once('value').then(function (snapshot) {
            var d = new Date();
            var user = firebase.auth().currentUser;
            var messageObject = {
                name: snapshot.val().name,
                uid: user.uid,
                time: d.getHours() + ":" + d.getMinutes(),
                content: $("#messageInput").val(),
            }
            var updates = {};
            var key = (new Date).getTime() + user.uid;
            console.log(key)
            console.log(messageObject)
            updates['/Budgets/' + url.searchParams.get("BID") + "/messages/" + key] = messageObject;
            document.getElementById('messageInput').value='';
            return firebase.database().ref().update(updates);


        });
    }
});

document.getElementById("send").onclick = function () {
    console.log(this.value)
    var user = firebase.auth().currentUser;
    console.log(user.uid)
    firebase.database().ref('/UserInfo/' + user.uid).once('value').then(function (snapshot) {
        var d = new Date();
        var user = firebase.auth().currentUser;
        var messageObject = {
            name: snapshot.val().name,
            uid: user.uid,
            time: d.getHours() + ":" + d.getMinutes(),
            content: $("#messageInput").val(),
        }
        var updates = {};
        var key = (new Date).getTime() + user.uid;
        console.log(key)
        console.log(messageObject)
        updates['/Budgets/' + url.searchParams.get("BID") + "/messages/" + key] = messageObject;
        document.getElementById('messageInput').value='';
        return firebase.database().ref().update(updates);


    });
}