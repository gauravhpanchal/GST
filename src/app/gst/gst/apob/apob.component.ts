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
import { CheckInputIsNumber } from "src/app/shared/utility/utility";
import { GstService } from "../../gst.service";

@Component({
  selector: "app-apob",
  templateUrl: "./apob.component.html",
  styleUrls: ["./apob.component.scss"],
})
export class APOBComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  @Input("ID") ID: string = "";
  @Input("tabID") tabID: string = "";
  @Input("selectedTabID") selectedTabID: string = "";
  @Output("sendData") sendData = new EventEmitter();
  @Input("selectedTab") selectedTab: number = 0;
  btnDisabled: boolean = false;
  @Output("tabChange") tabChange = new EventEmitter();
  sampleInput: any = {
    isExpend: true,
    SitesName: "",
    DoorNoPremisesNo: "",
    FloorNo: "",
    BuildingPremiseName: "",
    AreaStreetRoadName: "",
    SubLocalityLocality: "",
    City: "",
    Pincode: "",
    State: "",
    Ebill: "",
    GSTJurisdiction: "",
    Range: "",
    Division: "",
    District: "",
    Village: "",
    EmailId: "",
    ContactNumber: "",
    AGNTUpload: "",
    APOBNOC: "",
  };

  AGNTFileDetails: any[] = [];
  APOBData: any[] = [{ ...this.sampleInput }];
  frm: FormGroup;
  isSubmitted: boolean = false;

  LeadGeneratedByList: any[] = ["PPOB", "APOB", "Others", "Comment"];

  LeadAssignedToList: any[] = [
    "Employee1",
    "Employee2",
    "Employee3",
    "Employee4",
  ];

  ckkNameAsSite: any[] = [];
  ckkNameAsSiteAddresss: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private service: GstService
  ) {}

  ngOnInit() {
    this.frm = this.formBuilder.group({
      State: [""],
      Address1: [""],
      Address2: [""],
      Address3: [""],
      City: [""],
      Pincode: [""],
      Ebill: [""],
      GSTJurisdiction: [""],
      Range: [""],
      Division: [""],
      District: [""],
      Village: [""],
      EmailId: [""],
      ContactNumber: [""],
      AGNTUpload: [""],
      APOBNOC: [""],
    });

    this.subscription = this.service.sendDataSubject.subscribe((data) => {
      const authorizedSignatoryData = data.obj.Individual ? data.obj.Individual.find(el => el.isAuthorizedSignatory && el.isAuthorizedSignatory.toLowerCase() === 'yes') : null
      if(authorizedSignatoryData) {
        this.sampleInput.EmailId = authorizedSignatoryData.Email_Id || null;
        this.sampleInput.ContactNumber = authorizedSignatoryData.Contact_Number || null;
      }

      if (data.type === "sendData") {
        const obj = data.obj;
        this.btnDisabled = obj.isSubmit === true;
        if (obj[this.tabID]) {
          this.loadData(obj);
          this.getSiteAddress();
        } else {
          this.loadData(obj);
        }
      } else if (data.type === "TabChanged") {        
        const obj = data.obj;  
        this.btnDisabled = obj.isSubmit === true;
        this.ckkNameAsSite =
          obj && obj.PPOB && obj.PPOB.ckkNameAsSite
            ? obj.PPOB.ckkNameAsSite
            : [];
        this.loadData(obj);
        this.getSiteAddress();
        // this.onSave();
        // if (data.oldTabID === this.tabID) {
        //   this.sendData.emit({ type: 'updateData', data: this.frm.value });
        // }
      } else if (data.type === "Saved" && this.tabID === this.selectedTabID) {
        // const data = { ...this.frm.value };
        // this.frm.reset();
        // this.frm.setValue(data);
      }
    });
  }

  loadData(obj: any) {
    const APOBData =
      obj[this.tabID] && Array.isArray(obj[this.tabID])
        ? obj[this.tabID].map((item) => {
            item.isExpend = true;
            return item;
          })
        : null;
    this.ckkNameAsSite =
      obj["PPOB"] && obj["PPOB"].ckkNameAsSite ? obj["PPOB"].ckkNameAsSite : [];
    const APOB_AddressDetails = this.service.APOB_AddressDetails();
    const filterSites = this.ckkNameAsSite.filter((f) => f.checked === true);    
    const contactData = obj.Individual ? obj.Individual.find(el => el.isAuthorizedSignatory === 'Yes') : null;

    if (APOBData) {
      this.APOBData = filterSites.map((item) => {
        let record = APOBData.find((f) => f.SitesName == item.text);
        if (!record) {
          record = { ...this.sampleInput };
          record.SitesName = item.text;
          const findSiteAddress = APOB_AddressDetails.find(
            (f) => f.APOB === item.text
          );
          if (findSiteAddress) {
            record.SitesName = item.text;
            record.DoorNoPremisesNo = findSiteAddress.DoorNo_PremisesNo;
            record.FloorNo = findSiteAddress.FloorNo;
            record.BuildingPremiseName = findSiteAddress.BuildingPremiseName;
            record.AreaStreetRoadName = findSiteAddress.AreaStreetRoadName;
            record.SubLocalityLocality = findSiteAddress.SubLocalityLocality;
            record.City = findSiteAddress.City;
            record.Pincode = findSiteAddress.Pincode;
            record.State = findSiteAddress.State;
          }
        }
        record.EmailId = contactData ? contactData.Email_Id : null;
        record.ContactNumber = contactData ? contactData.Contact_Number : null;
        return record;
      });
    } else {
      this.APOBData = filterSites.map((item) => {
        const record = { ...this.sampleInput };
        record.SitesName = item.text;
        const findSiteAddress = APOB_AddressDetails.find(
          (f) => f.APOB === item.text
        );
        if (findSiteAddress) {
          record.SitesName = item.text;
          record.DoorNoPremisesNo = findSiteAddress.DoorNo_PremisesNo;
          record.FloorNo = findSiteAddress.FloorNo;
          record.BuildingPremiseName = findSiteAddress.BuildingPremiseName;
          record.AreaStreetRoadName = findSiteAddress.AreaStreetRoadName;
          record.SubLocalityLocality = findSiteAddress.SubLocalityLocality;
          record.City = findSiteAddress.City;
          record.Pincode = findSiteAddress.Pincode;
          record.State = findSiteAddress.State;
        }
        record.EmailId = contactData ? contactData.Email_Id : null;
        record.ContactNumber = contactData ? contactData.Contact_Number : null;
        return record;
      });
    }
    setTimeout(() => {
      this.service.sendAPOBData({
        type: "setData",
        data: this.APOBData,
        ckkNameAsSite: this.ckkNameAsSite,
      });
    }, 100);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  getSiteAddress() {
    this.ckkNameAsSiteAddresss = [];
    if (this.ckkNameAsSite && this.ckkNameAsSite.length > 0) {
      const APOBAddres = this.service.APOB_AddressDetails();
      if (APOBAddres) {
        const siteNames = this.ckkNameAsSite
          .filter((f) => f.checked === true)
          .map((i) => i.text);
        this.ckkNameAsSiteAddresss = APOBAddres.filter((f) =>
          siteNames.includes(f.APOB)
        );
      }
    }
  }

  onSave() {
    this.isSubmitted = true;
    this.APOBDataSaved = [];
    this.service.sendAPOBData({ type: "saveClick" });
    // this.isSubmitted = true;
    // if (this.frm.invalid)
    //   return false;

    // this.sendData.emit({ type: 'save', data: this.frm.value });
    // this.service.saveGST_Details(this.frm.value, this.ID).subscribe((res: any) => {
    //   // this.frm.reset();
    //   if (res.ID) {
    //     this.sendData.emit(res.ID);
    //   }
    // })
  }

  APOBDataSaved = [];
  sendDataAPOBFn(data: any) {
    this.APOBDataSaved.push(data);
    if (this.APOBDataSaved.length == this.APOBData.length) {
      const invalid = this.APOBDataSaved.filter((f) => f.isValid == false);
      if (invalid && invalid.length > 0) {
      } else {
        this.sendData.emit({
          type: "save",
          data: this.APOBDataSaved.map((item) => item.data),
        });
      }
    }
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
    this.onSave();
  }

  onAddClick() {
    this.APOBData.push({ ...this.sampleInput });
  }

  onDeleteClick(index: number) {
    this.APOBData.splice(index, 1);
  }

  getShowHideImg(frm: any) {
    return `/assets/icons/${frm.isExpend ? "downward" : "upward"}.svg`;
  }

  onTabChange(direction: string) {
    this.tabChange.emit(direction);
  }
}
