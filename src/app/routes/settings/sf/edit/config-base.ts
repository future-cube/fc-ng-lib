// 表单基础配置
import { FormProperty, SFSchema, SFUISchema } from '@delon/form';

const checkConfigCallback = (attribute: string) => {
  return {
    available: (value: any, property: FormProperty) => {
      return Array.isArray(value) && !!~value.findIndex(v => v === attribute);
    }
  };
};

// 修改预览表单配置的结构
const schema: SFSchema = {
  properties: {
    alert: {
      title: '增强',
      type: 'string',
      default: '后续可以增加是否从指定接口获取数据'
    },
    available: {
      title: '自定义配置项',
      type: 'string',
      default: ['mode', 'layout'],
      enum: [
        { label: '表单格式', value: 'mode' },
        { label: '布局', value: 'layout' },
        { label: '自动完成', value: 'autocomplete' },
        { label: '立即呈现错误', value: 'firstVisual' },
        { label: '实时校验', value: 'liveValidate' },
        { label: '禁用', value: 'disabled' },
        { label: '加载中', value: 'loading' },
        { label: '不显示冒号', value: 'noColon' },
        { label: '是否紧凑', value: 'compact' },
        { label: '清理数据', value: 'cleanValue' },
        { label: '延迟渲染', value: 'delay' }
      ]
    },
    mode: {
      title: '表单模式',
      type: 'string',
      enum: [
        { label: '默认', value: 'default' },
        { label: '搜索', value: 'search' },
        { label: '编辑', value: 'edit' }
      ],
      default: 'default',
      description: '搜索及编辑模式下,立即呈现错误及实时校验无需设置.'
    },
    layout: {
      title: '布局',
      type: 'string',
      enum: [
        { label: '水平', value: 'horizontal' },
        { label: '垂直', value: 'vertical' },
        { label: '行内', value: 'inline' }
      ],
      default: 'horizontal'
    },
    autocomplete: {
      title: '浏览器自动完成',
      type: 'string',
      enum: [
        { label: '默认', value: null },
        { label: '启用', value: 'on' },
        { label: '停用', value: 'off' }
      ],
      default: null
    },
    firstVisual: { title: '立即呈现错误', type: 'boolean', default: true },
    liveValidate: { title: '实时校验', type: 'boolean', default: true },
    disabled: { title: '禁用', type: 'boolean', default: false },
    loading: { title: '加载中', type: 'boolean', default: false },
    noColon: { title: '不显示冒号', type: 'boolean', default: false },
    compact: { title: '是否紧凑', type: 'boolean', default: false },
    cleanValue: { title: '清理数据', type: 'boolean', default: false },
    delay: { title: '延迟渲染', type: 'boolean', default: false }
  },
  required: []
};
// 修改预览表单配置的UI
const ui: SFUISchema = {
  '*': { grid: { xxl: 12, xl: 12, md: 24 }, spanLabelFixed: 130 },
  $alert: {
    widget: 'text',
    grid: { span: 24 }
  },
  $available: {
    widget: 'checkbox',
    checkAll: true,
    grid: { span: 24 }
  },
  $mode: {
    widget: 'radio',
    styleType: 'button',
    grid: { span: 24 },
    visibleIf: checkConfigCallback('mode'),
    desc:
      '优先级高于一切。' +
      'default 默认模式，什么也不做。' +
      'search 搜索模式，自动设置：layout: inline、firstVisual: false、liveValidate: false、button.submit: “搜索”。' +
      'edit 编辑模式，自动设置 layout: horizontal、firstVisual: false、liveValidate: true、button.submit: "保存"。'
  },
  $layout: {
    widget: 'radio',
    styleType: 'button',
    grid: { span: 24 },
    optionalHelp: '表单布局，等同 nzLayout， 水平、垂直、行内三种选项',
    visibleIf: checkConfigCallback('layout')
  },
  $autocomplete: {
    widget: 'radio',
    styleType: 'button',
    grid: { span: 24 },
    optionalHelp: '指定表单 autocomplete 值',
    visibleIf: checkConfigCallback('autocomplete')
  },
  $firstVisual: {
    optionalHelp: '是否立即呈现错误视觉',
    visibleIf: {
      mode: ['default'],
      available: (value: any, property: FormProperty) => {
        return Array.isArray(value) && !!~value.findIndex(v => v === 'firstVisual');
      }
    },
    visibleIfLogical: 'and'
  },
  $liveValidate: {
    optionalHelp: '是否实时校验，false 提交时检验',
    visibleIf: {
      mode: ['default'],
      available: (value: any, property: FormProperty) => {
        return Array.isArray(value) && !!~value.findIndex(v => v === 'liveValidate');
      }
    },
    visibleIfLogical: 'and'
  },
  $disabled: { optionalHelp: '是否禁用状态', visibleIf: checkConfigCallback('disabled') },
  $loading: { optionalHelp: '是否加载状态，当 true 重置按钮禁止状态，提交按钮加载状态', visibleIf: checkConfigCallback('loading') },
  $noColon: { optionalHelp: '是否不显示 label 后面的冒号', visibleIf: checkConfigCallback('noColon') },
  $compact: { optionalHelp: '是否紧凑', visibleIf: checkConfigCallback('compact') },
  $cleanValue: { optionalHelp: '是否清理未定义 Schema 的数据', visibleIf: checkConfigCallback('cleanValue') },
  $delay: { optionalHelp: '是否延迟渲染，需要手动调用 refreshSchema()', visibleIf: checkConfigCallback('delay') }
};
const ConfigBase = { schema, ui };
export default ConfigBase;
