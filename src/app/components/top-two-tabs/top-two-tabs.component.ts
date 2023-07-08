import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-top-two-tabs',
  template: `
  <!-- UV -->
  <div class="tab">
    <h2><svg class="infoIcon"><use href="#icon-sun"></use></svg>UV INDEX</h2>
    <p class="tabMain">{{ app.weatherData.current.uv }} - {{ this.app.getUVIndexCode(app.weatherData.current.uv) }}</p>
    <input min="0" max="12" [value]="app.weatherData.current.uv" type="range" class="uvRange" disabled>
  </div>
  <!-- Air Quality -->
  <div class="tab">
    <h2><svg class="infoIcon"><use href="#icon-air-quality"></use></svg>AIR QUALITY</h2>
    <div>
      <p class="aq">{{ app.weatherData.current.air_quality["us-epa-index"] }} - {{ this.app.getAirQuality(app.weatherData.current.air_quality["us-epa-index"]).aq }}</p>
      <p class="aqdesc">{{ this.app.getAirQuality(app.weatherData.current.air_quality["us-epa-index"]).aqdesc }}</p>
    </div>
    <input min="1" max="7" [value]="this.app.condenseTemp( app.weatherData.current.air_quality['us-epa-index'] )" type="range" class="aqRange" disabled>
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
  .aqdesc {
    font-size: 14px;
    margin: 5px 0 0 0;
  }
  `]
})
export class TopTwoTabsComponent {
  constructor(public app: AppComponent) {}
}
