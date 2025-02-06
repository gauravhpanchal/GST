import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EmailPattern } from "src/app/shared/utility/constants";
import { GstService } from "../../gst.service";
import { Subscription } from "rxjs";
import { CheckInputIsNumber } from "src/app/shared/utility/utility";

@Component({
  selector: "app-individual",
  templateUrl: "./individual.component.html",
  styleUrls: ["./individual.component.scss"],
})
export class IndividualComponent implements OnInit {
  @Input("ID") ID: string = "";
  @Input("tabID") tabID: string = "";
  @Input("selectedTabID") selectedTabID: string = "";
  @Output("sendData") sendData = new EventEmitter();
  @Input("selectedTab") selectedTab: number = 0;
  btnDisabled: boolean = false;
  frm: FormGroup;
  isSubmitted: boolean = false;
  @Output("tabChange") tabChange = new EventEmitter();
  PictureFileType: string[] = [
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
  PictureFileDetails: any[] = [];
  DocumentNameList: any[] = ["Picture", "PAN", "Aadhar"];

  LeadGeneratedByList: any[] = ["PPOB", "APOB", "Others", "Comment"];

  LeadAssignedToList: any[] = [
    "Employee1",
    "Employee2",
    "Employee3",
    "Employee4",
  ];

  StatesList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private service: GstService
  ) {
    this.StatesList = service.GetAllStates();
  }

  ngOnInit() {
    this.frm = this.formBuilder.group({
      First_Name: [""],
      Middle_Name: [""],
      Last_Name: [""],
      Father_First_Name: [""],
      Father_Middle_Name: [""],
      Father_Last_Name: [""],
      DOB: [""],
      PAN_Number: [
        "",
        Validators.pattern("^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$"),
      ],
      Aadhaar_Number: [
        "",
        [Validators.minLength(12), Validators.maxLength(12)],
      ],
      Flat_House_NO: [""],
      Building_Name: [""],
      Road_Street_Name: [""],
      Floor_No: [""],
      Locality: [""],
      Landmark: [""],
      State: ["-1"],
      City: [""],
      Pincode: [""],
      Contact_Number: [""],
      Email_Id: ["", [Validators.pattern(EmailPattern)]],
      Designation: [""],
      Picture: [null],
      isDIN: [""],
      DIN_Number: [""],
      isAuthorizedSignatory: ["", [Validators.required]],
      PassportNo: ["", Validators.pattern("^([A-Z a-z]){1}([0-9]){7}$")],
      GenderTelephoneNoWithStdCode: [""],
      FaxNumberWithSTDCode: [""]
    });

    this.subscription = this.service.sendDataSubject.subscribe((data) => {
      if (data.type === "sendData") {
        const obj = data.obj;
        this.btnDisabled = obj.isSubmit === true;
        if (obj[this.tabID]) {
          this.frm.setValue(obj[this.tabID]);
          if (obj[this.tabID].Picture) {
            this.PictureFileDetails = obj[this.tabID].Picture;
          }
        }
      } else if (data.type === "TabChanged") {
        const obj = data.obj;
        this.btnDisabled = obj.isSubmit === true;
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
    if (this.frm.invalid) {
      return false;
    }

    this.sendData.emit({ type: "save", data: this.frm.value });
    // this.frm.reset()
  }

  isNumber(evt: any) {
    return CheckInputIsNumber(evt);
  }

  setPictureFileDetails(data: any) {
    this.PictureFileDetails.push(data);
    this.frm.get("Picture").setValue([...this.PictureFileDetails]);
    this.onSubmit();
  }

  onTabChange(direction: string) {
    this.tabChange.emit(direction);
  }

  sendRemoveFileDetailsFn(file: any) {
    this.PictureFileDetails = this.PictureFileDetails.filter(
      (f) => f.fileName !== file.fileName
    );
    this.frm.get("Picture").setValue([...this.PictureFileDetails]);
    this.onSubmit();
  }
}
