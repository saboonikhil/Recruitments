import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AnalysisService {
  private distinct_clubs_url;
  private backend_url;
  private submission_url;
  private domain_url;
  private all_submissions;
  private distinct_weaknesses;
  constructor(private http: HttpClient) {
    this.backend_url = environment.backend_url;
    this.distinct_clubs_url = this.backend_url + "/analysis/distinct";
    this.submission_url = this.backend_url + "/analysis/submissionoverview";
    this.domain_url = this.backend_url + "/analysis/domainoverview";
    this.all_submissions = this.backend_url + "/analysis/submissions";
    this.distinct_weaknesses = this.backend_url + "/analysis/distinctWeak";
  }

  distinctClubs(): Observable<any> {
    return this.http.get(this.distinct_clubs_url);
  }

  submissions(params) : Observable<any> {
    return this.http.post(this.submission_url,params);
  }

  domainOverview(params): Observable<any> {
    return this.http.post(this.domain_url,params);
  }

  getAllRecords(params): Observable<any> {
    return this.http.post(this.all_submissions,params);
  }

  distinctDomain(): Observable<any> {
    console.log(this.distinct_weaknesses);
    return this.http.get(this.distinct_weaknesses);
  }
}