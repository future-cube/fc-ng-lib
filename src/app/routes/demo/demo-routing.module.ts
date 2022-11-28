import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoTableColumnsComponent } from './table-columns/table-columns.component';

const routes: Routes = [
  { path: '', redirectTo: 'table-columns', pathMatch: 'full' },
  { path: 'table-columns', component: DemoTableColumnsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule {}
