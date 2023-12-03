import { TemplateRef } from '@angular/core';
import { STColumnSafeType } from '@delon/abc/st';

export interface FcColume {
  /**
   * 列标题
   */
  title?: string;
  className?: string;
  /**
   * 列数据在数据项中对应的 key，支持 `a.b.c` 的嵌套写法，例如：
   * - `id`
   * - `price.market`
   * - `[ 'price', 'market' ]`
   */
  index: string;
  /**
   * 自定义渲染ID
   *
   * @example
   * <ng-template st-row="custom" let-item let-index="index" let-column="column">
   *  {{ c.title }}
   * </ng-template>
   */
  render?: string | TemplateRef<void> | TemplateRef<{ $implicit: any; index: number }>;
  /**
   * 列宽（数字型表示 `px` 值），例如：`100`、`10%`、`100px`
   *
   * **注意：** 若固定列必须是数字
   */
  width?: string | number;
  /**
   * Safe rendering type, default: `safeHtml`, Support [global config](https://ng-alain.com/docs/global-config)
   *
   * 安全渲染方式，默认：`safeHtml`，支持[全局配置](https://ng-alain.com/docs/global-config/zh)
   */
  safeType?: STColumnSafeType;
}
