// Global variables for the map
var zoom = 13;
var map, bounds;
var infoWindow,
    miniInfoWindow,
    cornerInfoWindow;

// When google maps has loaded, apply bindings and load map
var initMap = function() {
  showMap();
  ko.bindingHandlers.stopBinding = {
    init: function() {
      return {controlsDescendantBindings: true};
    }
  };
  ko.applyBindings(new ViewModel());
}

var mapsHandleError = function() {
  var errorMap = document.getElementById('map');
  var errorMessage = document.createElement('div');
  errorMessage.innerHTML = '<h1 id="map-error-message">Map could not get loaded</h1>';
  errorMessage.style.position = 'absolute';
  errorMessage.style.left = '250px';
  errorMessage.style.top = '100px';
  errorMessage.style.color = '#f00';
  errorMap.appendChild(errorMessage);
}

var weatherHandleError = function() {
  var weather = document.getElementById('weather-modal-content');
  weather.innerHTML = '<p>Weather could not get loaded</p>' +
    '<p>You can view the weather here: ' +
    '<a href="http://www.yr.no/place/United_States/New_York/New_York/" target="_blank">Weather on Yr.no</a></p>';
}

var initWeather = function(results) {
  ko.applyBindings(new WeatherViewModel(results), document.getElementById('weather'));
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
  infoWindow = new google.maps.InfoWindow({
    maxWidth: 300
  });
  miniInfoWindow = new google.maps.InfoWindow();
  cornerInfoWindow = document.getElementById('corner-infowindow');
}

// resize map and sidebar depending on window size
var resizeLayout = function() {
  var navbarElement = document.getElementById('top-nav');
  var mapElement = document.getElementById('map');
  var sidenavElement = document.getElementById('sidenav');
  var licenseElement = document.getElementById('license-text');
  var infowindowElement = document.getElementById('corner-infowindow');

  var height = window.innerHeight;
  var width = window.innerWidth;
  var navbarHeight = navbarElement.clientHeight;

  mapElement.style.width = width + 'px';
  mapElement.style.height = (height - navbarHeight) + 'px';
  sidenavElement.style.height = (height - navbarHeight) + 'px';
  licenseElement.style.width = (width - 60) + 'px';
  infowindowElement.style.top = (navbarHeight + 30) + 'px';
}

document.addEventListener('DOMContentLoaded', function() {
  resizeLayout();
  var width = window.innerWidth;
  if (width < 992) {
    closeNav();
  }
});

(function() {

  window.addEventListener("resize", resizeThrottler, false);

  var resizeTimeout;
  function resizeThrottler() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if ( !resizeTimeout ) {
      resizeTimeout = setTimeout(function() {
        resizeTimeout = null;
        actualResizeHandler();

        // The actualResizeHandler will execute at a rate of 15fps
      }, 66);
    }
  }

  function actualResizeHandler() {
    resizeLayout();
  }

}());
