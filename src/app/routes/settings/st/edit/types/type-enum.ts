import { SFSchema, SFSchemaEnumType } from '@delon/form';
import { DividerConfig } from '@future-cube/ng-lib/sf-widget';

export const TypeEnum: SFSchemaEnumType[] = [
  { label: '默认', value: '' },
  { label: '行号', value: 'no' },
  { label: '多选', value: 'checkbox' },
  { label: '单选', value: 'radio' },
  { label: '链接', value: 'link' },
  { label: '图像', value: 'img' },
  { label: '数字', value: 'number' },
  { label: '货币', value: 'currency' },
  { label: '日期', value: 'date' },
  { label: '徽标', value: 'badge' },
  { label: '标签', value: 'tag' },
  { label: '徽章化', value: 'yn' },
  { label: '枚举', value: 'enum' },
  { label: '自定义小部件', value: 'widget' }
];
