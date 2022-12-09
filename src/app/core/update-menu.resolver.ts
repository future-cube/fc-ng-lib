import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Menu, MenuService, _HttpClient } from '@delon/theme';
import { ArrayService } from '@delon/util';
import { Observable } from 'rxjs';

import { menus as demoMenus } from './menus/demo';
import { menus as docMenus } from './menus/doc';

@Injectable({ providedIn: 'root' })
export class UpdateMenuResolver implements Resolve<any> {
  constructor(private router: Router, private injector: Injector, private http: _HttpClient, private arrayService: ArrayService) {}

  private get menuService(): MenuService {
    return this.injector.get(MenuService);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> {
    const moduleId = route.data['moduleId'];
    return this.getMenu(moduleId);
  }
  getMenu(moduleId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let menus: any[] = [];

      this.http.get('system/menu/list', { moduleId, ps: 9999 }).subscribe({
        next: (res: any) => {
          res.items.forEach((i: any, k: number) => {
            menus.push({
              text: i.title,
              link: i.code,
              icon: i.icon || 'anticon-table',
              id: i.nodeId,
              open: true,
              topId: i.topId
            });
          });
          console.log(menus);
          const m = this.arrayService.arrToTree(menus, {
            idMapName: 'id',
            parentIdMapName: 'topId'
          });
          this.menuService.clear();
          this.menuService.add(m);
          this.menuService.resume();
          resolve(true);
        },
        complete: () => {
          reject(false);
        }
      });
    });
  }
}
