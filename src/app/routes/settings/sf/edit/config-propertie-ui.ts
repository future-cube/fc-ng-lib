// 字段属性UI配置
import { SFSchema, SFUISchema } from '@delon/form';

import { getGrid, getGridUi, getHorizontallayout, getHorizontallayoutUi } from './common-ui';

// 修改字段属性的表单
const schema: SFSchema = {
  type: 'object',
  properties: {
    ...getHorizontallayout(),
    ...getGrid()
  },
  required: []
};

// 修改字段属性的表单UI
const ui: SFUISchema = {
  '*': {
    grid: { span: 24 },
    spanLabelFixed: 120
  },
  ...getGridUi(),
  ...getHorizontallayoutUi()
};

const ConfigPropertieUi = { schema, ui };
export default ConfigPropertieUi;
