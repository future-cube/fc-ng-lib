import { Component } from '@angular/core';
import { ControlWidget, SFValue } from '@delon/form';

import { DividerConfig } from './divider.widget.config';

@Component({
  selector: 'sf-divider',
  template: `
    <sf-item-wrap [id]="id" [schema]="schema" [ui]="ui" [showError]="showError" [error]="error">
      <nz-divider
        [nzDashed]="config.nzDashed"
        [nzType]="config.nzType!"
        [nzText]="config.nzText"
        [nzPlain]="config.nzPlain"
        [nzOrientation]="config.nzOrientation!"
      ></nz-divider>
    </sf-item-wrap>
  `,
  preserveWhitespaces: false,
  providers: [],
  styles: [
    `
      :host ::ng-deep widget-color-picker {
        line-height: normal;
      }
    `
  ]
})
/**
 * 动态表单的列表选择组件。所有的参数都在表格结构配置中预设
 */
export class SFDividerWidget extends ControlWidget {
  static readonly KEY = 'divider';
  config: DividerConfig = {
    nzDashed: false,
    nzType: 'horizontal',
    nzText: undefined,
    nzPlain: false,
    nzOrientation: 'left'
  };

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    console.log(this.schema, this.ui);
    this.config = { ...this.config, ...(this.ui['config'] || {}) }; // 列表选择器的配置参数
  }

  override reset(value: SFValue): void {
    this.setValue(value);
    this.cd.detectChanges();
  }
}
