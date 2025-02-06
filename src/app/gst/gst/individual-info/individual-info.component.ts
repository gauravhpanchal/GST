import {
  AfterContentInit,
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
import { EmailPattern } from "src/app/shared/utility/constants";
import { CheckInputIsNumber } from "src/app/shared/utility/utility";
import { GstService } from "../../gst.service";

@Component({
  selector: "app-individual-info",
  templateUrl: "./individual-info.component.html",
  styleUrls: ["./individual-info.component.scss"],
})
export class IndividualInfoComponent
  implements OnInit, OnDestroy, AfterContentInit {
  @Input("ID") ID: string = "";
  @Input("tabID") tabID: string = "";
  @Input("selectedTabID") selectedTabID: string = "";
  @Output("sendData") sendData = new EventEmitter();
  @Input("selectedTab") selectedTab: number = 0;
  btnDisabled: boolean = false;
  @Output("tabChange") tabChange = new EventEmitter();
  @Output("addNewIndividual") addNewIndividual = new EventEmitter();
  individualFrmObj: any = {
    isExpend: true,
    First_Name: "",
    Middle_Name: "",
    Last_Name: "",
    Father_First_Name: "",
    Father_Middle_Name: "",
    Father_Last_Name: "",
    DOB: "",
    PAN_Number: "",
    Aadhaar_Number: "",
    Flat_House_NO: "",
    Building_Name: "",
    Road_Street_Name: "",
    Floor_No: "",
    Locality: "",
    Landmark: "",
    State: "-1",
    City: "",
    Pincode: "",
    Contact_Number: "",
    Email_Id: "",
    Designation: "",
    Picture: null,
    isDIN: "Yes",
    DIN_Number: "",
    isAuthorizedSignatory: "Yes",
    PassportNo: "",
    GenderTelephoneNoWithStdCode: "",
    FaxNumberWithSTDCode: "",
  };
  isSubmitted: boolean = false;
  individualData: any[] = [{ ...this.individualFrmObj }];
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
  ngAfterContentInit(): void {
    //this.service.sendIndividualInfoData({ type: 'setData', data: this.individualData });
  }

  ngOnInit() {
    // this.frm = this.formBuilder.group({
    //   First_Name: [''],
    //   Middle_Name: [''],
    //   Last_Name: [''],
    //   Father_First_Name: [''],
    //   Father_Middle_Name: [''],
    //   Father_Last_Name: [''],
    //   DOB: [''],
    //   PAN_Number: ['', Validators.pattern('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$')],
    //   Aadhaar_Number: ['', [Validators.minLength(12), Validators.maxLength(12)]],
    //   Flat_House_NO: [''],
    //   Building_Name: [''],
    //   Road_Street_Name: [''],
    //   Floor_No: [''],
    //   Locality: [''],
    //   Landmark: [''],
    //   State: ['-1'],
    //   City: [''],
    //   Pincode: [''],
    //   Contact_Number: [''],
    //   Email_Id: ['', [Validators.pattern(EmailPattern)]],
    //   Designation: [''],
    //   Picture: [null],
    //   isDIN: [''],
    //   DIN_Number: [''],
    //   isAuthorizedSignatory: ['', [Validators.required]],
    //   PassportNo: ['', Validators.pattern('^([A-Z a-z]){1}([0-9]){7}$')]
    // });

    this.subscription = this.service.sendDataSubject.subscribe((data) => {
      if (data.type === "sendData") {
        const obj = data.obj;
        this.btnDisabled = obj.isSubmit === true;
        if (obj[this.tabID]) {
          this.individualData = [];
          this.individualData =
            obj[this.tabID] && Array.isArray(obj[this.tabID])
              ? obj[this.tabID].map((item) => {
                item.isExpend = true;
                return item;
              })
              : [{ ...this.individualFrmObj }];
          this.service.sendIndividualInfoData({
            type: "setData",
            data: this.individualData,
          });
          ///this.frm.setValue(obj[this.tabID]);
          // if (obj[this.tabID].Picture) {
          //   this.PictureFileDetails = obj[this.tabID].Picture
          // }
        }
      } else if (data.type === "TabChanged") {
        const obj = data.obj;
        this.btnDisabled = obj.isSubmit === true;
        if (data.oldTabID === this.tabID) {
          this.service.sendIndividualInfoData({ type: "TabChanged" });
          // this.onSave();
        }
      } else if (data.type === "Saved" && this.tabID === this.selectedTabID) {
        //const data = { ...this.frm.value };
        // this.frm.reset();
        // this.frm.setValue(data);
      }
    });
  }

  AddNewIndividualClick() {
    this.addNewIndividual.emit();
  }
  subscription: Subscription;
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onSave() {
    this.isSubmitted = true;
    this.individualDataSaved = [];
    this.service.sendIndividualInfoData({ type: "saveClick" });
  }

  isNumber(evt: any) {
    return CheckInputIsNumber(evt);
  }

  setPictureFileDetails(data: any) {
    this.PictureFileDetails.push(data);
    //this.frm.get('Picture').setValue([...this.PictureFileDetails]);
    this.onSave();
  }

  onAddClick() {
    this.individualData = [this.individualFrmObj].concat(this.individualData);
  }

  onDeleteClick(index: number) {
    this.individualData.splice(index, 1);
  }

  individualDataSaved = [];
  sendDataIndividualFn(data: any) {
    this.individualDataSaved.push(data);
    if (this.individualDataSaved.length == this.individualData.length) {
      const invalid = this.individualDataSaved.filter(
        (f) => f.isValid == false
      );
      if (invalid && invalid.length > 0) {
      } else {
        this.sendData.emit({
          type: "save",
          data: this.individualDataSaved.map((item) => item.data),
        });
      }
    }
  }

  getShowHideImg(frm: any) {
    return `/assets/icons/${frm.isExpend ? "downward" : "upward"}.svg`;
  }

  onTabChange(direction: string) {
    this.tabChange.emit(direction);
  }
}
