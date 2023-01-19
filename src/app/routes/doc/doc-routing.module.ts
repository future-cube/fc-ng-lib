import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocEditComponent } from './edit/edit.component';
import { DocListComponent } from './list/list.component';
import { DocViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: DocListComponent, data: { title: '管理文档' } },
  { path: 'create', component: DocEditComponent, data: { title: '登记文档' } },
  { path: 'edit/:id', component: DocEditComponent, data: { title: '编辑文档' } },
  { path: 'view/:id', component: DocViewComponent, data: { title: '查看文档' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocRoutingModule {}
