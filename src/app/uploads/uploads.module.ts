import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../shared/shared.module';

import { UploadsRoutingModule } from './uploads-routing.module';
import { UploadPgComponent } from './upload-pg/upload-pg.component';

import { UploadService } from './upload.service';

@NgModule({
  declarations: [UploadPgComponent],
  imports: [
    CommonModule,
    UploadsRoutingModule,
    FormsModule, ReactiveFormsModule,

    SharedModule
  ],
  exports: [  ],
  providers: [UploadService]
})
export class UploadsModule { }
