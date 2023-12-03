import { SFSchema, SFUISchema } from '@delon/form';
export interface FcFormCreatorCreateConfig {
  // 表单结构
  schema: SFSchema;
  // 表单UI
  ui: SFUISchema;
  // 更新对象信息的url地址
  save_url?: string;
  // 向服务器提前数据时,额外的Request参数
  params?: { [key: string]: any; key?: any };
  // 当需要向服务器提交数据前,对数据进入处理
  beforeSave?: (value: any) => {};
  // 隐藏关闭按钮
  hideCloseBtn?: boolean;
  // 关闭按钮文本
  closeBtnText?: string;
  // 关闭按钮文本
  saveBtnText?: string;
}

export interface FcFormCreatorUpdateConfig extends FcFormCreatorCreateConfig {
  // 对象的主键名称
  pkName: string;
  // 获取对象信息的url地址
  get_url: string;
  // 允许保存时提供的属性,默认不限制
  allowSaveAttr?: string[];
  // 向服务器获取数据时,额外的Request参数
  query?: { [key: string]: any; key?: any };
  // 当从远程获取数据后,对数据进入处理
  afterInit?: (value: any) => {};
}
