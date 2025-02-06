import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FaqService } from '../faq.service';

@Component({
  selector: 'app-create-faq',
  templateUrl: './create-faq.component.html',
  styleUrls: ['./create-faq.component.scss']
})
export class CreateFaqComponent implements OnInit {

  faqFrm: FormGroup;
  faqSubmit: boolean = false;
  faqBtm: boolean = false;
  pgMsg: any;

  constructor(private formBuilder: FormBuilder, private route: Router, private fetch: FaqService) { }

  ngOnInit() {
    this.faqFrm = this.formBuilder.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });
  }

  get fFrm() { return this.faqFrm.controls; }

  newFaq(): void {
    this.faqSubmit = true;
    this.faqBtm = true;
    if(this.faqFrm.invalid) {
      this.faqBtm = false;
      return;
    } else {
      let formObj = this.faqFrm.getRawValue();
      this.fetch.addFAQ(formObj).subscribe(
        res => {
          this.pgMsg = {msg: res, alert: 'alert-success'};
          this.faqFrm.reset();
          this.faqBtm = false;
          this.faqSubmit = false;
          setTimeout(() => {
            this.route.navigate(["/faq/all"]);
          },1500);
        },
        err => {
          this.pgMsg = {msg: err.error, alert: 'alert-danger'};
          this.faqBtm = false;
        }
      )
    }
  }

}
