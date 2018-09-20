import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetClubsService {

  private backend_url: string;
  private getclubs_url: string;
  private livequizes_url: string;
  constructor(private http: HttpClient) {
    this.backend_url = environment.backend_url;
    this.getclubs_url = this.backend_url + "/clubs/getClubs";
    this.livequizes_url = this.backend_url + "/clubs/liveClubs";
  }

  getClubList(): Observable<any> {
    return this.http.get<any>(this.getclubs_url);
  }

  getLiveRecruitmentsList(): Observable<any> {
    return this.http.get<any>(this.livequizes_url);
  }
}
