import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-glance',
  template: `
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
  `,
  styles: [``]
})
export class GlanceComponent {
  constructor(public app: AppComponent) {}
}
