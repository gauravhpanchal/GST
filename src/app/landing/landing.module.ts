import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LandingRoutingModule } from './landing-routing.module';
import { HomePgComponent } from './home-pg/home-pg.component';

import { LandingService } from './landing.service';
import { ThirdLoginComponent } from './third-login/third-login.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';


@NgModule({
  declarations: [HomePgComponent, ThirdLoginComponent, ResetPassComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FormsModule, ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [LandingService]
})
export class LandingModule { }
