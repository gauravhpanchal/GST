import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GSTRoutingModule } from './gst-routing.module';
import { GSTComponent } from './gst/gst.component';
import { SharedModule } from '../shared/shared.module';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { LeadsForStateSectionComponent } from './gst/leads-for-state-section/leads-for-state-section.component';
import { OrganisationInfoComponent } from './gst/organisation-info/organisation-info.component';
import { IndividualInfoComponent } from './gst/individual-info/individual-info.component';
import { BankDetailsComponent } from './gst/bank-details/bank-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PPOBComponent } from './gst/ppob/ppob.component';
import { APOBComponent } from './gst/apob/apob.component';
import { ComplainceCheckComponent } from './gst/complaince-check/complaince-check.component';
import { InvoiceComponent } from './gst/invoice/invoice.component';
import { CreateGSTAppComponent } from './gst/create-gstapp/create-gstapp.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { IndividualInfoItemComponent } from './gst/individual-info/individual-info-item/individual-info-item.component';
import { TaxInvoiceForOtherComponent } from './gst/invoice/tax-invoice-for-other/tax-invoice-for-other.component';
import { TaxInvoiceForCAComponent } from './gst/invoice/tax-invoice-for-ca/tax-invoice-for-ca.component';
import { AppApobItemComponent } from './gst/apob/app-apob-item/app-apob-item.component';
import { GstListComponent } from './gst/gst-list/gst-list.component';
import { IndividualComponent } from './gst/individual/individual.component';

@NgModule({
  declarations: [IndividualComponent, GSTComponent, LeadsForStateSectionComponent, OrganisationInfoComponent, IndividualInfoComponent, BankDetailsComponent, PPOBComponent, APOBComponent, ComplainceCheckComponent, InvoiceComponent, CreateGSTAppComponent, IndividualInfoItemComponent, TaxInvoiceForOtherComponent, TaxInvoiceForCAComponent, AppApobItemComponent, GstListComponent],
  imports: [
    CommonModule,
    GSTRoutingModule,
    SharedModule,
    TabsModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot()
  ]
})
export class GSTModule { }
