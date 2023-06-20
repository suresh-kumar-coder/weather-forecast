import { Component, OnInit} from '@angular/core';
import {  Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { AccessService } from '../services/access.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor( public access: AccessService, private route:Router, private http: HttpClient){}

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
    this.http.get(`https://api.ipgeolocation.io/getip`).subscribe((data: any) => {
        this.ip = data['ip']
      });
    this.http.get(`https://ipapi.co/${this.ip}/json/`).subscribe((data:any) => {
      this.displayData(data['city'])
    });
  }

  displayData(location: string): void{
    this.apiLoader = true
    this.showSearchResult=false
    this.http.get(`https://api.weatherapi.com/v1/forecast.json?key=b329d3026ee94103b2962918230706&q=${location}&days=7&aqi=yes&alerts=no`)
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
      this.http.get(`https://api.weatherapi.com/v1/search.json?key=b329d3026ee94103b2962918230706&q=${loaction}`)
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
