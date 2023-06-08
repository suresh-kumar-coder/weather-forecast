import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  canAccessFlag: boolean = false;

  constructor() { }

  canAccessDashboard(): boolean{
    if(this.canAccessFlag){
      return true
    }
    else{
      return false
    }
  }
  
}
