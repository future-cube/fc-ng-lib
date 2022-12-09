# 挂件使用示例

``` typescript
import { SfQuillConfig } from '@future-cube/theme';

schema: SFSchema = {
  properties: {
    content: {
      type: 'string',
      ui: {
        widget: 'quill',
        config: {} as SfQuillConfig,
        change: (value: any) => {}
      }
    },
  }
}
```
