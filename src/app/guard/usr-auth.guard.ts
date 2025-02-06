import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../guard/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class UsrAuthGuard  {
  constructor(private router: Router, private auth: AuthenticateService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.isUsrLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/user"]);
      return false;
    }
  }
  
}
