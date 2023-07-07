import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-glance',
  template: `
  <h1>{{ app.weatherData.location.name }}, {{ app.weatherData.location.region }}</h1>
  <p id="currentTemp">{{ app.weatherApp.settings.temp == 'F' ? this.app.condenseTemp(app.weatherData.current.temp_f) : this.app.condenseTemp(app.weatherData.current.temp_c) }}°</p>
  <p>{{ app.weatherData.current.condition.text }}</p>
  <div>
    <p>L: {{ app.weatherApp.settings.temp == 'F' ? this.app.condenseTemp(app.weatherData.forecast.forecastday[0].day.mintemp_f) : this.app.condenseTemp(app.weatherData.forecast.forecastday[0].day.mintemp_c) }}°</p>
    <p>H: {{ app.weatherApp.settings.temp == 'F' ? this.app.condenseTemp(app.weatherData.forecast.forecastday[0].day.maxtemp_f) : this.app.condenseTemp(app.weatherData.forecast.forecastday[0].day.maxtemp_c) }}°</p>
  </div>
  `,
  styles: [`
  h1 {
    font-weight: 500;
  }
  #currentTemp {
    font-size: 60px;
    margin: 0 0 0 10px;
  }
  div {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin: 5px 0 0 0;
  }
  `]
})
export class GlanceComponent {
  constructor(public app: AppComponent) {}
}
