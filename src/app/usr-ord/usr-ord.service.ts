import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiLinkService } from '../shared/api-link.service';
import { AuthenticateService } from '../guard/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class UsrOrdService {

  constructor(private http: HttpClient, private api: ApiLinkService, private auth: AuthenticateService) { }

  headers = new HttpHeaders({
    'Content-Type': "application/json",
    'Authorization': this.auth.getUsrLogged()
  });

  getAllOrder() {
    return this.http.get(this.api.server+"booking/user/all", {headers: this.headers});
  }

  getOneOrder(ordId: string) {
    return this.http.get(this.api.server+"booking/"+ordId, {headers: this.headers});
  }
}
