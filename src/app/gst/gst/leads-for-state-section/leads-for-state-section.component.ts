import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
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
import { EmailPattern } from "src/app/shared/utility/constants";
import { CheckInputIsNumber } from "src/app/shared/utility/utility";
import { GstService } from "../../gst.service";
import { filter, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-leads-for-state-section",
  templateUrl: "./leads-for-state-section.component.html",
  styleUrls: ["./leads-for-state-section.component.scss"],
})
export class LeadsForStateSectionComponent implements OnInit, OnDestroy {
  @Input("ID") ID: string = "";
  @Input("tabID") tabID: string = "";
  @Input("selectedTabID") selectedTabID: string = "";
  @Output("sendData") sendData = new EventEmitter();
  @Input("selectedTab") selectedTab: number = 0;
  btnDisabled: boolean = false;
  @Output("tabChange") tabChange = new EventEmitter();
  frm: FormGroup;
  isSubmitted: boolean = false;
  StatesList: any[] = [];
  yesNoOption: any[] = ["Yes", "No"];
  LeadGeneratedForList: any[] = ["VPPOB", "PPOB", "APOB", "Others", "Comment"];

  LeadAssignedToList: any[] = [
    "Employee1",
    "Employee2",
    "Employee3",
    "Employee4",
  ];

  leadStatusList: any[] = [
    "Open",
    "Close",
    "In Progress",
    "Cancelled",
    "Not Interested",
  ];

  LeadStatusList: any[] = [
    "Agmt Created",
    "GST Applied",
    "GST Approved",
    "GST Certificate Uploaded",
    "Amount Refunded",
    "Not Interested",
  ];

  gstStatusList: any[] = [
    "Approved",
    "Active",
    "In Active",
    "Cancelled",
    "Suspended",
    "Rejected",
  ];
  EcomCoinList: any[] = ["AMZ", "FK"];

  filterForm: FormGroup;
  avlMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  avlYears: number[] = [];

  NameAsSiteList: any[] = [];
  NameAsSiteListCollection: any[] = [];
  CA_AddressList: any[] = [];
  siteInfo: any = null;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private service: GstService
  ) {
    this.StatesList = service.GetAllStates();
    this.NameAsSiteListCollection = service.getAllNameAsSiteListCollection();
    this.CA_AddressList = service.GetAllCA_Address();

    this.filterForm = new FormGroup({
      selectedMonths: new FormArray([]),
      selectedYear: new FormControl("-1"),
    });
  }

  ngOnInit() {
    this.frm = this.formBuilder.group({
      RenewalAmount: [""],
      EcomCoin: ["-1"],
      Lead_no: [""],
      Lead_date: [""],
      Lead_Generated_For: ["-1"],
      LeadGeneratedForState: ["-1"],
      NameAsSite: ["-1"],
      Seller_Business_Name: [""],
      Seller_Trade_Name: [""],
      Seller_Email_id: ["", [Validators.pattern(EmailPattern)]],
      Seller_Contact_Name: ["", []],
      Seller_Contact_Number: [""],
      GST_NO: [""],
      HOME_STATE_GST_NO: [""],
      GST_State: ["-1"],
      Lead_Assigned_to: ["-1"],
      Remark: [""],
      Call_1_Status: [""],
      Call_2_Status: [""],
      Call_3_Status: [""],
      Call_4_Status: [""],
      Others_Status: [""],
      Lead_Status: ["-1"],
      Doc_Received: ["-1"],
      LEAD_GEN_BY: [""],
      AGMT_REGD_Date: [""],
      GST_Filed: ["-1"],
      LeadStatus: ["-1"],
      GST_Query: [""],
      GTS_Status: ["-1"],
      GST_DATE: [""],
      Agent_Details: [""],
      AGMT_Start_Date: [""],
      AGMT_End_date: [""],
      Value_of_AGMT: [""],
      //Payment_info_Section: [''],
      Seller_Bank_Name: [""],
      SellerBankAccountNumber: [""],
      Amount_Transferred: [""],
      Transaction_ref_No: [""],
      Payment_received_Date: [""],
      Renewable_Applicable: ["-1"],
      Renewal_Date: [""],
      RenewedBy: [""],
      CA_Address: ["-1"],
      TypeOfBilling: [""],
      TypeOfBillingDate: [""],
      Seller_PAN_Number: [""],
      LeadsToBeBilled: [],
    });

    this.service.sendDataSubject
      .pipe(
        takeUntil(this.destroy$),
        filter((d) => d)
      )
      .subscribe((data) => {
        if (data.type === "sendData") {
          const obj = data.obj;
          this.btnDisabled = obj.isSubmit === true;
          if (obj[this.tabID]) {
            //  need to remove
            if (!obj[this.tabID].SellerBankAccountNumber) {
              obj[this.tabID].SellerBankAccountNumber = "";
            }
            if (!obj[this.tabID].Seller_PAN_Number) {
              obj[this.tabID].Seller_PAN_Number = "";
            }
            if (!("GST_DATE" in obj[this.tabID])) {
              obj[this.tabID]["GST_DATE"] = "";
            }
            this.frmSetValue(obj[this.tabID]);
          }
        } else if (data.type === "TabChanged") {
          const obj = data.obj;
          this.btnDisabled = obj.isSubmit === true;
          if (data.oldTabID === this.tabID || !data.oldTabID) {
            this.sendData.emit({ type: "updateData", data: this.frm.value });
          }
        } else if (data.type === "Saved" && this.tabID === this.selectedTabID) {
          const data = { ...this.frm.value };
          this.frm.reset();
          this.frmSetValue(data);
          this.manageSelectedLeadForBilling();
        }
      });

    // Create form controls for each month
    this.avlMonths.forEach(() => {
      (this.filterForm.get("selectedMonths") as FormArray).push(
        this.formBuilder.control(false)
      );
    });

    // Subscribe to form changes
    this.filterForm.valueChanges.subscribe(() => {
      this.filterData();
    });

    // Initial data load
    this.filterData();
  }

  frmSetValue(data: any) {
    if (!data["TypeOfBilling"]) data["TypeOfBilling"] = "";
    if (!data["TypeOfBillingDate"]) data["TypeOfBillingDate"] = "";

    if (!data.LeadsToBeBilled) data.LeadsToBeBilled = [];

    this.frm.setValue({ ...data });

    setTimeout(() => {
      this.onChangeLeadGeneratedBY();
      this.LeadGeneratedForStateChange();
      this.NameAsSiteChange();
      this.CA_AddressChange();
    }, 100);
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

  onChangeLeadGeneratedBY() {
    if (this.frm.get("Lead_Generated_For").value === "PPOB") {
      this.frm.get("GST_NO").setValue("");
    }
  }

  LeadGeneratedForStateChange() {
    this.NameAsSiteList = [];
    const selectdStates = this.frm.get("LeadGeneratedForState").value;
    this.NameAsSiteList = this.NameAsSiteListCollection.filter(
      (f) => f.States.toLowerCase() == selectdStates.toLowerCase()
    );
  }

  NameAsSiteChange() {
    const siteName = this.frm.get("NameAsSite").value;
    this.siteInfo = siteName
      ? this.service.GetSiteAddressBySiteID(siteName)
      : null;
  }

  selectedCA_Address: any = "-1";
  CA_AddressChange() {
    this.AnnexureCumulativeMonth();
    const CA_Address = this.frm.get("CA_Address").value;
    this.selectedCA_Address = CA_Address
      ? this.CA_AddressList.find((f) => f.CA_CODES == CA_Address)
      : null;
  }

  onTabChange(direction: string) {
    this.tabChange.emit(direction);
  }

  validateLeadNo() {
    const leadNo = this.frm.get("Lead_no").value;
    if (leadNo && leadNo.trim() !== "") {
      this.service.CheckLeadNoIsTaken(leadNo, this.ID).subscribe((res) => {
        if (res) {
          this.frm.get("Lead_no").setValue("");
          alert("Lead No already taken. Please use another Lead No!!!");
        }
      });
    }
  }

  cumulativeMonth: any[] = [];
  allCumulativeMonth: any[] = [];
  AnnexureCumulativeMonth() {
    this.cumulativeMonth = [];
    const billTo = this.frm.get("CA_Address").value;
    if (billTo && billTo.trim() !== "") {
      this.service.AnnexureCumulativeMonth(billTo).subscribe((res: any) => {
        if (res) {
          res = res.map((item) => {
            return {
              ...item,
              selected: false,
            };
          });
          this.allCumulativeMonth = res as any[];

          if (this.frm.get("TypeOfBilling").value == "CumulativeMonthly") {
            this.avlYears = [
              ...new Set(
                this.allCumulativeMonth.map((c) =>
                  new Date(c.Lead_date).getFullYear()
                )
              ),
            ].sort();
          } else {
            this.cumulativeMonth = this.cumulativeMonth.filter(
              (item) => item.Lead_no === this.frm.get("Lead_no").value
            );
            this.frm
              .get("LeadsToBeBilled")
              .setValue(this.cumulativeMonth.map((c) => c.Lead_no));
          }
          // const month = new Date(
          //   this.frm.get("TypeOfBillingDate").value
          // ).getMonth();
          // const year = new Date(
          //   this.frm.get("TypeOfBillingDate").value
          // ).getFullYear();
          // this.cumulativeMonth = this.cumulativeMonth.filter(
          //   (el) =>
          //     new Date(el.AGMT_Start_Date).getMonth() == month &&
          //     new Date(el.AGMT_Start_Date).getFullYear() == year
          // );
          // this.cumulativeMonth = this.cumulativeMonth.sort((a, b) => {
          //   return (
          //     new Date(a.AGMT_Start_Date).valueOf() -
          //       new Date(b.AGMT_Start_Date).valueOf() || a.Lead_no - b.Lead_no
          //   );
          // });
          // if (this.frm.get("TypeOfBilling").value == "CumulativeMonthly") {
          //   this.cumulativeMonth.forEach((item) => {
          //     this.updateSelected(item);
          //   });
          // }
          // this.filteredData = this.cumulativeMonth;
        }
      });
    }
  }

  manageSelectedLeadForBilling() {
    this.allCumulativeMonth
      .filter((item) => this.leadsSelectedForBilling.includes(item.lead_no))
      .forEach((item) => {
        this.updateSelected(item);
      });
  }

  get monthsFormArray() {
    return this.filterForm.get("selectedMonths") as FormArray;
  }

  getMonthNumber(monthName: string): number {
    return this.avlMonths.indexOf(monthName) + 1;
  }

  filteredData = [];
  filterData() {
    const selectedYear = this.filterForm.get("selectedYear")?.value;
    const selectedMonths = this.monthsFormArray.controls
      .map((control, index) => (control.value ? this.avlMonths[index] : null))
      .filter((month) => month !== null);

    if (selectedMonths.length === 0 || selectedYear == "-1") {
      this.filteredData = [];
      return;
    }

    this.filteredData = this.allCumulativeMonth.filter((item) => {
      const leadDate = new Date(item.Lead_date);

      if (selectedMonths.length > 0) {
        return selectedMonths.some((month) => {
          const monthNum = this.getMonthNumber(month!);
          const startMonth = leadDate.getMonth() + 1;
          const startYear = leadDate.getFullYear().toString();

          return selectedYear !== "-1"
            ? monthNum === startMonth && selectedYear === startYear
            : monthNum === startMonth;
        });
      } else {
        return selectedYear === leadDate.getFullYear().toString();
      }
    });
  }

  leadsSelectedForBilling: any[] = [];
  updateSelected(cate: any) {
    let leadsSelected = this.frm.get("LeadsToBeBilled").value;
    cate.selected = !cate.selected;
    if (cate.selected) {
      leadsSelected.push(cate.Lead_no);
    } else {
      leadsSelected = leadsSelected.filter((f) => f !== cate.Lead_no);
    }
    this.leadsSelectedForBilling = leadsSelected;
  }
}
