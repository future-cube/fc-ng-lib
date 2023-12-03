import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DrawerHelper, DrawerHelperOptions } from '@delon/theme';
import { deepMerge } from '@delon/util/other';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDrawerOptions, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { Observable, Observer } from 'rxjs';

/**
 * 对话框辅助类
 */
@Injectable({ providedIn: 'root' })
export class FcDrawerHelper {
  constructor(private injector: Injector) {}

  public get drawer(): DrawerHelper {
    return this.injector.get(DrawerHelper);
  }

  /**
   * 构建一个抽屉
   */
  create(
    title: string | TemplateRef<NzSafeAny> | undefined | null,
    comp:
      | TemplateRef<{
          $implicit: NzSafeAny;
          drawerRef: NzDrawerRef;
        }>
      | Type<NzSafeAny>,
    params?: NzSafeAny,
    options?: DrawerHelperOptions,
    extra?: string | TemplateRef<NzSafeAny>
  ): Observable<NzSafeAny> {
    console.log(typeof title);
    if (extra && typeof title === 'string') {
      // 123456
    }
    if (extra && typeof title === 'string') {
    }
    return this.drawer.create(title, comp, params, options);
  }

  /**
   * 构建一个抽屉，点击蒙层不允许关闭
   */
  static(
    title: string | TemplateRef<NzSafeAny> | undefined | null,
    comp:
      | TemplateRef<{
          $implicit: NzSafeAny;
          drawerRef: NzDrawerRef;
        }>
      | Type<NzSafeAny>,
    params?: NzSafeAny,
    options?: DrawerHelperOptions,
    extra?: string | TemplateRef<NzSafeAny> | undefined | null
  ): Observable<NzSafeAny> {
    const drawerOptions = {
      nzMaskClosable: false,
      ...(options && options.drawerOptions)
    };
    if (extra) {
    }
    return this.drawer.static(title, comp, params, { ...options, drawerOptions });
  }
}
