import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebFormsService } from '../web-forms.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {

  pgMsg: any;
  webFrm: FormGroup;
  frmSubmit: boolean = false;
  frmBtm: boolean = false;

  constructor(private formBuilder: FormBuilder, private route: Router, private fetch: WebFormsService) { }

  ngOnInit() {

    this.webFrm = this.formBuilder.group({
      website: ['', Validators.required],
      usrName: ['', Validators.required],
      passCode: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  get wbFrm() { return this.webFrm.controls; }

  newFrm(): void {
    this.frmSubmit = true;
    this.frmBtm = true;
    if(this.webFrm.invalid) {
      this.frmBtm = false;
      return;
    } else {
      let formObj = this.webFrm.getRawValue();
      this.fetch.addForm(formObj).subscribe(
        res => {
          this.pgMsg = {msg: res, alert: 'alert-success'};
          this.webFrm.reset();
          this.frmBtm = false;
          this.frmSubmit = false;
          setTimeout(() => {
            this.route.navigate(["/forms/all"]);
          },1500);
        },
        err => {
          this.pgMsg = {msg: err.error, alert: 'alert-danger'};
          this.frmBtm = false;
        }
      )
    }
  }

}
