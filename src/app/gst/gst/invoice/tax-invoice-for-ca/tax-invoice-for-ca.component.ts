import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import jsPDF from "jspdf";
import { GstService } from "src/app/gst/gst.service";
import {
  CheckInputIsNumber,
  amountToWords,
} from "src/app/shared/utility/utility";

@Component({
  selector: "app-tax-invoice-for-ca",
  templateUrl: "./tax-invoice-for-ca.component.html",
  styleUrls: ["./tax-invoice-for-ca.component.scss"],
})
export class TaxInvoiceForCAComponent implements OnInit {
  @ViewChild("invoice_content", { static: false }) el!: ElementRef;

  @Input("isShow") isShow: boolean = true;
  @Input("bill_data") bill_data: any = {};
  @Input("bill_data_count") bill_data_count: number;
  @Input("total_bill") total_bill: number;
  @Input("total_bill_in_words") total_bill_in_words: string;
  @Input("total_bill_before_gst") total_bill_before_gst: number;
  @Input("total_quantity") total_quantity: number;
  @Output("ShowHideChange") ShowHideChange = new EventEmitter();
  frm: FormGroup;
  cgst: string = "0";
  cgst_amount: string = "0";
  sgst: string = "0";
  sgst_amount: string = "0";
  igst: string = "0";
  igst_amount: string = "0";
  gst_amount: string = "0";
  gst_amount_in_words: string = "INR";
  seller_details: any = {
    business_name: "",
    address1: "",
    address2: "",
    address3: "",
    address4: "",
    state: "",
    state_code: "",
    gst_no: "",
    pan_no: "",
    bank_name: "",
    account_no: "",
    bank_address: "",
    ifsc_code: "",
  };
  buyer_details: any = {
    business_name: "",
    address1: "",
    address2: "",
    address3: "",
    state: "",
    state_code: "",
    gst_no: "",
    pan_no: "",
    Discount: "",
  };
  invoice_number: string;
  invoice_date: string;
  delivery_note: string;
  mode_of_payment: string;
  suppliers_ref: string;
  other_ref: string;
  buyers_order_no: string;
  dated: string;
  dispatch_document_no: string;
  delivery_note_date: string;
  dispatch_through: string;
  destination: string;
  terms_of_delivery: string;
  affix_authorised_signatory: boolean = false;
  invoice_preview: boolean = false;
  lead_no: string;
  hsn_code: string;
  constructor(private formBuilder: FormBuilder, private service: GstService) {}
  data: any = {};
  discountDesc: string | null = null;
  ngOnChanges() {
    this.setData(this.data?.obj);
  }

  ngOnInit() {
    this.frm = this.formBuilder.group({});

    this.service.sendDataSubject.subscribe((data) => {
      this.data = data;
      const obj = data.obj;
      this.setData(obj);
    });
  }

  setData(obj: any) {
    if (obj) {
      if (obj.Invoice) {
        this.invoice_number = obj.Invoice.Invoice_Number;
        this.invoice_date = obj.Invoice.Invoice_Date;
        if (
          obj.Invoice?.Buyer_Details &&
          obj.Invoice.Buyer_Details.Affix_Authorised_Signatory == "Yes"
        ) {
          this.affix_authorised_signatory = true;
        } else {
          this.affix_authorised_signatory = false;
        }
      }

      if (obj["Organisation Info"]) {
        this.hsn_code =
          obj["Organisation Info"].Product_HSN_number_Items.join(", ");
      }

      if (obj.LeadsForStateSection) {
        this.lead_no = obj.LeadsForStateSection.Lead_no;

        const isBillToSelected =
          obj.LeadsForStateSection.NameAsSite.trim() != "" &&
          obj.LeadsForStateSection.NameAsSite.trim() != "-1"
            ? true
            : false;
        const isSellerDetailsSelected =
          obj.LeadsForStateSection.CA_Address.trim() != "" &&
          obj.LeadsForStateSection.CA_Address.trim() != "-1"
            ? true
            : false;

        if (isBillToSelected) {
          const billToDetail = this.service.GetBillToAddressByCA_CODES(
            obj.LeadsForStateSection.CA_Address
          );

          if (
            billToDetail &&
            obj.LeadsForStateSection.CA_Address !== "OTHERS"
          ) {
            this.buyer_details = {
              business_name: billToDetail.CA_NAME,
              address1: billToDetail.ADDRESS1,
              address2: billToDetail.ADDRESS2,
              address3: billToDetail.ADDRESS3,
              state: billToDetail.STATE,
              state_code: billToDetail.STATE_CODE,
              gst_no: billToDetail.GSTN,
              pan_no: billToDetail.PAN_NO,
            };
          } else {
            if (obj.Invoice?.Buyer_Details) {
              let billToDetail = obj.Invoice.Buyer_Details;
              this.buyer_details = {
                business_name: billToDetail.Business_Name,
                address1: billToDetail.Address1,
                address2: billToDetail.Address2,
                address3: billToDetail.Address3,
                state: billToDetail.State,
                state_code: billToDetail.State_Code,
                gst_no: billToDetail.GST_No,
                pan_no: billToDetail.PAN_No,
                Discount: billToDetail.Discount,
              };
            }
          }
        } else {
          if (obj.Invoice?.Buyer_Details) {
            let billToDetail = obj.Invoice.Buyer_Details;
            this.buyer_details = {
              business_name: billToDetail.Business_Name,
              address1: billToDetail.Address1,
              address2: billToDetail.Address2,
              address3: billToDetail.Address3,
              state: billToDetail.State,
              state_code: billToDetail.State_Code,
              gst_no: billToDetail.GST_No,
              pan_no: billToDetail.PAN_No,
              Discount: billToDetail.Discount,
            };
          }
        }

        if (isSellerDetailsSelected) {
          let NameAsSite = obj.LeadsForStateSection.NameAsSite;
          if (obj.LeadsForStateSection.NameAsSite == "KA2") {
            NameAsSite = "KA1";
          } else if (obj.LeadsForStateSection.NameAsSite == "MH2") {
            NameAsSite = "MH1";
          }
          const SellerDetail = this.service.GetSiteAddressBySiteID(NameAsSite);

          if (SellerDetail) {
            let address1: string;
            if (SellerDetail.DoorNoPremisesNo) {
              address1 = SellerDetail.DoorNoPremisesNo;
            }
            if (SellerDetail.FloorNo) {
              address1 = address1
                ? address1 + ", " + SellerDetail.FloorNo
                : SellerDetail.FloorNo;
            }

            let address2: string;
            if (SellerDetail.BuildingPremiseName) {
              address2 = SellerDetail.BuildingPremiseName;
            }
            if (SellerDetail.AreaStreetRoadName) {
              address2 = address2
                ? address2 + ", " + SellerDetail.AreaStreetRoadName
                : SellerDetail.AreaStreetRoadName;
            }
            this.seller_details = {
              business_name: SellerDetail.BUSINESS_NAME,
              address1: address1,
              address2: address2,
              address3: SellerDetail.SubLocalityLocality,
              address4:
                SellerDetail.City +
                ", " +
                SellerDetail.States +
                " - " +
                SellerDetail.Pincode,
              state: SellerDetail.States,
              state_code: SellerDetail.STATE_CODE,
              gst_no: SellerDetail.GSTN,
              pan_no: SellerDetail.PAN_NO,
              bank_name: SellerDetail.BANK_NAME,
              account_no: SellerDetail.ACCOUNT_NUMBER,
              bank_address: SellerDetail.BANK_ADDRESS,
              ifsc_code: SellerDetail.IFSC_CODE,
            };
          }
        } else {
          if (obj.Invoice?.Seller_Details) {
            let sellerAdd = obj.Invoice.Seller_Details;
            let BankDetails = obj.BankDetails;
            this.seller_details = {
              business_name: sellerAdd.Business_Name,
              address1: sellerAdd.Address1,
              address2: sellerAdd.Address2,
              address3: sellerAdd.Address3,
              address4: sellerAdd.State,
              state: sellerAdd.State,
              state_code: sellerAdd.State_Code || "",
              gst_no: sellerAdd.GST_No || "",
              pan_no: sellerAdd.PAN_No,
              bank_name: BankDetails.Bank_Name || "",
              account_no: BankDetails.Account_Number || "",
              bank_address: BankDetails.BANK_ADDRESS || "",
              ifsc_code: BankDetails.IFSC || "",
            };
          }
        }
      }
    }
  }

  downloadInvoice() {
    let pdf = new jsPDF("p", "pt", "a4");
    pdf.html(this.el.nativeElement, {
      margin: [40, 23, 40, 23],
      callback: (pdf) => {
        pdf.save(`${this.lead_no}_invoice.pdf`);
      },
    });
    // this.service.DownloadInvoiceForOther(this.lead_no)
  }

  updatePreview() {
    this.invoice_preview = !this.invoice_preview;
  }

  isNumber(evt: any) {
    return CheckInputIsNumber(evt);
  }

  updateGST(value: string, key: string) {
    if (!Number.isNaN(parseInt(value)) || value == "") {
      let amount = "0";
      let gst = "0";
      if (parseFloat(value)) {
        amount = (
          (parseFloat(value) * this.total_bill_before_gst) /
          100
        ).toString();
        gst = parseFloat(value).toString();
      }

      if (key === "cgst") {
        (this.cgst_amount = amount), (this.cgst = gst);
      } else if (key === "sgst") {
        (this.sgst_amount = amount), (this.sgst = gst);
      } else if (key === "igst") {
        (this.igst_amount = amount), (this.igst = gst);
      }

      this.gst_amount = (
        parseFloat(this.cgst_amount) +
        parseFloat(this.sgst_amount) +
        parseFloat(this.igst_amount)
      ).toString();
      this.gst_amount_in_words = amountToWords(this.gst_amount);
      this.total_bill =
        this.total_bill_before_gst + parseFloat(this.gst_amount);
      this.total_bill_in_words = amountToWords(this.total_bill.toString());
    }
  }

  updateDisDesction(value: string) {
    this.discountDesc = value;
  }

  updateBillData(value: string, key: string, field: string) {
    this.bill_data[key.toString()][field] = value;
  }

  closeModel() {
    this.ShowHideChange.emit(!this.isShow);
  }
}
