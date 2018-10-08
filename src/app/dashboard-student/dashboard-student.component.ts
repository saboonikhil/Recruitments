import { Component, OnInit } from '@angular/core';
import { GetClubsService } from '../get-clubs.service';
import { SubmisssionsService } from '../submisssions.service';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.css']
})
export class DashboardStudentComponent implements OnInit {
  title = "Dashboard";
  chart = [];
  email_id = "";
  private colors = ["crimson", "indigo", "darkslategray", "indigo", "darkcyan", "seagreen", "cyan"];
  private submissionPresence = false;
  constructor(private clubService: GetClubsService, private submissionservice: SubmisssionsService, private _router: Router) { }
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
    }, (error: any) => {
      console.log(error);
    });

    this.clubService.getUpcoming().subscribe((data) => {
      this.upcomingQuizes = data.data;
    }, (error: any) => {
      console.log(error);
    });

    var params = {
      "regno": this.email_id
    };

    this.submissionservice.getSubmission(params).subscribe((data) => {
      if (data.message) {
        this.submissionPresence = false;
      }
      else {
        this.submissionResults = data.data;
        this.submissionPresence = true;
        var distinctDomain = this.getDomains(this.submissionResults);
        console.log("domain", distinctDomain);
        var z = (Object.keys(distinctDomain));
        var dataChart = [];
        var marks = [];
        for (var i = 0; i < z.length; i++) {
          var x = {};
          x["label"] = Object.keys(distinctDomain)[i];
          x["fill"] = false;
          marks = [];
          x["borderColor"] = this.colors[i];
          marks.push(distinctDomain[z[i]]["Tech"] ? distinctDomain[z[i]]["Tech"] : 0);
          marks.push(distinctDomain[z[i]]["Management"] ? distinctDomain[z[i]]["Management"] : 0);
          marks.push(distinctDomain[z[i]]["Design"] ? distinctDomain[z[i]]["Design"] : 0);
          x["data"] = marks;
          dataChart.push(x);
        }
        console.log(dataChart);
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: ["Tech", "Management", "Design"],
            datasets: dataChart
          },
          options: {

            layout: {
              padding: {
                left: 50,
                right: 0,
                top: 0,
                bottom: 0
              },

              legend: {
                display: true
              },
              scales: {
                xAxes: [{
                  display: true
                }],
                yAxes: [{
                  ticks: {
                    min: 0,
                    max: 10,
                    stepSize: 1
                  },
                  display: true
                }],
              }
            }
          }
        })
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  getDomains(results): any {
    var marks = {};
    var domains = {};
    var x = results[0].club_id;
    var z = results[0].club_id;
    for (var i = 0; i < results.length; i++) {
      x = results[i].club_id;
      var id = String(z);
      if (z != x) {
        domains[id] = marks;
        marks = {};
        marks[results[i].domain] = results[i].scored;
        z = x;
      }
      else {
        marks[results[i].domain] = results[i].scored;
      }
    }
    domains[String(x)] = marks;
    return domains;
  }

  startAttempt(club) {
    let id = club.id;
    this.setCookie("recruitments_portal_club", id);
    let route = "clubs/" + id;
    console.log(route);
    this._router.navigate([route]);
  }

  setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (12 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
}