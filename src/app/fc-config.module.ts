/* eslint-disable import/order */
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { SfQuillConfig } from '@future-cube/ng-lib/sf-widget';
import { throwIfAlreadyLoaded } from '@core';
import { FcConfig, FC_CONFIG_FACTORY } from '@future-cube/ng-lib/services';

const fcConfig: FcConfig = {
  st: { url: 'system/st/config/column' },
  quill: { placeholder: '请输入内容' } as SfQuillConfig
};
const fcProvides = [{ provide: FC_CONFIG_FACTORY, useValue: fcConfig }];

@NgModule({
  imports: []
})
export class FcConfigModule {
  constructor(@Optional() @SkipSelf() parentModule: FcConfigModule) {
    throwIfAlreadyLoaded(parentModule, 'FcConfigModule');
  }

  static forRoot(): ModuleWithProviders<FcConfigModule> {
    return {
      ngModule: FcConfigModule,
      providers: [...fcProvides]
    };
  }
}
