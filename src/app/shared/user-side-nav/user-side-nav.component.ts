import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../guard/authenticate.service';

@Component({
  selector: 'app-user-side-nav',
  templateUrl: './user-side-nav.component.html',
  styleUrls: ['./user-side-nav.component.scss']
})
export class UserSideNavComponent implements OnInit {

  constructor(private auth: AuthenticateService) { }

  ngOnInit() {
  }

  logout(): void {
    this.auth.usrLogout();
  }

}
