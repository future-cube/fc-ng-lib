import { ChangeDetectorRef, Component, Injector, OnInit, OnChanges, SimpleChanges, AfterViewInit, Input } from '@angular/core';
import { ControlWidget, di, ErrorData, FormProperty, SFValue } from '@delon/form';
import { deepMerge } from '@delon/util';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { takeUntil, throwIfEmpty } from 'rxjs';

import { FcListPickerOptions } from '../../components/list-picker/list-picker.options';
import { SFListPickerWidgetConfig } from './list-picker.widget.config';

@Component({
  selector: 'sf-list-picker',
  template: `
    <sf-item-wrap [id]="id" [schema]="schema" [ui]="ui" [showError]="showError" [error]="error" [showTitle]="schema.title">
      <!-- 开始自定义控件区域 -->
      <div
        style="display: flex; */
    display: -webkit-flex;
    align-items: center;"
        ><input nz-input [ngModel]="value" disabled />
        <!-- 弹出文件选择框 -->
        <button
          style="margin-left: 8px;"
          type="button"
          nz-button
          [nzType]="'dashed'"
          [nzSize]="config.size || 'default'"
          fc-list-picker
          [params]="params"
          (selected)="selected($event)"
        >
          <i *ngIf="config.showSelectIcon" nz-icon nzType="select" nzTheme="outline"></i>{{ config.selectButtonText }}
        </button>
        <button type="button" nz-button [nzType]="'dashed'" [nzSize]="config.size || 'default'" (click)="removeValue()" [hidden]="!value">
          <i *ngIf="config.showRemoveIcon" nz-icon nzType="delete" nzTheme="outline"></i>{{ config.removeButtonText }}
        </button>
      </div>
      <!-- 结束自定义控件区域 -->
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
export class SFListPickerWidget extends ControlWidget implements OnInit, OnChanges, AfterViewInit {
  static readonly KEY = 'list-picker';

  params!: FcListPickerOptions; // 以模态框打开的选择器组件中需要的参数

  config: SFListPickerWidgetConfig = {
    targetName: '', // 存储值的属性的名称
    titleColumn: 'title', // 选择对象中标题列的名称
    valueColumn: 'value', // 选择对象中值的列名称
    defaultEmptyText: '未设置', // 对应的需要显示的值为空时，显示的默认值
    showSelectIcon: true, // 显示移除框图标
    selectButtonText: '选择信息', // 选择按钮文字内容
    showRemoveIcon: true, // 显示移除框图标
    removeButtonText: '清除所选', // 选择按钮文字内容
    size: 'default' as NzButtonSize, // 按钮尺寸
    codeClass: '' // 显示实际值的样式类名
  };

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.params = this.ui['params']; // 列表选择器的配置参数
    this.config = deepMerge(this.config, this.ui['config']); // 当前挂件的配置参数
  }

  // 获取值的属性对象
  private get valueProperty(): FormProperty {
    const prop = this.formProperty;
    return prop.parent!.getProperty(this.config.targetName)!;
  }

  override reset(value: SFValue): void {
    this.setValue(value);

    this.cd.detectChanges();
  }

  // @todo 此处需要调整一下，直接改为指定的属性是否存在错误。
  override ngAfterViewInit() {
    this.formProperty.errorsChanges.pipe(takeUntil(this.sfItemComp!.destroy$)).subscribe((errors: ErrorData[] | null) => {
      if (errors == null) return;

      di(this.ui, 'errorsChanges', this.formProperty.path, errors);

      // 不显示首次校验视觉
      const firstVisual = this.sfComp?.firstVisual;
      if (firstVisual || (!firstVisual && this.sfComp?._inited)) {
        this.showError = errors.length > 0;
        this.error = this.showError ? (errors[0].message as string) : '';

        this.cd.detectChanges();
      }
    });
    this.afterViewInit();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    // console.log(this.value);
  }
  // 移除值
  removeValue(): void {
    this.setValue('');
    console.log(this.valueProperty);
    this.valueProperty.setValue(null, false);
    this.cd.detectChanges();
  }
  // constructor(cd: ChangeDetectorRef, injector: Injector, private appHelper: AppHelperService) {
  //   super(cd, injector);
  // }
  // 选中信息后执行的操作，一般是更新数据。
  selected(v: any) {
    const title = v[this.config.titleColumn];
    const value = v[this.config.valueColumn];
    // 更新显示内容
    this.setValue(title || this.config.defaultEmptyText);
    // 更新实际存值属性的值
    this.valueProperty.resetValue(value, false);
    // 返回实际的值
    if (this.ui['selected']) {
      this.ui['selected'](v, this.sfItemComp, this.sfComp);
    }
    this.cd.detectChanges();
  }
}
