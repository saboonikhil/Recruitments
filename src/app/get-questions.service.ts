import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetQuestionsService {

  private backend_url: string;
  private questions_url: string;

  constructor(private http: HttpClient) { 
    this.backend_url = environment.backend_url;
    this.questions_url = this.backend_url + "/submissions/getQues";
  }

  getQuestion(params):Observable<any> {
    return this.http.post(this.questions_url,params);
  }
}
