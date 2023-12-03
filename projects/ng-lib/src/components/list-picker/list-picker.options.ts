import { STColumn } from '@delon/abc/st';
import { SFSchema, SFUISchema } from '@delon/form';

export interface FcListPickerOptions {
  title?: string; // 标题
  columns: STColumn[]; // 数据表格的列配置
  url: string; // 请求数据的接口地址
  params?: any; // 请求数据时的参数（同时会被用于搜索表格的值）
  schema?: SFSchema; // 搜索表单的结构
  ui?: SFUISchema; //搜索表单的ui
  ps?: number; //搜索表单的ui
  scroll?: { y?: string; x?: string };
}
