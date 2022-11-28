import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoTableColumnsComponent } from './table-columns/table-columns.component';

const COMPONENTS: Array<Type<void>> = [DemoTableColumnsComponent];

@NgModule({
  imports: [SharedModule, DemoRoutingModule],
  declarations: COMPONENTS
})
export class DemoModule {}
