import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsMenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: SettingsMenuComponent, data: { title: '菜单管理' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
