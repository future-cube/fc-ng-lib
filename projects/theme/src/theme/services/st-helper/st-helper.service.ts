import { Inject, Injectable, InjectionToken, Injector, Optional } from '@angular/core';
import { STColumn, STComponent, STData } from '@delon/abc/st';
import { CacheService } from '@delon/cache';
import { _HttpClient } from '@delon/theme';
import { map, Observable, Observer, Subject, Subscription } from 'rxjs';

import { FcConfigService } from '../config';

const ServiceName = 'ST Helper Service';

export interface FcStOptions {
  url: string;
}

export const FC_ST_OPTIONS = new InjectionToken<FcStOptions>('fc-st-options');

@Injectable({ providedIn: 'root' })
export class STHelperService {
  // 请求列配置参数的接口地址(应该让调用的时候再配置，如果未配置，则提示用户配置)
  options: FcStOptions = {
    url: 'system/sf-schema/schema'
  };

  private columns: { [propName: string]: any } = {}; // 存储指定键值，避免重复从后端请求
  constructor(private injector: Injector, public fcs: FcConfigService) {
    console.log(fcs.get('st'));
    this.options = { ...this.options, ...fcs.get('st') };
    console.log(this.options);
  }

  // http
  public get http(): _HttpClient {
    return this.injector.get(_HttpClient);
  }
  // 缓存,暂时未使用
  public get cache(): CacheService {
    return this.injector.get(CacheService);
  }

  public getColumns(key: string, extend?: { [key: string]: STColumn }): Observable<any> {
    // 必需提供键名
    if (!key) {
      throw new Error(`[${ServiceName}] => 必需表明需要获取的表格配置键名.`);
    }
    // 缓存下来
    if (this.columns[key] === undefined) {
      console.log(this.options);
      this.columns[key] = this.http.get(this.options.url, { key });
      console.log(this.columns[key]);
    }
    return new Observable<any>(observer => {
      if (extend === undefined) {
        this.columns[key].subscribe((res: STColumn[]) => {
          console.log(res);
          observer.next(res);
          observer.complete();
        });
        return;
      }
      this.columns[key].subscribe((res: STColumn[]) => {
        res.map((column: STColumn, index: number) => {
          const k: string = column.index!.toString();
          if (extend.hasOwnProperty(k)) {
            Object.assign(column, extend[k]);
          }
          return column;
        });
        observer.next(res);
        observer.complete();
      });
    });
  }
}
