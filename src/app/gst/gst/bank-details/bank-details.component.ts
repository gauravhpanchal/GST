import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, Subscription } from "rxjs";
import { GstService } from "../../gst.service";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-bank-details",
  templateUrl: "./bank-details.component.html",
  styleUrls: ["./bank-details.component.scss"],
})
export class BankDetailsComponent implements OnInit, OnDestroy {
  @Input("ID") ID: string = "";
  @Input("tabID") tabID: string = "";
  @Input("selectedTabID") selectedTabID: string = "";
  @Output("tabChange") tabChange = new EventEmitter();
  @Output("sendData") sendData = new EventEmitter();
  @Input("selectedTab") selectedTab: number = 0;
  btnDisabled: boolean = false;
  frm: FormGroup;
  isSubmitted: boolean = false;

  LeadGeneratedByList: any[] = ["PPOB", "APOB", "Others", "Comment"];

  LeadAssignedToList: any[] = [
    "Employee1",
    "Employee2",
    "Employee3",
    "Employee4",
  ];

  TYPE_OF_ACCOUNT_LIST: any[] = ["Savings", "Current", "Joint", "Others"];
  isReadOnly = true;
  yesNoOption: any[] = ["Yes", "No"];

  DocumentNameList: any[] = ["Cheque "];
  AttachmentsFileType: string[] = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "csv",
    "docx",
    "xlsx",
    "xls",
    "pdf",
  ];
  AttachmentsFileDetails: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private service: GstService
  ) {}

  ngOnInit() {
    this.frm = this.formBuilder.group({
      Business_Legal_Name: [""],
      Account_Number: [""],
      Bank_Name: [""],
      Branch: [""],
      IFSC: [""],
      CHQ_NEFT: [""],
      Transaction_Ref_Number: [""],
      Date: [""],
      Amount: [""],
      Issued_NV: [""],
      Type_Of_Account: ["-1"],
      Attachments: [[]],
    });

    this.service.sendDataSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data.type === "sendData") {
          const obj = data.obj;
          this.btnDisabled = obj.isSubmit === true;
          this.setData(obj);

          const frmData = obj[this.tabID];
          if (frmData && !frmData.Attachments) {
            frmData.Attachments = [];
          }

          if (obj[this.tabID]) this.frm.setValue(frmData);

          if (obj[this.tabID] && obj[this.tabID].Attachments) {
            this.AttachmentsFileDetails = obj[this.tabID].Attachments;
          }
        } else if (data.type === "TabChanged") {
          const obj = data.obj;
          this.btnDisabled = obj.isSubmit === true;
          this.setData(obj);
          if (data.oldTabID === this.tabID || !data.oldTabID) {
            this.sendData.emit({ type: "updateData", data: this.frm.value });
          }
        } else if (data.type === "Saved" && this.tabID === this.selectedTabID) {
          const data = { ...this.frm.value };
          this.frm.reset();
          this.frm.setValue(data);
        }
      });
  }

  destroy$: Subject<boolean> = new Subject<boolean>();
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setData(data: any) {
    if (data && data.LeadsForStateSection) {
      const leadsForState = data.LeadsForStateSection;
      this.frm.patchValue({
        Business_Legal_Name: leadsForState.Seller_Business_Name,
        Bank_Name: leadsForState.Seller_Bank_Name,
        Transaction_Ref_Number: leadsForState.Transaction_ref_No,
        Amount: leadsForState.Value_of_AGMT,
        Account_Number: leadsForState.SellerBankAccountNumber,
      });
      this.isReadOnly =
        leadsForState.TypeOfBilling == "CumulativeMonthly" ? false : true;
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.frm.invalid) return false;

    this.sendData.emit({ type: "save", data: this.frm.value });
    // this.frm.reset()
  }

  onTabChange(direction: string) {
    this.tabChange.emit(direction);
  }

  setAttachmentsFileDetails(data: any) {
    this.AttachmentsFileDetails.push(data);
    this.frm.get("Attachments").setValue([...this.AttachmentsFileDetails]);
    this.onSubmit();
  }

  sendRemoveFileDetailsFn(file: any) {
    this.AttachmentsFileDetails = this.AttachmentsFileDetails.filter(
      (f) => f.fileName !== file.fileName
    );
    this.frm.get("Attachments").setValue([...this.AttachmentsFileDetails]);
    this.onSubmit();
  }
}
