import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../guard/authenticate.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor(private auth: AuthenticateService) { }

  ngOnInit() {
  }

  logout(): void {
    this.auth.logout();
  }

}
