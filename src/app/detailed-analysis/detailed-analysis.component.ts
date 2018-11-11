import { Component, OnInit } from '@angular/core';
import { AnalysisService } from '../analysis.service';
// import { platform } from 'os';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-detailed-analysis',
  templateUrl: './detailed-analysis.component.html',
  styleUrls: ['./detailed-analysis.component.css']
})
export class DetailedAnalysisComponent implements OnInit {
  constructor(private analysis: AnalysisService) { }
  submissions = [];
  weaknesses = {};
  chart = [];
  myBarChart = [];
  ngOnInit() {

    document.getElementById("isChartPresent").style.display = "none";
    var id = Number(window.sessionStorage.getItem('club_analysis'));
    var params = { "club": id };
    this.analysis.distinctDomain().subscribe((data) => {
      for (var i = 0; i < data.data.length; i++) {
        var type = data.data[i];
        this.weaknesses[type["weak"]] = 0;
      }
    }, (error: any) => {
      console.log(error);
    });

    this.analysis.getAllRecords(params).subscribe((data) => {
      document.getElementById("isChartPresent").style.display = "block";
      document.getElementById("isPresent").style.display = "none";
      this.submissions = data.data;
      this.format();
    }, (error: any) => {
      console.log(error);
    });
  }

  format() {
    for (var i = 0; i < this.submissions.length; i++) {
      this.weaknesses[(this.submissions[i].weak)] += 1;
    }
    console.log(this.weaknesses);
    this.plot();
  }

  plot() {
    var options = {
      "cutoutPercentage": 0,
      "rotation": -0.5 * Math.PI,
      "animation.animateRotate": true,
      "animation.animateScale": true,
      
    }

    var baroptions = {
      "gridLines.offsetGridLines": false,
      "barThickness": "flex",
      "barPercentage": 0.8,
      "maxBarThickness": "10px"
    }

    var keys = Object.keys(this.weaknesses);
    var dist = [];
    for (var i = 0; i < keys.length; i++) {
      dist.push(this.weaknesses[keys[i]]);
    }

    var data = {
      datasets: [{
        data: dist,
        backgroundColor: ["#0074D9", "#FF4136", "#AAAAAA", "#803690", "#4D5360"],
      }],
      labels: keys
    };

    var odata = {
      datasets: [{
        data: dist,
        backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)"],
        borderWidth:1,
        borderColor:["rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)"]
      }],
      labels: keys
    }

    this.chart = new Chart("canvas1", {
      type: 'pie',
      data: data,
      options: options
    });

    this.myBarChart = new Chart("canvas2", {
      type: 'bar',
      data: odata,
      options: baroptions
    });

  }
}
