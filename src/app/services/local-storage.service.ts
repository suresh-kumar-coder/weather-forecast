import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  totalData: any = 0;
  constructor() { }

  post(key: string, value: any) {
    localStorage.setItem(key, value);
    this.totalData += 1;
  }

  get(key: string): any {
    const value:any = localStorage.getItem(key);
    return value ;
  }

 
}
