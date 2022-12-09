import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';

import { SettingsMenuComponent } from './menu/menu.component';
import { SettingsRoutingModule } from './settings-routing.module';

const COMPONENTS: Array<Type<void>> = [SettingsMenuComponent];

@NgModule({
  imports: [SharedModule, SettingsRoutingModule],
  declarations: COMPONENTS
})
export class SettingsModule {}
