import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { GstService } from "../../gst.service";

@Component({
  selector: "app-gst-list",
  templateUrl: "./gst-list.component.html",
  styleUrls: ["./gst-list.component.scss"],
})
export class GstListComponent implements OnInit {
  records: any[] = [];
  constructor(private route: Router, private service: GstService) {}

  ngOnInit() {
    this.GetAllRecord();
  }

  GetAllRecord() {
    this.service.GetAllRecord().subscribe((res: any[]) => {
      this.records = res;
    });
  }

  onUpdateClick(id: string, isSubmited: boolean) {
    const routeURL: string = "update";
    // const routeURL: string = isSubmited ? "view" : "update";
    this.route.navigate(["Leads", routeURL, id]);
  }

  onDeleteClick(id: string) {
    if (confirm("Are you sure do you want to delete this record!!!")) {
      this.service.Delete_GST_Details(id).subscribe((res) => {
        this.GetAllRecord();
        alert(res);
      });
    }
  }

  onCreateClick() {
    this.route.navigate(["Leads", "create"]);
  }
}
