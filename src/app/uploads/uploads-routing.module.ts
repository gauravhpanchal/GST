import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadPgComponent } from './upload-pg/upload-pg.component';


const routes: Routes = [
  {
    path: 'upload-image',
    component: UploadPgComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadsRoutingModule { }
