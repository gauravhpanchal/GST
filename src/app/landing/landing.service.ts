import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiLinkService } from '../shared/api-link.service';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  headers = new HttpHeaders({
    'Content-Type': "application/json"
  });

  constructor(private http: HttpClient, private api: ApiLinkService) { }

  logUsr(data: any) {
    return this.http.post(this.api.server+"login", data, {headers: this.headers});
  }

  logTUsr(data: any) {
    return this.http.post(this.api.server+"user/login", data, {headers: this.headers});
  }

  fgtUsr(data: any) {
    return this.http.post(this.api.server+"forgot", data, {headers: this.headers});
  }

  fgtTUsr(data: any) {
    return this.http.post(this.api.server+"user/forgot", data, {headers: this.headers});
  }

  resetPassVal(data: any, usrId: string, usrType: string) {
    if(usrType == 'admin')
      return this.http.post(this.api.server+"reset/"+usrId, data, {headers: this.headers})
    else
      return this.http.post(this.api.server+"user/reset/"+usrId, data, {headers: this.headers})
  }

}
