import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { STModule } from '@delon/abc/st';
import { DelonFormModule } from '@delon/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { FcFormCreatorCreateComponent } from './create/create.component';
import { FcFormCreatorUpdateComponent } from './update/update.component';

export const COMPONENTS = [FcFormCreatorCreateComponent, FcFormCreatorUpdateComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [DelonFormModule.forRoot(), NzButtonModule, FormsModule, STModule, CommonModule, NzSpinModule],
  exports: [...COMPONENTS]
})
export class FcFormCreatorModule {}
