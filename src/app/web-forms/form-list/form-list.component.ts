import { Component, OnInit } from '@angular/core';
import { WebFormsService } from '../web-forms.service'

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {


  planList: any;
  fList: any;
  pgMsg: any;

  constructor(private fetch: WebFormsService) { }

  ngOnInit() {
    this.fetch.getAllForm().subscribe(
      res => { this.fList = res },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'}; }
    );

    setTimeout(() => {
      this.pgMsg = null;
    },2500);
  }

  delFrm(frmId: string, index: number): void {
    if(confirm("Are you sure you want to delete?")) {
      this.fetch.delForm(frmId).subscribe(
        res => {
          this.pgMsg = {msg: "Form deleted successfully!", alert: 'alert-success'};
          this.fList.splice(index, 1);
        },
        err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'} }
      );

      setTimeout(() => {
          this.pgMsg = null;
      },3500);
    }
  }

}
