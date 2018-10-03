import { Component, OnInit } from '@angular/core';
import { GetClubsService } from '../get-clubs.service';

@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.css']
})
export class DashboardStudentComponent implements OnInit {

  constructor(private clubService : GetClubsService) { }

  private upcomingQuizes = []
  private liveQuizes = []
  private allClubs = []

  ngOnInit() {
    this.clubService.getClubList().subscribe((data) => {
      this.allClubs = data.data;
    }, (error: any) => {
      console.log(error);
    });

    this.clubService.getLiveRecruitmentsList().subscribe((data) => {
      this.liveQuizes = data.data;
      console.log(this.liveQuizes);
    }, (error: any) => {
      console.log(error);
    });

    this.clubService.getUpcoming().subscribe((data) => {
      this.upcomingQuizes = data.data;
      console.log(this.upcomingQuizes);
    }, (error: any) => {
      console.log(error);
    });
    
  }
}
