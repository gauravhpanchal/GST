import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaqListComponent } from './faq-list/faq-list.component';
import { CreateFaqComponent } from './create-faq/create-faq.component';
import { UpdateFaqComponent } from './update-faq/update-faq.component';

const routes: Routes = [
  {
    path: "faq",
    redirectTo: "faq/all"
  },
  {
    path: "faq/all",
    component: FaqListComponent
  },
  {
    path: "faq/add",
    component: CreateFaqComponent
  },
  {
    path: "faq/edit/:fId",
    component: UpdateFaqComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule { }
