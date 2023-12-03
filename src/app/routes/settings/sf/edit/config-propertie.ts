// 字段属性配置
import { SFSchema, SFTextWidgetSchema, SFUISchema } from '@delon/form';
import { deepCopy } from '@delon/util';

import { getGrid, getGridUi, getHorizontallayout, getHorizontallayoutUi } from './common-ui';

// 修改字段属性的表单
const schema: SFSchema = {
  type: 'object',
  properties: {
    key: { type: 'string' },
    value: {
      type: 'object',
      properties: {
        type: { type: 'string', title: '数据类型', enum: ['number', 'string', 'boolean', 'object', 'array'] },
        required: { type: 'boolean', title: '是否必填项', default: false },
        title: { type: 'string', title: '标称名' },
        optional: { type: 'string', title: '标签可选信息' },
        optionalHelp: { type: 'string', title: '标签可选帮助' },
        placeholder: { type: 'string', title: '提示信息' },
        description: { type: 'string', title: '描述' },
        errors: { type: 'string', title: '错误信息' },
        enum: { type: 'string', title: '静态数据源' }
      }
    }
  },
  required: ['key', 'value']
};

// 修改字段属性的表单UI
const ui: SFUISchema = {
  '*': {
    grid: { span: 24 },
    spanLabelFixed: 100
  },
  $value: {
    $type: {
      widget: 'radio',
      styleType: 'button',
      grid: { span: 24 }
    },
    $errors: {
      widget: 'text',
      defaultText: '自定义错误信息,暂时交由前端处理'
    } as SFTextWidgetSchema
  }
};

// 设置指定的属性可配置
const getSFSchema = (keys: string[]): SFSchema => {
  const s = deepCopy(schema);
  // 重新把Value的结构变更为已过滤的可用属性
  s.properties!['value'].properties = getValidProperties(schema.properties!['value'].properties!, keys);
  return s;
};

/**
 * 从属性列表中筛选出指定的属性,以对象的方式返回,可以直接使用在SFSchema中
 *
 * @param properties 属性
 * @param keys 有效的key值列表
 * @returns { [key: string]: any }
 */
function getValidProperties(properties: { [key: string]: SFSchema }, keys: string[]): { [key: string]: any };

/**
 * 从属性列表中筛选出指定的属性,以数组的方式返回,用于列表出来做其他操作
 *
 * @param properties 属性
 * @param keys 有效的key值列表
 * @param type  返回数据类型
 * @returns  Array<{ [key: string]: any }>
 */
function getValidProperties(properties: { [key: string]: SFSchema }, keys: string[], type: 'array'): Array<{ [key: string]: any }>;
// 具体实现
function getValidProperties(
  properties: { [key: string]: SFSchema },
  keys: string[],
  type: 'object' | 'array' = 'object'
): { [key: string]: any } | Array<{ [key: string]: any }> {
  // 过滤后许可使用的属性名称列表
  const arr = Object.keys(properties).filter(e => keys.includes(e));
  // 存储所有的属性到新的对象中,稍后赋值回去
  if (type === 'object') {
    let p: { [key: string]: any } = {};
    arr.map((key: string) => {
      p[key] = properties![key];
    });
    return p;
  } else {
    let p: Array<{ [key: string]: any }> = [];
    arr.map((key: string) => {
      p.push(properties![key]);
    });
    return p;
  }
}
const ConfigPropertie = { schema, ui, getSFSchema, getValidProperties };
export default ConfigPropertie;
