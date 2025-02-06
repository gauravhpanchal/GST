import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanPgComponent } from './plan-pg/plan-pg.component';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';

const routes: Routes = [
  {
    path: "plan",
    redirectTo: "plan/all"
  },
  {
    path: "plan/all",
    component: PlanPgComponent
  },
  {
    path: "plan/add",
    component: AddPlanComponent
  },
  {
    path: "plan/edit/:pId",
    component: EditPlanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }
