// Global variables for the map
var zoom = 13;
var map;

// Callback function that is called when google maps is created
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7413549, lng: -73.9980244},
    zoom: zoom
  });
}
