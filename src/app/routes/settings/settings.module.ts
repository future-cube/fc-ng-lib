import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';

import { SettingsDatabaseListComponent } from './database/list/list.component';
import { SettingsMenuComponent } from './menu/menu.component';
import { SettingsRoutingModule } from './settings-routing.module';

const COMPONENTS: Array<Type<void>> = [SettingsMenuComponent, SettingsDatabaseListComponent];

@NgModule({
  imports: [SharedModule, SettingsRoutingModule],
  declarations: COMPONENTS
})
export class SettingsModule {}
