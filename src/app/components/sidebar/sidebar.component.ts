import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { WeatherAPIService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-sidebar',
  template: `
<!-- SETTINGS AREA -->
    <div class="settings">
      <button class="settingsBttn" (click)="this.closeMenu()" *ngIf="this.app.innerWidth < 1281">Close Menu</button>
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
  `,
  styles: [`
  .scrollable {
    height: calc(100vh - 70px);
    overflow-y: auto;
  }
  .settings {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 10px 0;
  }
  .settingsBttn {
    background-color: var(--color-sidebarTab-background);
    color: #FFF;
    font-weight: 600;
    border-radius: 8px;
    padding: 10px;
    width: 100px;
    border: none;
    font-family: inherit;
  }
  .settings > div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .location {
    width: 75%;
  }
  .sidebarTab {
    background-color: var(--color-sidebarTab-background);
    border-radius: 8px;
    padding: 10px;
    margin: 0 0 10px 0;
    cursor: pointer;
  }
  .top {
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 10px 0 0 0;
  }
  .lastUpdated {
    font-size: 12px;
    margin: 2px 0 0 0;
  }
  .currentTemp {
    font-size: 35px;
    margin: 0 0 10px 0;
  }
  .tempRange {
    display: flex;
    gap: 5px;
  }
  .tempRange > p {
    font-size: 14px;
  }
  .condition {
    width: 50%;
  }
  .name {
    font-size: 16px;
  }
  .lastUpdated, .condition, .maxTemp, .minTemp {
    color: #CFCED0;
    opacity: 0.5;
  }
  `]
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
