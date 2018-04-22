
var url = new URL(window.location.href);
console.log(url.searchParams.get("BID"));

var messages = firebase.database().ref("/Budgets/" + url.searchParams.get("BID") + "/messages")
messages.limitToLast(1).on('value', function(snapshot) {
    newMessage(snapshot.val())
   console.log(snapshot.val());
  });


  function newMessage(message) {
      console.log("In message")
      console.log(message)
    $("#messages").append("<div>" + message.uid + " " + message.content + "</div>")
  } 
  $("#messageInput").on('keyup', function (e) {
    if (e.keyCode == 13) {
        console.log(this.value)
        var user = firebase.auth().currentUser;
        var messageObject = {
            uid: user.uid,
            content: this.value,
          }
          var updates = {};
          var key = (new Date).getTime() + user.uid;
          console.log(key)
          updates['/Budgets/' + url.searchParams.get("BID") + "/messages/" + key] = messageObject;
          return firebase.database().ref().update(updates);
    }
});