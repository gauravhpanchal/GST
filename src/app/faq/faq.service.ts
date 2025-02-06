import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiLinkService } from '../shared/api-link.service';
import { AuthenticateService } from '../guard/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient, private api: ApiLinkService, private auth: AuthenticateService) { }

  headers = new HttpHeaders({
    'Content-Type': "application/json",
    'Authorization': this.auth.getLogged()
  });

  getAllFAQ() {
    return this.http.get(this.api.server+"faq/all", {headers: this.headers});
  }

  getOneFAQ(faqId: string) {
    return this.http.get(this.api.server+"faq/"+faqId, {headers: this.headers});
  }

  addFAQ(data: any) {
    return this.http.post(this.api.server+"faq", data, {headers: this.headers});
  }

  modFAQ(data: any, faqId: string) {
    return this.http.put(this.api.server+"faq/"+faqId, data, {headers: this.headers});
  }

  delFAQ(faqId: string) {
    return this.http.delete(this.api.server+"faq/"+faqId, {headers: this.headers});
  }
}
