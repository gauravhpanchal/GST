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
import { EmailPattern } from "src/app/shared/utility/constants";
import { CheckInputIsNumber } from "src/app/shared/utility/utility";
import { GstService } from "../../gst.service";

@Component({
  selector: "app-ppob",
  templateUrl: "./ppob.component.html",
  styleUrls: ["./ppob.component.scss"],
})
export class PPOBComponent implements OnInit, OnDestroy {
  @Input("ID") ID: string = "";
  @Input("tabID") tabID: string = "";
  @Input("selectedTabID") selectedTabID: string = "";
  @Output("sendData") sendData = new EventEmitter();
  @Input("selectedTab") selectedTab: number = 0;
  btnDisabled: boolean = false;
  @Output("tabChange") tabChange = new EventEmitter();
  Data: any;
  frm: FormGroup;
  isSubmitted: boolean = false;
  isNameAsSiteAvalable: boolean = false;
  AGNTFileType: string[] = [
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
  AGNTFileDetails: any[] = [];

  LeadGeneratedByList: any[] = ["PPOB", "APOB", "Others", "Comment"];

  LeadAssignedToList: any[] = [
    "Employee1",
    "Employee2",
    "Employee3",
    "Employee4",
  ];

  DocumentNameList: string[] = [
    "Lease/Leave and License Agreement",
    "Ownership Agreement",
    "Property Tax Receipt",
    "Electricity Bill",
    "Consent letter",
    "Rent Agreement",
  ];

  NameAsSiteList: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private service: GstService
  ) {}

  ngOnInit() {
    this.frm = this.formBuilder.group({
      DoorNoPremisesNo: [""],
      FloorNo: [""],
      BuildingPremiseName: [""],
      AreaStreetRoadName: [""],
      SubLocalityLocality: [""],
      City: [""],
      Pincode: [""],
      State: [""],
      Ebill: [""],
      GSTJurisdiction: [""],
      Range: [""],
      Division: [""],
      District: [""],
      Village: [""],
      EmailId: ["", [Validators.pattern(EmailPattern)]],
      ContactNumber: [""],
      AGNTUpload: [""],
      ckkNameAsSite: [""],
    });

    this.subscription = this.service.sendDataSubject.subscribe((data) => {
      if (data.type === "sendData") {
        const obj = data.obj;
        this.btnDisabled = obj.isSubmit === true;

        if (obj[this.tabID]) {
          this.frm.setValue(obj[this.tabID]);
          if (obj[this.tabID].AGNTUpload) {
            this.AGNTFileDetails = obj[this.tabID].AGNTUpload;
          }
          if (obj[this.tabID].ckkNameAsSite) {
            this.NameAsSiteList = obj[this.tabID].ckkNameAsSite;
          }
        }

        this.setValue(obj);
      } else if (data.type === "TabChanged") {
        const obj = data.obj;
        this.btnDisabled = obj.isSubmit === true;
        this.setValue(obj);
        this.Data = obj;
        this.isNameAsSiteAvalable =
          this.Data &&
          this.Data.LeadsForStateSection &&
          this.Data.LeadsForStateSection.NameAsSite.trim() != "" &&
          this.Data.LeadsForStateSection.NameAsSite.trim() != "-1"
            ? true
            : false;
        if (this.isNameAsSiteAvalable) {
          const CA_Address = this.service.GetSiteAddressBySiteID(
            this.Data.LeadsForStateSection.NameAsSite
          );
          if (CA_Address) {
            this.PERPOPULATED_Fields(
              "DoorNoPremisesNo",
              CA_Address.DoorNoPremisesNo
            );
            this.PERPOPULATED_Fields("FloorNo", CA_Address.FloorNo);
            this.PERPOPULATED_Fields(
              "BuildingPremiseName",
              CA_Address.BuildingPremiseName
            );
            this.PERPOPULATED_Fields(
              "AreaStreetRoadName",
              CA_Address.AreaStreetRoadName
            );
            this.PERPOPULATED_Fields(
              "SubLocalityLocality",
              CA_Address.SubLocalityLocality
            );
            this.PERPOPULATED_Fields(
              "City",
              CA_Address.City
            );
            this.PERPOPULATED_Fields(
              "Pincode",
              CA_Address.Pincode
            );
            this.PERPOPULATED_Fields(
              "State",
              CA_Address.States
            );

            const NameAsSiteList = this.service.GetSiteCodeBySiteID(
              this.Data.LeadsForStateSection.NameAsSite
            );
            if (
              NameAsSiteList.length != this.NameAsSiteList.length ||
              (this.NameAsSiteList.length > 0 &&
                NameAsSiteList.length > 0 &&
                this.NameAsSiteList[0].text !== NameAsSiteList[0].text)
            ) {
              this.frm.get("ckkNameAsSite").setValue(NameAsSiteList);
              this.NameAsSiteList = NameAsSiteList;
            }
            //  this.frm.get('ckkNameAsSite').setValue(this.Data.LeadsForStateSection.NameAsSite);
          }
        }
        if (data.oldTabID === this.tabID) {
          this.sendData.emit({ type: "updateData", data: this.frm.value });
        }

        const Contact_Number =
          obj && obj.Individual && obj.Individual.length > 0
            ? obj.Individual[0].Contact_Number
            : null;
        const EmailId =
          obj && obj.Individual && obj.Individual.length > 0
            ? obj.Individual[0].Email_Id
            : null;
        this.PERPOPULATED_Fields("EmailId", EmailId);
        this.PERPOPULATED_Fields("ContactNumber", Contact_Number);
      } else if (data.type === "Saved" && this.tabID === this.selectedTabID) {
        const data = { ...this.frm.value };
        this.frm.reset();
        this.frm.setValue(data);
      }
    });
  }

  setValue(data: any) {
    if (Object.keys(data).includes("Individual")) {
      const individual =
        Array.isArray(data.Individual) && data.Individual.length > 0
          ? data.Individual[0]
          : null;

      // if (individual)
      //   this.frm.patchValue({
      //     City: individual.City,
      //     Pincode: individual.Pincode,
      //     State: individual.State,
      //   });
    }
  }

  PERPOPULATED_Fields(field: string, newValue: string) {
    const val = this.frm.get(field).value;
    // if (!val || (val === null && val.trim() === "")) {
      // if (newValue) {
        this.frm.get(field).setValue(newValue);        
      // }
    // }
  }
  subscription: Subscription;
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.frm.invalid) return false;

    this.sendData.emit({ type: "save", data: this.frm.value });
    // this.service.saveGST_Details(this.frm.value, this.ID).subscribe((res: any) => {
    //   // this.frm.reset();
    //   if (res.ID) {
    //     this.sendData.emit(res.ID);
    //   }
    // })
  }

  isNumber(evt: any) {
    return CheckInputIsNumber(evt);
  }

  fileToUpload: File | null = null;

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  setAGNTFileDetails(data: any) {
    this.AGNTFileDetails.push(data);
    this.frm.get("AGNTUpload").setValue([...this.AGNTFileDetails]);
    this.onSubmit();
  }

  onNameAsSiteChange() {
    this.frm.get("ckkNameAsSite").setValue(this.NameAsSiteList);
  }

  onTabChange(direction: string) {
    this.tabChange.emit(direction);
  }

  sendRemoveFileDetailsFn(file: any) {
    this.AGNTFileDetails = this.AGNTFileDetails.filter(
      (f) => f.fileName !== file.fileName
    );
    this.frm.get("AGNTUpload").setValue([...this.AGNTFileDetails]);
    this.onSubmit();
  }
}
