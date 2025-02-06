import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { UsrOrdRoutingModule } from './usr-ord-routing.module';

import { BookDetailsComponent } from './book-details/book-details.component';
import { ContactPgComponent } from './contact-pg/contact-pg.component';

@NgModule({
  declarations: [BookDetailsComponent, ContactPgComponent],
  imports: [
    CommonModule,
    UsrOrdRoutingModule,
    SharedModule
  ]
})
export class UsrOrdModule { }
