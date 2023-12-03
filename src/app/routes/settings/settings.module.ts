import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';

import { SettingsDatabaseListComponent } from './database/list/list.component';
import { SettingsDatabaseTableComponent } from './database/table/table.component';
import { SettingsMenuComponent } from './menu/menu.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsSfEditComponent } from './sf/edit/edit.component';
import { SettingsSfListComponent } from './sf/list/list.component';
import { SettingsStEditComponent } from './st/edit/edit.component';
import { SettingsStListComponent } from './st/list/list.component';

const COMPONENTS: Array<Type<void>> = [
  SettingsMenuComponent,
  SettingsDatabaseListComponent,
  SettingsDatabaseTableComponent,
  SettingsSfListComponent,
  SettingsStListComponent,
  SettingsStEditComponent,
  SettingsSfEditComponent
];

@NgModule({
  imports: [SharedModule, SettingsRoutingModule],
  declarations: COMPONENTS
})
export class SettingsModule {}
