// Global variables for the map
var zoom = 13;
var map;
var markers = [];


// Callback function that is called when google maps is created
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7413549, lng: -73.9980244},
    zoom: zoom,
    styles: styles,
    mapTypeControl: false
  });

  var bounds = new google.maps.LatLngBounds();

  locations.forEach(function(location) {
    // Get the information from the locations array
    var position = location.location;
    var title = location.title;
    var description = location.description;
    var descriptionImage = location.descriptionImage;
    var iconImage = location.iconImage;
    // Create a new marker for each location and
    // put it into the markers array
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      description: description,
      descriptionImage: descriptionImage,
      animation: google.maps.Animation.DROP,
      icon: iconImage
    });

    markers.push(marker);
    marker.addListener('click', function() {
      showInfoWindow(this, cornerInfoWindow);
    });
  });

  markers.forEach(function(marker) {
    marker.setMap(map);
    bounds.extend(marker.position);
    console.log(marker.position);
  });

  // Extend the boundaries of the map for each marker
  map.fitBounds(bounds);
}
