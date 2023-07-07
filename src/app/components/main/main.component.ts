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
        <div class="information" *ngIf="this.app.weatherApp.isWeatherSearched == true"></div>
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
  `,
  styles: []
})
export class MainComponent implements OnInit {
  constructor(public app: AppComponent, public sidebar: SidebarComponent) {}
  ngOnInit() {}
}
