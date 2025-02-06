import { Component, OnInit } from '@angular/core';
import { FaqService } from '../faq.service';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss']
})
export class FaqListComponent implements OnInit {

  faqList: any;
  pgMsg: any;

  constructor(private fetch: FaqService) { }

  ngOnInit() {
    this.getFAQ();
  }

  getFAQ(): void {
    this.fetch.getAllFAQ().subscribe(
      res => {
        this.faqList = res;
        this.faqList.sort((var1, var2) => new Date(var2.updatedOn).getTime().toString().localeCompare(new Date(var1.updatedOn).getTime().toString()));
      },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'} }
    );

    setTimeout(() => {
        this.pgMsg = null;
    },3500);
  }

  delFAQ(id: string , index: number): void {
    if(confirm("Are you sure you want to delete?")) {
      this.fetch.delFAQ(id).subscribe(
        res => {
          this.pgMsg = {msg: "Question deleted successfully!", alert: 'alert-success'};
          this.faqList.splice(index, 1);
        },
        err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'} }
      );
    }

    setTimeout(() => {
        this.pgMsg = null;
    },3500);
  }

}
