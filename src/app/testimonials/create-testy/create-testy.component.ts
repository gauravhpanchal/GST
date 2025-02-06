import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestimonialsService } from '../testimonials.service';

@Component({
  selector: 'app-create-testy',
  templateUrl: './create-testy.component.html',
  styleUrls: ['./create-testy.component.scss']
})
export class CreateTestyComponent implements OnInit {

  testyFrm: FormGroup;
  testySubmit: boolean = false;
  testyBtm: boolean = false;
  pgMsg: any;

  constructor(private formBuilder: FormBuilder, private route: Router, private fetch: TestimonialsService) { }

  ngOnInit() {
    this.testyFrm = this.formBuilder.group({
      usrName: ['', Validators.required],
      usrImg: ['', Validators.required],
      country: ['', Validators.required],
      details: ['', Validators.required],
      rating: ['', Validators.required]
    });
  }

  get tyFrm() { return this.testyFrm.controls; }


  newTesty(): void {
    this.testySubmit = true;
    this.testyBtm = true;
    if(this.testyFrm.invalid) {
      this.testyBtm = false;
      return;
    } else {
      let formObj = this.testyFrm.getRawValue();
      this.fetch.addTesty(formObj).subscribe(
        res => {
          this.pgMsg = {msg: res, alert: 'alert-success'};
          this.testyFrm.reset();
          this.testyBtm = false;
          this.testySubmit = false;
          setTimeout(() => {
            this.route.navigate(["/testimonials/all"]);
          },1500);
        },
        err => {
          this.pgMsg = {msg: err.error, alert: 'alert-danger'};
          this.testyBtm = false;
        }
      )
    }
  }

}
