import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css']
})
export class DisclaimerComponent implements OnInit {
  title = "Disclaimer";
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  set(domain) {
    var id = this.getCookie("recruitments_portal_club");
    var cname = "recruitments_portal_domain";
    var cvalue = domain;
    var d = new Date();
    d.setTime(d.getTime() + (11 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    var path = "/clubs/"+id+"/"+cvalue+"/attempt";
    this._router.navigate([path]);
  }

  management() {
    this.set("Management");
  }

  design() {
    this.set("Design");
  }

  tech() {
    this.set("Tech");
  }


  getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }
}
