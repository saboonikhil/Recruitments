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

  chart = [];
  submission = [];
  clubNames = [];
  constructor(private analysis:AnalysisService) { }

  ngOnInit() {
    this.analysis.distinctClubs().subscribe((dataClub) => {
      this.clubs_count = dataClub.data.length;
      this.clubs = dataClub.data;
      for(var i=0;i<this.clubs.length;i++) {
        var params = {"club":this.clubs[i].club_id};
        this.clubNames.push(this.clubs[i].name);
        this.analysis.submissions(params).subscribe((data) => {
          this.submission.push(data.data["count (regno)"]);
          this.submission_count += data.data["count (regno)"];
          if(this.submission.length == this.clubs.length) {
            this.check();
          }
        }, (error: any) => {
          console.log(error);
        });
      }
    }, (error: any) => {
      console.log(error);
    }); 
  }

  check() {
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
