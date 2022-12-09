/**
 * QuillModule已在FcSfWidgetModule中导入并进行处理。
 * 稍后仅需在配置中，处理覆盖掉本模块的配置即可。
 *
 * @todo 具体使用组件时，可以再次传入参数，二次替换。
 *
 * import { QuillModule } from 'ngx-quill';
 * import { QuillConfigModule } from 'ngx-quill/config';
 */
import { FcMenuManageModule, FcThemeModule, FcSfWidgetModule } from '@future-cube/theme';

export const SHARED_FC_MODULES = [FcMenuManageModule, FcThemeModule, FcSfWidgetModule];
