import { SFObjectWidgetSchema, SFRadioWidgetSchema, SFSchema, SFSchemaEnumType, SFUISchema } from '@delon/form';
import { deepCopy } from '@delon/util';
import { DividerConfig } from '@future-cube/ng-lib/sf-widget';

import { RadioButton, SpecialProperties } from './types';
import { BaseProperties } from './types/base-propertie';

const StColumnsConfigSchema: SFSchema = {
  properties: {
    ...BaseProperties,
    ...SpecialProperties
    // divider_other_options: {
    //   type: 'string',
    //   ui: {
    //     widget: 'divider',
    //     grid: { span: 24 },
    //     config: { nzText: '其他属性' } as DividerConfig
    //   }
    // },
    // fixed: {
    //   type: 'string',
    //   title: '固定',
    //   default: '',
    //   enum: [
    //     { value: '', label: '无' },
    //     { value: 'left', label: '左侧' },
    //     { value: 'right', label: '右侧' }
    //   ],
    //   ui: {
    //     ...RadioButton
    //   }
    // },
    // className: { type: 'string', title: '	列 Class' },
    // render: { type: 'string', title: '自定义渲染', ui: { optionalHelp: '在前端模板中需存在对应id的模板' } },
    // renderTitle: { type: 'string', title: '标题自定义渲染ID' },
    // colSpan: { type: 'number', title: '合并列', default: 1 },
    // buttons: {
    //   type: 'string',
    //   title: '按钮组',
    //   ui: {
    //     widget: 'text',
    //     optional: '可处理',
    //     optionalHelp: '暂时由前端自行追加，这个功能应该可以通过后端设置，前端直接执行此处设置的方法即可。'
    //   }
    // },
    // maxMultipleButton: { type: 'number', title: '最多按钮' },
    // sort: {
    //   type: 'string',
    //   title: '排序',
    //   ui: {
    //     widget: 'text',
    //     optional: '看说明',
    //     optionalHelp: '一般用到这个的,都是从后端取数据.感觉应该只需要传入一个key即可.至于Rename参数,直接全局配置得了'
    //   }
    // },
    // filter: {
    //   type: 'string',
    //   title: '过滤',
    //   default: '暂时从前端处理吧',
    //   ui: {
    //     widget: 'text'
    //   }
    // },
    // selections: {
    //   type: 'string',
    //   title: '选择功能配置',
    //   default: '暂时从前端处理吧',
    //   ui: {
    //     widget: 'text'
    //   }
    // },
    // exported: {
    //   type: 'string',
    //   title: '是否允许导出',
    //   default: true,
    //   enum: [
    //     { lable: '是', value: true },
    //     { lable: '否', value: false }
    //   ]
    // },
    // acl: { type: 'string', title: 'ACL权限', ui: { widget: 'text', optional: '可处理', optionalHelp: '可以用逗号分隔开多个权限' } },
    // click: {
    //   type: 'string',
    //   title: '点击回调',
    //   ui: { widget: 'text', optionalHelp: '可以指定一个方法名,前端根据这个自动调用' },
    //   optional: '可处理'
    // },
    // widget: {
    //   type: 'string',
    //   title: '小部件配置项',
    //   default: '暂时从前端处理吧',
    //   ui: {
    //     widget: 'text',
    //     visibleIf: { type: (val: string) => val === 'widget' }
    //   }
    // },
    // noIndex: {
    //   type: 'number',
    //   title: '	行号索引开始值',
    //   default: '1',
    //   ui: {
    //     widget: 'text',
    //     optionalHelp: '支持除数字外,使用一个方法返回.但从此处设置 ,只需要支持数据即可.如需通过方法返回,则前端处理'
    //   }
    // },
    // iif: {
    //   type: 'string',
    //   title: '条件表达式',
    //   default: '暂时从前端处理吧',
    //   ui: {
    //     widget: 'text',
    //     optionalHelp: '理论上,可以配置前端的方法名,自动执行该方法'
    //   }
    // },
    // statistical: {
    //   type: 'string',
    //   title: '统计信息',
    //   default: '暂时从前端处理吧',
    //   ui: {
    //     widget: 'text'
    //   }
    // },
    // resizable: {
    //   type: 'boolean',
    //   title: '表头配置项',
    //   default: true,
    //   ui: {
    //     optional: '部分支持',
    //     optionalHelp: '仅支持是否启用调整,默认启用'
    //   }
    // },
    // children: {
    //   type: 'string',
    //   title: '多表头',
    //   default: '暂时从前端处理吧',
    //   ui: {
    //     widget: 'text'
    //   }
    // },
    // safeType: {
    //   type: 'string',
    //   title: '安全渲染方式',
    //   default: 'safeHtml',
    //   enum: ['text', 'html', 'safeHtml'],
    //   ui: {
    //     widget: 'text'
    //   }
    // },
    // customRequest: {
    //   type: 'string',
    //   title: '覆盖默认的请求行为',
    //   default: '固定从前端处理吧',
    //   ui: {
    //     widget: 'text'
    //   }
    // }
  },
  required: ['title', 'index']
};
const StColumnsConfigUi: SFUISchema = {
  '*': {
    grid: { span: 12 },
    spanLabelFixed: 200
  },
  $type: {
    widget: 'radio',
    styleType: 'button',
    grid: { span: 24 }
  },
  $index: {
    optionalHelp: '列数据在数据项中对应的 key，支持 a.b.c 的嵌套写法	'
  }
};

const typeFormat: string[] = ['numberDigits', 'dateFormat', 'currency', 'yn', 'badge', 'tag'];

const StColumnsConfigDefaultKeys: string[] = ['type', 'title', 'index', 'render', 'width', ...typeFormat, 'fixed', 'className'];

const StColumnsConfigKeys: any[] = [
  {
    value: 'type',
    label: '类型'
  },
  {
    value: 'title',
    label: '列名称'
  },
  {
    value: 'index',
    label: '数据对应的Key'
  },
  {
    value: 'i18n',
    label: 'I18N'
  },
  {
    value: 'render',
    label: '自定义渲染ID'
  },
  {
    value: 'renderTitle',
    label: '标题自定义渲染ID'
  },
  {
    value: 'default',
    label: '默认值'
  },
  {
    value: 'buttons',
    label: '按钮组'
  },
  {
    value: 'maxMultipleButton',
    label: '最多按钮'
  },
  {
    value: 'width',
    label: '宽度'
  },
  {
    value: 'fixed',
    label: '固定'
  },
  {
    value: 'format',
    label: '格式化'
  },
  {
    value: 'className',
    label: '列 Class'
  },
  {
    value: 'colSpan',
    label: '合并列'
  },
  {
    value: 'sort',
    label: '排序'
  },
  {
    value: 'filter',
    label: '过滤'
  },
  {
    value: 'selections',
    label: '选择功能配置'
  },
  {
    value: 'numberDigits',
    label: '数字格式'
  },
  {
    value: 'dateFormat',
    label: '日期格式'
  },
  {
    value: 'currency',
    label: '货币格式'
  },
  {
    value: 'yn',
    label: '货币格式'
  },
  {
    value: 'exported',
    label: '是否允许导出'
  },
  {
    value: 'acl',
    label: 'ACL权限'
  },
  {
    value: 'click',
    label: '点击回调'
  },
  {
    value: 'badge',
    label: '徽标配置项'
  },
  {
    value: 'tag',
    label: '标签配置项'
  },
  {
    value: 'enum',
    label: '枚举配置项'
  },
  {
    value: 'widget',
    label: '小部件配置项'
  },
  {
    value: 'noIndex',
    label: '行号索引开始值'
  },
  {
    value: 'iif',
    label: '条件表达式'
  },
  {
    value: 'statistical',
    label: '统计信息'
  },
  {
    value: 'resizable',
    label: '表头配置项'
  },
  {
    value: 'children',
    label: '多表头'
  },
  {
    value: 'safeType',
    label: '安全渲染方式'
  },
  {
    value: 'customRequest',
    label: '覆盖默认的请求行为'
  }
];

const FilterStColumnsConfigSchema = (keys: string[]): SFSchema => {
  const schema: SFSchema = deepCopy(StColumnsConfigSchema);
  const properties = Object.keys(schema.properties!);
  const arr = properties.filter(e => keys.includes(e));
  console.log(properties, arr);
  let p: { [key: string]: any } = {};
  arr.map((key: string) => {
    p[key] = schema.properties![key];
  });
  schema.properties = p;
  return schema;
};
export { StColumnsConfigSchema, StColumnsConfigUi, StColumnsConfigKeys, FilterStColumnsConfigSchema, StColumnsConfigDefaultKeys };
