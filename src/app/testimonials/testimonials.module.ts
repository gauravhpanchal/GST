import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { TestimonialsRoutingModule } from './testimonials-routing.module';

import { TestyListComponent } from './testy-list/testy-list.component';
import { CreateTestyComponent } from './create-testy/create-testy.component';

@NgModule({
  declarations: [TestyListComponent, CreateTestyComponent],
  imports: [
    CommonModule,
    TestimonialsRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class TestimonialsModule { }
