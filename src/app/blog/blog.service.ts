import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiLinkService } from '../shared/api-link.service';
import { AuthenticateService } from '../guard/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient, private api: ApiLinkService, private auth: AuthenticateService) { }

  headers = new HttpHeaders({
    'Content-Type': "application/json",
    'Authorization': this.auth.getLogged()
  });

  getAllCate() {
    return this.http.get(this.api.server+"category/post/all", {headers: this.headers});
  }

  getOneCate(cId: string) {
    return this.http.get(this.api.server+"category/post/"+cId, {headers: this.headers});
  }

  addCate(data: any) {
    return this.http.post(this.api.server+"category/post", data, {headers: this.headers});
  }

  delCate(cId: string) {
    return this.http.delete(this.api.server+"category/post/"+cId, {headers: this.headers});
  }

  getAllPost() {
    return this.http.get(this.api.server+"post/all", {headers: this.headers});
  }

  getOnePost(pId: string) {
    return this.http.get(this.api.server+"post/"+pId, {headers: this.headers});
  }

  addPost(data: any) {
    return this.http.post(this.api.server+"post", data, {headers: this.headers});
  }

  modPost(data: any, pId: string) {
    return this.http.put(this.api.server+"post/"+pId, data, {headers: this.headers});
  }

  delPost(pId: string) {
    return this.http.delete(this.api.server+"post/"+pId, {headers: this.headers});
  }
}
