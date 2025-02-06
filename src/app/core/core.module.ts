import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from './overlay/overlay.module';
import { HttpClientModule } from '@angular/common/http';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once-guard';
import { OverlayService } from './service/overlay.service';



@NgModule({
  declarations: [
  ],
  exports: [
    HttpClientModule,
    OverlayModule
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    OverlayModule
  ], providers: [OverlayService]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {    // Ensure that CoreModule is only loaded into AppModule
  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

}


