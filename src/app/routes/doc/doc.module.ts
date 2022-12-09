import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { DocRoutingModule } from './doc-routing.module';
import { DocTableComponent } from './table/table.component';
import { DocViewComponent } from './view/view.component';

const COMPONENTS: Type<void>[] = [
  DocTableComponent,
  DocViewComponent];

@NgModule({
  imports: [
    SharedModule,
    DocRoutingModule
  ],
  declarations: COMPONENTS,
})
export class DocModule { }
