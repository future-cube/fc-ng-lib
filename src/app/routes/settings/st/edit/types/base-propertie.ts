import { SFSchema } from '@delon/form';
import { DividerConfig } from '@future-cube/ng-lib/sf-widget';

export const BaseProperties: { [key: string]: SFSchema } = {
  divider_base_options: {
    type: 'string',
    ui: {
      widget: 'divider',
      grid: { span: 24 },
      config: { nzText: '基础属性' } as DividerConfig
    }
  },
  title: { type: 'string', title: '列名称' },
  index: { type: 'string', title: '数据对应的Key' },
  i18n: { type: 'string', title: 'I18N' },
  default: {
    type: 'string',
    title: '默认值',
    default: '-'
  },
  width: {
    type: 'number',
    title: '宽度',
    ui: {
      optional: '看说明',
      optionalHelp: '特别注意, 需要接受字符和数字两种,因为如果是固定列的话,就必需使用数字格式.但如果是百分比,就需要是字符格式'
    }
  },
  format: {
    type: 'string',
    title: '格式化',
    ui: {
      widget: 'text',
      optional: '可处理',
      optionalHelp: '暂时由前端自行追加'
    }
  }
};
