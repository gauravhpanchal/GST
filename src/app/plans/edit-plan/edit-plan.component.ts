import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PlansService } from '../plans.service';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.scss']
})
export class EditPlanComponent implements OnInit {

  planFrm: FormGroup;
  pSubmit: boolean = false;
  planBtm: boolean = false;
  pgMsg: any;
  pId: string;

  constructor(private formBuilder: FormBuilder, private route: Router, private aRoute: ActivatedRoute, private fetch: PlansService) { }

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

    this.aRoute.params.subscribe(param => {
      this.pId = param['pId'];
      this.fetch.getOnePlan(this.pId).subscribe(
        res => {
          let data: any = res;
          this.planFrm.patchValue({
            pTitle: data.title,
            priceImg: data.imgUrl,
            amount: data.amount,
            amountINR: data.amountINR,
            travelers: data.travelers,
            travelersINR: data.travelersINR,
            featureList: data.features
          });
        },
        err => {
          this.pgMsg = {msg: err.error, alert: 'alert-danger'};
          this.planBtm = false;
        }
      )
    });
  }


  get pFrm() { return this.planFrm.controls; }


  modPlan(): void {
    this.pSubmit = true;
    this.planBtm = true;
    if(this.planFrm.invalid) {
      this.planBtm = false;
      return;
    } else {
      let formObj = this.planFrm.getRawValue();
      this.fetch.editPlan(formObj, this.pId).subscribe(
        res => {
          this.pgMsg = {msg: res, alert: 'alert-success'};
          this.planFrm.reset();
          this.planBtm = false;
          this.pSubmit = false;
          setTimeout(() => {
            this.route.navigate(["/plan/all"]);
          },1500);
        },
        err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'}; }
      )
    }
  }

}
