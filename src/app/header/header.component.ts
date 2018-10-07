import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email_id = "";
  title = "Dashboard";
  constructor() { }

  ngOnInit() {
    this.email_id = window.sessionStorage.getItem("email_id");
  }

}
