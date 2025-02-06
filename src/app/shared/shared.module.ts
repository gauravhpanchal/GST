import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { UserSideNavComponent } from './user-side-nav/user-side-nav.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, SideNavComponent, UserSideNavComponent, FileUploadComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [HeaderComponent, FooterComponent, SideNavComponent, UserSideNavComponent, FileUploadComponent]
})
export class SharedModule { }
