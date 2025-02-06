import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormListComponent } from './form-list/form-list.component';
import { AddFormComponent } from './add-form/add-form.component';


const routes: Routes = [
  {
    path: "forms",
    redirectTo: "forms/all"
  },
  {
    path: "forms/all",
    component: FormListComponent
  },
  {
    path: "forms/add",
    component: AddFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebFormsRoutingModule { }
