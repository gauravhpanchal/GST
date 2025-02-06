import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-pg',
  templateUrl: './contact-pg.component.html',
  styleUrls: ['./contact-pg.component.scss']
})
export class ContactPgComponent implements OnInit {

  contactList: any;
  pgMsg: any;

  constructor(private router: Router, private fetch: ContactService) { }

  ngOnInit() {
    this.fetch.getAllOrder().subscribe(
      res => { this.contactList = res },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'} }
    );
  }

  viewDetails(ordId: string): void {
    this.router.navigate(['/order/detail/'+ordId]);
  }

}
