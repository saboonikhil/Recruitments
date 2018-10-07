import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private login_url;
  private backend_url;
  private verify_url;
  constructor(private http: HttpClient) {
    this.backend_url = environment.backend_url;
    this.login_url = this.backend_url + "/login/student";
    this.verify_url = this.backend_url + "/login/verifyStudent";
  }

  postLogin(params): Observable<any> {
    return this.http.post(this.login_url, params);
  }

  verifyLogin(params) : Observable<any> {
    return this.http.post(this.verify_url, params);
  }
}