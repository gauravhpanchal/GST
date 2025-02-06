import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Subscription } from "rxjs";
import { CheckInputIsNumber } from "src/app/shared/utility/utility";
import { GstService } from "../../gst.service";
import { v4 as uuidv4 } from "uuid";
import { saveAs } from 'file-saver';

// https://www.gstzen.in/a/form-gst-reg-01.html
@Component({
  selector: "app-create-gstapp",
  templateUrl: "./create-gstapp.component.html",
  styleUrls: ["./create-gstapp.component.scss"],
})
export class CreateGSTAppComponent implements OnInit, OnDestroy {
  @Input("ID") ID: string = "";
  @Input("tabID") tabID: string = "";
  @Input("selectedTabID") selectedTabID: string = "";
  @Output("sendData") sendData = new EventEmitter();
  @Input("selectedTab") selectedTab: number = 0;

  @Output("tabChange") tabChange = new EventEmitter();
  btnDisabled: boolean = false;

  frm: FormGroup;
  isSubmitted: boolean = false;
  isAdmin: boolean = false;
  //Form Intilizer multiple values / Array
  GstFromOrgInfo: any[] = [];
  IndividualInfoData: any[] = [];
  HSN: any[] = [];

  LeadGeneratedByList: any[] = ["PPOB", "APOB", "Others", "Comment"];

  LeadAssignedToList: any[] = [
    "Employee1",
    "Employee2",
    "Employee3",
    "Employee4",
  ];
  GenderList: any = ["Male", "Female", "Other"];
  StatesList: any[] = [];
  GST_Details: any[] = [];
  ReasonRegList: any[] = [
    "Crossing the threshold",
    "Inter-State supply",
    "Liability to pay tax as recipient of goods or (x) Person liable to pay tax u/s 9(5) services u/s 9(3)or 9(4)",
    "Transfer of business which includes change in the ownership of business (if transferee is not a registered entity)",
    "Death of theproprietor",
    "De-merger",
    "Change in constitution of business Indicate existing registrations wherever applicable portal",
    "Merger /amalgamation of two or more registered persons",
    "Input Service Distributor",
    "Taxable person supplying through e-Commerce ",
    "Voluntary Basis",
    "Persons supplying goods and/or services on behalf of other taxable person(s)",
    "Others (Not covered above) - Specify",
  ];

  RegistrationTypeList: any[] = [
    "Registration number under Value Added Tax",
    "Central Sales Tax Registration Number",
    "Entry Tax Registration Number",
    "Entertainment TaxRegistrationNumber",
    "Hotel and Luxury Tax Registration Number",
    "Central Excise Registration Number",
    "Service Tax Registration Number",
    "CorporateIdentify Number/Foreign Company Registration Number",
    "Limited Liability Partnership Identification Number/Foreign LimitedLiabilityPartnership Identification Number",
    "Importer/Exporter Code Number",
    "Registration number under Medicinal and Toilet",
    "Preparations(Excise Duties) Act",
    "Registration number under Shops and Establishment Act",
    "Temporary ID, if any",
    "Others (Please specify)",
  ];

  NatureOfPossessionOfPremisesList: any[] = [
    "Own",
    "Leased",
    "Rented",
    "Consent",
    "Shared",
    "Others (specify)",
  ];

  NatureOfBusinessActivity: any[] = [
    "Factory / Manufacturing",
    "Warehouse/Depot",
    "Office/Sale Office",
    "EOU/ STP/ EHTP",
    "Input Service Distributor",
    "Retail Business",
    "Wholesale Business",
    "Bonded Warehouse",
    "Leasing Business",
    "Works Contract",
    "SEZ",
    "Recipient of Services",
    "Service Provision",
    "Others (specify)",
  ];

  isOtherBussinessActivity = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private service: GstService,
    private modalService: BsModalService
  ) {
    this.StatesList = service.GetAllStates();
  }
  Promoters_Partner_Details: any[] = [];
  Additional_Business_Place_Details: any[] = [];
  ngOnInit() {
    this.isAdmin = localStorage.getItem("isAdmin") === "true";
    this.frm = this.formBuilder.group({
      Promoters_Partner: [],
      Additional_Business_Place: [],
      // Lead_no: [""],
      // Lead_date: [""],
      // Lead_Generated_BY: ["-1"],
      // Seller_Name: [""],
      // Seller_Email_id: [""],
      // Seller_Contact_Name: [""],
      // Seller_Contact_Number: [""],
      // GST_NO: [""],
      // GST_State: ["-1"],
      // Lead_Assigned_to: ["-1"],
      // Lead_Call_Section: [""],
      // Details: [""],
      // Call_1_Status: [""],
      // Call_2_Status: [""],
      // Call_3_Status: [""],
      // Call_4_Status: [""],
      // Others_Status: [""],
      // Lead_Status: [""],
      // Doc_Received: [""],
      // AgMT_No_And_Date: [""],
      // AGMT_REGD_Date: [""],
      // GST_Filed: [""],
      // WIP: [""],
      // GST_Query: [""],
      // GTS_Status: [""],
      // Agent_Details: [""],
      // AGMT_Start_Date: [""],
      // AGMT_End_date: [""],
      // Value_of_AGMT: [""],
      // Payment_info_Section: [""],
      // Seller_Bank_Name: [""],
      // Amount_Transferred: [""],
      // Transaction_ref_No: [""],
      // Payment_received_Date: [""],
      // Renewable_Applicable: [""],
      // Renewal_Date: [""],
      // Renewe_BY: [""],
      Temp_Reg: this.formBuilder.group({
        State: [""],
        District: [""],
        Business_Legal_Name: [""],
        PAN_No: [""],
        Email_Id: [""],
        Mobile_Number: [""],
      }),
      Business_Details: this.formBuilder.group({
        Trade_Name: [""],
        Business_Constitution: [""],
        State: [""],
        Jurisdiction: [""],
        Ward_No: [""],
        Commisionerate_Code: [""],
        Division_Code: [""],
        Range_Code: [""],
        Composition_Option: [""],
        Commencement_Date: [""],
        Register_Arises_Date: [""],
        Casual_Tax_Option: [""],
        Reason_Reg: [""],
        Registration_Type: [""],
        Registration_Number: [""],
        Registration_Date: [""],
        License_Date: [""],
        License_Number: [""],
        Incorporation_Number_Date: [""],
        Incorporation_Number: [""],
      }),
      Personal_Information: this.formBuilder.group({
        First_Name: [""],
        Middle_Name: [""],
        Last_Name: [""],
        Father_First_Name: [""],
        Father_Middle_Name: [""],
        Father_Last_Name: [""],
        DOB: [""],
        Mobile_Number: [""],
        Email_Id: [""],
        Gender: [""],
        Telephone_No: [""],
        FAX_No: [""],
      }),
      Identity_Information: this.formBuilder.group({
        Designation: [""],
        Identifciation_No: [""],
        isIndianCitizen: [""],
        PAN: [""],
        Passport_No: [""],
        Aadhar_No: [""],
        Flat_House_NO: [""],
        Floor_No: [""],
        Building_Name: [""],
        Road_Street_Name: [""],
        Locality: [""],
        State: [""],
        District: [""],
        Pincode: [""],
        isAuthorizedSignatory: [""],
      }),
      Primary_Authorised_Signatory: this.formBuilder.group({
        First_Name: [""],
        Middle_Name: [""],
        Last_Name: [""],
        Father_First_Name: [""],
        Father_Middle_Name: [""],
        Father_Last_Name: [""],
        DOB: [""],
        Mobile_Number: [""],
        Email_Id: [""],
        Gender: ["-1"],
        Telephone_No: [""],
        FAX_No: [""],
        Designation: [""],
        Identifciation_No: [""],
        isIndianCitizen: [""],
        PAN: [""],
        Passport_No: [""],
        Aadhar_No: [""],
        Flat_House_NO: [""],
        Floor_No: [""],
        Building_Name: [""],
        Road_Street_Name: [""],
        Locality: [""],
        State: ["-1"],
        District: [""],
        Pincode: [""],
      }),
      Authorized_Representative: this.formBuilder.group({
        GST_Practitioner: [""],
        Others: [""],
        Enrollment_Id: [""],
        First_Name: [""],
        Middle_Name: [""],
        Last_Name: [""],
        Designation: [""],
        Mobile_Number: [""],
        Email_Id: [""],
        Telephone_No: [""],
        FAX_No: [""],
      }),
      GST_Details: [],
      PPOB: this.formBuilder.group({
        DoorNoPremisesNo: [""],
        FloorNo: [""],
        BuildingPremiseName: [""],
        AreaStreetRoadName: [""],
        SubLocalityLocality: [""],
        City: [""],
        Pincode: [""],
        State: [""],
      }),
      // Contact_Information: this.formBuilder.group({
      //   DoorNoPremisesNo: [""],
      //   FloorNo: [""],
      //   BuildingPremiseName: [""],
      //   RoadStreetLaneName: [""],
      //   LocalityArea: [""],
      //   State: [""],
      //   District: [""],
      //   Pincode: [""],
      //   Longitude: [""],
      //   Latitude: [""],
      //   Email: [""],
      //   TalephoneNo: [""],
      //   Mobile_Number: [""],
      //   FAX_No: [""],
      //   NatureOfProcess: [""],
      // }),
      Business_Activity: [""],
      // Business_Activity: this.formBuilder.group({
      //   Factory: [""],
      //   Warehouse: [""],
      //   Office: [""],
      //   EOU_STP_EHTP: [""],
      //   Input_Service_Distributor: [""],
      //   Retail_Business: [""],
      //   Wholesale_Business: [""],
      //   Bonded_Warehouse: ["", {}],
      //   Leasing_Business: [""],
      //   Works_Contract: [""],
      //   SEZ: [""],
      //   Recipient_Services: [""],
      //   Service_Provision: [""],
      //   Other: [""],
      // }),
      // Additional_Business_Place: this.formBuilder.group({
      //   DoorNoPremisesNo: [""],
      //   FloorNo: [""],
      //   BuildingPremiseName: [""],
      //   RoadStreetLaneName: [""],
      //   LocalityArea: [""],
      //   State: [""],
      //   District: [""],
      //   Pincode: [""],
      //   Longitude: [""],
      //   Latitude: [""],
      //   Email: [""],
      //   TalephoneNo: [""],
      //   Mobile_Number: [""],
      //   FAX_No: [""],
      //   Consent: [""],
      //   Factory: [""],
      //   Warehouse: [""],
      //   Office: [""],
      //   EOU_STP_EHTP: [""],
      //   Input_Service_Distributor: [""],
      //   Retail_Business: [""],
      //   Wholesale_Business: [""],
      //   Bonded_Warehouse: [""],
      //   Leasing_Business: [""],
      //   Works_Contract: [""],
      //   SEZ: [""],
      //   Recipient_Services: [""],
      //   Service_Provision: [""],
      //   Others: [""],
      // }),
      Commodity_Supply: [""],
      Bank_Account_Details: this.formBuilder.group({
        Account_No: [""],
        Account_Type: [""],
        Ifsc_Code: [""],
      }),
      State_Spec_Info: this.formBuilder.group({
        ProTaxECNo: [""],
        ProTaxRCNo: [""],
        PersonName: [""],
        StateLic_No: [""],
      }),
      NatureOfPossessionOfPremises: this.formBuilder.group({
        NatureOfPossessionOfPremises: [""],
      }),
    });
    this.subscription = this.service.sendDataSubject.subscribe((data) => {
      if (data.type === "sendData") {
        const obj = data.obj;

        if (Object.keys(obj).length > 0) {
          this.SetData(obj);
        }
        if (obj[this.tabID] && obj[this.tabID].GST_Details) {
          this.GST_Details = obj[this.tabID].GST_Details;
        }
      } else if (data.type === "TabChanged") {
        const obj = data.obj;

        if (
          obj.LeadsForStateSection &&
          (obj.LeadsForStateSection.HOME_STATE_GST_NO ||
            obj.LeadsForStateSection.GST_State)
        ) {
          const gstData = this.frm.get("GST_Details").value || [];
          const homeStateGstData = {
            GST_Date: obj.LeadsForStateSection.GST_DATE,
            GST_Number: obj.LeadsForStateSection.HOME_STATE_GST_NO,
            GST_State: obj.LeadsForStateSection.GST_State,
            GST_Status: obj.LeadsForStateSection.GTS_Status != '-1' ? obj.LeadsForStateSection.GTS_Status : ""
          };
          const otherStateGstData = gstData.filter(
            (el) =>
              el.GST_State != obj.LeadsForStateSection.GST_State &&
              el.GST_Number != obj.LeadsForStateSection.HOME_STATE_GST_NO
          );

          this.frm
            .get("GST_Details")
            .setValue([homeStateGstData, ...otherStateGstData]);
          this.GST_Details = [homeStateGstData, ...otherStateGstData]
        }

        if (Object.keys(obj).length > 0) {
          this.SetData(obj);
        }

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

  subscription: Subscription;
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.frm.invalid) return false;

    this.sendData.emit({ type: "submit", data: this.frm.value });

    // this.service.saveGST_Details(this.frm.value, this.ID).subscribe((res: any) => {
    //   // this.frm.reset();
    //   if (res.ID) {
    //     this.sendData.emit(res.ID);
    //   }
    // })
  }
  // GetValue(obj, Key, Name, subName = '') {
  //   return obj && obj[Key] ? obj[Key][Name] ? obj[Key][Name][subName] && subName !== '' ? obj[Key][Name] : obj[Key][subName] : "";
  // }
  GetValue(obj, Key, Name, subName = '') {
    if (!obj || !obj[Key]) return ''; // Return empty string if obj or obj[Key] is undefined
    if (subName !== '' && obj[Key][Name]) {
      return obj[Key][Name][subName];
    }
    if (obj[Key][Name]) {
      return obj[Key][Name];
    }
    return '';
  }


  SetData(obj: any) {
    let frmObj = this.getFrmObject(obj);

    if (obj.CreateGSTApp && obj.isSubmit === true) {
      this.btnDisabled = obj.isSubmit === true;
      // frmObj = obj.CreateGSTApp as any;

      this.isOtherBussinessActivity =
        frmObj.Business_Activity == "Others (specify)" ? true : false;
      this.GST_Details = frmObj["GST_Details"];
      this.Promoters_Partner_Details = frmObj["Promoters_Partner"] as any[];
      this.Additional_Business_Place_Details = frmObj[
        "Additional_Business_Place"
      ] as any[];
    }

    this.frm.patchValue(frmObj);
  }

  modalRef: BsModalRef;
  SelectedGST_ID: string = "-1";
  SelectedGST_Number: string = "";
  SelectedGST_State: string = "-1";
  SelectedGST_Date: string = "";
  SelectedGST_Status: string = "";
  onAddNewGSTClick(template: TemplateRef<any>) {
    this.SelectedGST_ID = "-1";
    this.SelectedGST_Number = "";
    this.SelectedGST_State = "-1";
    this.modalRef = this.modalService.show(template);
    //
  }
  onEditClick(template: TemplateRef<any>, GST: any) {
    this.SelectedGST_ID = GST.id;
    this.SelectedGST_Number = GST.GST_Number;
    this.SelectedGST_State = GST.GST_State;
    this.modalRef = this.modalService.show(template);
  }

  addState() {
    if (this.SelectedGST_ID == "-1") {
      this.GST_Details.push({
        id: uuidv4(),
        GST_State: this.SelectedGST_State,
        GST_Number: this.SelectedGST_Number,
        GST_Date: this.SelectedGST_Date,
        GST_Status: this.SelectedGST_Status,
      });
    } else {
      const index = this.GST_Details.findIndex(
        (f) => f.id === this.SelectedGST_ID
      );
      if (index > -1) {
        this.GST_Details[index].GST_Date = this.SelectedGST_Date;
        this.GST_Details[index].GST_Status = this.SelectedGST_Status;
        this.GST_Details[index].GST_State = this.SelectedGST_State;
        this.GST_Details[index].GST_Number = this.SelectedGST_Number;
      }
    }
    this.frm.get("GST_Details").setValue([...this.GST_Details]);
    this.modalRef.hide();
  }

  getDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = `${today.getMonth() + 1}`; // Months start at 0!
    let dd = `${today.getDate()}`;

    if (+dd < 10) {
      dd = "0" + dd;
    }
    if (+mm < 10) {
      mm = "0" + mm;
    }

    return dd + "/" + mm + "/" + yyyy;
  }

  getRegistrationDetails(data, type) {
    return data && Array.isArray(data) && data.length > 0 ? data[0][type] : "";
  }
  Commodity_SupplyList: any[] = [];

  updateBussinessActivity(value) {
    this.frm.get("Business_Activity").setValue(value);
    this.isOtherBussinessActivity = value == "Others (specify)" ? true : false;
  }

  getCommodity_SupplyDetails(Product_HSN, Service_HSN, data) {
    this.Commodity_SupplyList = [];
    const CurrentRecord = data && Array.isArray(data) ? data : [];
    if (Product_HSN && Array.isArray(Product_HSN)) {
      this.Commodity_SupplyList = Product_HSN.map((item, ind) => {
        const find = CurrentRecord.find((f) => f.HSNName === item);
        return {
          HSNName: item,
          ServiceName: Service_HSN[ind] ? Service_HSN[ind] : "",
          Description: find ? find.Description : "",
        };
      });
    }
    this.frm.get("Commodity_Supply").setValue(this.Commodity_SupplyList);
  }

  onHSNDescriptionChange(i: number, event: any) {
    this.Commodity_SupplyList[i].Description = event.target.value;
    this.frm.get("Commodity_Supply").setValue(this.Commodity_SupplyList);
  }

  download() {
    this.service.DownloadData(this.frm.value).subscribe(data => {
      saveAs(data, "HBSE.xlsx")
    });
  }

  getFrmObject(obj) {
    this.Promoters_Partner_Details = this.getPromotersPartnerDetails(obj);
    this.Additional_Business_Place_Details =
      this.getAdditional_Business_Place_Details(obj);

    const keys = {
      LeadsForStateSection: "LeadsForStateSection",
      Organisation: "Organisation Info",
      Individual: "Individual",
      BankDetails: "BankDetails",
      PPOB: "PPOB",
      APOB: "APOB",
      ComplainceCheck: "ComplainceCheck",
      Invoice: "Invoice",
      CreateGSTApp: "CreateGSTApp"
    };

    const CA_Address = this.service.GetSiteAddressBySiteID(
      obj.LeadsForStateSection.NameAsSite
    );
    return {

      Additional_Business_Place: this.Additional_Business_Place_Details,
      // Lead_no: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Lead_date: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Lead_Generated_BY: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Seller_Name: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Seller_Email_id: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Seller_Contact_Name: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Seller_Contact_Number: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // GST_NO: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // GST_State: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Lead_Assigned_to: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Lead_Call_Section: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Details: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Call_1_Status: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Call_2_Status: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Call_3_Status: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Call_4_Status: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Others_Status: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Lead_Status: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Doc_Received: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // AgMT_No_And_Date: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // AGMT_REGD_Date: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // GST_Filed: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // WIP: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // GST_Query: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // GTS_Status: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Agent_Details: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // AGMT_Start_Date: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // AGMT_End_date: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Value_of_AGMT: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Payment_info_Section: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Seller_Bank_Name: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Amount_Transferred: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Transaction_ref_No: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Payment_received_Date: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Renewable_Applicable: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Renewal_Date: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Renewe_BY: this.GetValue(obj, keys.LeadsForStateSection, "val"),

      Promoters_Partner: this.Promoters_Partner_Details,
      Temp_Reg: {
        State: this.GetValue(
          obj,
          keys.LeadsForStateSection,
          "LeadGeneratedForState"
        ),
        District: this.GetValue(obj, keys.PPOB, "District"),
        Business_Legal_Name: this.GetValue(
          obj,
          keys.LeadsForStateSection,
          "Seller_Business_Name"
        ),
        PAN_No: this.GetValue(obj, keys.Organisation, "Business_Pan_Number"),
        Email_Id: this.GetValue(
          obj,
          keys.LeadsForStateSection,
          "Seller_Email_id"
        ),
        Mobile_Number: this.GetValue(
          obj,
          keys.LeadsForStateSection,
          "Seller_Contact_Number"
        ),
      },
      Business_Details: {
        Trade_Name: this.GetValue(
          obj,
          keys.LeadsForStateSection,
          "Seller_Business_Name"
        ),
        Business_Constitution: this.GetValue(
          obj,
          keys.Organisation,
          "Business_Constitution"
        ),
        State: this.GetValue(
          obj,
          keys.LeadsForStateSection,
          "LeadGeneratedForState"
        ),
        Jurisdiction: this.GetValue(obj, keys.PPOB, "GSTJurisdiction"),
        Ward_No: this.GetValue(obj, keys.CreateGSTApp, 'Business_Details', 'Ward_No'),
        Commisionerate_Code: this.GetValue(obj, keys.CreateGSTApp, 'Business_Details', 'Commisionerate_Code'),
        Division_Code: this.GetValue(obj, keys.PPOB, "Division"),
        Range_Code: this.GetValue(obj, keys.PPOB, "Range"),
        Composition_Option: this.GetValue(
          obj,
          keys.Organisation,
          "Composite_Seller"
        ),
        Commencement_Date: this.GetValue(obj, keys.CreateGSTApp, 'Business_Details', 'Commencement_Date') || this.getDate(),
        Register_Arises_Date: this.GetValue(obj, keys.CreateGSTApp, 'Business_Details', 'Register_Arises_Date') || this.getDate(),
        Reason_Reg: this.GetValue(obj, keys.CreateGSTApp, 'Business_Details', "Reason_Reg"),
        // Casual_Tax_Option: this.GetValue(obj, keys.LeadsForStateSection, "val"),
        Casual_Tax_Option: this.GetValue(obj, keys.CreateGSTApp, 'Business_Details', 'Casual_Tax_Option'),
        Registration_Type: this.GetValue(
          obj,
          keys.CreateGSTApp,
          'Business_Details',
          "Registration_Type"
        ),
        License_Date: this.GetValue(
          obj,
          keys.CreateGSTApp,
          'Business_Details',
          "License_Date"
        ),
        License_Number: this.GetValue(
          obj,
          keys.CreateGSTApp,
          'Business_Details',
          "License_Number"
        ) || '',
        Registration_Number: this.getRegistrationDetails(
          this.GetValue(obj, keys.Organisation, "GST_Details"),
          "GST_Number"
        ),
        Registration_Date: this.getRegistrationDetails(
          this.GetValue(obj, keys.Organisation, "GST_Details"),
          "GST_Date"
        ),
        Incorporation_Number_Date: this.GetValue(
          obj,
          keys.Organisation,
          "COI_DATE"
        ),
        Incorporation_Number: this.GetValue(
          obj,
          keys.Organisation,
          "Certificate_Of_Incorporation"
        ),
      },
      PPOB: {
        DoorNoPremisesNo: this.GetValue(obj, keys.PPOB, "DoorNoPremisesNo"),
        FloorNo: this.GetValue(obj, keys.PPOB, "FloorNo"),
        BuildingPremiseName: this.GetValue(
          obj,
          keys.PPOB,
          "BuildingPremiseName"
        ),
        AreaStreetRoadName: this.GetValue(obj, keys.PPOB, "AreaStreetRoadName"),
        SubLocalityLocality: this.GetValue(
          obj,
          keys.PPOB,
          "SubLocalityLocality"
        ),
        City: CA_Address ? CA_Address.City : null,
        Pincode: CA_Address ? CA_Address.Pincode : null,
        State: CA_Address ? CA_Address.States : null,
      },
      // Personal_Information: {
      //   First_Name: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Middle_Name: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Last_Name: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Father_First_Name: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Father_Middle_Name: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Father_Last_Name: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   DOB: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Mobile_Number: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Email_Id: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Gender: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Telephone_No: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   FAX_No: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // },
      // Identity_Information: {
      //   Designation: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Identifciation_No: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   isIndianCitizen: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   PAN: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Passport_No: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Aadhar_No: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Flat_House_NO: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Floor_No: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Building_Name: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Road_Street_Name: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Locality: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   State: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   District: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Pincode: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   isAuthorizedSignatory: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // },
      // Primary_Authorised_Signatory: {
      //   First_Name: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Middle_Name: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Last_Name: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Father_First_Name: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Father_Middle_Name: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Father_Last_Name: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   DOB: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Mobile_Number: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Email_Id: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Gender: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Telephone_No: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   FAX_No: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Designation: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Identifciation_No: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   isIndianCitizen: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   PAN: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Passport_No: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Aadhar_No: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Flat_House_NO: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Floor_No: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Building_Name: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Road_Street_Name: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Locality: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   State: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   District: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Pincode: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // },
      Authorized_Representative: {
        ...this.GetValue(obj, keys.CreateGSTApp, "Authorized_Representative"),
      },
      GST_Details: this.GetValue(obj, keys.Organisation, "GST_Details"),
      Contact_Information: {
        //   DoorNoPremisesNo: this.GetValue(obj, keys.LeadsForStateSection, "val"),
        //   FloorNo: this.GetValue(obj, keys.LeadsForStateSection, "val"),
        //   BuildingPremiseName: this.GetValue(obj, keys.LeadsForStateSection, "val"),
        //   RoadStreetLaneName: this.GetValue(obj, keys.LeadsForStateSection, "val"),
        //   LocalityArea: this.GetValue(obj, keys.LeadsForStateSection, "val"),
        //   State: this.GetValue(obj, keys.LeadsForStateSection, "val"),
        //   District: this.GetValue(obj, keys.LeadsForStateSection, "val"),
        //   Pincode: this.GetValue(obj, keys.LeadsForStateSection, "val"),
        //   Longitude: this.GetValue(obj, keys.LeadsForStateSection, "val"),
        //   Latitude: this.GetValue(obj, keys.LeadsForStateSection, "val"),
        Email: this.GetValue(obj, keys.LeadsForStateSection, "Seller_Email_id"),
        //   TalephoneNo: this.GetValue(obj, keys.LeadsForStateSection, "val"),
        Mobile_Number: this.GetValue(
          obj,
          keys.LeadsForStateSection,
          "Seller_Contact_Number"
        ),
        //   FAX_No: this.GetValue(obj, keys.LeadsForStateSection, "val"),
        //   NatureOfProcess: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      },
      Business_Activity: this.GetValue(obj, keys.CreateGSTApp, "Business_Activity") || "-1",
      // Additional_Business_Place: {
      //   DoorNoPremisesNo: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   FloorNo: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   BuildingPremiseName: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   RoadStreetLaneName: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   LocalityArea: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   State: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   District: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Pincode: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Longitude: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // Latitude: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Email: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   TalephoneNo: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Mobile_Number: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   FAX_No: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Consent: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Factory: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Warehouse: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Office: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   EOU_STP_EHTP: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Input_Service_Distributor: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Retail_Business: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Wholesale_Business: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Bonded_Warehouse: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Leasing_Business: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Works_Contract: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   SEZ: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Recipient_Services: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Service_Provision: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      //   Others: this.GetValue(obj, keys.LeadsForStateSection, "val"),
      // },
      // NatureOfPossessionOfPremises: {
      //   NatureOfPossessionOfPremises:
      //     this.GetValue(
      //       obj,
      //       keys.CreateGSTApp,
      //       "NatureOfPossessionOfPremises"
      //     ) || "-1",
      // },
      NatureOfPossessionOfPremises: this.GetValue(
        obj,
        keys.CreateGSTApp,
        "NatureOfPossessionOfPremises"
      ) || "-1",

      Commodity_Supply: this.getCommodity_SupplyDetails(
        this.GetValue(obj, keys.Organisation, "Product_HSN_number_Items"),
        this.GetValue(obj, keys.Organisation, "Service_HSN_number_Items"),
        this.GetValue(obj, keys.CreateGSTApp, "Commodity_Supply")
      ),
      Bank_Account_Details: {
        Account_No: this.GetValue(obj, keys.BankDetails, "Account_Number"),
        Account_Type: this.GetValue(obj, keys.BankDetails, "Type_Of_Account"),
        Ifsc_Code: this.GetValue(obj, keys.BankDetails, "IFSC"),
      },
      State_Spec_Info: {
        ProTaxECNo: this.GetValue(obj, keys.Organisation, "PT_Details"),
        ProTaxRCNo: this.GetValue(obj, keys.Organisation, "PTREC_Details"),
        PersonName: this.GetValue(obj, keys.CreateGSTApp, "State_Spec_Info", "PersonName"),
        StateLic_No: this.GetValue(obj, keys.CreateGSTApp, "State_Spec_Info", "StateLic_No"),
      },
    };
  }

  getPromotersPartnerDetails(obj: any) {
    const PromotersPartnerObj = {
      First_Name: "",
      Middle_Name: "",
      Last_Name: "",
      NameOfHusbandAndFather: {
        First_Name: "",
        Middle_Name: "",
        Last_Name: "",
        DateOfBirth: "",
        MobileNo: "",
        EmailID: "",
        Gender: "",
        GenderTelephoneNoWithStdCode: "",
        FaxNumberWithSTDCode: "",
      },
      IdentityInformation: {
        DesignationStatus: "",
        DirectorIdentificationNumber: "",
        AreYouACitizenOfIndia: "",
        PermanentAccountNumber: "",
        PassportNumber: "",
        AadhaarNumber: "",
      },
      ResidenceAddressInIndia: {
        BuildingNo_FlatNo_DoorNo: "",
        FloorNo: "",
        NameOfThePremises_Building: "",
        Road_Street_Lane: "",
        Locality_Area_Village: "",
        State: "",
        District: "",
        PinCode: "",
      },
      OtherInformation: {
        AuthorisedSinatory: "",
      },
    };
    if (obj && obj.Individual) {
      return obj.Individual.map((item) => {
        return {
          First_Name: item.First_Name,
          Middle_Name: item.Middle_Name,
          Last_Name: item.Last_Name,
          NameOfHusbandAndFather: {
            First_Name: item.Father_First_Name,
            Middle_Name: item.Father_Middle_Name,
            Last_Name: item.Father_Last_Name,
            DateOfBirth: item.DOB,
            MobileNo: item.Contact_Number,
            EmailID: item.Email_Id,
            Gender: item.Gender,
            GenderTelephoneNoWithStdCode: item.GenderTelephoneNoWithStdCode || "",
            FaxNumberWithSTDCode: item.FaxNumberWithSTDCode || "",
          },
          IdentityInformation: {
            DesignationStatus: item.Designation,
            DirectorIdentificationNumber: item.DIN_Number || "",
            AreYouACitizenOfIndia: item.isAuthorizedSignatory,
            PermanentAccountNumber: item.PAN_Number,
            PassportNumber: item.PassportNo,
            AadhaarNumber: item.Aadhaar_Number,
          },
          ResidenceAddressInIndia: {
            BuildingNo_FlatNo_DoorNo: item.Flat_House_NO,
            FloorNo: item.Floor_No,
            NameOfThePremises_Building: item.Building_Name,
            Road_Street_Lane: item.Road_Street_Name,
            Locality_Area_Village: item.Locality,
            State: item.State,
            District: item.City,
            PinCode: item.Pincode,
          },
          OtherInformation: {
            AuthorisedSinatory: item.isAuthorizedSignatory,
          },
        };
      });
    }
    return [{ ...PromotersPartnerObj }];
  }

  getAdditional_Business_Place_Details(obj: any) {
    const AdditionalObj = {
      DoorNoPremisesNo: "",
      FloorNo: "",
      BuildingPremiseName: "",
      RoadStreetLaneName: "",
      LocalityArea: "",
      State: "",
      District: "",
      Pincode: "",
      Longitude: "",
      Latitude: "",
      Email: "",
      TalePhoneNo: "",
      Mobile_Number: "",
      FAX_No: "",
      // Consent: "",
      // Factory: "",
      // Warehouse: "",
      // Office: "",
      // EOU_STP_EHTP: "",
      // Input_Service_Distributor: "",
      // Retail_Business: "",
      // Wholesale_Business: "",
      // Bonded_Warehouse: "",
      // Leasing_Business: "",
      // Works_Contract: "",
      // SEZ: "",
      // Recipient_Services: "",
      // Service_Provision: "",
      // Others: "",
    };

    if (obj && obj.CreateGSTApp?.Additional_Business_Place) {
      return obj.CreateGSTApp.Additional_Business_Place.map((item) => {
        return {
          DoorNoPremisesNo: item.DoorNoPremisesNo,
          FloorNo: item.FloorNo,
          BuildingPremiseName: item.BuildingPremiseName,
          RoadStreetLaneName: item.RoadStreetLaneName,
          LocalityArea: item.LocalityArea,
          State: item.State,
          District: item.District,
          Pincode: item.Pincode,
          Longitude: item.Longitude,
          Latitude: item.Latitude,
          Email: obj.LeadsForStateSection.Seller_Email_id,
          TalePhoneNo: item.TalePhoneNo,
          Mobile_Number: obj.LeadsForStateSection.Seller_Contact_Number,
          FAX_No: item.FAX_No,
          // Consent: item.First_Name,
          // Factory: item.First_Name,
          // Warehouse: item.First_Name,
          // Office: item.First_Name,
          // EOU_STP_EHTP: item.First_Name,
          // Input_Service_Distributor: item.First_Name,
          // Retail_Business: item.First_Name,
          // Wholesale_Business: item.First_Name,
          // Bonded_Warehouse: item.First_Name,
          // Leasing_Business: item.First_Name,
          // Works_Contract: item.First_Name,
          // SEZ: item.First_Name,
          // Recipient_Services: item.First_Name,
          // Service_Provision: item.First_Name,
          // Others: item.First_Name,
        };
      });
    }
    return [{ ...AdditionalObj }];
  }

  onTabChange(direction: string) {
    this.tabChange.emit(direction);
  }

  isNumber(evt: any) {
    return CheckInputIsNumber(evt);
  }

  onPromotersPartnerChange(i: number, event: any, key1: string, key2: string) {
    this.Promoters_Partner_Details[i][key1][key2] = event.target.value;
    this.frm.get("Promoters_Partner").setValue(this.Promoters_Partner_Details);
  }

  onAdditional_BusinessChange(i: number, event: any, key1: string) {
    this.Additional_Business_Place_Details[i][key1] = event.target.value;
    this.frm
      .get("Additional_Business_Place")
      .setValue(this.Additional_Business_Place_Details);
  }
}
