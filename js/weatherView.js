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
  console.log('timeString: ' + this.timeString);
  console.log('dayString: ' + this.dayString);

  this.from = ko.observable(from);
  this.to = ko.observable(to);
  this.precipitation = ko.observable(data.precipitation.value);
  this.symbol = ko.observable('http://symbol.yr.no/grafikk/sym/b100/' + data.symbol.var + '.png');
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
  } else if (today.getDay() + 1 === toDay) {
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
  this.weatherForecast = {
    day01: {
      name: '',
      counter: 0,
      width: '33%',
      slotWidth: '33%',
      weather: []
    },
    day02: {
      name: '',
      counter: 0,
      width: '33%',
      slotWidth: '33%',
      weather: []
    },
    day03: {
      name: '',
      counter: 0,
      width: '33%',
      slotWidth: '33%',
      weather: []
    }
  };

  // Get the current date strings for day01, day02, day03
  this.setDateStrings();

  var result = results.weatherdata.forecast.tabular;
  for (var i = 0, max = 6; i < max; i++) {
    console.log('-------forecast tabular: -------');
    var weather = new Weather(result[i]);
    if (weather.dayString === this.weatherForecast.day01.name) {
      this.weatherForecast.day01.weather.push(weather);
      this.weatherForecast.day01.counter++;
    } else if (weather.dayString === this.weatherForecast.day02.name) {
      this.weatherForecast.day02.weather.push(weather);
      this.weatherForecast.day02.counter++;
    } else {
      this.weatherForecast.day03.weather.push(weather);
      this.weatherForecast.day03.counter++;
    }
  }
  this.weatherForecast.day01.width = 100 / max * this.weatherForecast.day01.counter + '%';
  this.weatherForecast.day02.width = 100 / max * this.weatherForecast.day02.counter + '%';
  this.weatherForecast.day03.width = 100 / max * this.weatherForecast.day03.counter + '%';
  var day01SlotWidth = 100 / this.weatherForecast.day01.counter + '%';
  this.weatherForecast.day01.weather.forEach(function(weather) {
    weather.width = day01SlotWidth;
  });
  var day02SlotWidth = 100 / this.weatherForecast.day02.counter + '%';
  this.weatherForecast.day02.weather.forEach(function(weather) {
    weather.width = day02SlotWidth;
  });
  var day03SlotWidth = 100 / this.weatherForecast.day03.counter + '%';
  this.weatherForecast.day03.weather.forEach(function(weather) {
    weather.width = day03SlotWidth;
  });
};

/*************************************
 * WeatherViewModel - setDateStrings *
 *************************************/
WeatherViewModel.prototype.setDateStrings = function() {
  var today = new Date(Date.now());
  todayDay = today.getDay();
  // push day string for today, day01
  this.weatherForecast.day01.name = 'Today, ' + getWeekDay(todayDay);
  // push day string for tomorrow, day02
  console.log(this.weatherForecast.day02.name);
  this.weatherForecast.day02.name = 'Tomorrow, ' + getWeekDay((todayDay + 1)%7);
  // push day string for the day after tomorrow, day03
  console.log(this.weatherForecast.day03.name);
  this.weatherForecast.day03.name = getWeekDay((todayDay + 2)%7);
}
