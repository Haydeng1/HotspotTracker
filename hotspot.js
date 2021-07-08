//const Vue = window.vue;

var vm = new Vue({
  el: '#app',
  data: {
    state_name: 'New South Wales',
    active: 376,
    recent: 23,
    message: 'Covid-19 Hotspot Tracker',
    alerts: [
      { name: 'Bossley Park', date: '7 July 2021 9pm to 9:30pm'},
      { name: 'Strathfield South', date: '6 July 2021 10am to 10:15am'},
      { name: 'Double Bay', date: '6 July 2021 2pm to 3pm'},
      { name: 'Marrickville', date: '6 July 2021 8am to 8:10am'},
      { name: 'Bondi Beach.', date: '5 July 2021 9pm to 9:30pm'},
      { name: 'Manly', date: '4 July 2021 10am to 10:15am'},
      { name: 'Liverpool', date: '3 July 2021 11pm to 11:30pm'},
      { name: 'Blair Athol', date: '2 July 2021 6am to 6:10am'},
      { name: 'Danger Island', date: '1 July 2021 10am to 10:15am'},
      { name: 'Ermington', date: '1 July 2021 3pm to 3:30pm'},
      { name: 'Gables', date: '1 July 2021 8am to 8:10am'}
    ]
},
})

let map;

function initMap() {
  const sydney = { lat: -33.865, lng: 151.209 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: sydney,
    mapTypeId: "terrain",
    mapTypeControl: false
  });
  const geocoder = new google.maps.Geocoder();
  document.getElementById("submit").addEventListener("click", () => {
    geocodeAddress(geocoder, map);
  });



  var adelaide = {lat: -34.9304, lng: 138.589}
  const adelstr =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h2 id="firstHeading" class="firstHeading">South Australia</h2>' +
        '<div id="bodyContent">' +
        "<p><b>Date: </b>" + "7/07/2021" + "</p>" +
        "<p><b>Suburb: </b>" + "Adelaide" + "</p>" +
        "<p><b>Postcode: </b>" + "5000" + "</p>" +
        "<p><b>Area: </b>" + "central adelaide" + "</p>" +
        "</div>" +
        "</div>";
        newMarker(adelaide,adelstr,"Adelaide");


  var perth = {lat: -31.95, lng: 115.86}
  const perthstr =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h2 id="firstHeading" class="firstHeading">Western Australia</h2>' +
        '<div id="bodyContent">' +
        "<p><b>Date: </b>" + "7/07/2021" + "</p>" +
        "<p><b>Suburb: </b>" + "Perth" + "</p>" +
        "<p><b>Postcode: </b>" + "6000" + "</p>" +
        "<p><b>Area: </b>" + "central perth" + "</p>" +
        "</div>" +
        "</div>";
  newMarker(perth,perthstr,"Perth");
var infoWindow = new google.maps.InfoWindow({
        maxWidth: 300,
  });
  fetch("https://40i2jp03t8.execute-api.ap-southeast-2.amazonaws.com/testing/GetData").then(data => {
    return data.json();
  })  .then(data => {
    for(let x in data){

      coords = { lat: parseFloat(data[x].lat), lng: parseFloat(data[x].long) };

      var marker = new google.maps.Marker
      ({
      position: coords,
      map,
      title: data[x].lhd_2010_name,
      });

      const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h2 id="firstHeading" class="firstHeading">NSW</h2>' +
        '<div id="bodyContent">' +
        "<p><b>Date: </b>" + data[x].notification_date + "</p>" +
        "<p><b>Suburb: </b>" + data[x].lga_name19 + "</p>" +
        "<p><b>Postcode: </b>" + data[x].postcode + "</p>" +
        "<p><b>Area: </b>" + data[x].lhd_2010_name + "</p>" +
        "</div>" +
        "</div>";

        (function (marker, contentString) {
                google.maps.event.addListener(marker, "click", function (e) {
                    //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                    infoWindow.setContent(contentString);
                    infoWindow.open(map, marker);
                });
            })(marker, contentString);
        // newMarker(coords,contentString,data[x].lhd_2010_name);
    }
  });

  var controlDiv = document.getElementById('floating-panel');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(controlDiv);
}

function newMarker(location,text,title)
{
var infoWindow = new google.maps.InfoWindow({
        maxWidth: 300,
  });
	var marker = new google.maps.Marker
      ({
      position: location,
      map,
      title: title,
      });

      (function (marker, text) {
        google.maps.event.addListener(marker, "click", function (e) {
          //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
          infoWindow.setContent(text);
          infoWindow.open(map, marker);
        });
      })(marker, text);

}

function newLocation(newLat,newLng)
{
	map.setCenter({
		lat : newLat,
		lng : newLng,
	});
}

function makeActive(state)
{
    state.style.backgroundColor = "#14141f";
    state.style.color = "white";

  if (state.id == "nsw") {
    vm.active = 376;
    vm.recent = 23;
    vm.state_name = "New South Wales";
     vm.alerts = [
      { name: 'Bossley Park', date: '7 July 2021 9pm to 9:30pm'},
      { name: 'Strathfield South', date: '6 July 2021 10am to 10:15am'},
      { name: 'Double Bay', date: '6 July 2021 2pm to 3pm'},
      { name: 'Marrickville', date: '6 July 2021 8am to 8:10am'},
      { name: 'Bondi Beach.', date: '5 July 2021 9pm to 9:30pm'},
      { name: 'Manly', date: '4 July 2021 10am to 10:15am'},
      { name: 'Liverpool', date: '3 July 2021 11pm to 11:30pm'},
      { name: 'Blair Athol', date: '2 July 2021 6am to 6:10am'},
      { name: 'Danger Island', date: '1 July 2021 10am to 10:15am'},
      { name: 'Ermington', date: '1 July 2021 3pm to 3:30pm'},
      { name: 'Gables', date: '1 July 2021 8am to 8:10am'}
    ]
  }
  if (state.id == "vic") {
    vm.active = 24;
    vm.recent = 4;
    vm.state_name = "Victorian";
     vm.alerts = [
      { name: 'Tarneit', date: '7 July 2021 9am to 9:30am'}, //3029
      { name: 'St Albans', date: '7 July 2021 7pm to 7:30pm'}, //3021
      { name: 'Burnside', date: '7 July 2021 1pm to 2pm'}, //3023
      { name: 'Fieldstone', date: '7 July 2021 3pm to 3:15pm'}, //3024
    ]
  }
    if (state.id == "qld") {
    vm.active = 55;
    vm.recent = 10;
    vm.state_name = "Queensland";
     vm.alerts = [
      { name: 'Coochin Creek', date: '23 June 2021 9am to 9:30am'},
      { name: 'West End', date: '23 June 2021 7am to 7:30am'},
      { name: 'Hatton Vale', date: '23 June 2021 6am to 6:45am'},
      { name: 'Hamilton', date: '23 June 2021 2pm to 2:30pm'},
    ]
  }
    if (state.id == "sa") {
    vm.state_name = "South Australian";
    vm.active = 28;
    vm.recent = 3;
     vm.alerts = [
      { name: 'Adelaide', date: '25 June 2021 9am to 9:45am'},
    ]
  }
    if (state.id == "wa") {
    vm.state_name = "Western Australian";
    vm.active = 12;
    vm.recent = 1;
     vm.alerts = [
      { name: 'Perth', date: '21 June 2021 9am to 9:45am'},
    ]
  }
    if (state.id == "nt") {
    vm.state_name = "Northern Territory";
    vm.active = 9;
    vm.recent = 0;
     vm.alerts = [
      { name: 'Central Coast', date: '26 June 2021 9am to 9:45am'},
      { name: 'Bayside', date: '23 June 2021 11am to 11:15am'}
    ]
  }

    if (state.id == "act") {
    vm.state_name = "Australian";
    vm.active = 3;
    vm.recent = 0;
    vm.alerts = [
      { name: 'Canberra Central', date: '2 July 2021 9am to 9:30am'},
    ]
  }

  if (state.id == "tas") {
    vm.state_name = "Tasmanian";
    vm.active = 0;
    vm.recent = 0;
    vm.alerts = [
      { name: 'There are no active cases in this state', date: ''},
    ]
  }

  if (state.id != "nsw") {
    var s = document.getElementById("nsw");
    s.style.backgroundColor = "transparent";
    s.style.color = "#E0E0E0";
  }
  if  (state.id != "vic") {
    var s = document.getElementById("vic");
    s.style.backgroundColor = "transparent";
    s.style.color = "#E0E0E0";
  }
 if  (state.id != "nt") {
    var s = document.getElementById("nt");
    s.style.backgroundColor = "transparent";
    s.style.color = "#E0E0E0";
  }
  if  (state.id != "qld") {
    var s = document.getElementById("qld");
    s.style.backgroundColor = "transparent";
    s.style.color = "#E0E0E0";
  }
   if  (state.id != "sa") {
    var s = document.getElementById("sa");
    s.style.backgroundColor = "transparent";
    s.style.color = "#E0E0E0";
  }
   if  (state.id != "act") {
    var s = document.getElementById("act");
    s.style.backgroundColor = "transparent";
    s.style.color = "#E0E0E0";
  }
    if  (state.id != "wa") {
    var s = document.getElementById("wa");
    s.style.backgroundColor = "transparent";
    s.style.color = "#E0E0E0";
  }

  if  (state.id != "tas") {
    var s = document.getElementById("tas");
    s.style.backgroundColor = "transparent";
    s.style.color = "#E0E0E0";
  }
}

function geocodeAddress(geocoder, resultsMap) {
  const address = document.getElementById("address").value;
  geocoder
    .geocode({ address: address,
      componentRestrictions: {
          country: "AU",
        },
      })
    .then(({ results }) => {
      resultsMap.setCenter(results[0].geometry.location);
      resultsMap.setZoom(12);
    })
    .catch((e) =>
      alert("Geocode was not successful for the following reason: " + e)
    );
}

function toggleLogin()
{
  var x = document.getElementById("login");
  var y = document.getElementById("background");
    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      y.style.display = "block";
    } else {
      x.style.display = "none";
      y.style.backgroundColor = "transparent";
      y.style.display = "none";
  }
}

document.getElementById('signup').addEventListener("click", function(){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", "https://40i2jp03t8.execute-api.ap-southeast-2.amazonaws.com/testing/SendAlerts?phoneNumber="+document.getElementById('mobile').value.replace("+", "%2B")+"&postcode="+document.getElementById('postcode').value, false ); // false for synchronous request
  xmlHttp.send( null );
});

//Loop through the results array and place a marker for each
//set of coordinates.
const eqfeed_callback = function (results) {
  for (let i = 0; i < results.features.length; i++) {
    const coords = results.features[i].geometry.coordinates;
    const latLng = new google.maps.LatLng(coords[1], coords[0]);
    new google.maps.Marker({
      position: latLng,
      map: map,
    });
  }
};
