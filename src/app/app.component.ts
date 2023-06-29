import { Component, HostListener, OnInit } from '@angular/core';
import { WeatherAPIService } from './services/weather-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Weather App';

  weatherData: any = {};
  tabsData: any = [];
  searched: any = [];
  fetching: boolean = false;
  weatherApp: any = {
    savedLocations: [],
    currentTab: '',
    settings: {
      temp: 'F',
      speed: 'MPH'
    },
    isWeatherSearched: false
  }

  constructor(public api: WeatherAPIService) {}

  locationSaved: any;
  innerWidth: any;
  sidebarOpen: boolean = false;
  hoursInHourly: any = 25;
  hourly: any = [];

  ngOnInit() {
    this.checkLocalStorage();
    this.getTabs();
    this.getWeather();
    this.checkIsLocationSaved();
    this.innerWidth = window.innerWidth;
  }

  // Init Functions
  getWeather() {
    if (this.weatherApp.currentTab != '') {
      this.fetching = true;
      this.api.getWeatherData(this.weatherApp.currentTab).subscribe((data) => {
        this.weatherData = data;
        this.weatherApp.isWeatherSearched = true;
        this.fetching = false;
        this.saveToLocalStorage();
        this.getHourlyWeather();
      });
    };
  };

  // Host Listener for window resizing for mobile. See when to cull out sidebar.
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    if (this.innerWidth > 1250) {
      this.sidebarOpen = false;
    }
  }

  // Render sidebar tabs
  getTabs() {
    this.tabsData = [];
    this.weatherApp.savedLocations.forEach((location: string) => {
      this.api.getWeatherData(location).subscribe((data) => {
        this.tabsData.push(data);
        this.saveToLocalStorage();
      });
    });
  }

  // Location Services
  saveLocation(name: any, region: any) {
    let data = `${name}, ${region}`;
    this.weatherApp.currentTab = data;
    this.weatherApp.savedLocations.push(data);
    this.getTabs();
    this.checkIsLocationSaved();
  }
  deleteLocation(name: any, region: any) {
    let data = `${name}, ${region}`;
    this.weatherApp.currentTab = data;
    this.weatherApp.savedLocations = this.weatherApp.savedLocations.filter((location: any) => location != data);
    this.getTabs();
    this.checkIsLocationSaved();
    this.saveToLocalStorage();
  }
  checkIsLocationSaved() {
    let location = this.weatherApp.savedLocations.find((location: any) => location == this.weatherApp.currentTab);
  
    if (!location) {
      this.locationSaved = false;
    }
    else {
      this.locationSaved = true;
    }
  }

  // Render specific main tabs
  getHourlyWeather() {
    this.hourly = [];
    for (let index = 0; index < this.hoursInHourly; index++) {
      let weather = this.getCurrentTime(index);      
      this.hourly.push(weather);
    }
  }
  getFeelsLike(currentTemp: any, feelsLikeTemp: any) {
    let feelsLikeText: any;
    if (feelsLikeTemp == currentTemp) {
      feelsLikeText = 'The current temp feels like itself.';
    }
    else if (feelsLikeTemp > currentTemp) {
      feelsLikeText = 'Humidity is making it feel warmer.';
    }
    else {
      feelsLikeText = 'Wind is making it feel colder.'
    }

    return feelsLikeText
  }
  getUVIndexCode(code: any) {
    let UV: string = '';

    if (code <= 2) {
      UV = 'Low';
    }
    else if (code >= 3 && code < 6) {
      UV = 'Moderate';
    }
    else if (code >= 6 && code < 8) {
      UV = 'High';
    }
    else if (code >= 8 && code < 11) {
      UV = 'Very High'
    }
    else {
      UV = 'Extreme'
    }

    return UV;
  }
  getAirQuality(code: any) {
    let aqObj: any = {
      aq: '',
      aqdesc: ''
    }

    if (code <= 50) {
      aqObj.aq = 'Good';
      aqObj.aqdesc = 'Air quality is satisfactory, and air pollution poses little or no risk.';
    }
    else if (code >= 51 && code < 100) {
      aqObj.aq = 'Moderate';
      aqObj.aqdesc = 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.';
    }
    else if (code >= 101 && code < 150) {
      aqObj.aq = 'Unhealthy for Sensitive Groups';
      aqObj.aqdesc = 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.';
    }
    else if (code >= 151 && code < 200) {
      aqObj.aq = 'Unhealthy';
      aqObj.aqdesc = 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.';
    }
    else if (code >= 201 && code < 300) {
      aqObj.aq = 'Very Unhealthy';
      aqObj.aqdesc = 'Health alert: The risk of health effects is increased for everyone.';
    }
    else {
      aqObj.aq = 'Hazardous'
      aqObj.aqdesc = 'Health warning of emergency conditions: everyone is more likely to be affected.';
    }

    return aqObj;
  }

  // Local Storage Functions
  checkLocalStorage() {
    let isUsed = localStorage.getItem('isUsed');
    if (!isUsed) {
      this.saveToLocalStorage();
    }
    else {
      this.weatherData = localStorage.getItem('weatherData');
      this.weatherData = JSON.parse(this.weatherData);
      this.tabsData = localStorage.getItem('tabsData');
      this.tabsData = JSON.parse(this.tabsData);
      this.weatherApp = localStorage.getItem('weatherApp');
      this.weatherApp = JSON.parse(this.weatherApp);
      this.checkIsLocationSaved();
    }
    
  }
  saveToLocalStorage() {
    localStorage.setItem('weatherApp', JSON.stringify(this.weatherApp));
    localStorage.setItem('weatherData', JSON.stringify(this.weatherData));
    localStorage.setItem('tabsData', JSON.stringify(this.tabsData));
    localStorage.setItem('isUsed', JSON.stringify(true))
  }

  // Search dialog functions 
  searchLocation(e: Event, input: any) {
    e.preventDefault();
    this.api.searchAPI(input.value).subscribe((data) => {
      this.searched = data;
    })
  }
  changeDisplayedWeatherToSearched(name: any, region: any, dialog: any) {
    let searchedLocation = `${name}, ${region}`;
    
    this.weatherApp.currentTab = searchedLocation;
    
    this.getWeather();
    this.closeDialog(dialog);
    this.checkIsLocationSaved()
  }
  openDialog(dialog: any, searchBar: any) {
    searchBar.value = '';
    this.searched = [];
    dialog.showModal();
  }
  closeDialog(dialog: any) {
    dialog.close();
  }

  // Time Functions
  toStandardTime(data: any) {
    let time = data.slice(11); // your input
    let standardTime;

    time = time.split(':'); // convert to array

    // fetch
    var hours = Number(time[0]);
    var minutes = Number(time[1]);

    // calculate
    if (hours > 0 && hours <= 12) {
    standardTime = "" + hours;
    } else if (hours > 12) {
    standardTime = "" + (hours - 12);
    } else if (hours == 0) {
    standardTime = "12";
    }
    
    standardTime += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    standardTime += (hours >= 12) ? " PM" : " AM";  // get AM/PM
    
    return standardTime;
  }
  getRidofTime(time: any) {
    return time.replace(':00 ', '')
  }
  getCurrentTime(hoursAdded: number) {
    let time = this.weatherData.current.last_updated.slice(11);
    time = time.split(':')[0];
    time = Number(time);
    time = time + hoursAdded;
    if (time > 23) {
      let difference = time - 23
      time = -1 + difference;
      time = time.toString()
      
      if (time.length == 2) {
        time = `${time}:00`
      }
      else {
        time = `0${time}:00`;
      }
      
      return this.weatherData.forecast.forecastday[1].hour.find((hour: any) => time == hour.time.slice(11));
    }
    else {
      time = time + ':00';
      if (time.length != 5) {
        time = `0${time}`
      }
      
      
      return this.weatherData.forecast.forecastday[0].hour.find((hour: any) => time == hour.time.slice(11));
    }
  }

  // Settings
  changeTemptoC() {
    this.weatherApp.settings.temp = 'C'; 
    this.saveToLocalStorage();   
  }
  changeTemptoF() {
    this.weatherApp.settings.temp = 'F';
    this.saveToLocalStorage(); 
  }
  changeSpeedtoKPH() {
    this.weatherApp.settings.speed = 'KPH';
    this.saveToLocalStorage(); 
  }
  changeSpeedtoMPH() {
    this.weatherApp.settings.speed = 'MPH';
    this.saveToLocalStorage(); 
  }

  // Random Functions
  condenseTemp(temp: any) {
    return Math.round(temp);
  }
  getDayofWeek(date: string) {
    let dayofweek: number = new Date(date).getDay();
    dayofweek++
    if (dayofweek == 7) {
      dayofweek = 0;
    }
    let day: any;

    switch (dayofweek) {
      case 0:
        day = 'Sun';
        break
      case 1:
        day = 'Mon';
        break
      case 2:
        day = 'Tue';
        break
      case 3:
        day = 'Wed';
        break
      case 4:
        day = 'Thu';
        break
      case 5:
        day = 'Fri';
        break
      case 6:
        day = 'Sat';
        break
    }

    return day;
  }
  getIsDay(code: number) {
    let day = '';
    if (code == 0) {
      day = 'night';
    }
    else {
      day = 'day';
    }

    return day;
  }

  // For the icons to be rendered
  getWeatherIcon(code: any) {
    let weatherIcon = this.weatherConditions.find(condition => condition.code == code);
  
    return weatherIcon?.icon
  }
  weatherConditions = [
    {
      "code" : 1000,
      "day" : "Sunny",
      "night" : "Clear",
      "icon" : 113
    },
    {
      "code" : 1003,
      "day" : "Partly cloudy",
      "night" : "Partly cloudy",
      "icon" : 116
    },
    {
      "code" : 1006,
      "day" : "Cloudy",
      "night" : "Cloudy",
      "icon" : 119
    },
    {
      "code" : 1009,
      "day" : "Overcast",
      "night" : "Overcast",
      "icon" : 122
    },
    {
      "code" : 1030,
      "day" : "Mist",
      "night" : "Mist",
      "icon" : 143
    },
    {
      "code" : 1063,
      "day" : "Patchy rain possible",
      "night" : "Patchy rain possible",
      "icon" : 176
    },
    {
      "code" : 1066,
      "day" : "Patchy snow possible",
      "night" : "Patchy snow possible",
      "icon" : 179
    },
    {
      "code" : 1069,
      "day" : "Patchy sleet possible",
      "night" : "Patchy sleet possible",
      "icon" : 182
    },
    {
      "code" : 1072,
      "day" : "Patchy freezing drizzle possible",
      "night" : "Patchy freezing drizzle possible",
      "icon" : 185
    },
    {
      "code" : 1087,
      "day" : "Thundery outbreaks possible",
      "night" : "Thundery outbreaks possible",
      "icon" : 200
    },
    {
      "code" : 1114,
      "day" : "Blowing snow",
      "night" : "Blowing snow",
      "icon" : 227
    },
    {
      "code" : 1117,
      "day" : "Blizzard",
      "night" : "Blizzard",
      "icon" : 230
    },
    {
      "code" : 1135,
      "day" : "Fog",
      "night" : "Fog",
      "icon" : 248
    },
    {
      "code" : 1147,
      "day" : "Freezing fog",
      "night" : "Freezing fog",
      "icon" : 260
    },
    {
      "code" : 1150,
      "day" : "Patchy light drizzle",
      "night" : "Patchy light drizzle",
      "icon" : 263
    },
    {
      "code" : 1153,
      "day" : "Light drizzle",
      "night" : "Light drizzle",
      "icon" : 266
    },
    {
      "code" : 1168,
      "day" : "Freezing drizzle",
      "night" : "Freezing drizzle",
      "icon" : 281
    },
    {
      "code" : 1171,
      "day" : "Heavy freezing drizzle",
      "night" : "Heavy freezing drizzle",
      "icon" : 284
    },
    {
      "code" : 1180,
      "day" : "Patchy light rain",
      "night" : "Patchy light rain",
      "icon" : 293
    },
    {
      "code" : 1183,
      "day" : "Light rain",
      "night" : "Light rain",
      "icon" : 296
    },
    {
      "code" : 1186,
      "day" : "Moderate rain at times",
      "night" : "Moderate rain at times",
      "icon" : 299
    },
    {
      "code" : 1189,
      "day" : "Moderate rain",
      "night" : "Moderate rain",
      "icon" : 302
    },
    {
      "code" : 1192,
      "day" : "Heavy rain at times",
      "night" : "Heavy rain at times",
      "icon" : 305
    },
    {
      "code" : 1195,
      "day" : "Heavy rain",
      "night" : "Heavy rain",
      "icon" : 308
    },
    {
      "code" : 1198,
      "day" : "Light freezing rain",
      "night" : "Light freezing rain",
      "icon" : 311
    },
    {
      "code" : 1201,
      "day" : "Moderate or heavy freezing rain",
      "night" : "Moderate or heavy freezing rain",
      "icon" : 314
    },
    {
      "code" : 1204,
      "day" : "Light sleet",
      "night" : "Light sleet",
      "icon" : 317
    },
    {
      "code" : 1207,
      "day" : "Moderate or heavy sleet",
      "night" : "Moderate or heavy sleet",
      "icon" : 320
    },
    {
      "code" : 1210,
      "day" : "Patchy light snow",
      "night" : "Patchy light snow",
      "icon" : 323
    },
    {
      "code" : 1213,
      "day" : "Light snow",
      "night" : "Light snow",
      "icon" : 326
    },
    {
      "code" : 1216,
      "day" : "Patchy moderate snow",
      "night" : "Patchy moderate snow",
      "icon" : 329
    },
    {
      "code" : 1219,
      "day" : "Moderate snow",
      "night" : "Moderate snow",
      "icon" : 332
    },
    {
      "code" : 1222,
      "day" : "Patchy heavy snow",
      "night" : "Patchy heavy snow",
      "icon" : 335
    },
    {
      "code" : 1225,
      "day" : "Heavy snow",
      "night" : "Heavy snow",
      "icon" : 338
    },
    {
      "code" : 1237,
      "day" : "Ice pellets",
      "night" : "Ice pellets",
      "icon" : 350
    },
    {
      "code" : 1240,
      "day" : "Light rain shower",
      "night" : "Light rain shower",
      "icon" : 353
    },
    {
      "code" : 1243,
      "day" : "Moderate or heavy rain shower",
      "night" : "Moderate or heavy rain shower",
      "icon" : 356
    },
    {
      "code" : 1246,
      "day" : "Torrential rain shower",
      "night" : "Torrential rain shower",
      "icon" : 359
    },
    {
      "code" : 1249,
      "day" : "Light sleet showers",
      "night" : "Light sleet showers",
      "icon" : 362
    },
    {
      "code" : 1252,
      "day" : "Moderate or heavy sleet showers",
      "night" : "Moderate or heavy sleet showers",
      "icon" : 365
    },
    {
      "code" : 1255,
      "day" : "Light snow showers",
      "night" : "Light snow showers",
      "icon" : 368
    },
    {
      "code" : 1258,
      "day" : "Moderate or heavy snow showers",
      "night" : "Moderate or heavy snow showers",
      "icon" : 371
    },
    {
      "code" : 1261,
      "day" : "Light showers of ice pellets",
      "night" : "Light showers of ice pellets",
      "icon" : 374
    },
    {
      "code" : 1264,
      "day" : "Moderate or heavy showers of ice pellets",
      "night" : "Moderate or heavy showers of ice pellets",
      "icon" : 377
    },
    {
      "code" : 1273,
      "day" : "Patchy light rain with thunder",
      "night" : "Patchy light rain with thunder",
      "icon" : 386
    },
    {
      "code" : 1276,
      "day" : "Moderate or heavy rain with thunder",
      "night" : "Moderate or heavy rain with thunder",
      "icon" : 389
    },
    {
      "code" : 1279,
      "day" : "Patchy light snow with thunder",
      "night" : "Patchy light snow with thunder",
      "icon" : 392
    },
    {
      "code" : 1282,
      "day" : "Moderate or heavy snow with thunder",
      "night" : "Moderate or heavy snow with thunder",
      "icon" : 395
    }
  ]

}

