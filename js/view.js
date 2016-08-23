var Location = function(data) {
  this.title = ko.observable(data.title);
  this.location = ko.observable(data.location);
  this.description = ko.observable(data.description);
  this.iconImage = ko.observable(data.iconImage);
  this.gif = ko.observable(data.gif);
  this.id = ko.observable(data.id);
  this.liked = false;
};

var ViewModel = function() {
  var self = this;
  this.locations = ko.observableArray([]);

  locations.forEach(function(location) {
    self.locations.push(new Location(location));
  });

  this.chooseLocation = function(location) {
    // self refers now to the ViewModel,
    // this would have represented the binding context when you
    // click on incrementCounter
    markers.forEach(function(marker) {
      console.log('marker.id: ' + marker.id);
      console.log('location.id: ' + location.id());
      if (marker.id === location.id()) {
        showInfoWindow(marker, largeInfoWindow, cornerInfoWindow);
      }
    });
  };
}

ko.applyBindings(new ViewModel());
