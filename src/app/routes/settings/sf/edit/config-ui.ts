// 表单UI配置
import { SFSchema, SFUISchema } from '@delon/form';

import { getGrid, getGridUi, getHorizontallayout, getHorizontallayoutUi } from './common-ui';
const schema: SFSchema = {
  properties: {
    debug: {
      title: '调试模式',
      type: 'boolean'
    },
    acl: {
      title: 'ACL权限',
      type: 'string'
    },
    ...getHorizontallayout(),
    ...getGrid()
  },
  required: []
};
// 修改预览表单UI的UI
const ui: SFUISchema = {
  '*': { spanLabelFixed: 120 },
  ...getGridUi(),
  ...getHorizontallayoutUi(),
  $acl: {
    optionalHelp: '比较复杂，以后处理'
  }
};
const ConfigUi = { schema, ui };
export default ConfigUi;
