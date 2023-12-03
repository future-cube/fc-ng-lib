import { NzButtonSize } from 'ng-zorro-antd/button';

export interface SFListPickerWidgetConfig {
  targetName: string; // 当前要被更改的属性名
  titleColumn: string; // 选择对象中标题列的名称
  valueColumn: string; // 选择对象中值的列名称
  defaultEmptyText?: string; //对应的需要显示的值为空时，显示的默认值
  showSelectIcon?: boolean; // 显示移除框图标
  selectButtonText?: string; // 选择按钮文字内容
  showRemoveIcon?: boolean; // 显示移除框图标
  removeButtonText?: string; // 选择按钮文字内容
  size?: NzButtonSize; // 按钮尺寸
  codeClass?: string; // 显示实际值的样式类名
}
