import { Component, OnInit } from '@angular/core';
import { PlansService } from '../plans.service';

@Component({
  selector: 'app-plan-pg',
  templateUrl: './plan-pg.component.html',
  styleUrls: ['./plan-pg.component.scss']
})
export class PlanPgComponent implements OnInit {

  planList: any;
  pgMsg: any;

  constructor(private fetch: PlansService) { }

  ngOnInit() {
    this.getPlans();
  }

  getPlans(): void {
    this.fetch.getAllPlan().subscribe(
      res=> { this.planList = res; },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'}; }
    );
    setTimeout(() => {
        this.pgMsg = null;
    },3500);
  }

  delPlan(id: string , index: number): void {
    if(confirm("Are you sure you want to delete?")) {
      this.fetch.delPlan(id).subscribe(
        res => {
          this.pgMsg = {msg: "Plan deleted successfully!", alert: 'alert-success'};
          this.planList.splice(index, 1);
        },
        err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'} }
      );

      setTimeout(() => {
          this.pgMsg = null;
      },3500);
    }
  }

}
