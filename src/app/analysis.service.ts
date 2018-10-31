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
  constructor(private http: HttpClient) {
    this.backend_url = environment.backend_url;
    this.distinct_clubs_url = this.backend_url + "/analysis/distinct";
    this.submission_url = this.backend_url + "/analysis/submissionoverview";
    this.domain_url = this.backend_url + "/analysis/domainoverview";
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
}