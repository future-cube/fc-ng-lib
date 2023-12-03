import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DelonFormModule } from '@delon/form';

import { FcConfigService, AppHelperService, STHelperService } from './';
import { FcEventsService } from './events/events.service';
import { FcModalHelper } from './modal-helper/modal-helper.service';

// #region import
const HELPERS = [AppHelperService, STHelperService, FcConfigService, FcEventsService, FcModalHelper];
// #endregion

@NgModule({
  imports: [CommonModule, DelonFormModule],
  declarations: [],
  exports: [],
  providers: [...HELPERS]
})
export class FcServicesModule {
  // static forRoot(): ModuleWithProviders<FcThemeModule> {
  //   return {
  //     ngModule: FcThemeModule,
  //     providers: HELPERS
  //   };
  // }
  // static forChild(): ModuleWithProviders<FcThemeModule> {
  //   return {
  //     ngModule: FcThemeModule,
  //     providers: HELPERS
  //   };
  // }
}
