import { EventEmitter, Injectable, Injector, Input, Output } from '@angular/core';
import { ModalHelper, _HttpClient, ModalHelperOptions } from '@delon/theme';
import { deepMerge } from '@delon/util';

import { FcListPickerComponent } from './list-picker.component';
import { FcListPickerOptions } from './list-picker.options';

@Injectable({ providedIn: 'root' })
export class FcListPickerService {
  constructor(private injector: Injector) {}

  // 弹窗
  public get modal(): ModalHelper {
    return this.injector.get(ModalHelper);
  }
  // http
  public get http(): _HttpClient {
    return this.injector.get(_HttpClient);
  }
  create(params: FcListPickerOptions, options?: ModalHelperOptions) {
    let _options: ModalHelperOptions = {
      size: 'lg',
      /** 是否精准（默认：`true`），若返回值非空值（`null`或`undefined`）视为成功，否则视为错误 */
      exact: true
    };
    _options = deepMerge(_options, options);
    return this.modal.create(FcListPickerComponent, params, _options);
  }
}
