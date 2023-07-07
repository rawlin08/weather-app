import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-three-day',
  template: `
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
  </div>
  `,
  styles: [``]
})
export class ThreeDayComponent {
  constructor(public app: AppComponent) {}
}
