import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DelonFormModule, WidgetRegistry } from '@delon/form';
import { QuillConfigModule, QuillModule } from 'ngx-quill';

import { QuillWidget } from './quill';

export const SCHEMA_THIRDS_COMPONENTS = [QuillWidget];

@NgModule({
  declarations: SCHEMA_THIRDS_COMPONENTS,
  imports: [
    DelonFormModule.forRoot(),
    FormsModule,

    QuillModule.forRoot(),
    // 不应该在此处配置，应该放到
    QuillConfigModule.forRoot({
      format: 'html',
      modules: {
        syntax: false
      }
    })
  ],
  exports: [...SCHEMA_THIRDS_COMPONENTS, QuillModule, QuillConfigModule]
})
export class FcSfWidgetModule {
  constructor(widgetRegistry: WidgetRegistry) {
    widgetRegistry.register(QuillWidget.KEY, QuillWidget);
  }
}
