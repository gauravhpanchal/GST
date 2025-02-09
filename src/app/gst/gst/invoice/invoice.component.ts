import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ChangeDetectorRef,
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, Subscription } from "rxjs";
import { GstService } from "../../gst.service";
import {
  CheckInputIsNumber,
  amountToWords,
} from "src/app/shared/utility/utility";
import { takeUntil } from "rxjs/operators";

interface LineItemForLead {
  Lead_no: string;
  Group: number;
  Description: string;
  Discount: number | null;
  Discount_Amount: number | null;
}

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.scss"],
})
export class InvoiceComponent implements OnInit, OnDestroy {
  @Input("ID") ID: string = "";
  @Input("tabID") tabID: string = "";
  @Input("selectedTabID") selectedTabID: string = "";
  @Output("sendData") sendData = new EventEmitter();
  @Input("selectedTab") selectedTab: number = 0;
  btnDisabled: boolean = false;
  @Output("tabChange") tabChange = new EventEmitter();
  frm: FormGroup;
  isSubmitted: boolean = false;
  cumulativeMonth: any = {};
  cumulativeMonthCount: number = 0;
  LeadGeneratedByList: any[] = ["PPOB", "APOB", "Others", "Comment"];
  total_bill: number = 0;
  total_bill_in_words: string = "INR";
  total_quantity: number = 0;
  LeadAssignedToList: any[] = [
    "Employee1",
    "Employee2",
    "Employee3",
    "Employee4",
  ];
  yesNoOption: any[] = ["Yes", "No"];
  isInvoiceForCA = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private service: GstService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.frm = this.formBuilder.group({
      Invoice: [""],
      Invoice_Number: [""],
      Invoice_Date: [""],
      Buyer_Ref_Number: [""],
      Annextures: new FormGroup({}),
      Seller_Details: this.formBuilder.group({
        Business_Name: [""],
        Address1: [""],
        Address2: [""],
        Address3: [""],
        State: [""],
        State_Code: [""],
        GST_No: [""],
        PAN_No: [""],
      }),
      Buyer_Details: this.formBuilder.group({
        Business_Name: ["", [Validators.required]],
        Address1: [""],
        Address2: [""],
        Address3: [""],
        State: [""],
        State_Code: [""],
        GST_No: [""],
        PAN_No: [""],
        Item_Number: [""],
        Description: [""],
        HSN: [""],
        Qty: [""],
        Rate: [""],
        Discount: [""],
        Subtotal: [""],
        Amount: [""],
        GST: [""],
        Final_Amount: [""],
        In_Words: [""],
        In_Number: [""],
        GST_Amount: [""],
        Terms_Of_Payment: [""],
        Seller_Description: [""],
        Affix_Authorised_Signatory: ["-1"],
      }),
    });

    this.service.sendDataSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (
          ["CA-1", "CA-2", "CA-3", "CA-4", "CA-5", "CA-6"].includes(
            data.obj?.LeadsForStateSection?.CA_Address
          )
        ) {
          this.isInvoiceForCA = true;
        } else {
          this.isInvoiceForCA = false;
        }

        if (data.type === "sendData") {
          const obj = data.obj;
          this.btnDisabled = obj.isSubmit === true;
          if (obj[this.tabID]) this.frm.setValue(obj[this.tabID]);
        } else if (data.type === "TabChanged") {
          const obj = data.obj;
          this.btnDisabled = obj.isSubmit === true;
          if (
            obj.LeadsForStateSection &&
            obj.LeadsForStateSection.CA_Address &&
            obj.LeadsForStateSection.CA_Address.trim() !== ""
          ) {
            this.service
              .AnnexureCumulativeMonth(obj.LeadsForStateSection.CA_Address)
              // .pipe(takeUntil(this.destroy$))
              .subscribe((res) => {
                if (res) {
                  this.cumulativeMonth = res as any[];
                  if (
                    obj.LeadsForStateSection.TypeOfBilling !==
                    "CumulativeMonthly"
                  ) {
                    this.cumulativeMonth = this.cumulativeMonth.filter(
                      (item) =>
                        item.Lead_no === obj.LeadsForStateSection.Lead_no
                    );
                  } else {
                    if (obj.LeadsForStateSection.LeadsToBeBilled) {
                      this.cumulativeMonth = this.cumulativeMonth.filter(
                        (item) =>
                          obj.LeadsForStateSection.LeadsToBeBilled.includes(
                            item.Lead_no
                          )
                      );
                    } else {
                      const month = new Date(
                        obj.LeadsForStateSection.TypeOfBillingDate
                      ).getMonth();
                      const year = new Date(
                        obj.LeadsForStateSection.TypeOfBillingDate
                      ).getFullYear();
                      this.cumulativeMonth = this.cumulativeMonth.filter(
                        (el) =>
                          new Date(el.AGMT_Start_Date).getMonth() == month &&
                          new Date(el.AGMT_Start_Date).getFullYear() == year
                      );
                    }
                  }
                  this.cumulativeMonth = this.cumulativeMonth.reduce(function (
                    r,
                    a
                  ) {
                    r[a.Value_of_AGMT] = r[a.Value_of_AGMT] || {
                      data: [],
                      records_count: 0,
                    };
                    r[a.Value_of_AGMT].data.push(a);
                    r[a.Value_of_AGMT].lead_no = r[a.Value_of_AGMT].data
                      .map((el) => el.Lead_no)
                      .join(", ");
                    r[a.Value_of_AGMT].records_count =
                      r[a.Value_of_AGMT].data.length;
                    if (obj && obj.Invoice && obj.Invoice.Buyer_Details) {
                      r[a.Value_of_AGMT].discount =
                        obj.Invoice.Buyer_Details.Discount;
                    }
                    if (obj?.Invoice?.Buyer_Details) {
                      const discount = obj.Invoice.Buyer_Details.Discount;
                      const valueOfAGMT = Number.isNaN(
                        parseInt(a.Value_of_AGMT)
                      )
                        ? 0
                        : parseInt(a.Value_of_AGMT);
                      const length = r[a.Value_of_AGMT]?.data?.length || 0;

                      r[a.Value_of_AGMT].discount_amount =
                        (valueOfAGMT * length * discount) / 100;
                      r[a.Value_of_AGMT].discount_total =
                        (valueOfAGMT * length * discount) / 100;
                      r[a.Value_of_AGMT].total_amount = valueOfAGMT * length;
                    }
                    r[a.Value_of_AGMT].hsn_code = "";
                    r[a.Value_of_AGMT].description = "";

                    return r;
                  },
                  Object.create(null));
                  let cumulativeKeys = Object.keys(this.cumulativeMonth);
                  this.cumulativeMonthCount = cumulativeKeys.length;
                  cumulativeKeys.forEach((el) => {
                    (this.frm.get("Annextures") as FormGroup).addControl(
                      this.cumulativeMonth[el].lead_no,
                      this.formBuilder.array([])
                    );
                  });
                  this.setTotalAmount();
                }
              });
          }
          const isBillToSelected =
            obj &&
            obj.LeadsForStateSection &&
            obj.LeadsForStateSection.NameAsSite.trim() != "" &&
            obj.LeadsForStateSection.NameAsSite.trim() != "-1"
              ? true
              : false;
          const isSellerDetailsSelected =
            obj &&
            obj.LeadsForStateSection &&
            obj.LeadsForStateSection.CA_Address.trim() != "" &&
            obj.LeadsForStateSection.CA_Address.trim() != "-1"
              ? true
              : false;

          let billToDetail;
          if (
            isBillToSelected &&
            obj.LeadsForStateSection.CA_Address !== "OTHERS"
          ) {
            billToDetail = this.service.GetBillToAddressByCA_CODES(
              obj.LeadsForStateSection.CA_Address
            );
          } else {
            billToDetail = obj.Invoice.Buyer_Details;
          }

          if (
            billToDetail &&
            obj.LeadsForStateSection.CA_Address !== "OTHERS"
          ) {
            this.PERPOPULATED_Fields(
              "Buyer_Details",
              "Business_Name",
              billToDetail.CA_NAME || billToDetail.Business_Name
            );
            this.PERPOPULATED_Fields(
              "Buyer_Details",
              "Address1",
              billToDetail.ADDRESS1 || billToDetail.Address1
            );
            this.PERPOPULATED_Fields(
              "Buyer_Details",
              "Address2",
              billToDetail.ADDRESS2 || billToDetail.Address2
            );
            this.PERPOPULATED_Fields(
              "Buyer_Details",
              "Address3",
              billToDetail.ADDRESS3 || billToDetail.Address3
            );
            this.PERPOPULATED_Fields(
              "Buyer_Details",
              "State",
              billToDetail.STATE || billToDetail.State
            );
            this.PERPOPULATED_Fields(
              "Buyer_Details",
              "State_Code",
              billToDetail.STATE_CODE || billToDetail.State_Code
            );
            this.PERPOPULATED_Fields(
              "Buyer_Details",
              "GST_No",
              billToDetail.GSTN || billToDetail.GST_No
            );
            this.PERPOPULATED_Fields(
              "Buyer_Details",
              "PAN_No",
              billToDetail.PAN_NO || billToDetail.PAN_No
            );
            if (obj && obj.Invoice && obj.Invoice?.Buyer_Details) {
              this.PERPOPULATED_Fields(
                "Buyer_Details",
                "Discount",
                obj.Invoice.Buyer_Details.Discount
              );
            }
          } else {
            this.PERPOPULATED_Fields(
              "Buyer_Details",
              "Business_Name",
              billToDetail.Business_Name
            );
            this.PERPOPULATED_Fields(
              "Buyer_Details",
              "Address1",
              billToDetail.Address1
            );
            this.PERPOPULATED_Fields(
              "Buyer_Details",
              "Address2",
              billToDetail.Address2
            );
            this.PERPOPULATED_Fields(
              "Buyer_Details",
              "Address3",
              billToDetail.Address3
            );
            this.PERPOPULATED_Fields(
              "Buyer_Details",
              "State",
              billToDetail.State
            );
            this.PERPOPULATED_Fields(
              "Buyer_Details",
              "State_Code",
              billToDetail.State_Code
            );
            this.PERPOPULATED_Fields(
              "Buyer_Details",
              "GST_No",
              billToDetail.GST_No
            );
            this.PERPOPULATED_Fields(
              "Buyer_Details",
              "PAN_No",
              billToDetail.PAN_No
            );
            if (obj && obj.Invoice && obj.Invoice?.Buyer_Details) {
              this.PERPOPULATED_Fields(
                "Buyer_Details",
                "Discount",
                obj.Invoice.Buyer_Details.Discount
              );
            } else {
              this.PERPOPULATED_Fields("Buyer_Details", "Discount", "");
            }
          }

          if (isSellerDetailsSelected) {
            let NameAsSite = obj.LeadsForStateSection.NameAsSite;

            if (obj.LeadsForStateSection.NameAsSite == "KA2") {
              NameAsSite = "KA1";
            }
            if (obj.LeadsForStateSection.NameAsSite == "MH2") {
              NameAsSite = "MH1";
            }
            const SellerDetail =
              this.service.GetSiteAddressBySiteID(NameAsSite);
            if (SellerDetail) {
              let address2 = SellerDetail.FloorNo;
              address2 += SellerDetail.BuildingPremiseName
                ? ", " + SellerDetail.BuildingPremiseName
                : "";

              let address3 = SellerDetail.AreaStreetRoadName;
              address3 += SellerDetail.SubLocalityLocality
                ? ", " + SellerDetail.SubLocalityLocality
                : "";

              this.PERPOPULATED_Fields(
                "Seller_Details",
                "Business_Name",
                SellerDetail.BUSINESS_NAME
              );
              this.PERPOPULATED_Fields(
                "Seller_Details",
                "GST_No",
                SellerDetail.GSTN
              );
              this.PERPOPULATED_Fields(
                "Seller_Details",
                "Address1",
                SellerDetail.DoorNoPremisesNo
              );
              this.PERPOPULATED_Fields("Seller_Details", "Address2", address2);
              this.PERPOPULATED_Fields("Seller_Details", "Address3", address3);
              this.PERPOPULATED_Fields(
                "Seller_Details",
                "State",
                SellerDetail.States
              );
              this.PERPOPULATED_Fields(
                "Seller_Details",
                "State_Code",
                SellerDetail.STATE_CODE
              );
              this.PERPOPULATED_Fields(
                "Seller_Details",
                "PAN_No",
                SellerDetail.PAN_NO
              );
            }
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

  destroy$: Subject<boolean> = new Subject<boolean>();
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  isNumber(evt: any) {
    return CheckInputIsNumber(evt);
  }

  updateDiscount(key: string, value: string) {
    this.frm.get("Buyer_Details").get("Discount").setValue(value);
    if (!this.cumulativeMonth[key]) {
      this.cumulativeMonth[key] = { data: [], records_count: 0, lead_no: "" };
    }
    this.cumulativeMonth[key]["discount"] = value;
    if (!Number.isNaN(parseInt(key))) {
      let amount =
        Math.abs(parseInt(value)) > 100 ? 100 : Math.abs(parseInt(value));
      let discount_amount = (parseInt(key) * amount) / 100;
      let total_amount = parseInt(key) * this.cumulativeMonth[key].data.length;
      this.cumulativeMonth[key]["discount_amount"] = discount_amount;
      this.cumulativeMonth[key]["discount_total"] =
        discount_amount * this.cumulativeMonth[key].data.length;
      this.cumulativeMonth[key]["total_amount"] = total_amount;
    } else {
      this.cumulativeMonth[key]["discount_amount"] = 0;
      this.cumulativeMonth[key]["discount_total"] = 0;
      this.cumulativeMonth[key]["total_amount"] = 0;
    }

    // Update the total amount
    this.cdr.detectChanges();
    this.setTotalAmount();
  }

  updateDiscountForLineItem(cumulativeMonth, index, value: string) {
    let lineItemForm = this.getFormArray(cumulativeMonth.value.lead_no)
      .controls[index];
    let group = lineItemForm.value.group;
    if (!Number.isNaN(parseInt(group))) {
      let amount =
        Math.abs(parseInt(value)) > 100 ? 100 : Math.abs(parseInt(value));
      let discount_amount = (parseInt(group) * amount) / 100;
      lineItemForm.get("discount_amount").setValue(discount_amount);
    } else {
      lineItemForm.get("discount").setValue(0);
    }
  }

  setTotalAmount() {
    let total_amount = 0;
    let total_quantity = 0;
    Object.keys(this.cumulativeMonth).forEach((el) => {
      total_amount +=
        this.cumulativeMonth[el].total_amount -
        this.cumulativeMonth[el].discount_total;
      total_quantity += this.cumulativeMonth[el].data.length;
    });
    this.total_bill = total_amount;
    this.total_bill_in_words = amountToWords(total_amount.toString());
    this.total_quantity = total_quantity;
  }

  hasProp(o: any) {
    return Object.keys(o).length > 0 ? true : false;
  }

  PERPOPULATED_Fields(group: string, field: string, newValue: string) {
    const val = this.frm.controls[group].get(field).value;
    // if (!val || (val === null && val.trim() === "")) {
    // if (newValue) {
    this.frm.controls[group].get(field).setValue(newValue);
    // }
    // }
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

  ShowModelTaxInvoiceForCA: boolean = false;
  ShowModelTaxInvoiceForOther: boolean = false;

  ShowHideChangeCAFn(input: boolean) {
    this.ShowModelTaxInvoiceForCA = input;
  }

  ShowHideChangerOtherFn(input: boolean) {
    this.ShowModelTaxInvoiceForOther = input;
  }

  onTabChange(direction: string) {
    this.tabChange.emit(direction);
  }

  lineItemsForm = new FormGroup({});
  getFormArray(key: string): FormArray {
    return this.frm.get("Annextures").get(key) as FormArray;
  }

  addLineItemForLead(annexture: any) {
    const formArray = this.getFormArray(annexture.value.lead_no);
    const newFormGroup = this.formBuilder.group({
      group: new FormControl(""),
      description: new FormControl(""),
      discount: new FormControl(""),
      discount_amount: new FormControl(""),
    });
    formArray.push(newFormGroup);
    if (!annexture.lineItems) annexture.lineItems = [];
    annexture.lineItems.push(newFormGroup.value);
  }

  removeLineItemForLead(cumulativeMonth: any, index: number) {
    const formArray = this.getFormArray(cumulativeMonth.lead_no);
    formArray.removeAt(index);
  }
}
