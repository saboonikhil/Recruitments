import { Component, OnInit } from '@angular/core';
import { GetClubsService } from '../get-clubs.service';

@Component({
  selector: 'app-clublistings',
  templateUrl: './clublistings.component.html',
  styleUrls: ['./clublistings.component.css']
})
export class ClublistingsComponent implements OnInit {

  private allClubs = [];

  constructor(private clubservice : GetClubsService) { }

  ngOnInit() {
    this.clubservice.getClubList().subscribe((data) => {
      this.allClubs = data.data;
    }, (error: any) => {
      console.log(error);
    });
  }
}
