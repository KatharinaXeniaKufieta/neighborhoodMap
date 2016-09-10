/********************************
 * getWeekDay - helper function *
 ********************************/
var getWeekDay = function(day) {
  switch (day) {
  case 1:
    return 'Monday';
    break;
  case 2:
    return 'Tuesday';
    break;
  case 3:
    return 'Wednesday';
    break;
  case 4:
    return 'Thursday';
    break;
  case 5:
    return 'Friday';
    break;
  case 6:
    return 'Saturday';
    break;
  case 0:
    return 'Sunday';
    break;
  default:
    return 'SOMETHING IS WRONG HERE, toDay: ' + day;
  }
}

/************
 * Weather  *
 ************/
var Weather = function(data) {
  var from = new Date(data.from);
  var to = new Date(data.to);
  // Correct and convert dates (4 hours behind)
  this.timeString = '';
  this.dayString = '';
  this.setTimeAndDate(from, to);

  this.from = ko.observable(from);
  this.to = ko.observable(to);
  this.precipitation = ko.observable(data.precipitation.value);
  this.symbol = ko.observable('https://symbol.yr.no/grafikk/sym/b100/' + data.symbol.var + '.png');
  this.temperature = ko.observable(data.temperature.value + '℃');
  this.windSpeed = ko.observable(data.windSpeed.name);
}

/****************************
 * Weather - setTimeAndDate *
 ****************************/
Weather.prototype.setTimeAndDate = function(from, to) {
  // Correct and get the time string
  var fromHour = from.getHours();
  var toHour = to.getHours();
  var newfromHour = (fromHour + 4) % 24;
  var newtoHour = (toHour + 4) % 24;

  var fromDay = from.getDay();
  var toDay = to.getDay();

  var fromDate = from.getDate();
  var toDate = to.getDate();
  var newfromDate = fromDate + Math.floor((fromHour + 4) / 24);
  var newtoDate = toDate + Math.floor((toHour + 4) / 24);
  // Set the corrected hour and day
  from.setHours(newfromHour);
  to.setHours(newtoHour);

  from.setDate(newfromDate);
  to.setDate(newtoDate);

  // Get the string describing the day (Today, Tomorrow, or weekday after)
  var today = new Date(Date.now());
  toDay = to.getDay();
  if (today.getDay() === toDay) {
    this.dayString += 'Today, '
  } else if ((today.getDay() + 1)%7 === toDay) {
    this.dayString += 'Tomorrow, '
  }
  this.dayString += getWeekDay(toDay);

  if (from.getHours() < 10) {
    this.timeString += '0' + from.getHours() +  ' - ';
  } else {
    this.timeString += from.getHours() +  ' - ';
  }
  if (to.getHours() < 10) {
    this.timeString += '0' + to.getHours();
  } else {
    this.timeString += to.getHours();
  }
}

/********************
 * WeatherViewModel *
 ********************/
var WeatherViewModel = function(results) {
  var self = this;
  this.creditLinkText = results.weatherdata.credit.link.text;
  this.creditLinkURL = results.weatherdata.credit.link.url;
  this.sunrise = 'Sunrise: ' + results.weatherdata.sun.rise;
  this.sunset = 'Sunset: ' + results.weatherdata.sun.set;
  this.weatherForecast = [
    {
      name: '',
      counter: 0,
      width: '33%',
      slotWidth: '33%',
      weather: []
    }, {
      name: '',
      counter: 0,
      width: '33%',
      slotWidth: '33%',
      weather: []
    }, {
      name: '',
      counter: 0,
      width: '33%',
      slotWidth: '33%',
      weather: []
    }
  ];

  // Get the current date strings for day01, day02, day03
  this.setDateStrings();

  var result = results.weatherdata.forecast.tabular;
  for (var i = 0, max = 6; i < max; i++) {
    var weather = new Weather(result[i]);

    for (var j = 0, maxj = this.weatherForecast.length; j < maxj; j++) {
      if (this.weatherForecast[j].name === weather.dayString) {
        this.weatherForecast[j].weather.push(weather);
        this.weatherForecast[j].counter++;
      }
    }
  }
  for (var j = 0; j < this.weatherForecast.length; j++) {
    this.weatherForecast[j].width = 100 / max * this.weatherForecast[j].counter + '%';
    var daySlotWidth = 100 / this.weatherForecast[j].counter + '%';
    this.weatherForecast[j].weather.forEach(function(weather) {
      weather.width = daySlotWidth;
    });
    if (this.weatherForecast[j].weather.length === 0) {
      if (j > -1) {
        this.weatherForecast.splice(j, 1);
        j--;
      }
    }
  }
};

/*************************************
 * WeatherViewModel - setDateStrings *
 *************************************/
WeatherViewModel.prototype.setDateStrings = function() {
  var today = new Date(Date.now());
  todayDay = today.getDay();
  // push day string for today, day01
  this.weatherForecast[0].name = 'Today, ' + getWeekDay(todayDay);
  // push day string for tomorrow, day02
  this.weatherForecast[1].name = 'Tomorrow, ' + getWeekDay((todayDay + 1)%7);
  // push day string for the day after tomorrow, day03
  this.weatherForecast[2].name = getWeekDay((todayDay + 2)%7);
};
