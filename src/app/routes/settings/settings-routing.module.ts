import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsDatabaseListComponent } from './database/list/list.component';
import { SettingsMenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: SettingsMenuComponent, data: { title: '菜单管理' } },
  { path: 'database', component: SettingsDatabaseListComponent, data: { title: '数据库管理' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
