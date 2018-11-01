import { Component, OnInit } from '@angular/core';
import { AnalysisService } from '../analysis.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})

export class AnalysisComponent implements OnInit {
  submission_count = 0;
  clubs_count = 0;
  clubs = [];
  domains = [];
  chart = [];
  chart2 = [];
  submission = [];
  clubNames = [];
  domainMarks = [];
  constructor(private analysis: AnalysisService) {
    this.domains = ["Tech", "Management", "Design"];
  }

  ngOnInit() {
    var z = 0;
    this.getClubs().then((data: any) => {
      this.clubs = data;
      this.clubs_count = data.length;
      this.getSubmission().then((submissionData) => {
        for (var i = 0; i < this.submission.length; i++) {
          this.submission_count += this.submission[i];
          this.clubNames.push(this.clubs[i].name);
        }
        this.check();
      }).catch((error) => {
        console.log(error);
      });

      this.getDomains().then((data: any) => {
        console.log(this.domainMarks);
        this.check();
      }, (error: any) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  check() {
    var options = {
      "cutoutPercentage": 0,
      "rotation": -0.5 * Math.PI,
      "animation.animateRotate": true,
      "animation.animateScale":true
    };

    var myDoughnutChartOptions = {
      "cutoutPercentage": 50,
      "rotation": -0.5 * Math.PI,
      "animation.animateRotate": true,
      "animation.animateScale":true
    }

    var data = {
      datasets: [{
        data: this.submission,
        backgroundColor: ["#0074D9", "#FF4136", "#AAAAAA"]
      }],
      labels: this.clubNames
    };

    var donutData = {
      datasets: [{
        data: this.domainMarks,
        backgroundColor: ["#0074D9", "#FF4136", "#AAAAAA"]
      }],
      labels: this.domains
    };

    this.chart = new Chart("canvas1", {
      type: 'pie',
      data: data,
      options: options
    });
    
    this.chart2 = new Chart("canvas2", {
      type: 'doughnut',
      data: donutData,
      options: myDoughnutChartOptions
    });
  }

  getClubs() {
    return new Promise((resolve, reject) => {
      this.analysis.distinctClubs().subscribe((dataClub) => {
        return resolve(dataClub.data);
      }, (error: any) => {
        return reject(error);
      });
    });
  }

  getSubmission() {
    return new Promise((resolve, reject) => {
      for (var i = 0; i < this.clubs_count; i++) {
        var params = { "club": this.clubs[i].club_id };
        this.analysis.submissions(params).subscribe((data) => {
          this.submission.push(data.data["count (regno)"]);
          if (this.submission.length == this.clubs_count) {
            return resolve(true);
          }
        }, (error) => {
          return reject(error);
        })
      }
    });
  }

  getDomains() {
    return new Promise((resolve, reject) => {
      for (var i = 0; i < this.domains.length; i++) {
        var params = {};
        params["domain"] = this.domains[i];
        this.analysis.domainOverview(params).subscribe((data) => {
          this.domainMarks.push(data.data["count (regno)"]);
          if (this.domainMarks.length == this.domains.length) {
            return resolve(true);
          }
        }, (error: any) => {
          return reject(error);
        });
      }
    });
  }
}
