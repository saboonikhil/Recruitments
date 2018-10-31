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
  submission = {};
  clubNames = [];
  domainMarks = [];
  constructor(private analysis:AnalysisService) {
    this.domains = ["Tech","Management","Design"];
  }

  ngOnInit() {
    this.analysis.distinctClubs().subscribe((dataClub) => {
      this.clubs_count = dataClub.data.length;
      this.clubs = dataClub.data;
      for(var i=0;i<this.clubs.length;i++) {
        console.log(i);
        var params = {"club":this.clubs[i].club_id};
        console.log(params);
        this.clubNames.push(this.clubs[i].name);
        this.analysis.submissions(params).subscribe((data) => {
          this.submission[params.club] = (data.data["count (regno)"]);
          console.log(this.submission);
          this.submission_count += data.data["count (regno)"];
          // if(this.submission.length == this.clubs.length) {
          //   this.check();
          // }
        }, (error: any) => {
          console.log(error);
        });
      }
    }, (error: any) => {
      console.log(error);
    }); 

    for(var i=0;i<this.domains.length;i++) {
      var params = {"domain":this.domains[i]};
      this.analysis.domainOverview(params).subscribe((data) => {
        this.domainMarks.push(data.data["count (regno)"]);
      }, (error: any) => {
        console.log(error);
      });
    }
    
  }

  check() {
    console.log(this.clubNames);
    console.log(this.submission);
    var options = {
      "cutoutPercentage":0,
      "rotation":-0.5*Math.PI,
      "animation.animateRotate":true
    };

    var data = {
      datasets: [{
          data: this.submission,
          backgroundColor: ["#0074D9", "#FF4136", "#AAAAAA"]
      }],
      labels: this.clubNames
    };
  
    this.chart = new Chart("canvas",{
      type: 'pie',
      data: data,
      options: options
  });
  }
}
