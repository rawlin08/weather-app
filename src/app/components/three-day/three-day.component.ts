import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-three-day',
  template: `
  <div class="tab">
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
  `,
  styles: [`
  h3 {
    margin: 0;
  }
  .threeDayIcon {
    display: grid;
  }
  .threeDayIcon > p {
    text-align: left;
    margin: 0 0 0 12px;
  }
  .day:not(:nth-child(2)) > .dailyLowHigh > input[type="range"]::-webkit-slider-thumb {
    opacity: 0;
  }
  .day:not(:nth-child(2)) > .dailyLowHigh > input[type="range"]::-moz-range-thumb {
    opacity: 0;
  }
  .day {
    display: grid;
    gap: 10px;
    grid-template-columns: 0fr 1fr 4fr;
    align-items: center;
    border-top: 1px solid #68637B;
    padding: 15px 0;
  }
  .day > div > img {
    width: 50px;
  }
  .day > h3 {
    width: 50px;
    font-size: 15px;
  }
  .day > div:nth-child(2) {
    text-align: center;
  }
  .dailyLowHigh {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  `]
})
export class ThreeDayComponent {
  constructor(public app: AppComponent) {}
}
