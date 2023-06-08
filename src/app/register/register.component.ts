import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  emailValid: boolean = false;
  passValid: boolean = false;
  isPassSame: boolean = false;
  enableSubmit: boolean = true;
  passCondDisplay: boolean = false;
  signUpSuccess:boolean = false;

  userData = {
    email: '',
    password: '',
    cPassword: ''
  }

  passCond = {
    l: false,
    u: false,
    n: false,
    s: false,
    len: false
  }

  key = 'a';

  regexEmail: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  regexPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


  constructor( private storage: LocalStorageService){}

  submit(): void{
    this.storage.post(this.userData.email,this.userData.password)
    this.signUpSuccess = true
  }

  checkPass(): void{

  }

  emailValidate(): void{
    this.emailValid = !this.regexEmail.test(this.userData.email);
  }

  passValidate(): void{
    this.passValid = !this.regexPassword.test(this.userData.password)
    this.passCondDisplay = false
    this.passCond.u = this.passCond.l = this.passCond.len = this.passCond.n = this.passCond.s = false;
  }

  passwordIsSame(): void{
    this.isPassSame = !(this.userData.password == this.userData.cPassword)
    this.enableRegister();
  }

  enableRegister(): void{
    this.enableSubmit = !(this.emailValid==false && this.isPassSame==false  &&this.passValid==false)
  }

  passwordCondition(): void{
    this.passCondDisplay = true
    for (let i = 0; i < this.userData.password.length; i++) {
      if (this.userData.password[i] >= 'A' && this.userData.password[i] <= 'Z') {
        this.passCond.u = true
      }
      if (this.userData.password[i] >= 'a' && this.userData.password[i] <= 'z') {
        this.passCond.l = true
      }
      if (!this.userData.password[i].match(/[a-zA-Z0-9]/)) {
        this.passCond.s = true
      }
      if (this.userData.password[i] >= '0' && this.userData.password[i] <= '9') {
        this.passCond.n = true
      }
      if(this.userData.password.length >= 8){
        this.passCond.len = true
      }
    }

    if( this.passCond.u && this.passCond.l && this.passCond.n && this.passCond.len && this.passCond.s){
      this.passCondDisplay = false
    }
    
  }

}
