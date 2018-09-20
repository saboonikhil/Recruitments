import { Component, OnInit } from '@angular/core';
import { GetClubsService } from '../get-clubs.service';

@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.css']
})
export class DashboardStudentComponent implements OnInit {

  constructor(private clubService : GetClubsService) { }

  private clubListings = []
  private quizesListings = []

  ngOnInit() {
    this.clubService.getClubList().subscribe((data) => {
      this.clubListings = data.data;
      console.log(this.clubListings);
    }, (error: any) => {
      window.alert(error);
    });

    this.clubService.getLiveRecruitmentsList().subscribe((data) => {
      this.quizesListings = data.data;
    }, (error: any) => {
      window.alert(error);
    });
  }
}
