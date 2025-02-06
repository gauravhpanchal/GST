import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestyListComponent } from './testy-list/testy-list.component';
import { CreateTestyComponent } from './create-testy/create-testy.component';

const routes: Routes = [
  {
    path: "testimonials",
    redirectTo: "testimonials/all"
  },
  {
    path: "testimonials/all",
    component: TestyListComponent
  },
  {
    path: "testimonials/add",
    component: CreateTestyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestimonialsRoutingModule { }
