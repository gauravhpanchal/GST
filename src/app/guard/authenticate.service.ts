import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private route: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  sendToken(token: string, usrFNm: string, isAdmin: boolean = false) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("AdmTVGUsr", token);
      localStorage.setItem("AdmTVGUsrNm", usrFNm);
      localStorage.setItem("isAdmin", isAdmin.toString());
    }
  }

  sendUsrToken(token: string, usrFNm: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("TrdUsrTVGUsr", token);
      localStorage.setItem("TrdUsrTVGUsrSt", usrFNm);
    }
  }

  getLogged() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem("AdmTVGUsr");
    } else { return null; }
  }

  isLoggedIn() {
    return this.getLogged() !== null;
  }

  getUsrLogged() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem("TrdUsrTVGUsr");
    } else { return null; }
  }

  isUsrLoggedIn() {
    return this.getUsrLogged() !== null;
  }

  getLogName() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem("AdmTVGUsrNm");
    } else { return ""; }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("AdmTVGUsr");
      localStorage.removeItem("AdmTVGUsrNm");
    }
    this.route.navigate(["/"]);
  }

  usrLogout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("TrdUsrTVGUsr");
      localStorage.removeItem("TrdUsrTVGUsrSt");
    }
    this.route.navigate(["/user"]);
  }
}
