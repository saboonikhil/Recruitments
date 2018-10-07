import { Component, OnInit } from '@angular/core';
import { GetClubsService } from '../get-clubs.service';

@Component({
  selector: 'app-clublistings',
  templateUrl: './clublistings.component.html',
  styleUrls: ['./clublistings.component.css']
})
export class ClublistingsComponent implements OnInit {

  private allClubs = [];
  club = {}
  title = "List of Clubs";
  constructor(private clubservice: GetClubsService) { }

  ngOnInit() {
    this.clubservice.getClubList().subscribe((data) => {
      this.allClubs = data.data;
    }, (error: any) => {
      console.log(error);
    });
  }

  confirm(clubinfo) {
    this.club = clubinfo;
    document.getElementById('dialogoverlay').style.visibility = "visible";
    document.getElementById('dialogoverlay').style.zIndex = "10";
    document.getElementById('dialogoverlay').style.opacity = "0.85";
    document.getElementById('dialogbox').style.opacity = "1";
    document.getElementById('dialogbox').style.zIndex = "999";

  }
  back() {
    document.getElementById('dialogbox').style.opacity = "0";
    document.getElementById('dialogoverlay').style.opacity = "0";
    document.getElementById('dialogoverlay').style.zIndex = "-1";
    document.getElementById('dialogbox').style.zIndex = "-1";
  }
}
