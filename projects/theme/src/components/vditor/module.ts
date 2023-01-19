import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { VditorComponent } from './component';
import { SimplemdeConfig } from './config';

@NgModule({
  imports: [CommonModule],
  declarations: [VditorComponent],
  exports: [VditorComponent]
})
export class SimplemdeModule {
  static forRoot(config?: SimplemdeConfig): ModuleWithProviders<SimplemdeModule> {
    return {
      ngModule: SimplemdeModule,
      providers: [{ provide: SimplemdeConfig, useValue: config }]
    };
  }
}
