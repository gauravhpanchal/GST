import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tax-invoice-for-ca',
  templateUrl: './tax-invoice-for-ca.component.html',
  styleUrls: ['./tax-invoice-for-ca.component.scss']
})
export class TaxInvoiceForCAComponent implements OnInit {

  @Input('isShow') isShow: boolean = true;
  @Output('ShowHideChange') ShowHideChange = new EventEmitter();
  taxInvoiceData: any[] = [{
    leadNo: "200",
    sellerName: "USE CUMULATIVE  OR INDIVIDUAL SELECTION AS",
    agmtDt: "20-11-2022"
  }, {
    leadNo: "300",
    sellerName: "A TRIGGER FROM BILL SECTION DROP DOWN OF BILL TYPE",
    agmtDt: "20-10-2022"
  }]
  constructor() { }
  ngOnInit() {

  }

  closeModel() {
    //this.isShow = !this.isShow;
    this.ShowHideChange.emit(!this.isShow);
  }
}
