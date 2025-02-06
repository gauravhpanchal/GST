import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookDetailsComponent } from './book-details/book-details.component';
import { ContactPgComponent } from './contact-pg/contact-pg.component';

const routes: Routes = [
  {
    path: "user/order",
    redirectTo: "user/order/all"
  },
  {
    path: "user/order/all",
    component: ContactPgComponent
  },
  {
    path: "user/order/detail/:ordId",
    component: BookDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsrOrdRoutingModule { }
