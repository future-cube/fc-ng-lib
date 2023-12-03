import { NgModule } from '@angular/core';

import { Nl2brPipe } from './nl2br/nl2br.pipe';

export const PIPES = [Nl2brPipe];

@NgModule({
  declarations: [...PIPES],
  exports: [...PIPES]
})
export class FcPipesModule {}
