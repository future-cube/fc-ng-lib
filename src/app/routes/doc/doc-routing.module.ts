import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocTableComponent } from './table/table.component';
import { DocViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', redirectTo: 'table', pathMatch: 'full' },
  { path: 'table', component: DocTableComponent },
  { path: 'view/:id', component: DocViewComponent, data: { title: '查看文档' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocRoutingModule {}
