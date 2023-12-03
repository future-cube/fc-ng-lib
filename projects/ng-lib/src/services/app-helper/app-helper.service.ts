import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from '@delon/cache';
import { DrawerHelper, MenuService, ModalHelper, TitleService, _HttpClient } from '@delon/theme';
// @todo 此组件未使用，所以暂时没有设置在依赖中。
import { ArrayService, ScrollService } from '@delon/util';
import { FcListPickerService } from '@future-cube/ng-lib/components';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FcDrawerHelper } from '../drawer-helper';
import { FcEventsService } from '../events';
import { FcModalHelper } from '../modal-helper';
import { SFHelperService } from '../sf-helper';
import { STHelperService } from '../st-helper';

// import { FileHelperService } from '../file-helper';

@Injectable({ providedIn: 'root' })
export class AppHelperService {
  constructor(private injector: Injector) {}

  // msb
  public get msg(): NzMessageService {
    return this.injector.get(NzMessageService);
  }
  // public get fileHelper(): FileHelperService {
  //   return this.injector.get(FileHelperService);
  // }
  // http
  public get http(): _HttpClient {
    return this.injector.get(_HttpClient);
  }
  // 抽屉
  public get drawer(): DrawerHelper {
    return this.injector.get(DrawerHelper);
  }
  // 抽屉
  public get fcDrawer(): FcDrawerHelper {
    return this.injector.get(FcDrawerHelper);
  }
  // 弹窗
  public get modal(): ModalHelper {
    return this.injector.get(ModalHelper);
  }
  // 对话框服务
  public get nzModal(): NzModalService {
    return this.injector.get(NzModalService);
  }
  // 自定义弹窗
  public get fcModal(): FcModalHelper {
    return this.injector.get(FcModalHelper);
  }
  // 菜单
  public get menu(): MenuService {
    return this.injector.get(MenuService);
  }
  // 缓存
  public get cache(): CacheService {
    return this.injector.get(CacheService);
  }
  // 数据服务
  public get array(): ArrayService {
    return this.injector.get(ArrayService);
  }
  // 路由
  public get router(): Router {
    return this.injector.get(Router);
  }
  // 表单助手
  public get sfHelper(): SFHelperService {
    return this.injector.get(SFHelperService);
  }
  // 事件服务
  public get event(): FcEventsService {
    return this.injector.get(FcEventsService);
  }
  // 标题服务
  public get title(): TitleService {
    return this.injector.get(TitleService);
  }
  // 滚动条服务
  public get scrollService(): ScrollService {
    return this.injector.get(ScrollService);
  }
  // 表格列配置服务
  public get stHelper(): STHelperService {
    return this.injector.get(STHelperService);
  }

  // 创建一个列表选择器
  public get listPicker(): FcListPickerService {
    return this.injector.get(FcListPickerService);
  }

  /**
   *
   * @param module : string
   * @param url: string
   * @param params []|any 参数数组时，直接传参，对象时，通过url传参
   * @returns void
   */
  to(module: string, url: string, params?: any[] | { [key: string]: any }): void {
    const teamId: string = this.cache.getNone('teamId');
    if (module) {
      url = `/${module}/${teamId}/${url}`;
    } else {
      url = `/${url}`;
    }
    if (params === undefined) {
      this.router.navigate([url]);
      return;
    }
    if (Array.isArray(params)) {
      console.log([url, ...(params || [])]);
      this.router.navigate([url, ...(params || [])]);
    } else {
      console.log([url], { queryParams: params });
      this.router.navigate([url], { queryParams: params });
    }
  }
}
