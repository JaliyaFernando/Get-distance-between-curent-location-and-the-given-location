
var latChosen,lngChosen,latCurrent,lngCurrent;
//Set up some of our variables.
var map; //Will contain map object.
var marker = false; ////Has the user plotted their location marker?

//Function called to initialize / create the map.
//This is called when the page has loaded.
function initMap() {

    //The center location of our map.
    var centerOfMap = new google.maps.LatLng(52.357971, -6.516758);

    //Map options.
    var options = {
        center: centerOfMap, //Set center.
        zoom: 7 //The zoom value.
    };

    //Create the map object.
    map = new google.maps.Map(document.getElementById('map'), options);

    //Listen for any clicks on the map.
    google.maps.event.addListener(map, 'click', function(event) {
        //Get the location that the user clicked.
        var clickedLocation = event.latLng;
        //If the marker hasn't been added.
        if(marker === false){
            //Create the marker.
            marker = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true //make it draggable
            });
            //Listen for drag events!
            google.maps.event.addListener(marker, 'dragend', function(event){
                markerLocation();
            });
        } else{
            //Marker has already been added, so just change its location.
            marker.setPosition(clickedLocation);
        }
        //Get the marker's location.
        markerLocation();
    });
}

//This function will get the marker's current location and then add the lat/long
//values to our textfields so that we can save the location.
function markerLocation(){
    //Get location.
    var currentLocation = marker.getPosition();
    //Add lat and lng values to a field that we can save.
    latChosen = currentLocation.lat();
    lngChosen = currentLocation.lng();
    getLocation();
    document.getElementById('latChosen').value = currentLocation.lat(); //latitude
    document.getElementById('lngChosen').value = currentLocation.lng(); //longitude

}


//current location

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    latCurrent = position.coords.latitude;
    lngCurrent = position.coords.longitude;

    getDis()
    document.getElementById('latCurrent').value = position.coords.latitude; //latitude
    document.getElementById('lngCurrent').value = position.coords.longitude; //longitude
}


//get distance
function getDis() {
    var distance = distanceBetween(latChosen,lngChosen,latCurrent,lngCurrent, "K");
    console.log("geo dis: " + distance);
    document.getElementById('distance').value = distance + "Km";
}
function distanceBetween(lat1, lon1, lat2, lon2, unit) {
    var rlat1 = Math.PI * lat1 / 180
    var rlat2 = Math.PI * lat2 / 180
    var rlon1 = Math.PI * lon1 / 180
    var rlon2 = Math.PI * lon2 / 180
    var theta = lon1 - lon2
    var rtheta = Math.PI * theta / 180
    var dist = Math.sin(rlat1) * Math.sin(rlat2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.cos(rtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") {
        dist = dist * 1.609344
    }
    if (unit == "N") {
        dist = dist * 0.8684
    }
    return dist
}




//Load the map when the page has finished loading.
google.maps.event.addDomListener(window, 'load', initMap);