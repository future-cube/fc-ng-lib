import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsDatabaseListComponent } from './database/list/list.component';
import { SettingsMenuComponent } from './menu/menu.component';
import { SettingsSfListComponent } from './sf/list/list.component';
import { SettingsStListComponent } from './st/list/list.component';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: SettingsMenuComponent, data: { title: '菜单管理' } },
  { path: 'database', component: SettingsDatabaseListComponent, data: { title: '数据库管理' } },
  { path: 'sf', component: SettingsSfListComponent, data: { title: '表单项配置' } },
  { path: 'st', component: SettingsStListComponent, data: { title: '表格列配置' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
