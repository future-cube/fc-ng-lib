import { NgModule } from '@angular/core';
import { DelonFormModule, WidgetRegistry } from '@delon/form';
// import { QuillWidget } from '@future-cube/theme';

import { SharedModule } from '../shared.module';

export const SCHEMA_THIRDS_COMPONENTS = [];

@NgModule({
  declarations: SCHEMA_THIRDS_COMPONENTS,
  imports: [SharedModule, DelonFormModule.forRoot()],
  exports: SCHEMA_THIRDS_COMPONENTS
})
export class JsonSchemaModule {
  constructor(widgetRegistry: WidgetRegistry) {
    // widgetRegistry.register(QuillWidget.KEY, QuillWidget);
  }
}
