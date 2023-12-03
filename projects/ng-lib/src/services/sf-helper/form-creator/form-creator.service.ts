import { Injector } from '@angular/core';
import { SafeValue } from '@angular/platform-browser';
import { ModalHelperOptions } from '@delon/theme';
import {
  FcFormCreatorCreateComponent,
  FcFormCreatorCreateConfig,
  FcFormCreatorUpdateComponent,
  FcFormCreatorUpdateConfig
} from '@future-cube/ng-lib/components/form-creator';
import { AppHelperService } from '@future-cube/ng-lib/services';
import { map, Observable } from 'rxjs';

import { FcModalHelper } from '../../modal-helper';

export class FcFormCreatorService {
  constructor(protected injector: Injector) {}

  protected get appHelper(): AppHelperService {
    return this.injector.get(AppHelperService);
  }

  /**
   * 创建一个增加记录的表单生成器
   *
   * @param {string} title 窗口名称
   * @param {FcFormCreatorCreateConfig} config 新增数据的表单相关参数
   * @param {ModalHelperOptions} config 模态框参数
   * @param {true|undefined} notObs 不返回订阅对象.如果需要中间修改表单组件,可以设置为`true`,然后通过通过其内置的`comp()`方法获取并修改组件
   *
   * @return {*}
   * @memberof SFHelperService
   */
  public create(
    title: string,
    config: FcFormCreatorCreateConfig,
    options?: ModalHelperOptions,
    notObs?: true | undefined
  ): Observable<any> | FcModalHelper {
    return this.appHelper.fcModal.create(
      FcFormCreatorCreateComponent,
      config,
      { ...(options || {}), modalOptions: { nzTitle: title } },
      notObs
    );
  }

  /**
   * 创建一个更新记录的表单生成器,返回一个订阅
   *
   * @param {string} title 窗口名称
   * @param {*} record 更新对象的原始数据
   * @param {FcFormCreatorUpdateConfig} config 更新数据的表单相关参数
   * @param {ModalHelperOptions} config 模态框参数
   *
   * @return {*}
   * @memberof SFHelperService
   */
  update(title: string, record: any, config: FcFormCreatorUpdateConfig, options: ModalHelperOptions): Observable<SafeValue>;

  /**
   * 创建一个更新记录的表单生成器,返回一个订阅
   *
   * @param {string} title 窗口名称
   * @param {*} record 更新对象的原始数据
   * @param {FcFormCreatorUpdateConfig} config 更新数据的表单相关参数
   * @param {ModalHelperOptions} config 模态框参数
   * @param {true|undefined} notObs 不返回订阅对象.如果需要中间修改表单组件,可以设置为`true`,然后通过通过其内置的`comp()`方法获取并修改组件
   *
   * @return {*}
   * @memberof SFHelperService
   */
  update(title: string, record: any, config: FcFormCreatorUpdateConfig, options: ModalHelperOptions, notObs: true): FcModalHelper;
  update(
    title: string,
    record: any,
    config: FcFormCreatorUpdateConfig,
    options: ModalHelperOptions,
    notObs?: true
  ): FcModalHelper | Observable<SafeValue> {
    // 注意差别,此处是使用自定义的 MyModal方法创建的窗口.这种方式,可以在中间获取到组件对象,以便对动态表单进行操作
    // 不知道能不能和项目联系人中,使用回调方式处理数据,有没有差异.
    return this.appHelper.fcModal.create(
      FcFormCreatorUpdateComponent,
      { record, config },
      { ...(options || {}), modalOptions: { nzTitle: title } },
      notObs
    );
  }
}
