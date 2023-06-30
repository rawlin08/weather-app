import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { WeatherAPIService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-sidebar',
  template: `
  <div class="sidebar" #sidebar *ngIf="this.app.innerWidth > 1428 || this.app.sidebarOpen == true">
<!-- SETTINGS AREA -->
    <div class="settings">
      <button class="settingsBttn mobile" (click)="this.closeMenu()">Close Menu</button>
      <div class="settingsBttnsDiv">
        <button class="settingsBttn" (click)="this.app.changeTemptoC()" *ngIf="this.app.weatherApp.settings.temp == 'F'">°F</button>
        <button class="settingsBttn" (click)="this.app.changeTemptoF()" *ngIf="this.app.weatherApp.settings.temp != 'F'">°C</button>
        <button class="settingsBttn" (click)="this.app.changeSpeedtoKPH()" *ngIf="this.app.weatherApp.settings.speed == 'MPH'">MPH</button>
        <button class="settingsBttn" (click)="this.app.changeSpeedtoMPH()" *ngIf="this.app.weatherApp.settings.speed != 'MPH'">KPH</button>
      </div>
    </div>
<!-- SIDEBAR TABS (SCROLLABLE) -->
    <div class="scrollable">
      <div class="sidebarTab" (click)="this.changeCurrentTab(locationName.textContent)" *ngFor="let data of app.tabsData">
        <div class="top">
          <div class="location">
            <h2 #locationName class="name">{{ data.location.name }}, {{ data.location.region }}</h2>
            <p class="lastUpdated">{{ this.app.toStandardTime(data.current.last_updated) }}</p>
          </div>
          <p class="currentTemp">{{ app.weatherApp.settings.temp == 'F' ? this.app.condenseTemp(data.current.temp_f) : this.app.condenseTemp(data.current.temp_c) }}°</p>
        </div>
        <div class="bottom">
          <p class="condition">{{ data.current.condition.text }}</p>
          <div class="tempRange">
            <p class="minTemp">L: {{ app.weatherApp.settings.temp == 'F' ? this.app.condenseTemp(data.forecast.forecastday[0].day.mintemp_f) : this.app.condenseTemp(data.forecast.forecastday[0].day.mintemp_c) }}°</p>
            <p class="maxTemp">H: {{ app.weatherApp.settings.temp == 'F' ? this.app.condenseTemp(data.forecast.forecastday[0].day.maxtemp_f) : this.app.condenseTemp(data.forecast.forecastday[0].day.maxtemp_c) }}°</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  constructor(public app: AppComponent, public api: WeatherAPIService) {}
  
  ngOnInit() {}

  changeCurrentTab(data: any) {
    this.app.weatherApp.currentTab = data;
    this.app.getWeather();
    this.app.checkIsLocationSaved();
    this.closeMenu();
  }
  openMenu() {
    this.app.sidebarOpen = true;
  }
  closeMenu() {
    this.app.sidebarOpen = false;
  }

}
