import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { Nl2brPipe } from './pipes';
import { AppHelperService } from './services/app-helper';
import { STHelperService } from './services/st-helper';

// #region import
const PIPES = [Nl2brPipe];
// #endregion

// #region import
const HELPERS = [AppHelperService, STHelperService];
// #endregion

@NgModule({
  imports: [CommonModule],
  declarations: PIPES,
  exports: [...PIPES]
})
export class FcThemeModule {
  static forRoot(): ModuleWithProviders<FcThemeModule> {
    return {
      ngModule: FcThemeModule,
      providers: HELPERS
    };
  }

  static forChild(): ModuleWithProviders<FcThemeModule> {
    return {
      ngModule: FcThemeModule,
      providers: HELPERS
    };
  }
}
