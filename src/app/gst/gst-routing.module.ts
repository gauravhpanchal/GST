import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GstListComponent } from "./gst/gst-list/gst-list.component";
import { GSTComponent } from "./gst/gst.component";

const routes: Routes = [
  { path: "list", component: GstListComponent },
  { path: "create", component: GSTComponent },
  { path: "update/:id", component: GSTComponent },
  { path: "view/:id", component: GSTComponent },
  { path: "", redirectTo: "list", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GSTRoutingModule {}
