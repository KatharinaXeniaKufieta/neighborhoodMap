// Global variables for the map
var zoom = 13;
var map, bounds;
var infoWindow,
    miniInfoWindow,
    cornerInfoWindow;

// When google maps has loaded, apply bindings and load map
var initMap = function() {
  showMap();
  ko.applyBindings(new ViewModel());
}

// Callback function that is called when google maps is created
var showMap = function() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7413549, lng: -73.9980244},
    zoom: zoom,
    styles: styles,
    mapTypeControl: false
  });

  // Boundaries that will be adjusted depending on the markers that are shown
  bounds = new google.maps.LatLngBounds();
  // Infowindows that are shown when a list item or marker is clicked
  infoWindow = new google.maps.InfoWindow();
  miniInfoWindow = new google.maps.InfoWindow();
  cornerInfoWindow = document.getElementById('corner-infowindow');
  cornerInfoWindow.className += ' gm-style-iw';
}
