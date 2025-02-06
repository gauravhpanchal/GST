import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticateService } from '../guard/authenticate.service';
import { ApiLinkService } from '../shared/api-link.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient, private api: ApiLinkService, private auth: AuthenticateService) { }

  headers = new HttpHeaders({
    'authorization': this.auth.getLogged(),
    'Content-Type': "application/json"
  });

  headersUp = new HttpHeaders({
    'authorization': this.auth.getLogged()
  });

  uploadPostImg(data: any) {
    return this.http.post(this.api.server+"image/upload", data, {headers: this.headersUp, reportProgress: true, observe: 'events'});
  }

  getImages() {
    return this.http.get(this.api.server+"image/all", {headers: this.headers});
  }
}
