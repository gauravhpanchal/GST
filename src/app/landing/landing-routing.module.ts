import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePgComponent } from './home-pg/home-pg.component';
import { ThirdLoginComponent } from './third-login/third-login.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';

const routes: Routes = [
  {
    path: "",
    component: HomePgComponent,
    pathMatch: "full"
  },
  {
    path: "user",
    component: ThirdLoginComponent
  },
  {
    path: "reset/:usrLog/:usrId/:otp/:usrType",
    component: ResetPassComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
