import { TemplateRef } from '@angular/core';

export interface DividerConfig {
  nzDashed?: boolean;
  nzType?: 'horizontal' | 'vertical';
  nzText?: string | TemplateRef<void> | undefined;
  nzPlain?: boolean;
  nzOrientation?: 'center' | 'left' | 'right';
}
