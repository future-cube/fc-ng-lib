import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { STColumn, STComponent, STData } from '@delon/abc/st';
import { CacheService } from '@delon/cache';
import { _HttpClient } from '@delon/theme';
import { map, Observable, Observer, Subject, Subscription } from 'rxjs';
import { SCHEMA_API } from './st-helper.types';

const ServiceName = 'ST Helper Service';

@Injectable({ providedIn: 'root' })
export class STHelperService {
  // 请求列配置参数的接口地址
  url: string = 'system/sf-schema/schema';
  private columns: { [propName: string]: any } = {}; // 存储指定键值，避免重复从后端请求
  constructor(
    private injector: Injector,
    @Optional() @Inject(SCHEMA_API) schema_url?: string
  ) {
    if (schema_url) this.url = schema_url;
  }

  // http
  public get http(): _HttpClient {
    return this.injector.get(_HttpClient);
  }
  // 缓存,暂时未使用
  public get cache(): CacheService {
    return this.injector.get(CacheService);
  }

  public getColumns(
    key: string,
    extend?: { [key: string]: STColumn }
  ): Observable<any> {
    // 必需提供键名
    if (!key) {
      throw new Error(`[${ServiceName}] => 必需表明需要获取的表格配置键名.`);
    }
    // 缓存下来
    if (this.columns[key] === undefined) {
      this.columns[key] = this.http.get(this.url, { key });
    }
    return new Observable<any>((observer) => {
      if (extend === undefined) {
        this.columns[key].subscribe((columns: STColumn[]) => {
          observer.next(columns);
          observer.complete();
        });
        return;
      }
      this.columns[key].subscribe((columns: STColumn[]) => {
        columns.map((column: STColumn, index: number) => {
          const k: string = column.index!.toString();
          if (extend.hasOwnProperty(k)) {
            Object.assign(column, extend[k]);
          }
          return column;
        });
        observer.next(columns);
        observer.complete();
      });
    });
  }
}
