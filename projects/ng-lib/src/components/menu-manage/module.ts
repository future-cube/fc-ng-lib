import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { STModule } from '@delon/abc/st';
import { DelonFormModule } from '@delon/form';
import { AlainThemeModule } from '@delon/theme';
import { FcPipesModule } from '@future-cube/ng-lib/pipes/pipes.module';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { FcMenuManageComponent } from './menu-manage.component';

const COMPONENTS = [FcMenuManageComponent];
const ZORROMODULES = [NzButtonModule, NzTableModule, NzAlertModule, NzEmptyModule, NzToolTipModule, FcPipesModule];
const DELONMODULES = [DelonFormModule.forRoot(), FormsModule, STModule, AlainThemeModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ...ZORROMODULES, ...DELONMODULES],
  exports: [...COMPONENTS]
})
export class FcMenuManageModule {}
