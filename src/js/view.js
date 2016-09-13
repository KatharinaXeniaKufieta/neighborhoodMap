// Global variable for the cornerInfoWindow
var innerHTMLtext = '';

/************
 * Location *
 ************/
// Location - holds all data about a given location
var Location = function(data) {
  var self = this;
  // Knockout observables
  this.title = ko.observable(data.title);
  this.query = ko.observable(data.query);
  this.tags = ko.observable(data.tags);
  this.position = ko.observable(data.position);
  this.description = ko.observable(data.description);
  this.id = ko.observable(data.id);
  this.gif = ko.observable(data.gif);
  this.liked = ko.observable(data.liked);
  this.hover = ko.observable(false);
  this.searchTerm = ko.observable(data.searchTerm);
  this.owner = ko.observable(data.owner);

  this.icon = data.iconImage;
  this.detailedInfo = ko.observable('');
  foursquareDetails(this, this.detailedInfo);

  // Markers are not supposed to be observables
  // Create a new marker for each location
  this.marker = new google.maps.Marker({
    title: data.title,
    position: data.position,
    description: data.description,
    icon: data.iconImage,
    gif: data.gif,
    id: data.id,
    liked: data.liked,
    animation: google.maps.Animation.DROP
  });

  // Determines the style for marker & list item,
  // depending on if the user hovers over the location or not
  this.getHighlight = ko.pureComputed(function() {
    return self.hover() ? 'hover' : 'noHighlight';
  });
};

/*************
 * ViewModel *
 *************/
// Viewmodel for entire page (maps, list, gifs, streetview, foursquare),
// except for the weather, which has to be handled separately
var ViewModel = function() {
  var self = this;
  // put the locations into an observable array
  this.locations = ko.observableArray([]);
  this.selectedLocationId = ko.observable(null);
  this.filter = ko.observable('');
  this.kathi = ko.observable(true);
  this.kj = ko.observable(true);

  // Retrieves the status of the Kathi button
  this.getKathiStatus = ko.pureComputed(function() {
    return self.kathi() ? 'active' : 'not-active';
  });

  // Retrieves the status of the KJ button
  this.getKJStatus = ko.pureComputed(function() {
    return self.kj() ? 'active' : 'not-active';
  });

  // Style the markers a bit.
  // Create a "highlighted location" marker color for when the user hovers over the marker
  this.highlightedIcon = this.makeMarkerIcon('6eb9d4');
  this.selectedIcon = this.makeMarkerIcon('ebfd1b');

  // Add event listeners to all locations for
  // hovering and clicking on them
  locations.forEach(function(loc) {
    var location = new Location(loc);

    location.marker.addListener('mouseover', (function(thisLocation) {
      return function() {
        self.showMinimizedInfoWindow(thisLocation.marker);
        thisLocation.hover(true);
      }
    })(location));

    location.marker.addListener('mouseout', (function(thisLocation) {
      return function() {
        self.hideMinimizedInfoWindow(thisLocation.marker);
        thisLocation.hover(false);
      };
    })(location));

    location.marker.addListener('click', (function(thisLocation) {
      return function() {
        var newLocationId = thisLocation.id();
        self.selectedLocationId(thisLocation.id());
        self.showInfoWindow(thisLocation);
      };
    })(location));

    // Check if this location is selected by the user or not
    location.selected = ko.pureComputed(function() {
      if (self.selectedLocationId() === location.id()) {
        return true;
      } else {
        return false;
      }
    }, location);

    // Get the gif for the given location based on a search term
    // that is retrieved from the model
    location.getGif = function(timeout) {
      // Retrieve at most 50 gifs from Giphy
      var maxGifs = 50;

      // URL to retrieve the GIFs from
      var url = 'https://api.giphy.com/v1/gifs/search?q=' + location.searchTerm() + '&limit=' + maxGifs + '&api_key=dc6zaTOxFJmzC'
      // No error handling needed, because even if GIFs can't come in, the user sees
      // the default gif (except for the internet connection is down)
      setTimeout(function() {
        $.ajax({
          dataType: "json",
          url: url,
          timeout: timeout,
          success: function(result) {
            var randomNum = Math.floor(Math.random() * maxGifs);
            this.giphy = 'https://i.giphy.com/' + result.data[randomNum].id + '.gif';
            location.gif(this.giphy);
          }
        });
      }, timeout);
      // Add a rotating button for when the ajax loading is slow
      // I assumed that was only necessary for the GIFs, but doesn't
      // work that well
      $(document).ajaxStart(function() {
        // $(document.body).css({'cursor' : 'wait'});
        var gifs = document.getElementsByClassName('gif-image');
        for (var i = 0; i < gifs.length; i++) {
          gifs[i].style.cursor = 'wait';
        }
      }).ajaxStop(function() {
        // $(document.body).css({'cursor' : 'default'});
        var gifs = document.getElementsByClassName('gif-image');
        for (var i = 0; i < gifs.length; i++) {
          gifs[i].style.cursor = 'pointer';
        }
      });
    };

    // Check if the location is selected and return the respective class
    // for the elements. These are then defined in the css/style.css file
    location.getSelected = ko.pureComputed(function() {
      if (self.selectedLocationId() === location.id()) {
        location.marker.setIcon(self.selectedIcon);
        return 'selected';
      } else if (location.hover()) {
        location.marker.setIcon(self.highlightedIcon);
          return 'hover';
      } else {
        location.marker.setIcon(location.icon);
        return 'noHighlight';
      }
    }, location);

    // Push all locations into the location array
    self.locations.push(location);
  });

  // Set the map for each marker, extend boundaries to encompass
  // all markers
  this.locations().forEach(function(location) {
    location.marker.setMap(map);
    bounds.extend(location.marker.position);
  });

  // Extend the boundaries of the map for each marker
  map.fitBounds(bounds);

  // Show infowindow for chosen location
  this.chooseLocation = function(location) {
    self.showInfoWindow(location);
  };

  // Show minimized infowindow when hovering over location
  this.mouseOver = function(location) {
    self.showMinimizedInfoWindow(location.marker);
    location.hover(true);
  };

  // Close minimized infowindow when hovering out
  this.mouseOut = function(location) {
    self.hideMinimizedInfoWindow(location.marker);
    location.hover(false);
  };

  // These are the filtered locations that are shown on the map
  // and in the list. If no filter is applied, it shows all locations.
  // Filters can be via the Kathi or KJ buttons, or the search field.
  this.filteredLocations = ko.computed(function() {
    // Hide all infowindows and gifs if any filter activity
    // is detected
    self.hideMinimizedInfoWindow(location.marker);
    self.selectedLocationId(-1);
    infoWindow.marker = null;
    infoWindow.close();
    cornerInfoWindow.style.visibility = 'hidden';
    // get the input from the filter field
    var filter = self.filter().toLowerCase();
    // First verify if the buttons Kathis and KJs
    // filter out some locations
    if (self.kathi() && self.kj() && !filter) {
      // If both buttons Kathi & KJ activated and no
      // filter is applied, show all locations
      self.locations().forEach(function(location) {
        location.marker.setVisible(true);
      })
      return self.locations();
    } else {
      // Else go through the entire locations array and filter the locations
      return ko.utils.arrayFilter(self.locations(), function(location) {
        var chosen = true;
        var kathiIndex = location.owner().toLowerCase().indexOf('kathi');
        var kjIndex = location.owner().toLowerCase().indexOf('kj');
        // If neither Kathi nor KJ is chosen, no location will show
        if (!self.kathi() && !self.kj()) {
          chosen = false;
        } else if (self.kathi() && kathiIndex !== -1) {
          // If Kathi is chosen and the location is Kathis favorite, return
          // true (for now)
          chosen = true;
        } else if (self.kj() && kjIndex !== -1) {
          // If KJ is chosen and the location is KJs favorite, return
          // true (for now)
          chosen = true;
        } else {
          chosen = false;
        }
        // If the location is false, you can hide it
        if (chosen === false) {
          location.marker.setVisible(false);
        } else {
          // If the location is chosen, check now if the filter input fits the
          // location. If it does, show the location, if not, hide it.
          chosen = (location.title().toLowerCase().indexOf(filter) !== -1) || (location.tags().toLowerCase().indexOf(filter) !== -1) || (location.description().toLowerCase().indexOf(filter) !== -1) || (location.searchTerm().indexOf(filter) !== -1);
          if (chosen) {
            location.marker.setVisible(true);
          } else {
            location.marker.setVisible(false);
          }
        }
        return chosen;
      });
    }
  });
};

/******************************
 * ViewModel - showInfoWindow *
 ******************************/
ViewModel.prototype.showInfoWindow = function(location) {
  var self = this;
  // Hide the minimixed infowindow
  this.hideMinimizedInfoWindow(location.marker);
  // set the selectedLocationId to the id of the currently chosen
  // location
  this.selectedLocationId(location.id());
  var marker = location.marker;
  // Respond to CSS3 media query state changes
  // If min-width is >= 700px, display large info
  // window in upper left corner.
  var mq = window.matchMedia( "(min-width: 700px)" );
  // Open the corner info window,
  // keep the normal infoWindow closed
  if (mq.matches == true) {
    // Check to make sure the infoWindow is not already opened
    // on this marker.
    infoWindow.marker = null;
    infoWindow.close();
    if (cornerInfoWindow.marker != marker) {
      cornerInfoWindow.marker = marker;
      cornerInfoWindow.innerHTML = '';
      cornerInfoWindow.style.visibility = 'visible';
      // Make sure the marker property is cleared if the infoWindow is closed.
      var streetViewService = new google.maps.StreetViewService();
      var radius = 25;
      // In case the status is OK, which means the pano was found, compute
      // the position of the streetview image, then calculate the heading,
      // then get a panorama from that and set the options
      function getStreetView(data, status) {
        if (status == google.maps.StreetViewStatus.OK) {
          var nearStreetViewLocation = data.location.latLng;
          var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);
          cornerInfoWindow.innerHTML = '<div id="pano"></div><div class="infowindow-text"><div id="close-thick"></div><h2>' + marker.title + '</h2>' + location.detailedInfo() + '<p id="quote">' + marker.description + '</p></div>';
          var panoramaOptions = {
            position: nearStreetViewLocation,
            pov: {
              heading: heading,
              pitch: 10
            }
          };
          var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), panoramaOptions);
        } else {
          cornerInfoWindow.innerHTML = '<div id="close-thick"></div><div class="infowindow-text"><h2>' + marker.title + '</h2>' + location.detailedInfo() + '<p id="quote">' + marker.description + '</p></div>';
          if (innerHTMLtext !== '') {
            cornerInfoWindow.innerHTML += innerHTMLtext;
          }
        }
        var closebutton = document.getElementById('close-thick');
        closebutton.addEventListener('click', function() {
          cornerInfoWindow.style.visibility = 'hidden';
          cornerInfoWindow.marker = null;
          self.selectedLocationId(null);
        }, false);
      }
      // Use streetview service to get the closest streetvew image within
      // 50 meters of the markers position
      streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
    }
  } else {
    // Open the normal info window and close the corner info window closed
    cornerInfoWindow.style.visibility = 'hidden';
    cornerInfoWindow.marker = null;
    // Check to make sure the infowindow is not already opened
    // on this marker.
    if (infoWindow.marker != marker) {
      infoWindow.marker = marker;
      infoWindow.setContent('');
      infoWindow.setContent('<div "class="infowindow-text"><h2>' + marker.title + '</h2>' + location.detailedInfo() + '<p id="quote">' + marker.description + '</p></div>');
      // Make sure the marker property is cleared if the infowindow is closed.
      infoWindow.addListener('closeclick', function() {
        infoWindow.marker = null;
        self.selectedLocationId(null);
      });
      // Open the infowindow on the correct marker
      infoWindow.open(map, marker);
    }
  }
};

/***************************************
 * ViewModel - showMinimizedInfoWindow *
 ***************************************/
ViewModel.prototype.showMinimizedInfoWindow = function(marker) {
  // Check to make sure the miniInfoWindow is not already opened
  // on this marker.
  if (infoWindow.marker != marker && cornerInfoWindow.marker != marker) {
    miniInfoWindow.marker = marker;
    miniInfoWindow.setContent('');
    miniInfoWindow.open(map, marker);
    // Make sure the marker property is cleared if the miniInfoWindow is closed.
    miniInfoWindow.setContent('<div id="min-infowindow" class="infowindow-text">' + marker.title + '</div>');
    miniInfoWindow.open(map, marker);
  }
};

/***************************************
 * ViewModel - hideMinimizedInfoWindow *
 ***************************************/
ViewModel.prototype.hideMinimizedInfoWindow = function(marker) {
  miniInfoWindow.close();
  miniInfoWindow.marker = null;
};

/******************************
 * ViewModel - makeMarkerIcon *
 ******************************/
ViewModel.prototype.makeMarkerIcon = function(markerColor) {
  var markerImage = {
    url: 'https://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor + '|40|_|%E2%80%A2',
    size: new google.maps.Size(21, 34),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(10, 34),
    scaledSize: new google.maps.Size(21, 34)
  };
  return markerImage;
};

/********************************
 * ViewModel - getPlacesDetails *
 ********************************/
// This is the PLACE DETAILS search - it's the most detailed so it's only
// executed when a marker is selected, indicating the user wants more
// details about that place
// (This function is not used in this app, leaving it for future use)
ViewModel.prototype.getPlacesDetails = function(marker) {
  var service = new google.maps.places.PlacesService(map);
  service.getDetails({
    placeId: marker.id
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // Set the marker property on this infowindow so it isn't created
      // again
      innerHTMLtext = '<div>';
      if (place.name) {
        innerHTMLtext += '<strong>' + place.name + '</strong>';
      }
      if (place.formatted_address) {
        innerHTMLtext += '<br>' + place.formatted_address;
      }
      if (place.formatted_phone_number) {
        innerHTMLtext += '<br>' + place.formatted_phone_number;
      }
      if (place.opening_hours) {
        innerHTMLtext += '<br><br><strong>Hours:</strong><br>' +
          place.opening_hours.weekday_text[0] + '<br>' +
          place.opening_hours.weekday_text[1] + '<br>' +
          place.opening_hours.weekday_text[2] + '<br>' +
          place.opening_hours.weekday_text[3] + '<br>' +
          place.opening_hours.weekday_text[4] + '<br>' +
          place.opening_hours.weekday_text[5] + '<br>' +
          place.opening_hours.weekday_text[6];
      }
      if (place.photos) {
        innerHTMLtext += '<br><br><img src="' + place.photos[0].getUrl(
          {maxHeight: 100, maxWidth: 200}) + '">';
      }
      innerHTMLtext += '</div>';

    } else {
      console.log('status is not OK')
    }
  });
};

/***************************
 * ViewModel - toggleKathi *
 ***************************/
ViewModel.prototype.toggleKathi = function() {
  if (this.kathi() === true) {
    this.kathi(false);
  } else {
    this.kathi(true);
  }
};

/************************
 * ViewModel - toggleKJ *
 ************************/
ViewModel.prototype.toggleKJ = function() {
  if (this.kj() === true) {
    this.kj(false);
  } else {
    this.kj(true);
  }
};

/**************
 * FourSquare *
 **************/
// Retrieve FourSquare details for every location
var foursquareDetails = function(location, text) {
  var client_id = 'F34Z50BFJTO23D4GAKTW0TQ0XUWTUR4QLEIGLRNSYRLIDMU5';
  var client_secret = 'TKNU23MJ2WJFC3I5HSE54LJDN1ZFZQXTQS02B0ZHSRS5BN0Z';
  // var ll = '40.719726,-73.959983';
  var ll = location.position().lat + ',' + location.position().lng;
  var query = location.query();
  var url = 'https://api.foursquare.com/v2/venues/search?client_id=' + client_id + '&client_secret=' + client_secret + '&v=20130815&ll=40.7,-74&ll=' + ll + '&query=' + query + '&limit=1';
  $.ajax({
    dataType: "json",
    url: url,
    success: function(result) {
      if (result.response.venues.length > 0) {
        var name = result.response.venues[0].name;
        var formattedAddress = result.response.venues[0].location.formattedAddress;
        var street = formattedAddress[0];
        var city = formattedAddress[1];
        var state = formattedAddress[2];
        var homepage = result.response.venues[0].url;
        var category = result.response.venues[0].categories[0].name;

        var newText = '';
        newText += '<div>';
        if (name) {
          newText += '<strong>' + category + '</strong>';
        }
        if (formattedAddress) {
          newText += '<br>' + street;
          newText += '<br>' + city;
          newText += '<br>' + state;
        }
        if (homepage) {
          newText += '<br><a href=' + homepage + '>' + name + '</a>';
        }
        newText += '<br>(Information provided by <a href="https://foursquare.com/">Foursquare</a>)'
        newText += '</div>';
        text(newText);
      } else {
        var newText = '<div><p>(Error when loading Foursquare data)</p></div>';
        text(newText);
      }
    }
  }).fail(function(){
    var newText = '<div><p>(Error when loading Foursquare data)</p></div>';
    text(newText);
  });
};
