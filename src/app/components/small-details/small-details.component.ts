import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-small-details',
  template: `
  <!-- Sunrise / Sunset -->
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
  <!-- Wind Speed and Direction -->
  <div class="tab">
    <h2><svg class="infoIcon"><use href="#icon-wind"></use></svg>WIND</h2>
    <div>
      <p class="tabMain">{{ app.weatherApp.settings.speed == 'MPH' ? app.weatherData.current.wind_mph : app.weatherData.current.wind_kph }} {{ app.weatherApp.settings.speed }}</p>
      <p class="tabMain">{{ app.weatherData.current.wind_dir }}</p>
    </div>
  </div>
  <!-- Feels Like -->
  <div class="tab">
    <h2><svg class="infoIcon"><use href="#icon-feelsLike"></use></svg>FEELS LIKE</h2>
    <p class="tabMain">{{ app.weatherApp.settings.temp == 'F' ? this.app.condenseTemp(app.weatherData.current.feelslike_f) : this.app.condenseTemp(app.weatherData.current.feelslike_c) }}°</p>
    <p class="tabSub">{{ app.getFeelsLike(this.app.condenseTemp(app.weatherData.current.temp_f), this.app.condenseTemp(app.weatherData.current.feelslike_f)) }}</p>
  </div>
  <!-- Humidity -->
  <div class="tab">
    <h2><svg class="infoIcon"><use href="#icon-humidity"></use></svg>HUMIDITY</h2>
    <p class="tabMain">{{ app.weatherData.current.humidity }}%</p>
    <p class="tabSub">The dew point is {{ app.weatherApp.settings.temp == 'F' ? app.condenseTemp(app.getCurrentTime(0).dewpoint_f) : app.condenseTemp(app.getCurrentTime(0).dewpoint_c) }}° right now.</p>
  </div>
  <!-- Visibility -->
  <div class="tab">
    <h2><svg class="infoIcon"><use href="#icon-visibility"></use></svg>VISIBILITY</h2>
    <p class="tabMain">{{ app.weatherApp.settings.speed == 'MPH' ? app.weatherData.current.vis_miles + " mi" : app.weatherData.current.vis_km + " km" }}</p>
  </div>
  <!-- Air Pressure -->
  <div class="tab">
    <h2><svg class="infoIcon"><use href="#icon-pressure"></use></svg>PRESSURE</h2>
    <p class="tabMain">{{ app.weatherApp.settings.temp == 'F' ? app.weatherData.current.pressure_in + ' inHg' : app.weatherData.current.pressure_mb + ' mb' }}</p>
  </div>
  `,
  styles: [`
  .tabMain {
    font-size: 30px;
  }
  .tabSub {
    align-self: self-end;
    font-size: 14px;
  }
  .aq {
    font-weight: bold;
  }
  `]
})
export class SmallDetailsComponent {
  constructor(public app: AppComponent) {}
}
