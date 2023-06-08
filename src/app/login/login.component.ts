import { Component} from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { AccessService } from '../services/access.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // emailFound: boolean = false;
  disableLogin = true
  emailValid = true
  userFound = true
  passwordMatch = true

  loginData = {
    email: "",
    password: ""
  };

  // default credentials
  defaultData= {
    email: 'user123@gmail.com',
    password: 'User123@'
  }

  regexEmail: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/



  clicked: boolean = false;

  constructor( private storage: LocalStorageService, private access: AccessService,
     private route: Router){

  }

  emailValidate(): void{
    this.emailValid = this.regexEmail.test(this.loginData.email);
  }

  enableLogin(): void{
    if(this.loginData.email != '' && this.loginData.password != '' && this.emailValid){
      this.disableLogin = false
    }
    else{
      this.disableLogin = true
    }
  }

  authenticate(): void{
    
    this.userFound = this.storage.get(this.loginData.email) == null ? false : true

    if( this.storage.get(this.loginData.email)){
      this.passwordMatch = this.storage.get(this.loginData.email) != this.loginData.password ? false : true
    }
    else{
      this.passwordMatch = true
    }

    if( (this.storage.get(this.loginData.email) == this.loginData.password) || 
    // default credentials condition
    (this.loginData.email == this.defaultData.email && this.loginData.password == this.defaultData.password) ){
      this.access.canAccessFlag = true
      this.route.navigate(['/dashboard'])
    }
  }
}
