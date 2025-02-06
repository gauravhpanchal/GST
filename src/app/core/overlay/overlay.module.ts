import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OverlayRequestResponseInterceptor } from './interceptor/overlay-request-response.interceptor';

@NgModule({
  declarations: [
    OverlayComponent
  ],
  imports: [
    CommonModule
  ], exports: [
    OverlayComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OverlayRequestResponseInterceptor,
      multi: true,
    }
  ]
})
export class OverlayModule { }
