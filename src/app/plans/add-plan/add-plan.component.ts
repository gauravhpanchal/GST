import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlansService } from '../plans.service';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.scss']
})
export class AddPlanComponent implements OnInit {

  planFrm: FormGroup;
  pSubmit: boolean = false;
  planBtm: boolean = false;
  pgMsg: any;

  constructor(private formBuilder: FormBuilder, private route: Router, private fetch: PlansService) { }

  ngOnInit() {
    this.planFrm = this.formBuilder.group({
      pTitle: ['', Validators.required],
      priceImg: ['', Validators.required],
      amount: ['', Validators.required],
      amountINR: ['', Validators.required],
      travelers: ['', Validators.required],
      travelersINR: ['', Validators.required],
      featureList: ['', Validators.required]
    });
  }

  get pFrm() { return this.planFrm.controls; }


  newPlan(): void {
    this.pSubmit = true;
    this.planBtm = true;
    if(this.planFrm.invalid) {
      this.planBtm = false;
      return;
    } else {
      let formObj = this.planFrm.getRawValue();
      this.fetch.addPlan(formObj).subscribe(
        res => {
          this.pgMsg = {msg: res, alert: 'alert-success'};
          this.planFrm.reset();
          this.planBtm = false;
          this.pSubmit = false;
          setTimeout(() => {
            this.route.navigate(["/plan/all"]);
          },1500);
        },
        err => {
          this.pgMsg = {msg: err.error, alert: 'alert-danger'};
          this.planBtm = false;
        }
      )
    }
  }

}
