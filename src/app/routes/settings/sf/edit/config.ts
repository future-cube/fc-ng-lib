import { SFSchema, SFUISchema } from '@delon/form';

// 字段的默认可配置属性
const defaultKeys: string[] = ['type', 'title', 'required', 'description', 'grid'];

/**
 * 从数据库中存储的数据,转换为表单结构
 *
 * @param schema
 * @param properties
 * @param boolean reserve 保留原数据
 */
function dataToSchema(schema: SFSchema, properties: any[], reserve = false) {
  if (!reserve) {
    schema.required = [];
    schema.properties = {};
  }
  properties.map(propertie => {
    const { required, ...value } = propertie.value;
    if (propertie.value.required) {
      schema.required!.push(propertie.key);
    }
    schema.properties![propertie.key] = value;
  });
}

export { dataToSchema, defaultKeys };
