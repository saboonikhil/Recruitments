import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  submission_count = 0;
  clubs_count = 0;
  constructor() { }

  ngOnInit() {
  }

  onCountoEnd(): void {
    console.log('counto end');
}
}
