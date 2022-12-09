import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DelonFormModule, WidgetRegistry } from '@delon/form';
import { QuillModule } from 'ngx-quill';
import { QuillConfigModule } from 'ngx-quill/config';

import { Nl2brPipe } from './pipes';
import { FcConfigService, AppHelperService, STHelperService } from './services';

// #region import
const PIPES = [Nl2brPipe];
// #endregion

// #region import
const HELPERS = [AppHelperService, STHelperService, FcConfigService];
// #endregion

@NgModule({
  imports: [CommonModule, DelonFormModule],
  declarations: [...PIPES],
  exports: [...PIPES],
  providers: [...HELPERS]
})
export class FcThemeModule {
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
