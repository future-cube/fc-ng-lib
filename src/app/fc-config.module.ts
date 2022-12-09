/* eslint-disable import/order */
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FcConfig, FC_CONFIG, SfQuillConfig } from '@future-cube/theme';
import { throwIfAlreadyLoaded } from '@core';

const fcConfig: FcConfig = {
  st: { url: '/table/column' },
  quill: { placeholder: 'test' } as SfQuillConfig
};
const fcProvides = [{ provide: FC_CONFIG, useValue: fcConfig }];

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
