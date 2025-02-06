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
import { Subscription } from "rxjs";
import { GstService } from "../../gst.service";

@Component({
  selector: "app-complaince-check",
  templateUrl: "./complaince-check.component.html",
  styleUrls: ["./complaince-check.component.scss"],
})
export class ComplainceCheckComponent implements OnInit, OnDestroy {
  @Input("ID") ID: string = "";
  @Input("tabID") tabID: string = "";
  @Input("selectedTabID") selectedTabID: string = "";
  @Output("sendData") sendData = new EventEmitter();
  @Input("selectedTab") selectedTab: number = 0;

  @Output("tabChange") tabChange = new EventEmitter();
  btnDisabled: boolean = false;

  frm: FormGroup;
  isSubmitted: boolean = false;
  fileDetails: any[] = [];

  yesNoOption: any[] = ["Yes", "No"];
  LeadGeneratedByList: any[] = ["PPOB", "APOB", "Others", "Comment"];

  LeadAssignedToList: any[] = [
    "Employee1",
    "Employee2",
    "Employee3",
    "Employee4",
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private service: GstService
  ) {}

  ngOnInit() {
    this.frm = this.formBuilder.group({
      PICS: ["NA"],
      COI: ["NA"],
      DEED: ["NA"],
      PAN: ["NA"],
      Aadhaar: ["NA"],
      AuthorisedSignatory: ["NA"],
      EmailId: [""],
      ContactNumber: [""],
      QuarterlyCheckReminder: [""],
      GST3B: this.formBuilder.group({
        FinancialYear: [""],
        TaxPeriod: [""],
        DateOfFilling: [""],
        Status: [""],
      }),

      GST3B2: this.formBuilder.group({
        FinancialYear: [""],
        TaxPeriod: [""],
        DateOfFilling: [""],
        Status: [""],
      }),
      GSTR1: [""],
      CancelAgreement: ["-1"],
      IssueLetterToSeller: ["-1"],
      IssueLetterToGST: ["-1"],
    });

    this.subscription = this.service.sendDataSubject.subscribe((data) => {
      if (data.type === "sendData") {
        const obj = data.obj;
        this.btnDisabled = obj.isSubmit === true;
        this.getAllImagesData(obj);
        if (obj[this.tabID]) {
          const data = obj[this.tabID];
          this.autoFillData(obj);
          this.frm.setValue(data);
        }
      } else if (data.type === "TabChanged") {
        const obj = data.obj;
        this.btnDisabled = obj.isSubmit === true;
        this.autoFillData(obj);
        this.getAllImagesData(obj);
        if (data.oldTabID === this.tabID) {
          this.sendData.emit({ type: "updateData", data: this.frm.value });
        }
      } else if (data.type === "Saved" && this.tabID === this.selectedTabID) {
        const data = { ...this.frm.value };
        this.frm.reset();
        this.frm.setValue(data);
      }
    });
  }
  subscription: Subscription;
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.frm.invalid) return false;

    this.sendData.emit({ type: "save", data: this.frm.value });
  }

  autoFillData(obj: any) {
    const LeadsForStateSection = obj.LeadsForStateSection;
    if (LeadsForStateSection) {
      this.frm.patchValue({
        EmailId: LeadsForStateSection.Seller_Email_id,
        ContactNumber: LeadsForStateSection.Seller_Contact_Number,
      });
    }
  }

  getAllImagesData(obj) {
    let files = [];
    if (Object.keys(obj).includes("Organisation Info")) {
      const data = (obj["Organisation Info"].Attachments || []).map((f) => {
        f["sectionName"] = "Organisation Info";
        return f;
      });
      files = [...data, ...files];
    }

    if (Object.keys(obj).includes("Individual") && obj["Individual"]) {
      let Individual = [];
      obj["Individual"].map((item, i) => {
        const data = (item.Picture || []).map((f) => {
          f["sectionName"] = `Individual (${i + 1})`;
          return f;
        });
        Individual = [...data, ...Individual];
      });
      files = [...(Individual || []), ...files];
    }

    if (Object.keys(obj).includes("BankDetails")) {
      const data = (obj["BankDetails"].Attachments || []).map((f) => {
        f["sectionName"] = "Bank Details";
        return f;
      });
      files = [...data, ...files];
    }

    if (Object.keys(obj).includes("PPOB")) {
      const data = (obj["PPOB"].AGNTUpload || []).map((f) => {
        f["sectionName"] = "PPOB";
        return f;
      });
      files = [...data, ...files];
    }

    if (Object.keys(obj).includes("APOB")) {
      let APOB = [];
      if (obj["APOB"] && Array.isArray(obj["APOB"]))
        obj["APOB"].map((item, i) => {
          const data = (item.AGNTUpload || []).map((f) => {
            f["sectionName"] = `APOB (${i + 1})`;
            return f;
          });
          APOB = [...data, ...APOB];
        });
      files = [...(APOB || []), ...files];
    }

    this.fileDetails = files;
  }
  downloadFile(file: any) {
    window.open(file.url, "_blank");
  }

  onTabChange(direction: string) {
    this.tabChange.emit(direction);
  }
}
