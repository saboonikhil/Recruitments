import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    name : new FormControl('',Validators.required),
    email: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")]),
    regno: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit() {
  }

  get email() {
    return this.signupForm.get('email');
  }
  get regno() {
    return this.signupForm.get('regno');
  }
  get name() {
    return this.signupForm.get('name');
  }
}
