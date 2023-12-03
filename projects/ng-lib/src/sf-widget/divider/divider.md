# Divider Widget
- 表单空白元素,不介入数据,类似 `Text Widget`

直接传入 `ng-ant` 的的参数即可
```
export interface DividerConfig {
  nzDashed?: boolean;
  nzType?: 'horizontal' | 'vertical';
  nzText?: string | TemplateRef<void> | undefined;
  nzPlain?: boolean;
  nzOrientation?: 'center' | 'left' | 'right';
}
```
