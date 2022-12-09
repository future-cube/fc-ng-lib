import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { STModule } from '@delon/abc/st';
import { AlainThemeModule } from '@delon/theme';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { FcRepeatDirective } from '../../directives';
import { FcThemeModule } from './../../theme/theme.module';
import { MenuManageComponent } from './menu-manage.component';

const ZORROMODULES = [NzTableModule, NzAlertModule, NzEmptyModule, NzToolTipModule];

const DIRECTIVES = [FcRepeatDirective];

@NgModule({
  declarations: [MenuManageComponent, ...DIRECTIVES],
  exports: [MenuManageComponent, ...DIRECTIVES],
  imports: [CommonModule, STModule, AlainThemeModule, FcThemeModule, ...ZORROMODULES]
})
export class FcMenuManageModule {}
