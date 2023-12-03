import { SFSchema } from '@delon/form';
import { DividerConfig } from '@future-cube/ng-lib/sf-widget';

import { RadioButton } from './radio-button-ui';
import { TypeEnum } from './type-enum';

export const SpecialProperties: { [key: string]: SFSchema } = {
  divider_special_options: {
    type: 'string',
    ui: {
      widget: 'divider',
      grid: { span: 24 },
      config: { nzText: '特有属性' } as DividerConfig
    }
  },
  type: {
    type: 'string',
    title: '类型',
    default: '',
    enum: TypeEnum
  },
  alert_link: {
    title: '说明',
    type: 'string',
    default: '需前端自行定义click事件：`(record: STData, instance?: STComponent) => void`',
    ui: {
      widget: 'text',
      visibleIf: { type: ['link'] }
    }
  },
  alert_image: {
    title: '说明',
    type: 'string',
    default: '后续将增强此功能,使期可以处理其他如宽高等参数',
    ui: {
      widget: 'text',
      visibleIf: { type: ['img'] }
    }
  },
  numberDigits: {
    type: 'string',
    title: '数字格式',
    ui: {
      optionalHelp: 'A.B-C,A为整数长度,不足前补0;B为小数最小长度,默认为0;C为小数最长长度,默认为3,即3.4567按2.1-3表示,则为03.456',
      visibleIf: { type: ['number'] }
    }
  },
  dateFormat: {
    type: 'string',
    title: '日期格式',
    ui: {
      visibleIf: { type: ['date'] }
    }
  },
  currency: {
    title: '货币格式',
    type: 'object',
    properties: {
      type1: {
        title: '文本',
        type: 'string',
        default: 'commas',
        enum: ['commas', 'mega'],
        ui: RadioButton
      },
      format: {
        title: '格式',
        type: 'string',
        ui: {
          optionalHelp:
            '`0`	任意数字，若该位置字符不符合，则默认为 `0` 填充 | `9`	任意数字 | `#`	任意字符 | `U`	转换大写 | `L`	转换小写 | `*`	转换为 `*` 字符'
        }
      }
    },
    ui: {
      visibleIf: { type: ['currency'] }
    }
  },
  yn: {
    type: 'object',
    title: '徽章化',
    properties: {
      truth: { title: 'truth', type: 'number', default: 1 },
      yes: { title: 'yes', type: 'string', default: '是' },
      no: { title: 'no', type: 'string', default: '否' },
      mode: { title: 'mode', type: 'string', default: 'icon', enum: ['full', 'icon', 'text'] }
    },
    ui: {
      visibleIf: { type: (val: string) => val === 'yn' },
      grid: { span: 24, arraySpan: 6 },
      showExpand: false
    }
  },
  badge: {
    title: '徽标配置项',
    type: 'object',
    properties: {
      text: { title: '文本', type: 'string' },
      color: { title: '颜色值', type: 'string', enum: ['success', 'processing', 'default', 'error', 'warning'] }
    },
    ui: {
      visibleIf: { type: (val: string) => val === 'badge' }
    }
  },
  tag: {
    type: 'string',
    title: '标签配置项',
    ui: {
      widget: 'text',
      optional: '可处理',
      optionalHelp: '同徽标',
      visibleIf: { type: (val: string) => val === 'tag' }
    }
  },
  enum: {
    type: 'string',
    title: '枚举配置项',
    ui: {
      widget: 'text',
      optional: '可处理',
      optionalHelp: '可以使用一些特殊方式,从指定接口获取. 注意,如果是前端数据源,可能因为需要导入,所以不能支持从此处配置',
      visibleIf: { type: (val: string) => val === 'enum' }
    }
  }
};
