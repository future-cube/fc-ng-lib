import { Injectable, TemplateRef, Type } from '@angular/core';
import { ModalHelperOptions } from '@delon/theme';
import { deepMerge } from '@delon/util/other';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModalOptions, NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, Observer } from 'rxjs';

/**
 * 对话框辅助类
 */
@Injectable({ providedIn: 'root' })
export class FcModalHelper {
  subject?: NzModalRef;
  options?: ModalHelperOptions;

  constructor(private srv: NzModalService) {}

  /**
   * 构建一个对话框
   *
   * @param comp 组件
   * @param params 组件参数
   * @param options 额外参数
   */
  create(comp: TemplateRef<NzSafeAny> | Type<NzSafeAny>, params?: NzSafeAny, options?: ModalHelperOptions): Observable<NzSafeAny>;
  /**
   * 构建一个对话框
   *
   * @param comp 组件
   * @param params 组件参数
   * @param options 额外参数
   * @param notObs 如果为`true`,则返回当前对象,此时需手工调用`this.obs()`,在此之前,可通过`this.comp()`来获取组件后进行修改
   */
  create(
    comp: TemplateRef<NzSafeAny> | Type<NzSafeAny>,
    params?: NzSafeAny,
    options?: ModalHelperOptions,
    notObs?: true
  ): FcModalHelper | Observable<NzSafeAny>;

  /**
   * 构建一个对话框
   *
   * @param comp 组件
   * @param params 组件参数
   * @param options 额外参数
   * @param notObs
   *
   * @example
   * this.modalHelper.create(FormEditComponent, { i }).subscribe(res => this.load());
   * - 对于组件的成功&关闭的处理说明
   * - 成功，其中 `nzModalRef` 指目标组件在构造函数 `NzModalRef` 变量名
   * - this.nzModalRef.close(data);
   * - this.nzModalRef.close();
   * - 关闭
   * - this.nzModalRef.destroy();
   */
  create(
    comp: TemplateRef<NzSafeAny> | Type<NzSafeAny>,
    params?: NzSafeAny,
    options?: ModalHelperOptions,
    notObs?: true
  ): FcModalHelper | Observable<NzSafeAny> {
    this.options = deepMerge(
      {
        size: 'lg',
        exact: true,
        includeTabs: false
      },
      options
    );
    const { size, includeTabs, modalOptions } = this.options as ModalHelperOptions;
    let cls = '';
    let width = '';
    if (size) {
      if (typeof size === 'number') {
        width = `${size}px`;
      } else {
        cls = `modal-${size}`;
      }
    }
    if (includeTabs) {
      cls += ' modal-include-tabs';
    }
    if (modalOptions && modalOptions.nzWrapClassName) {
      cls += ` ${modalOptions.nzWrapClassName}`;
      delete modalOptions.nzWrapClassName;
    }
    const defaultOptions: ModalOptions = {
      nzWrapClassName: cls,
      nzContent: comp,
      nzWidth: width ? width : undefined,
      nzFooter: null,
      nzComponentParams: params
    };
    this.subject = this.srv.create({ ...defaultOptions, ...modalOptions });
    return notObs ? this : this.obs();
  }

  comp(): TemplateRef<NzSafeAny> | Type<NzSafeAny> {
    return this.subject?.getContentComponent();
  }

  obs(): Observable<NzSafeAny> {
    return new Observable((observer: Observer<NzSafeAny>) => {
      const afterClose$ = this.subject!.afterClose.subscribe((res: NzSafeAny) => {
        if (this.options!.exact === true) {
          if (res != null) {
            observer.next(res);
          }
        } else {
          observer.next(res);
        }
        observer.complete();
        afterClose$.unsubscribe();
      });
    });
  }

  /**
   * 构建静态框，点击蒙层不允许关闭
   * 默认返回OBS订阅对象
   *
   * @param comp 组件
   * @param params 组件参数
   * @param options 额外参数
   */
  static(comp: TemplateRef<NzSafeAny> | Type<NzSafeAny>, params?: NzSafeAny, options?: ModalHelperOptions): Observable<NzSafeAny>;

  /**
   * 构建静态框，点击蒙层不允许关闭
   * 默认返回OBS订阅对象
   *
   * @param comp 组件
   * @param params 组件参数
   * @param options 额外参数
   */
  static(comp: TemplateRef<NzSafeAny> | Type<NzSafeAny>, params?: NzSafeAny, options?: ModalHelperOptions, notObs?: true): FcModalHelper;
  /**
   * 构建静态框，点击蒙层不允许关闭
   *
   * @param comp 组件
   * @param params 组件参数
   * @param options 额外参数
   * @param notObs 如果为false,则返回当前对象,此时需手工调用`this.obs()`,在此之前,可通过`this.comp()`来获取组件后进行修改
   */
  static(
    comp: TemplateRef<NzSafeAny> | Type<NzSafeAny>,
    params?: NzSafeAny,
    options?: ModalHelperOptions,
    notObs?: true
  ): FcModalHelper | Observable<NzSafeAny> {
    const modalOptions = {
      nzMaskClosable: false,
      ...(options && options.modalOptions)
    };
    return this.create(comp, params, { ...options, modalOptions }, notObs);
  }
}
