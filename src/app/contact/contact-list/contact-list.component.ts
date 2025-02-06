import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contactList: any;
  pgMsg: any;

  constructor(private fetch: ContactService) { }

  ngOnInit() {
    this.fetch.getAllContact().subscribe(
      res => {
        this.contactList = res;
        this.contactList.sort((var1, var2) => new Date(var2.createdOn).getTime().toString().localeCompare(new Date(var1.createdOn).getTime().toString()));
      },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'} }
    )
  }

}
