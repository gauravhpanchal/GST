import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TabsetComponent, TabDirective } from "ngx-bootstrap/tabs";
import { GstService } from "../gst.service";

@Component({
  selector: "app-gst",
  templateUrl: "./gst.component.html",
  styleUrls: ["./gst.component.scss"],
})
export class GSTComponent implements OnInit {
  @ViewChild("tabset", {
    static: true,
  })
  tabset: TabsetComponent;
  ID: string = "";
  selectedTabID: string = "";
  GST_Data: any = {};
  tabs: any[] = [
    { name: "Leads For State Section", id: "LeadsForStateSection" },
    { name: "Organisation Info", id: "Organisation Info" },
    { name: "Individual Info", id: "Individual", tab: "Individual" },
    { name: "Bank Details", id: "BankDetails" },
    { name: "PPOB", id: "PPOB" },
    { name: "APOB", id: "APOB" },
    { name: "Compliance  Check", id: "ComplainceCheck" },
    { name: "Create GST App", id: "CreateGSTApp" },
    { name: "Invoice", id: "Invoice" },
  ];

  gstDetails: any = null;
  NewIndividualList: any[] = [];

  showInvoice: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: GstService,
    private route: Router
  ) {
    this.selectedTabID = this.tabs[0].id;
    activatedRoute.params.subscribe((res) => {
      if (res.id) {
        this.ID = res.id;
        this.LoadGST_Details();
      }
    });
  }

  ngOnInit() {
    const isAdmin = localStorage.getItem("isAdmin");
    this.showInvoice = isAdmin === "true";
  }

  LoadGST_Details() {
    this.service.Get_GST_Details(this.ID).subscribe((res: any) => {
      // this.frm.reset();
      if (res) {
        this.GST_Data = res;
        this.service.sendData({ type: "sendData", obj: res });
      }
    });
  }

  onTabChange(id: string) {
    this.service.sendData({
      type: "TabChanged",
      oldTabID: this.selectedTabID,
      obj: { ...this.GST_Data },
    });
    this.selectedTabID = id;
    this.selectedTab = this.tabs.findIndex((f) => f.id === id);
    this.service.sendData({
      type: "TabChanged",
      newTabID: this.selectedTabID,
      obj: { ...this.GST_Data },
    });
  }

  setTabData(obj: any) {
    this.GST_Data[`${this.selectedTabID}`] = obj.data;
    if (obj.type === "save") {
      this.service
        .saveGST_Details(this.GST_Data, this.ID)
        .subscribe((res: any) => {
          // this.frm.reset();
          if (!this.ID) {
            this.route.navigate(["Leads", "update", res.ID]);
          } else if (res.ID) {
            this.ID = res.ID;
            this.service.sendData({ type: "Saved", obj: this.GST_Data });
          }
        });
    } else if (obj.type === "submit") {
      this.GST_Data["isSubmit"] = true;
      this.service
        .saveGST_Details(this.GST_Data, this.ID)
        .subscribe((res: any) => {
          // this.frm.reset();
          if (!this.ID) {
            this.route.navigate(["Leads", "update", res.ID]);
          } else if (res.ID) {
            this.ID = res.ID;
            this.service.sendData({ type: "Saved", obj: this.GST_Data });
          }
        });
    }
  }

  addNewIndividual(item: any) {
    const count = this.tabs.filter((f) => f.tab == "Individual").length;
    const newTab = {
      name: `Individual Info (${count})`,
      id: `Individual${count}`,
      tab: "Individual",
    };
    this.tabs.push(newTab);
    this.NewIndividualList.push(newTab);
  }

  selectedTab: number = 0;
  tabChange(direction: string) {
    const tabCount: number = this.tabs.length;
    if (direction === "next") {
      this.selectedTab = (this.selectedTab + 1) % tabCount;
      this.tabset.tabs[this.selectedTab].active = true;
    } else {
      this.selectedTab = (this.selectedTab - 1) % tabCount;
      this.tabset.tabs[this.selectedTab].active = true;
    }
  }
}
