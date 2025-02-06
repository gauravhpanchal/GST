import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { WebFormsRoutingModule } from './web-forms-routing.module';
import { FormListComponent } from './form-list/form-list.component';
import { AddFormComponent } from './add-form/add-form.component';


@NgModule({
  declarations: [FormListComponent, AddFormComponent],
  imports: [
    CommonModule,
    WebFormsRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class WebFormsModule { }
