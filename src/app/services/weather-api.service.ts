import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherAPIService {

  constructor(private http: HttpClient) { }

  getWeatherData(location: string) {
    return this.http.get(`https://api.weatherapi.com/v1/forecast.json?key=1202bf7d51784328b8d15326230402&q=${location}&days=3&aqi=yes&alerts=no`);
  }

  searchAPI(location: string) {
    return this.http.get(`https://api.weatherapi.com/v1/search.json?key=1202bf7d51784328b8d15326230402&q=${location}`);
  }

}
