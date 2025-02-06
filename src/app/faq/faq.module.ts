import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqListComponent } from './faq-list/faq-list.component';
import { CreateFaqComponent } from './create-faq/create-faq.component';
import { UpdateFaqComponent } from './update-faq/update-faq.component';

import { FaqService } from './faq.service';

@NgModule({
  declarations: [FaqListComponent, CreateFaqComponent, UpdateFaqComponent],
  imports: [
    CommonModule,
    FaqRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [FaqService]
})
export class FaqModule { }
