import { Injectable, Injector } from '@angular/core';
import { SafeValue } from '@angular/platform-browser';
import { CacheService } from '@delon/cache';
import { SFComponent, SFSchema, SFSchemaEnum, SFUISchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { deepGet } from '@delon/util';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppHelperService, FcModalHelper as MyModalHelper } from '../';
import { FcModalHelper } from './../modal-helper/modal-helper.service';
import { FcFormCreatorService } from './form-creator/form-creator.service';

@Injectable({ providedIn: 'root' })
export class SFHelperService extends FcFormCreatorService {
  constructor(protected override injector: Injector) {
    super(injector);
  }

  protected override get appHelper(): AppHelperService {
    return this.injector.get(AppHelperService);
  }

  /************************************************
   * @todo 注意,需要把从后台获取到的数据,做一个简单的处理.
   *
    // 从value中移除不需要使用的属性.
    let {required, ...value} = $event.value;
    $event.value = value;
    $event.value = Object.keys(value).filter(e=>);
   *
   * 以下为封装的基础方法。再往下是封装的便捷方式
   *
   ************************************************/

  /**
   * 将数据异步返回
   *
   * @param value 任何数据
   */
  toAsync(value: any): Observable<any> {
    return of(value);
  }

  /**
   * 先从缓存获取数据，获取不到时从远程获取
   *
   * @param key 缓存键名
   * @param url 请求的接口地址
   * @param data 请求接口的参数
   * @param label 枚举值显示信息的键名
   * @param value 枚举值选中信息所键名
   * @param vlaueToString 是否强制转换为字符串
   */
  tryGetAsyncData(
    key: string,
    url: string,
    data: {},
    label: string = 'title',
    value: string = 'value',
    vlaueToString: boolean = true
  ): Observable<any> {
    const cache = this.appHelper.cache.getNone(key);
    if (cache === null) {
      return new Observable(obs => {
        this.getAsyncData(url, data, label, value, vlaueToString).subscribe(res => {
          this.appHelper.cache.set(key, res, { type: 's', expire: 60 * 60 * 24 * 7 });
          obs.next(res);
          obs.complete();
        });
      });
    }
    return of(cache);
  }

  /**
   * 通过远程请求加载下拉列表所需数据（此处可能需要添加一个缓存）
   *
   * @param url 请求的接口地址
   * @param data 请求接口的参数
   * @param label 枚举值显示信息的键名
   * @param value 枚举值选中信息所键名
   * @param vlaueToString 是否强制转换为字符串
   */
  getAsyncData(
    url: string,
    data: {},
    label: string = 'title',
    value: string = 'value',
    vlaueToString: boolean = true
  ): Observable<SFSchemaEnum[]> {
    return this.appHelper.http.get(url, data).pipe(
      map((res: any) => {
        const items: any[] = [];
        res.items.forEach((item: any) => {
          items.push({
            label: item[label],
            value: vlaueToString ? item[value].toString() : item[value]
          });
        });
        return items;
      })
    );
  }

  /**
   * 尝试设置一个表单属性的动态回调（暂时未使用起来
   */
  setAsyncData(sfs: SFSchema, propName: string, callback: Observable<SFSchemaEnum[]>): SFSchema {
    // 要求存在属性列表
    if (!sfs['schema'].properties) return sfs;
    // 获取当前要修改的属性
    let prop = sfs['schema'].properties![propName];
    // 如果属性不存在，则不处理
    if (!prop) return sfs;
    // 如果不存在视图属性，则初始化
    if (!prop.ui) prop.ui = {};
    // 一般情况下不会出现ui为字符串的情况
    if (typeof prop.ui === 'string') return sfs;
    // 分派动态请求方法
    prop.enum = [];
    prop.ui['asyncData'] = () => {
      return callback;
    };
    prop.ui['widget'] = 'select';
    // console.log(sfs);
    return sfs;
  }

  /**
   * 通过缓存请求加载下载列表所需数据。同步请求
   *
   * @param key 缓存键值
   * @param label 枚举显示信息所用键名
   * @param value 枚举选中信息所用键名
   * @param valueToString 是否强制转换为字符串
   */
  getDataFromCache(key: string, label: string = 'title', value: string = 'value', valueToString: boolean = true): SFSchemaEnum[] {
    const data: [] | null = this.appHelper.cache.getNone(key);
    if (data === null) {
      return [];
    }
    const items: SFSchemaEnum[] = [];
    data.forEach((item: any) => {
      items.push({
        label: item[label],
        value: valueToString ? item[value].toString() : item[value]
      });
    });
    return items;
  }

  /**
   * 重置表单指定属性的备选数据
   *
   * @todo 需要确认，reset方法，如两次值一样的情况下，是否不会刷新结构。
   *
   * @param schema 表单结构，将会更新指定的属性的enum值
   * @param sf 表单对象，如表单已存在，则刷新属性
   * @param propertyName 要重置的属性名称
   * @param e 要重置的枚举值
   * @param recoverValue 是否恢复原始数据
   */
  resetEnum(schema: SFSchema, sf: SFComponent, propertyName: string, e: SFSchemaEnum[], recoverValue: boolean = true): void {
    schema.properties![propertyName].enum = e;
    if (sf) {
      const property = sf.getProperty(`/${propertyName}`)!;
      const value = property.value;
      property.schema.enum = e;
      property.widget.setValue(null);
      if (recoverValue === true) {
        property.widget.setValue(value);
      }
      // property.widget.reset(recoverValue === true ? property.value : null);
    }
  }

  /**
   * 转换成表单使用的枚举对象的属性名为其他格式。
   * 示例，将{label: 'abc', value: '123'}转换成{title: 'abc', 'desc': '123'}
   *
   * @param sfEnum
   * @param l
   * @param v
   */
  transformFromEnum(sfEnum: SFSchemaEnum[], l: string = 'text', v: string = 'value'): SFSchemaEnum[] {
    return sfEnum.map((value: SFSchemaEnum, index: number, arr: SFSchemaEnum[]) => {
      let item: any = {};
      item[l] = value.label;
      item[v] = value.value;
      return item;
    });
  }

  /**
   * 将数组源转换为表单使用的枚举对象
   * 示例，将 [1, 2, true] 或者[{a:'1', b: '2'}, ...]
   *     转换成[{label: '1', 'value': 1}, {label: '2', 'value': 2}, {label: 'true', 'value': true}]
   *
   * @param source
   */
  convertToEnum(source: Array<boolean | string | number>): SFSchemaEnum[];
  /**
   * 将数组源转换为表单使用的枚举对象
   * 示例，将 [{a:'1', b: '2'}, ...]
   *     转换成[{label: '1', 'value': 1}, {label: '2', 'value': 2}, {label: 'true', 'value': true}]
   *
   * @param source
   * @param l label对应的属性名,支持a.b.c格式
   * @param v value对应的属性名,支持a.b.c格式
   */
  convertToEnum(
    source: Array<{ [key: string]: boolean | string | number | { [key: string]: boolean | string | number } }>,
    l?: string,
    v?: string
  ): SFSchemaEnum[];

  /**
   * 将数组源转换为表单使用的枚举对象
   * 示例，将 {a:'1', b: c:{d:'2'}, ...},
   *     转换成[{label: '1', 'value': 1}, {label: '2', 'value': 2}, {label: 'true', 'value': true}]
   *
   * @param l label对应的属性名,支持key, value, value.a.b.c方式
   * @param v value对应的属性名,支持key, value, value.a.b.c方式
   */
  convertToEnum(source: { [key: string]: any }, l?: string, v?: string): SFSchemaEnum[];
  /**
   * 将对象源转换为表单使用的枚举对象
   * 示例：将[{txt: 'abc', value: '123'}, {txt: 'abc', value: '123'}, {txt: 'abc', value: '123'}]
   *     转换成 [{label: 'abc', 'value': '123'}, {label: 'abc', 'value': '123'}, {label: 'abc', 'value': '123'}]
   *
   * @param source
   * @param l label对应的属性名,支持key, value, value.a.b.c方式
   * @param v value对应的属性名,支持key, value, value.a.b.c方式
   */
  convertToEnum(
    source: Array<boolean | string | number | { [key: string]: any }> | { [key: string]: any },
    l: string = 'text',
    v: string = 'value'
  ): SFSchemaEnum[] {
    if (Array.isArray(source)) {
      return source.map((value: { [key: string]: any } | boolean | string | number, index: number): any => {
        const item: any = {};
        if (typeof value === 'object') {
          item['label'] = deepGet(value, l).toString();
          item['value'] = deepGet(value, v);
        } else {
          item['label'] = value.toString();
          item['value'] = value;
        }
        return item;
      });
    } else {
      return Object.keys(source).map((key: string): any => {
        const temp: any = { key, value: source[key] };
        // console.log(temp);
        const item: any = {};
        item['label'] = deepGet(temp, l).toString();
        item['value'] = deepGet(temp, v);
        // console.log(item);
        return item;
      });
    }
  }

  /**
   * 更新小部件的单位属性。
   *
   * @param sf 表单组件
   * @param propName 需要更新的属性
   * @param unit 单位
   * @returns void
   */
  updateWidgetUnit(sf: SFComponent, propName: string, unit: string) {
    const prop = sf.getProperty(propName);
    if (!prop) return;
    const value = prop.value;
    prop.widget.ui['unit'] = unit;
    prop.widget.setValue(undefined);
    prop.widget.setValue(value);
  }

  /**
   * 封装好的异步省市区县联动异步数据请求
   *
   * @param nodeValue 起步结点，可以是多个
   * @param level 最小显示级数（包含）
   */
  public getDivisionCascaderData(nodeValue: string | string[], level: number = 1): Observable<any> {
    let parentId: string | string[];
    parentId = nodeValue;
    if (!Array.isArray(nodeValue)) {
      parentId = nodeValue ? [nodeValue] : [];
    }
    return new Observable(obs => {
      if (!parentId.toString()) {
        obs.next([]);
        obs.complete();
        return;
      }
      const cache_key = `site/division-children/${parentId.toString()}`;
      this.appHelper.cache
        .tryGet(
          cache_key,
          new Observable(observer => {
            this.appHelper.http
              .get('site/division-children', {
                parentId: parentId.toString(),
                ps: 999
              })
              .pipe(
                map((res: any) => {
                  const data: any[] = [];
                  res.items.forEach((i: any) => {
                    if (parentId.includes(i.parentId)) {
                      data.push({
                        value: i.divisionId,
                        label: i.divisionName,
                        level: i.divisionLevel,
                        parent: i.parentId,
                        isLeaf: false
                      });
                    }
                  });
                  return data;
                })
              )
              .subscribe((res: any) => {
                observer.next(res);
                observer.complete();
              });
          }),
          { type: 's', expire: 60 * 60 * 24 * 7 }
        )
        .pipe(
          map((items: any) => {
            items.forEach((i: any, k: string) => {
              items[k].isLeaf = i.level >= level;
            });
            return items;
          })
        )
        .subscribe((res: any) => {
          obs.next(res);
          obs.complete();
        });
    });
  }

  /**
   * 移除表单配置项（如果多处引用，需要尝试copy一个对象，以免一处修改影响多处）
   *
   * @param schema 表单结构
   * @param propertyName 属性名
   */
  public removeSFSProperty(schema: SFSchema, propertyName: string | string[]) {
    const items: string[] = typeof propertyName === 'string' ? [propertyName] : propertyName;
    for (let p of items) {
      delete schema['properties']![p];
    }
    // return schema;
  }
  /**
   * 移除表单视图配置项（如果多处引用，需要尝试copy一个对象，以免一处修改影响多处）
   *
   * @param schema 表单视图
   * @param propertyName 属性名，不带$号
   */
  public removeSFUiProperty(ui: SFUISchema, propertyName: string | string[]) {
    const items: string[] = typeof propertyName === 'string' ? [propertyName] : propertyName;
    for (let p of items) {
      if (p === '*') {
        delete ui['*'];
      } else {
        delete ui[`$${p}`];
      }
    }
    // return ui;
  }

  /**
   *
   * @param schema 表单结构
   * @param attributes 属性列表
   */
  public resetSFSRequired(schema: SFSchema, attributes: string[]) {
    schema.required = attributes;
    // return schema;
  }

  /************************************************
   *
   * 以下为固定枚举值的方法
   *
   ************************************************/

  /**
   * 开关类型Enum数据源，值为  0 或 1
   *
   * @param on 1状态对应的标签名称，默认：启用
   * @param off 0状态对应的标签名称，默认：信用
   */
  OnOffStatus(on: string = '启用', off: string = '停用'): any {
    return [
      { label: off, value: 0 },
      { label: on, value: 1 }
    ];
  }

  /************************************************
   *
   * 以下要移除
   *
   ************************************************/
  /**
   * 指定职位与模型的授权级别
   */
  DataRoleLevel(): SFSchemaEnum[] {
    return [
      { label: '本人可见', value: 1 },
      { label: '本人及下属', value: 2 },
      { label: '本部门(暂同本人及下属)', value: 3 },
      { label: '本部门及下级部门(暂同本人及下属)', value: 4 }
    ];
  }
  /**
   * 代理行团队角色
   */
  AgencyTeamRoleData(): SFSchemaEnum[] {
    return [
      // { value: 999, label: '创始人' },
      { value: 1, label: '成员' },
      { value: 0, label: '待确认' },
      { value: -1, label: '离职' }
    ];
  }

  // 团队分类数据
  TeamCategoryData(): SFSchemaEnum[] {
    return [
      { value: 'admin', label: '管理团队' },
      { value: 'agency', label: '代理行' },
      { value: 'lanlord', label: '业主' }
    ];
  }
}
