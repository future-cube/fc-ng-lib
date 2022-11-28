/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable, Optional } from '@angular/core';
import { deepMergeKey } from '@delon/util/other';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';

import { FcConfig, FcConfigKey, FC_CONFIG } from './config.types';

@Injectable({ providedIn: 'root' })
export class FcConfigService {
  private config: FcConfig;

  constructor(@Optional() @Inject(FC_CONFIG) defaultConfig?: FcConfig) {
    this.config = { ...defaultConfig };
  }

  get<T extends FcConfigKey>(componentName: T, key?: string): FcConfig[T] {
    const res = ((this.config[componentName] as unknown as { [key: string]: unknown }) || {}) as NzSafeAny;
    return key ? { [key]: res[key] } : res;
  }

  merge<T extends FcConfigKey>(componentName: T, ...defaultValues: Array<FcConfig[T]>): FcConfig[T] {
    return deepMergeKey({}, true, ...defaultValues, this.get(componentName));
  }

  attach<T extends FcConfigKey>(componentThis: unknown, componentName: T, defaultValues: FcConfig[T]): void {
    Object.assign(componentThis as any, this.merge(componentName, defaultValues));
  }

  attachKey<T extends FcConfigKey>(componentThis: unknown, componentName: T, key: string): void {
    Object.assign(componentThis as any, this.get(componentName, key));
  }

  set<T extends FcConfigKey>(componentName: T, value: FcConfig[T]): void {
    this.config[componentName] = { ...this.config[componentName], ...value };
  }
}
