import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiLinkService } from '../shared/api-link.service';
import { AuthenticateService } from '../guard/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, private api: ApiLinkService, private auth: AuthenticateService) { }

  headers = new HttpHeaders({
    'Content-Type': "application/json",
    'Authorization': this.auth.getLogged()
  });

  aHeaders = new HttpHeaders({
    'Content-Type': "application/json",
  });

  getAllContact() {
    return this.http.get(this.api.server+"contact/all", {headers: this.headers});
  }

  getAllOrder() {
    return this.http.get(this.api.server+"booking/all", {headers: this.headers});
  }

  getOneOrder(ordId: string) {
    return this.http.get(this.api.server+"booking/"+ordId, {headers: this.headers});
  }

  getAllPlan() {
    return this.http.get(this.api.server+"plan/web/all", {headers: this.aHeaders});
  }
}
