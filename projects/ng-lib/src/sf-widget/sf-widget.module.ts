import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DelonFormModule, WidgetRegistry } from '@delon/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { QuillConfigModule, QuillModule } from 'ngx-quill';

import { FcListPickerModule } from '../components';
import { SFDividerWidget } from './divider';
import { SFListPickerWidget } from './list-picker';
import { QuillWidget } from './quill';

export const SCHEMA_THIRDS_COMPONENTS = [QuillWidget, SFListPickerWidget, SFDividerWidget];

@NgModule({
  declarations: SCHEMA_THIRDS_COMPONENTS,
  imports: [
    DelonFormModule.forRoot(),
    NzButtonModule,
    FormsModule,
    FcListPickerModule,
    NzDividerModule,
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
    widgetRegistry.register(SFListPickerWidget.KEY, SFListPickerWidget);
    widgetRegistry.register(SFDividerWidget.KEY, SFDividerWidget);
  }
}
