import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FaqService } from '../faq.service';

@Component({
  selector: 'app-update-faq',
  templateUrl: './update-faq.component.html',
  styleUrls: ['./update-faq.component.scss']
})
export class UpdateFaqComponent implements OnInit {

  faqFrm: FormGroup;
  faqSubmit: boolean = false;
  faqBtm: boolean = false;
  pgMsg: any;
  faqId: string;

  constructor(private formBuilder: FormBuilder, private route: Router, private aRoute: ActivatedRoute, private fetch: FaqService) { }

  ngOnInit() {
    this.faqFrm = this.formBuilder.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });

    this.aRoute.params.subscribe(param => {
      this.faqId = param['fId'];
      this.fetch.getOneFAQ(this.faqId).subscribe(
        res => {
          const data: any = res;
          this.faqFrm.patchValue({
            question: data.title,
            answer: data.details
          });
        }
      )
    });
  }

  get fFrm() { return this.faqFrm.controls; }

  updateFaq(): void {
    this.faqSubmit = true;
    this.faqBtm = true;
    if(this.faqFrm.invalid) {
      this.faqBtm = false;
      return;
    } else {
      let formObj = this.faqFrm.getRawValue();
      this.fetch.modFAQ(formObj, this.faqId).subscribe(
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
