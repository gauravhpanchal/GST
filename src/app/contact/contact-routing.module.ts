import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactPgComponent } from './contact-pg/contact-pg.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { WebFormComponent } from './web-form/web-form.component';

import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  {
    path: "order",
    redirectTo: "order/all"
  },
  {
    path: "order/all",
    component: ContactPgComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "order/detail/:ordId",
    component: BookDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "contact",
    redirectTo: "contact/all"
  },
  {
    path: "contact/all",
    component: ContactListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "web-booking/:site",
    component: WebFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
