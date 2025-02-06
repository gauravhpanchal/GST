import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiLinkService } from '../shared/api-link.service';
import { AuthenticateService } from '../guard/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class WebFormsService {

  constructor(private http: HttpClient, private api: ApiLinkService, private auth: AuthenticateService) { }

  headers = new HttpHeaders({
    'Content-Type': "application/json",
    'Authorization': this.auth.getLogged()
  });

  getAllPlan() {
    return this.http.get(this.api.server+"plan/all", {headers: this.headers});
  }

  getAllForm() {
    return this.http.get(this.api.server+"form/all", {headers: this.headers});
  }

  addForm(data: any) {
    return this.http.post(this.api.server+"form", data, {headers: this.headers});
  }

  delForm(fId: string) {
    return this.http.delete(this.api.server+"form/"+fId, {headers: this.headers});
  }
}
