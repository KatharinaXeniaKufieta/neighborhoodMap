var Location = function(data) {
  this.title = ko.observable(data.title);
  this.location = ko.observable(data.location);
  this.description = ko.observable(data.description);
  this.iconImage = ko.observable(data.iconImage);
  this.descriptionImage = ko.observable(data.descriptionImage);
  this.liked = false;
};

var ViewModel = function() {
  var self = this;
  this.locations = ko.observableArray([]);

  locations.forEach(function(location) {
    self.locations.push(new Location(location));
  });
}


ko.applyBindings(new ViewModel());
