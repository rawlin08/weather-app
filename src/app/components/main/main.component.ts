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
      <button *ngIf="this.app.innerWidth < 1281" (click)="this.sidebar.openMenu()">Menu</button>
      <div>
        <button class="addBttn" *ngIf="this.app.locationSaved == false && this.app.weatherApp.currentTab != []" (click)="this.app.saveLocation(this.app.weatherData.location.name, this.app.weatherData.location.region)">Add</button>
        <button class="deleteBttn" *ngIf="this.app.locationSaved == true" (click)="this.app.deleteLocation(this.app.weatherData.location.name, this.app.weatherData.location.region)">Delete</button>
        <button (click)="this.app.openDialog(searchModal, searchInput)">Search</button>
      </div>
    </div>
    <div class="weatherWrapper">
      <div class="loader" *ngIf="this.app.fetching == true"></div>
      <div *ngIf="this.app.sidebarOpen == false && this.app.weatherApp.currentTab != '' && this.app.fetching == false">
        <app-glance></app-glance>
        <div class="information" *ngIf="this.app.weatherApp.isWeatherSearched == true">
          <app-hourly></app-hourly>
          <app-three-day></app-three-day>
          <app-top-two-tabs></app-top-two-tabs>
          <app-small-details></app-small-details>
        </div>
        <div class="apiInfo">
          <p>Weather for {{ app.weatherData.location.name }}, {{ app.weatherData.location.region }}</p> 
          <p>Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a></p>
        </div>
      </div>
    </div>
    <div *ngIf="this.app.weatherApp.currentTab == ''">
      <h1 class="newUser" *ngIf="this.app.weatherApp.isWeatherSearched == false">Click on the search button in the top right corner to get started!</h1>
      <h1 class="newUser" *ngIf="this.app.weatherApp.isWeatherSearched == false && this.app.innerWidth < 1281">Click on the menu button in the top left corner to see your saved locations. You can click on them to switch between them in the main view.</h1>
      <h1 class="newUser" *ngIf="this.app.weatherApp.isWeatherSearched == false && this.app.innerWidth >= 1281">On the left side is your sidebar menu. It houses your settings, and when you add saved locations, those will be there as well. You can click between them in order to pull up more information about them.</h1>
    </div>
  </main>
  `,
  styles: [`
  main {
    background-color: var(--color-content-background);
    padding: 20px;
    min-height: calc(100vh - 40px);
  }
  .controls {
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: space-between;
    margin: 0 0 20px 0;
  }
  .controls > button, .controls > div > button {
    background-color: #000;
    opacity: 0.5;
    color: #FFF;
    border-radius: 8px;
    border: none;
    padding: 5px 20px;
    width: 120px;
    font-size: 14px;
  }
  .controls > div {
    display: flex;
    gap: 5px;
  }
  .weatherWrapper {
    display: grid;
    place-content: center;
    padding: 0;
  }
  .information {
    display: grid;
    gap: 10px;
    margin: 20px 0 0 0;
  }
  .aqdesc {
    font-size: 14px;
    align-self: self-start;
    margin: 5px 0 0 0;
  }
  .apiInfo {
    display: grid;
    gap: 5px;
    margin-top: 15px;
    text-align: center;
    color: #FFF;
    font-size: 12px;
    font-weight: bold;
  }
  .apiInfo > p > a {
    color: #FFF;
  }
  .apiInfo > p > a:visited {
    color: #FFF;
  }
  input[type='search'] {
    background-color: #000;
    opacity: 0.5;
    color: #FFF;
    border-radius: 8px;
    border: none;
    padding: 7px;
    width: 100%;
    font-size: 16px;
  }
  dialog {
    border-radius: 8px;
    border: none;
    width: 500px;
    color: #FFF;
    background-color: #484953;
    opacity: 0.9;
    margin-top: 5px;
    height: 50vh;
  }
  dialog::backdrop {
    backdrop-filter: blur(2px);
  }
  .modalTop {
    display: grid;
    gap: 20px;
    margin: 0 10px;
  }
  .modalText {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .modalText > button {
    background-color: transparent;
    border: none;
    color: #FFF;
  }
  .close {
    width: 24px;
    height: 24px;
  }
  .searchResults {
    display: grid;
    margin: 5px 0 0 0;
    gap: 5px;
  }
  .locationsSearched {
    width: 100%;
    text-align: left;
    background-color: transparent;
    border: none;
    border-radius: 8px;
    padding: 5px 10px;
    color: #FFF;
    font-size: 14px;
  }
  .newUser {
    text-align: center;
    font-size: 20px;
    margin: 20px 0 0 0;
    color: #FFF;
  }

  @media (hover:hover) {
    .locationsSearched:hover {
      background-color: #0159D1;
    }
  }
  @media (min-width: 600px) {
    .information {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 1281px) {
    .controls {
      justify-content: flex-end;
    }
    .weatherWrapper {
      padding: 0 40px;
    }
    .information {
      grid-template-columns: repeat(6, 1fr);
    }
  }
  `]
})
export class MainComponent implements OnInit {
  constructor(public app: AppComponent, public sidebar: SidebarComponent) {}
  ngOnInit() {}
}
