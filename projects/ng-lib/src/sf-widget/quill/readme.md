# 挂件使用示例

``` typescript
import { SfQuillConfig } from '@future-cube/ng-lib-sf-widget';

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
