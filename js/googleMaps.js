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

  // Boundaries that will be adjusted depending on the markers that are shown
  var bounds = new google.maps.LatLngBounds();
  // Infowindow that is shown when a list item or marker is clicked
  var largeInfoWindow = new google.maps.InfoWindow();
  var miniInfoWindow = new google.maps.InfoWindow();
  var cornerInfoWindow = document.getElementById('corner-infowindow');
  cornerInfoWindow.className += ' gm-style-iw';

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
    marker.addListener('mouseover', function() {
      showMinimizedInfoWindow(this, miniInfoWindow, largeInfoWindow, cornerInfoWindow);
    });
    marker.addListener('mouseout', function() {
      hideMinimizedInfoWindow(this, miniInfoWindow);
    });
    marker.addListener('click', function() {
      showInfoWindow(this, largeInfoWindow, cornerInfoWindow);
    });
  });

  markers.forEach(function(marker) {
    marker.setMap(map);
    bounds.extend(marker.position);
  });

  // Extend the boundaries of the map for each marker
  map.fitBounds(bounds);
}

var showInfoWindow = function(marker, infowindow, cornerInfoWindow) {
  // Respond to CSS3 media query state changes
  // If min-width is >= 700px, display large info
  // window in upper left corner.
  var mq = window.matchMedia( "(min-width: 700px)" );
  // Open the corner info window,
  // keep the normal infowindow closed
  if (mq.matches == true) {
    // Check to make sure the infowindow is not already opened
    // on this marker.
    infowindow.marker = null;
    infowindow.close();
    if (cornerInfoWindow.marker != marker) {
      cornerInfoWindow.marker = marker;
      cornerInfoWindow.innerHTML = '';
      cornerInfoWindow.style.visibility = 'visible';
      // Make sure the marker property is cleared if the infowindow is closed.
      var streetViewService = new google.maps.StreetViewService();
      var radius = 50;
      // In case the status is OK, which means the pano was found, compute
      // the position of the streetview image, then calculate the heading,
      // then get a panorama from that and set the options
      function getStreetView(data, status) {
        if (status == google.maps.StreetViewStatus.OK) {
          var nearStreetViewLocation = data.location.latLng;
          var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);
          cornerInfoWindow.innerHTML = '<div id="close-thick"></div><div id="pano"></div><img class="infowindow-image" src="' + marker.descriptionImage + '"><div class="infowindow-text">' + marker.description + '</div>';
          var panoramaOptions = {
            position: nearStreetViewLocation,
            pov: {
              heading: heading,
              pitch: 30
            }
          };
          var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), panoramaOptions);
        } else {
          cornerInfoWindow.innerHTML = '<div id="close-thick"></div><img class="infowindow-image" src="' + marker.descriptionImage + '"><div class="infowindow-text">' + marker.description + '</div>';
        }
        var closebutton = document.getElementById('close-thick');
        closebutton.addEventListener('click', function() {
          cornerInfoWindow.style.visibility = 'hidden';
        }, false);
      }
      // Use streetview service to get the closest streetvew image within
      // 50 meters of the markers position
      streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
    }
  } else {
    // Open the normal info window and close the corner info window closed
    cornerInfoWindow.style.visibility = 'hidden';
    // Check to make sure the infowindow is not already opened
    // on this marker.
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('');
      infowindow.setContent('<div "class="infowindow-text">' + marker.title + '</div><div "class="infowindow-text">' + marker.description + '</div>');
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
      // Open the infowindow on the correct marker
      infowindow.open(map, marker);
    }
  }

}

var showMinimizedInfoWindow = function(marker, miniInfoWindow, largeInfoWindow, cornerInfoWindow) {
  // Check to make sure the miniInfoWindow is not already opened
  // on this marker.
  if (largeInfoWindow.marker != marker && cornerInfoWindow.marker != marker) {
    miniInfoWindow.marker = marker;
    miniInfoWindow.setContent('');
    miniInfoWindow.open(map, marker);
    // Make sure the marker property is cleared if the miniInfoWindow is closed.
    miniInfoWindow.setContent('<div id="min-infowindow "class="infowindow-text">' + marker.title + '</div>');
    miniInfoWindow.open(map, marker);
  }
  // Open the infowindow on the correct marker
}

var hideMinimizedInfoWindow = function(marker, infowindow) {
  infowindow.close();
}
