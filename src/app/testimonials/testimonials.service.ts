import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiLinkService } from '../shared/api-link.service';
import { AuthenticateService } from '../guard/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {

  constructor(private http: HttpClient, private api: ApiLinkService, private auth: AuthenticateService) { }

  headers = new HttpHeaders({
    'Content-Type': "application/json",
    'Authorization': this.auth.getLogged()
  });

  getAllTesty() {
    return this.http.get(this.api.server+"testimonial/all", {headers: this.headers});
  }

  addTesty(data: any) {
    return this.http.post(this.api.server+"testimonial", data, {headers: this.headers});
  }

  delTesty(tId: string) {
    return this.http.delete(this.api.server+"testimonial/"+tId, {headers: this.headers});
  }
}
