import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';

import { DocRoutingModule } from './doc-routing.module';
import { DocListComponent } from './list/list.component';
import { DocViewComponent } from './view/view.component';
import { DocEditComponent } from './edit/edit.component';

const COMPONENTS: Array<Type<void>> = [DocListComponent, DocViewComponent,
  DocEditComponent];

@NgModule({
  imports: [SharedModule, DocRoutingModule],
  declarations: COMPONENTS
})
export class DocModule {}
