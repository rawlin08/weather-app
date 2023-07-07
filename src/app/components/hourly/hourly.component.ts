import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-hourly',
  template: `
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
  `,
  styles: [``]
})
export class HourlyComponent {
  constructor(public app: AppComponent) {}
}
