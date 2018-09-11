import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  x = 0;
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")]),
    otp : new FormControl('')
  });

  constructor(private loginservice : LoginService, private _router: Router) { }

  ngOnInit() {
  }

  get email() {
    return this.signupForm.get('email');
  }

  get otp() {
    return this.signupForm.get('otp');
  }

  submit() {
    
    const signUpFormValues = this.signupForm.value;
    var params = {
      "recipient" : signUpFormValues.email
    }
    var otpDoc = document.getElementById("otp");
    if(this.x == 0) {
      this.loginservice.postLogin(params).subscribe((data:any) => {
        if(data["success"]) {
          this.x=1;
          document.getElementById("authBttn").textContent = "Login"
          otpDoc.style.display = "block";
        }
        else {
          window.alert("Invalid Email Id");
        }
      }, (response: any) => {
        console.log(response);
      });
    }
    else {
      params["otp"] = signUpFormValues.otp;
      this.loginservice.verifyLogin(params).subscribe((data: any) => {
        if(data["success"]) {
          window.sessionStorage.setItem("emailId",params.recipient);
          this._router.navigate(["dashboard_student"]);
        }
        else {
          window.alert("Invalid OTP");
        }
      },(response : any) => {
        console.log(response);
      })
    }
  }
}