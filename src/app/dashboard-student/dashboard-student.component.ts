import { Component, OnInit } from '@angular/core';
import { GetClubsService } from '../get-clubs.service';
import { SubmisssionsService } from '../submisssions.service';

@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.css']
})
export class DashboardStudentComponent implements OnInit {
  email_id = "";
  constructor(private clubService : GetClubsService, private submissionservice : SubmisssionsService) { }
  private submissionResults = []
  private upcomingQuizes = []
  private liveQuizes = []
  private allClubs = []

  ngOnInit() {
    this.email_id = window.sessionStorage.getItem("email_id");
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

    var params = {
      "regno": this.email_id
    };

    this.submissionservice.getSubmission(params).subscribe((data) => {
      this.submissionResults = data.data;
      console.log(this.submissionResults);
    }, (error: any) => {
      console.log(error);
    });
  }
}
