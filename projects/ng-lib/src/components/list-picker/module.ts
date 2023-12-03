import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { STModule } from '@delon/abc/st';
import { DelonFormModule } from '@delon/form';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { FcListPickerComponent } from './list-picker.component';
import { FcListPickerDirective } from './list-picker.directive';

export const COMPONENTS = [FcListPickerComponent, FcListPickerDirective];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [DelonFormModule.forRoot(), NzButtonModule, FormsModule, STModule, CommonModule],
  exports: [...COMPONENTS]
})
export class FcListPickerModule {}
