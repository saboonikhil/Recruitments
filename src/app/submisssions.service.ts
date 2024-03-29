import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SubmisssionsService {

  private backend_url;
  private getsubmission_url : string;
  private postAnswers_url : string;
  constructor(private http: HttpClient) {
    this.backend_url = environment.backend_url;
    this.getsubmission_url = this.backend_url + "/submissions/getSubmission";
    this.postAnswers_url = this.backend_url + "/submissions/postAnswers";
  }

  getSubmission(params): Observable<any> {
    return this.http.post(this.getsubmission_url, params);
  }

  postAnswers(params): Observable<any> {
    return this.http.post(this.postAnswers_url,params);
  }
}