import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LandingService } from '../landing.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {

  resetFrm: FormGroup;
  regSubmit: boolean = false;
  regBtn: boolean = false;

  pgMsg: any;

  usrLog: string;
  usrType: string;

  constructor(private aRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private fetch: LandingService) { }

  ngOnInit() {

    this.resetFrm = this.formBuilder.group({
      usrId: ['', Validators.required],
      otp: ['', Validators.required],
      passCode: ['', Validators.required],
      confPass: ['', Validators.required]
    });

    this.aRoute.params.subscribe(
      param => {
        this.usrLog = param['usrLog'];
        this.usrType = param['usrType']
        this.resetFrm.patchValue({
          usrId: param['usrId'],
          otp: param['otp']
        });
      }
    )

  }

  get autoReg() { return this.resetFrm.controls; }

  restUsr() {
    this.regSubmit = true;
    this.regBtn = true;
    let formObj = this.resetFrm.getRawValue();
    if (this.resetFrm.invalid) {
      this.regBtn = false;
      return false;
    } else {
      if(formObj.passCode !== formObj.confPass) {
        this.regBtn = false;
        return false;
      } else {
        this.fetch.resetPassVal(formObj, this.usrLog, this.usrType).subscribe(
          res =>  {
            this.regSubmit = false;
            this.regBtn = false;
            this.pgMsg = {msg: res, alert: "alert-success"};
            this.resetFrm.reset();
            if(this.usrType  === 'admin') {
              setTimeout(() => {
                this.router.navigate(["/"]);
              },1500);
            } else {
              setTimeout(() => {
                this.router.navigate(["/user"]);
              },1500);
            }
          },
          err => {
            this.pgMsg = {msg: err.error, alert: "alert-danger"};
            this.regSubmit = false;
            this.regBtn = false;
          }
        );
        setTimeout(() => {
          this.pgMsg = null;
        },5500);
      }
    }
  }

}
