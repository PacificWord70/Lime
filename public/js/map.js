var heatmapData = [

];
var myVar = setTimeout(myTimer, 1000);

function myTimer() {
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData
  });
  heatmap.setMap(map);
}
myVar

firebase.auth().onAuthStateChanged(function (user) {
  var home = new google.maps.LatLng(40.425869, -86.908066);
  var infoWindow = new google.maps.InfoWindow;
  map = new google.maps.Map(document.getElementById('map'), {
    center: home,
    zoom: 11,
    mapTypeId: 'satellite'
  });

  var geocoder = new google.maps.Geocoder();

  return firebase.database().ref('/UserInfo/' + user.uid + '/UserBudgets/').once('value').then(function (snapshot) {
    var reads = [];
    snapshot.forEach(function (childSnapshot) {
      var id = childSnapshot.key;
      console.log(id);
      var promise = firebase.database().ref('/Budgets/' + id).once('value').then(function (snap) {
        return snap.val();
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
    var Pro = [];
    var dt = new Date();
    for (bug of values) {
      if (bug.Expenses != null) {
        for (day in bug.Expenses[dt.getFullYear()][dt.getMonth()]) {
          // console.log("Day", day)
          if (day != "categories") {
            for (exp in bug.Expenses[dt.getFullYear()][dt.getMonth()][day]) {
              // console.log("EXP", exp)
              var addr = bug.Expenses[dt.getFullYear()][dt.getMonth()][day][exp].streetaddr
              console.log(addr)
              if (addr != '' || addr != null) {
                console.log(addr)
                Pro.push(geocodeAddress(geocoder, map, addr))
              }
            }
          }
        }
      }
    }
    console.log(Pro)
    Promise.all(Pro).then(() => {
      console.log("HeatmapData", heatmapData)
      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
      });
      heatmap.setMap(map);
      console.log(navigator.geolocation)
      if (navigator.geolocation) {
        // console.log("Nav")
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          map.setCenter(pos);
          // console.log(pos.lat, "Just pos");
        }, function () {});
      }

    })
  })
});

function geocodeAddress(geocoder, resultsMap, address) {
  // console.log("Address", address)
  geocoder.geocode({
    'address': address
  }, function (results, status) {
    if (status === 'OK') {
      // console.log("New Heat point")
      // console.log(results[0].geometry.location)
      // console.log(results[0].geometry.location.lat())
      // console.log(results[0].geometry.location.lng())
      heatmapData.push(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
      return new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}