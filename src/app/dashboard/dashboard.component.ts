import { Component, OnInit} from '@angular/core';
import {  Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { AccessService } from '../services/access.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor( public access: AccessService, private route:Router, private http: HttpClient,
    public storage: LocalStorageService){}

  location: string = ''
  ip: any = ''
  weatherData: any
  forecast: any
  d = new Date();
  loader = true
  apiLoader = false
  areaFound = false
  showSearchResult = false
  locationData: any
  month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  ngOnInit(): void {
      this.getCurrentCity()
      setTimeout(() => {
        this.loader = false
      }, 1000);
    
  }

  getCurrentCity(): any{
    this.apiLoader = true
    this.http.get(`http://ip-api.com/json`).subscribe((data: any) => {
        this.displayData(data['city'])
      });
  }

  displayData(location: string): void{
    this.apiLoader = true
    this.showSearchResult=false
    this.http.get(`http://api.weatherapi.com/v1/forecast.json?key=6ca14dff0bc74a8389d53225232906&q=${location}&days=7&aqi=yes&alerts=no`)
      .subscribe((data: any) => {
        this.weatherData = data
        this.forecast = data['forecast']['forecastday'].slice(1,6)
        console.log(this.forecast)
        this.apiLoader = false
      });
  }

  locationSearch(loaction:string): void{
    this.showSearchResult = true
    if(loaction.length >= 3){
      this.http.get(`http://api.weatherapi.com/v1/search.json?key=6ca14dff0bc74a8389d53225232906&q=${loaction}`)
      .subscribe( (data) => {
        this.locationData = data
        if(this.locationData.length>0){
          this.areaFound = true
        }
      })
    }
    else{
      this.areaFound = false
    }
  }

  updateLoc(text: any) {
    this.displayData(text.target.textContent.split(',')[0]);
    this.showSearchResult = false
  }
  
}
