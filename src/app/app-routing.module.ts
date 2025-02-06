import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';
import { UsrAuthGuard } from './guard/usr-auth.guard';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: "Leads",
    loadChildren: () => import('./gst/gst.module').then(m => m.GSTModule)
  },
  {
    path: "",
    loadChildren: () => import('./usr-ord/usr-ord.module').then(m => m.UsrOrdModule),
    canActivate: [UsrAuthGuard]
  },
  {
    path: "",
    loadChildren: () => import('./testimonials/testimonials.module').then(m => m.TestimonialsModule),
    canActivate: [AuthGuard]
  },
  {
    path: "",
    loadChildren: () => import('./plans/plans.module').then(m => m.PlansModule),
    canActivate: [AuthGuard]
  },
  {
    path: "",
    loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule),
    canActivate: [AuthGuard]
  },
  {
    path: "",
    loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule),
    canActivate: [AuthGuard]
  },
  {
    path: "",
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: "",
    loadChildren: () => import('./uploads/uploads.module').then(m => m.UploadsModule),
    canActivate: [AuthGuard]
  },
  {
    path: "",
    loadChildren: () => import('./web-forms/web-forms.module').then(m => m.WebFormsModule),
    canActivate: [AuthGuard]
  },




  {
    path: "**",
    redirectTo: "/"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
