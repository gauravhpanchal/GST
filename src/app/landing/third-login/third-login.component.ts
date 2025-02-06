import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../guard/authenticate.service';
import { LandingService } from '../landing.service';

@Component({
  selector: 'app-third-login',
  templateUrl: './third-login.component.html',
  styleUrls: ['./third-login.component.scss']
})
export class ThirdLoginComponent implements OnInit {
  modalRef: BsModalRef;

  logFrm: FormGroup;

  logSubmit: boolean = false;
  logBtm: boolean = false;
  logMsg: any;

  fgtFrm: FormGroup;
  fgtSubmit: boolean = false;
  fgtBtn: boolean = false;
  pgMsg: any;

  constructor(private formBuilder: FormBuilder, private modalService: BsModalService, private route: Router, private auth: AuthenticateService, private fetch: LandingService) { }

  ngOnInit() {
    this.logFrm = this.formBuilder.group({
      yrId: ['', Validators.required],
      yrPass: ['', Validators.required]
    });

    this.fgtFrm = this.formBuilder.group({
      email: ['', Validators.required]
    });

    if(this.auth.isLoggedIn())
      this.route.navigate(['/user/order/all']);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  get lgFrm() { return this.logFrm.controls; }

  logOnSubmit(): void {
    this.logSubmit = true;
    this.logBtm = true;
    if (this.logFrm.invalid) {
      this.logBtm = false;
      return;
    } else {
      let formObj = this.logFrm.getRawValue();
      this.fetch.logTUsr(formObj).subscribe(
        res => {
          const data: any = res;
          this.auth.sendUsrToken(data.token, data.usrName);
          this.logMsg = {msg: "Login successfully!", alert: 'alert-success'};
          this.logFrm.reset();
          this.logBtm = false;
          setTimeout(() => {
            this.route.navigate(["/user/order/all"]);
          },1500);
        },
        err => {
          this.logBtm = false;
          this.logMsg = {msg: err.error, alert: 'alert-danger'};
        }
      );
    }
    this.logSubmit = false;

    setTimeout(() => {
        this.logMsg = null;
    },3500);
  }

  get autoFgt() { return this.fgtFrm.controls; }

  fgtUsr(): void {
    this.fgtSubmit = true;
    this.fgtBtn = true;
    let formObj = this.fgtFrm.getRawValue();
    if (this.fgtFrm.invalid) {
      this.fgtBtn = false;
      return;
    } else {
      this.fetch.fgtTUsr(formObj).subscribe(
        res =>  {
          this.fgtSubmit = false;
          this.fgtBtn = false;
          this.pgMsg = {msg: res, alert: "alert-success"};
          this.fgtFrm.reset();
          setTimeout(() => {
            this.modalRef.hide();
          },4000);
        },
        err => {
          this.pgMsg = {msg: err.error, alert: "alert-danger"};
          this.fgtSubmit = false;
          this.fgtBtn = false;
        }
      );
      setTimeout(() => {
        this.pgMsg = null;
      },5000);
    }
  }

}
