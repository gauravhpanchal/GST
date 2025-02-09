import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, Subscription } from "rxjs";
import { EmailPattern } from "src/app/shared/utility/constants";
import { CheckInputIsNumber } from "src/app/shared/utility/utility";
import { GstService } from "../../gst.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { v4 as uuidv4 } from "uuid";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-organisation-info",
  templateUrl: "./organisation-info.component.html",
  styleUrls: ["./organisation-info.component.scss"],
})
export class OrganisationInfoComponent implements OnInit, OnDestroy {
  @Input("ID") ID: string = "";
  @Input("tabID") tabID: string = "";
  @Input("selectedTabID") selectedTabID: string = "";
  @Output("sendData") sendData = new EventEmitter();
  @Input("selectedTab") selectedTab: number = 0;
  btnDisabled: boolean = false;
  @Output("tabChange") tabChange = new EventEmitter();
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

  frm: FormGroup;
  isSubmitted: boolean = false;

  BusinessConstitutionList: any[] = [
    // "PROP",
    // "FIRM",
    // "LLP",
    // "RRTNRSHAP",
    // "PVT LTD",
    // "LTD",
    // "TRUST",
    // "HUF",
    // "OTHER"
    "Proprietorship",
    "Partnership",
    "Hindu Undivided Family",
    "Private Limited Company",
    "Public Limited Company",
    "Society / Club / Trust / Association of Persons",
    "Government Department",
    "Public Sector Undertaking",
    "Unlimited Company",
    "Limited Liability Partnership",
    "Local Authority",
    "Statutory Body",
    "Foreign Limited Liability Partnership",
    "Foreign Company Registered(in India)",
    "Others",
  ];

  AttachmentsList: any[] = [
    "COI",
    "PAN",
    "GST",
    "Deeds",
    "IEC",
    "AGMT",
    "Add MOA",
    "ADD AOA",
  ];

  StatesList: any[] = [];

  DocumentNameList: any[] = [
    "Cp Pan",
    "COI",
    "Board Resolution",
    "Authorised Signatory",
    "Home State GST Certificate ",
    "Partnerhip Deed",
    "AOA",
    "MOA",
  ];

  GST_Details: any[] = [];
  ProductHSNTagNumbers: any[] = [];
  ServiceHSNTagNumbers: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private modalService: BsModalService,
    private service: GstService
  ) {
    this.StatesList = service.GetAllStates();
  }

  ngOnInit() {
    this.frm = this.formBuilder.group({
      Business_Trade_Name: [""],
      Business_Legal_Name: [""],
      Business_Constitution: ["-1"],
      Business_Pan_Number: [""],
      Certificate_Of_Incorporation: [""],
      Email: ["", [Validators.pattern(EmailPattern)]],
      Contact_person: [""],
      Contact_Number: [""],
      Product_HSN_number: [""],
      Product_HSN_number_Items: [[]],
      Service_HSN_number: [""],
      Service_HSN_number_Items: [[]],
      PT_Details: [""],
      PTREC_Details: [""],
      Attachments: [null],
      Online_Seller: ["-1"],
      GST_Details: [],
      COI_DATE: [],
      Composite_Seller: [""],
    });

    this.service.sendDataSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data.type === "sendData") {
          const obj = data.obj;
          this.btnDisabled = obj.isSubmit === true;
          if (obj[this.tabID]) {
            const data = obj[this.tabID];
            // need to remove
            if (!data.Service_HSN_number) {
              data.Service_HSN_number = "";
            }
            if (!data.Service_HSN_number_Items) {
              data.Service_HSN_number_Items = [];
            }

            if (!data.Composite_Seller) {
              data.Composite_Seller = "";
            }
            // need to remove End

            this.frm.setValue(data);
            setTimeout(() => {
              this.setData(obj);
            }, 100);
          }
          if (obj[this.tabID] && obj[this.tabID].Attachments) {
            this.AttachmentsFileDetails = obj[this.tabID].Attachments;
          }

          if (obj[this.tabID] && obj[this.tabID].Product_HSN_number_Items) {
            this.ProductHSNTagNumbers =
              obj[this.tabID].Product_HSN_number_Items;
          }

          if (obj[this.tabID] && obj[this.tabID].Service_HSN_number_Items) {
            this.ServiceHSNTagNumbers =
              obj[this.tabID].Service_HSN_number_Items;
          }

          if (obj[this.tabID] && obj[this.tabID].GST_Details) {
            this.GST_Details = obj[this.tabID].GST_Details;
          }
        } else if (data.type === "TabChanged") {
          const obj = data.obj;
          this.btnDisabled = obj.isSubmit === true;
          this.setData(obj);

          if (
            obj.LeadsForStateSection &&
            (obj.LeadsForStateSection.HOME_STATE_GST_NO ||
              obj.LeadsForStateSection.GST_State)
          ) {
            const homeStateGstData = {
              GST_Date: obj.LeadsForStateSection.GST_DATE,
              GST_Number: obj.LeadsForStateSection.HOME_STATE_GST_NO,
              GST_State: obj.LeadsForStateSection.GST_State,
              GST_Status:
                obj.LeadsForStateSection.GTS_Status != "-1"
                  ? obj.LeadsForStateSection.GTS_Status
                  : "",
            };

            const gstData = this.frm.get("GST_Details").value;
            const otherStateGstData = gstData
              ? gstData.filter(
                  (el) =>
                    el.GST_State != obj.LeadsForStateSection.GST_State &&
                    el.GST_Number != obj.LeadsForStateSection.HOME_STATE_GST_NO
                )
              : [];

            this.frm
              .get("GST_Details")
              .setValue([homeStateGstData, ...otherStateGstData]);
            this.GST_Details = [homeStateGstData, ...otherStateGstData];
          }

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

  setData(data: any) {
    if (data && data.LeadsForStateSection) {
      const leadsForState = data.LeadsForStateSection;
      this.frm.patchValue({
        Business_Trade_Name: leadsForState.Seller_Trade_Name,
        Business_Legal_Name: leadsForState.Seller_Business_Name,
        Email: leadsForState.Seller_Email_id,
        Contact_person: leadsForState.Seller_Contact_Name,
        Contact_Number: leadsForState.Seller_Contact_Number,
        Business_Pan_Number: leadsForState.Seller_PAN_Number,
      });
    }
  }

  destroy$: Subject<boolean> = new Subject<boolean>();
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.frm.invalid) return false;

    this.sendData.emit({ type: "save", data: this.frm.value });
    // this.frm.reset()
  }

  isNumber(evt: any) {
    return CheckInputIsNumber(evt);
  }

  fileToUpload: File | null = null;

  fileNames = [];

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    const uFrm = new FormData();
    this.fileNames = [];
    const fileName = this.fileToUpload.name.split(".");
    let fName = fileName[0]
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    const selectedFile =
      fName + "-" + Date.now().toString() + "." + fileName[fileName.length - 1];
    this.fileNames.push({
      name: selectedFile,
      extension: this.fileToUpload.name.split(".").pop(),
    });
    uFrm.append("forumPhoto", this.fileToUpload, selectedFile);

    this.service.uploadImg(uFrm).subscribe((val) => {
      this.fileNames = [];
    });
  }

  setAttachmentsFileDetails(data: any) {
    this.AttachmentsFileDetails.push(data);
    this.frm.get("Attachments").setValue([...this.AttachmentsFileDetails]);
    this.onSubmit();
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

  onProductHSNTagNumbersClick() {
    const data = this.frm.get("Product_HSN_number").value;
    if (data && data.trim() != "") {
      this.ProductHSNTagNumbers.push(data);
      this.frm.get("Product_HSN_number").setValue("");
      this.frm
        .get("Product_HSN_number_Items")
        .setValue(this.ProductHSNTagNumbers);
    }
  }

  onServiceHSNTagNumbersClick() {
    const data = this.frm.get("Service_HSN_number").value;
    if (data && data.trim() != "") {
      this.ServiceHSNTagNumbers.push(data);
      this.frm.get("Service_HSN_number").setValue("");
      this.frm
        .get("Service_HSN_number_Items")
        .setValue(this.ServiceHSNTagNumbers);
    }
  }

  RemoveProductHSNTag(i: number) {
    this.ProductHSNTagNumbers.splice(i, 1);
    this.frm
      .get("Product_HSN_number_Items")
      .setValue(this.ProductHSNTagNumbers);
  }

  RemoveServiceHSNTag(i: number) {
    this.ServiceHSNTagNumbers.splice(i, 1);
    this.frm.get("Service_HSN_number").setValue(this.ServiceHSNTagNumbers);
  }

  onTabChange(direction: string) {
    this.tabChange.emit(direction);
  }

  sendRemoveFileDetailsFn(file: any) {
    this.AttachmentsFileDetails = this.AttachmentsFileDetails.filter(
      (f) => f.fileName !== file.fileName
    );
    this.frm.get("Attachments").setValue([...this.AttachmentsFileDetails]);
    this.onSubmit();
  }
}
