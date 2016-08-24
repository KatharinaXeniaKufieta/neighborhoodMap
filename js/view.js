var Location = function(data) {
  // Knockout observables
  this.title = ko.observable(data.title);
  this.position = ko.observable(data.position);
  this.description = ko.observable(data.description);
  this.icon = ko.observable(data.iconImage);
  this.gif = ko.observable(data.gif);
  this.id = ko.observable(data.id);
  this.liked = ko.observable(data.liked);
  this.highlighted = false;

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

  this.marker.addListener('mouseover', function() {
    showMinimizedInfoWindow(this, miniInfoWindow, largeInfoWindow, cornerInfoWindow);
    this.highlighted = true;
  });
  this.marker.addListener('mouseout', function() {
    hideMinimizedInfoWindow(this, miniInfoWindow);
    this.highlighted = false;
  });
  this.marker.addListener('click', function() {
    showInfoWindow(this, largeInfoWindow, cornerInfoWindow);
    hideMinimizedInfoWindow(this, miniInfoWindow);
    this.highlighted = true;
  });
};

/***********
 * ViewModel
 ***********/

var ViewModel = function() {
  var self = this;
  // put the locations into an observable array
  this.locations = ko.observableArray([]);

  locations.forEach(function(location) {
    self.locations.push(new Location(location));
  });

  // Set the map for each marker, extend boundaries to encompass
  // all markers
  this.locations().forEach(function(location) {
    location.marker.setMap(map);
    bounds.extend(location.marker.position);
  });

  // Extend the boundaries of the map for each marker
  map.fitBounds(bounds);

  this.chooseLocation = function(location) {
    showInfoWindow(location.marker, largeInfoWindow, cornerInfoWindow);
    location.highlighted = true;
  };
};

