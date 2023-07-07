import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HourlyComponent } from './components/hourly/hourly.component';
import { ThreeDayComponent } from './components/three-day/three-day.component';
import { SmallDetailsComponent } from './components/small-details/small-details.component';
import { GlanceComponent } from './components/glance/glance.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SidebarComponent,
    HourlyComponent,
    ThreeDayComponent,
    SmallDetailsComponent,
    GlanceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [SidebarComponent, MainComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
