import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main',
  template: `
  <!-- SEARCH MODAL -->
  <dialog #searchModal>
    <div class="modalTop">
      <div class="modalText">
        <h2>Search for Location</h2>
        <button (click)="this.app.closeDialog(searchModal)">
          <svg class="close"><use href="#icon-close"></use></svg>
        </button>
      </div>
      <form (input)="this.app.searchLocation($event, searchInput)" action="#">
        <input autofocus #searchInput type="search" placeholder="Search">
      </form>
      <h2>Search Results</h2>
    </div>
    <div class="searchResults">
      <button (click)="this.app.changeDisplayedWeatherToSearched(data.name, data.region, searchModal)" class="locationsSearched" #searchedLocation *ngFor="let data of app.searched">{{ data.name }}, {{ data.region }} {{ data.country }}</button>
    </div>
  </dialog>
  <main #main>
    <div class="controls">
      <button class="mobile" (click)="this.sidebar.openMenu()">Menu</button>
      <div>
        <button class="addBttn" *ngIf="this.app.locationSaved == false && this.app.weatherApp.currentTab != []" (click)="this.app.saveLocation(this.app.weatherData.location.name, this.app.weatherData.location.region)">Add</button>
        <button class="deleteBttn" *ngIf="this.app.locationSaved == true" (click)="this.app.deleteLocation(this.app.weatherData.location.name, this.app.weatherData.location.region)">Delete</button>
        <button (click)="this.app.openDialog(searchModal, searchInput)">Search</button>
      </div>
    </div>
    <div class="weatherWrapper">
      <div class="loader" *ngIf="this.app.fetching == true"></div>
      <div *ngIf="this.app.sidebarOpen == false && this.app.weatherApp.currentTab != '' && this.app.fetching == false">
    <!-- GLANCE WEATHER DATA -->
        <div class="weather" *ngIf="this.app.weatherApp.isWeatherSearched == true">
          <div class="glance">
            <h1>{{ app.weatherData.location.name }}, {{ app.weatherData.location.region }}</h1>
            <p>{{ app.weatherApp.settings.temp == 'F' ? this.app.condenseTemp(app.weatherData.current.temp_f) : this.app.condenseTemp(app.weatherData.current.temp_c) }}°</p>
            <p>{{ app.weatherData.current.condition.text }}</p>
            <div>
              <p>L: {{ app.weatherApp.settings.temp == 'F' ? this.app.condenseTemp(app.weatherData.forecast.forecastday[0].day.mintemp_f) : this.app.condenseTemp(app.weatherData.forecast.forecastday[0].day.mintemp_c) }}°</p>
              <p>H: {{ app.weatherApp.settings.temp == 'F' ? this.app.condenseTemp(app.weatherData.forecast.forecastday[0].day.maxtemp_f) : this.app.condenseTemp(app.weatherData.forecast.forecastday[0].day.maxtemp_c) }}°</p>
            </div>
          </div>
        </div>
        <div class="information" *ngIf="this.app.weatherApp.isWeatherSearched == true">
    <!-- HOURLY WEATHER TAB -->
          <div class="tab">
            <h2><svg class="infoIcon"><use href="#icon-clock"></use></svg>24-HOUR FORECAST</h2>
            <div class="hourly">
              <div *ngFor="let data of this.app.hourly">
                <h3>{{ data.time == this.app.hourly[0].time ? 'Now' : this.app.getRidofTime(this.app.toStandardTime(data.time)) }}</h3>
                <div>
                  <img src="assets/images/{{ this.app.getIsDay(data.is_day) }}/{{ this.app.getWeatherIcon(data.condition.code) }}.png" alt="">
                  <p class="rainChance" *ngIf="data.chance_of_rain > 0">{{ data.chance_of_rain }}%</p>
                  <p class="snowChance" *ngIf="data.chance_of_snow > 0">{{ data.chance_of_snow }}%</p>
                </div>
                <p>{{ app.weatherApp.settings.temp == 'F' ? this.app.condenseTemp(data.temp_f) : this.app.condenseTemp(data.temp_c) }}°</p>
              </div>
            </div>
          </div>
          <div class="infoBottom">
    <!-- THREE DAY WEATHER TAB -->
            <div>
              <div class="tab threeDay">
                <h2><svg class="infoIcon"><use href="#icon-calendar"></use></svg>3-DAY FORECAST</h2>
                <div class="day" *ngFor="let data of this.app.weatherData.forecast.forecastday">
                  <h3>{{ data.date == this.app.weatherData.forecast.forecastday[0].date ? 'Today' : this.app.getDayofWeek(data.date) }}</h3>
                  <div class="threeDayIcon">
                    <img src="assets/images/day/{{ this.app.getWeatherIcon(data.day.condition.code) }}.png" alt="">
                    <p class="rainChance" *ngIf="data.day.daily_will_it_rain == 1">{{ data.day.daily_chance_of_rain }}%</p>
                    <p class="snowChance" *ngIf="data.day.daily_will_it_snow == 1">{{ data.day.daily_chance_of_snow }}%</p>
                  </div>
                  <div class="dailyLowHigh">
                    <p>{{ app.weatherApp.settings.temp == 'F' ? this.app.condenseTemp(data.day.mintemp_f) : this.app.condenseTemp(data.day.mintemp_c) }}°</p>
                    <input class="range" [min]="app.weatherApp.settings.temp == 'F' ? this.app.condenseTemp(data.day.mintemp_f) : this.app.condenseTemp(data.day.mintemp_c)" [max]="app.weatherApp.settings.temp == 'F' ? this.app.condenseTemp(data.day.maxtemp_f) : this.app.condenseTemp(data.day.maxtemp_c)" [value]="app.weatherApp.settings.temp == 'F' ? this.app.condenseTemp(app.weatherData.current.temp_f) : this.app.condenseTemp(app.weatherData.current.temp_c)" type="range" disabled>
                    <p>{{ app.weatherApp.settings.temp == 'F' ? this.app.condenseTemp(data.day.maxtemp_f) : this.app.condenseTemp(data.day.maxtemp_c) }}°</p>
                  </div>
                </div>
              </div>
              <div *ngIf="this.app.innerWidth < 1428 && this.app.innerWidth > 600">
                <div class="tab">
                  <h2><svg class="infoIcon"><use href="#icon-sun"></use></svg>UV INDEX</h2>
                  <p class="tabMain mob">{{ app.weatherData.current.uv }} - {{ this.app.getUVIndexCode(app.weatherData.current.uv) }}</p>
                  <input min="0" max="12" [value]="app.weatherData.current.uv" type="range" class="uvRange" disabled>
                </div>
                <div class="tab">
                  <h2><svg class="infoIcon"><use href="#icon-air-quality"></use></svg>AIR QUALITY</h2>
                  <div>
                    <p class="aq">{{ this.app.condenseTemp(app.weatherData.current.air_quality.o3) }} - {{ this.app.getAirQuality(this.app.condenseTemp(app.weatherData.current.air_quality.o3)).aq }}</p>
                    <p class="aqdesc">{{ this.app.getAirQuality(this.app.condenseTemp(app.weatherData.current.air_quality.o3)).aqdesc }}</p>
                  </div>
                  <input min="0" max="500" [value]="this.app.condenseTemp(app.weatherData.current.air_quality.o3)" type="range" class="aqRange" disabled>
                </div>
              </div>
            </div>
    <!-- RIGHT SIDE INFORMATION TABS -->
            <div class="tabs">
              <div class="tab" *ngIf="this.app.innerWidth > 1428 || this.app.innerWidth < 600">
                <h2><svg class="infoIcon"><use href="#icon-sun"></use></svg>UV INDEX</h2>
                <p class="tabMain">{{ app.weatherData.current.uv }} - {{ this.app.getUVIndexCode(app.weatherData.current.uv) }}</p>
                <input min="0" max="12" [value]="app.weatherData.current.uv" type="range" class="uvRange" disabled>
              </div>
              <div class="tab" *ngIf="this.app.innerWidth > 1428 || this.app.innerWidth < 600">
                <h2><svg class="infoIcon"><use href="#icon-air-quality"></use></svg>AIR QUALITY</h2>
                <div>
                  <p class="aq">{{ app.weatherData.current.air_quality[this.air] }} - {{ this.app.getAirQuality(app.weatherData.current.air_quality[this.air]).aq }}</p>
                  <p class="aqdesc">{{ this.app.getAirQuality(app.weatherData.current.air_quality[this.air]).aqdesc }}</p>
                </div>
                <input min="1" max="7" [value]="this.app.condenseTemp( app.weatherData.current.air_quality[this.air] )" type="range" class="aqRange" disabled>
              </div>
              <div class="tab">
                <h2 *ngIf="app.weatherData.current.is_day == 0">
                  <svg class="infoIcon"><use href="#icon-sunrise"></use></svg>SUNRISE
                </h2>
                <h2 *ngIf="app.weatherData.current.is_day == 1">
                  <svg class="infoIcon"><use href="#icon-sunset"></use></svg>SUNSET
                </h2>
                <p class="tabMain">{{ app.weatherData.current.is_day == 0 ? app.weatherData.forecast.forecastday[0].astro.sunrise.slice(1) : app.weatherData.forecast.forecastday[0].astro.sunset.slice(1) }}</p>
                <input min="0" max="23" [value]="app.weatherData.current.last_updated.slice(11, 13)" type="range" class="sunRange" disabled>
                <p class="tabSub">{{ app.weatherData.current.is_day == 0 ? 'Sunset: ' + app.weatherData.forecast.forecastday[0].astro.sunset.slice(1) : 'Sunrise: ' + app.weatherData.forecast.forecastday[0].astro.sunrise.slice(1) }}</p>
              </div>
              <div class="tab">
                <h2><svg class="infoIcon"><use href="#icon-wind"></use></svg>WIND</h2>
                <div>
                  <p class="tabMain">{{ app.weatherApp.settings.speed == 'MPH' ? app.weatherData.current.wind_mph : app.weatherData.current.wind_kph }} {{ app.weatherApp.settings.speed }}</p>
                  <p class="tabMain">{{ app.weatherData.current.wind_dir }}</p>
                </div>
              </div>
              <div class="tab">
                <h2><svg class="infoIcon"><use href="#icon-feelsLike"></use></svg>FEELS LIKE</h2>
                <p class="tabMain">{{ app.weatherApp.settings.temp == 'F' ? this.app.condenseTemp(app.weatherData.current.feelslike_f) : this.app.condenseTemp(app.weatherData.current.feelslike_c) }}°</p>
                <p class="tabSub">{{ app.getFeelsLike(this.app.condenseTemp(app.weatherData.current.temp_f), this.app.condenseTemp(app.weatherData.current.feelslike_f)) }}</p>
              </div>
              <div class="tab">
                <h2><svg class="infoIcon"><use href="#icon-humidity"></use></svg>HUMIDITY</h2>
                <p class="tabMain">{{ app.weatherData.current.humidity }}%</p>
                <p class="tabSub">The dew point is {{ app.weatherApp.settings.temp == 'F' ? app.condenseTemp(app.getCurrentTime(0).dewpoint_f) : app.condenseTemp(app.getCurrentTime(0).dewpoint_c) }}° right now.</p>
              </div>
              <div class="tab">
                <h2><svg class="infoIcon"><use href="#icon-visibility"></use></svg>VISIBILITY</h2>
                <p class="tabMain">{{ app.weatherApp.settings.speed == 'MPH' ? app.weatherData.current.vis_miles + " mi" : app.weatherData.current.vis_km + " km" }}</p>
              </div>
              <div class="tab">
                <h2><svg class="infoIcon"><use href="#icon-pressure"></use></svg>PRESSURE</h2>
                <p class="tabMain">{{ app.weatherApp.settings.temp == 'F' ? app.weatherData.current.pressure_in + ' inHg' : app.weatherData.current.pressure_mb + ' mb' }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="apiInfo">
          <p>Weather for {{ app.weatherData.location.name }}, {{ app.weatherData.location.region }}</p> 
          <p>Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a></p>
        </div>
      </div>
    </div>
    <div *ngIf="this.app.weatherApp.currentTab == ''">
      <h1 class="newUser" *ngIf="this.app.weatherApp.isWeatherSearched == false">Click on the search button in the top right corner to get started!</h1>
      <h1 class="newUser mobile" *ngIf="this.app.weatherApp.isWeatherSearched == false">Click on the menu button in the top left corner to see your saved locations. You can click on them to switch between them in the main view.</h1>
      <h1 class="newUser desktop" *ngIf="this.app.weatherApp.isWeatherSearched == false">On the left side is your sidebar menu. It houses your settings, and when you add saved locations, those will be there as well. You can click between them in order to pull up more information about them.</h1>
    </div>
  </main>

<!-- SVG's -->
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;" aria-hidden="true">
    <symbol id="icon-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" fill="currentColor" />
    </symbol>
    <symbol id="icon-calendar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z" fill="currentColor" />
    </symbol>
    <symbol id="icon-clock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12S17.5 2 12 2M17 13H11V7H12.5V11.5H17V13Z" fill="currentColor" />
    </symbol>
    <symbol id="icon-air-quality" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M8.58 14C8.3 13.55 8.11 13.03 8.06 12.5H15.94C15.89 13.03 15.7 13.55 15.47 14H8.58M12 16C10.97 16 10.08 15.61 9.38 15H14.63C13.92 15.61 13.03 16 12 16M12 8C13.03 8 13.92 8.39 14.63 9H9.38C10.08 8.39 10.97 8 12 8M8.58 10H15.42C15.7 10.45 15.89 10.97 15.94 11.5H8.06C8.11 10.97 8.3 10.45 8.58 10M3 3V21H21V3H3M12 18C8.67 18 6 15.33 6 12S8.67 6 12 6 18 8.67 18 12 15.33 18 12 18Z" fill="currentColor" />
    </symbol>
    <symbol id="icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z" fill="currentColor" />
    </symbol>
    <symbol id="icon-sunset" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,20.71L15.82,17.6C16.21,17.21 16.21,16.57 15.82,16.18C15.43,15.79 14.8,15.79 14.41,16.18L12,18.59L9.59,16.18C9.2,15.79 8.57,15.79 8.18,16.18C7.79,16.57 7.79,17.21 8.18,17.6L11.29,20.71C11.5,20.9 11.74,21 12,21C12.26,21 12.5,20.9 12.71,20.71Z" fill="currentColor" />
    </symbol>
    <symbol id="icon-sunrise" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,16.3L15.82,19.41C16.21,19.8 16.21,20.43 15.82,20.82C15.43,21.21 14.8,21.21 14.41,20.82L12,18.41L9.59,20.82C9.2,21.21 8.57,21.21 8.18,20.82C7.79,20.43 7.79,19.8 8.18,19.41L11.29,16.3C11.5,16.1 11.74,16 12,16C12.26,16 12.5,16.1 12.71,16.3Z" fill="currentColor" />
    </symbol>
    <symbol id="icon-wind" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M4,10A1,1 0 0,1 3,9A1,1 0 0,1 4,8H12A2,2 0 0,0 14,6A2,2 0 0,0 12,4C11.45,4 10.95,4.22 10.59,4.59C10.2,5 9.56,5 9.17,4.59C8.78,4.2 8.78,3.56 9.17,3.17C9.9,2.45 10.9,2 12,2A4,4 0 0,1 16,6A4,4 0 0,1 12,10H4M19,12A1,1 0 0,0 20,11A1,1 0 0,0 19,10C18.72,10 18.47,10.11 18.29,10.29C17.9,10.68 17.27,10.68 16.88,10.29C16.5,9.9 16.5,9.27 16.88,8.88C17.42,8.34 18.17,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H5A1,1 0 0,1 4,13A1,1 0 0,1 5,12H19M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z" fill="currentColor" />
    </symbol>
    <symbol id="icon-feelsLike" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V12H11V5A1 1 0 0 1 12 4Z" fill="currentColor" />
    </symbol>
    <symbol id="icon-humidity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M11 9C8.79 9 7 10.79 7 13S8.79 17 11 17 15 15.21 15 13 13.21 9 11 9M11 15C9.9 15 9 14.11 9 13S9.9 11 11 11 13 11.9 13 13 12.11 15 11 15M7 4H14C16.21 4 18 5.79 18 8V9H16V8C16 6.9 15.11 6 14 6H7C5.9 6 5 6.9 5 8V20H16V18H18V22H3V8C3 5.79 4.79 4 7 4M19 10.5C19 10.5 21 12.67 21 14C21 15.1 20.1 16 19 16S17 15.1 17 14C17 12.67 19 10.5 19 10.5" fill="currentColor" />
    </symbol>
    <symbol id="icon-visibility" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" fill="currentColor" />
    </symbol>
    <symbol id="icon-pressure" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M4,12H20V14H4V12M4,9H20V11H4V9M16,4L12,8L8,4H11V1H13V4H16M8,19L12,15L16,19H13V22H11V19H8Z" fill="currentColor" />
    </symbol>
  </svg>

  `,
  styles: []
})
export class MainComponent implements OnInit {
  constructor(public app: AppComponent, public sidebar: SidebarComponent) {}
  
  ngOnInit() {}
  air:string = "us-epa-index";
}
