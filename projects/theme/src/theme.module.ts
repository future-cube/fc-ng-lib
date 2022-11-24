import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// #region import
import { Nl2brPipe } from './pipes';

const PIPES = [Nl2brPipe];
// #endregion

// #region import
import { AppHelperService } from './services/app-helper';
import { STHelperService } from './services/st-helper';

const HELPERS = [AppHelperService, STHelperService];
// #endregion

@NgModule({
  declarations: PIPES,
  imports: [CommonModule],
})
export class FcThemeModule {
  static forRoot(): ModuleWithProviders<FcThemeModule> {
    return {
      ngModule: FcThemeModule,
      providers: HELPERS,
    };
  }

  static forChild(): ModuleWithProviders<FcThemeModule> {
    return {
      ngModule: FcThemeModule,
      providers: HELPERS,
    };
  }
}
