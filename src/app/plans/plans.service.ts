import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiLinkService } from '../shared/api-link.service';
import { AuthenticateService } from '../guard/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(private http: HttpClient, private api: ApiLinkService, private auth: AuthenticateService) { }

  headers = new HttpHeaders({
    'Content-Type': "application/json",
    'Authorization': this.auth.getLogged()
  });

  getAllPlan() {
    return this.http.get(this.api.server+"plan/all", {headers: this.headers});
  }

  getOnePlan(pId: string) {
    return this.http.get(this.api.server+"plan/"+pId, {headers: this.headers});
  }

  addPlan(data: any) {
    return this.http.post(this.api.server+"plan", data, {headers: this.headers});
  }

  editPlan(data: any, id: string) {
    return this.http.put(this.api.server+"plan/"+id, data, {headers: this.headers});
  }

  delPlan(id: string) {
    return this.http.delete(this.api.server+"plan/"+id, {headers: this.headers});
  }

}
