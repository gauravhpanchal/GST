import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlansRoutingModule } from './plans-routing.module';
import { PlanPgComponent } from './plan-pg/plan-pg.component';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';


@NgModule({
  declarations: [PlanPgComponent, AddPlanComponent, EditPlanComponent],
  imports: [
    CommonModule,
    PlansRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class PlansModule { }
