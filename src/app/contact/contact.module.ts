import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactPgComponent } from './contact-pg/contact-pg.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { WebFormComponent } from './web-form/web-form.component';


@NgModule({
  declarations: [ContactPgComponent, ContactListComponent, BookDetailsComponent, WebFormComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule
  ]
})
export class ContactModule { }
