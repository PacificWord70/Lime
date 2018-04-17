var status = document.getElementById('status');
status.innerHTML = "Adding Budget to your budget"
firebase.auth().onAuthStateChanged(function (user) {
if(user == null){
    window.location = "home.html";
}

console.log(window.location.href)
var url = new URL(window.location.href);
console.log(url.searchParams.get("budget"));

status.innerHTML = "Adding Budget to your budget"

// jQuery.ajax({
//     url: "https://us-central1-lime-4e46e.cloudfunctions.net/message/share?UID=" + user.uid + "&budget=" + url.searchParams.get("budget") ,
//     type: "GET",
//     data: {
//     },
//     dataType: "json",
//     beforeSend: function (x) {
//       if (x && x.overrideMimeType) {
//         x.overrideMimeType("application/j-son;charset=UTF-8");
//       }
//     },
//     success: function (result) {
//       //Write your code here
//       console.log("Success",result);
      
//     },
//     complete: function(data) {
//         // window.location = "home.html";
//     }
//   });

});