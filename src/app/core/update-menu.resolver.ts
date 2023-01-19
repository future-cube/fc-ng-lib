import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { MenuService, _HttpClient } from '@delon/theme';
import { ArrayService } from '@delon/util';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UpdateMenuResolver implements Resolve<any> {
  constructor(private router: Router, private injector: Injector, private http: _HttpClient, private arrayService: ArrayService) {}

  private get menuService(): MenuService {
    return this.injector.get(MenuService);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> {
    const moduleId = route.data['moduleId'];

    return new Promise((resolve, reject) => {
      this.getMenuByModuleId(moduleId).then((menus: any) => {
        console.log(menus);
        if (moduleId === 'doc') {
          this.getDocMenu().then((docMenu: any) => {
            menus = [...menus, ...docMenu];
            this.updateMenu(menus);
          });
        } else {
          this.updateMenu(menus);
        }

        resolve(true);
      });
    });
  }
  getDocMenu(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get('system/doc/list').subscribe((res: any) => {
        const menus: any = [];
        res.items.forEach((i: any, k: number) => {
          menus.push({
            text: i.title,
            link: `/doc/view/${i.id}`,
            icon: i.icon || 'anticon-table',
            id: i.id + 1000000,
            open: true,
            topId: i.topId ? i.topId + 1000000 : null
          });
        });
        resolve(menus);
      });
    });
  }
  updateMenu(menus: any) {
    console.log(menus);
    const m = this.arrayService.arrToTree(menus, {
      idMapName: 'id',
      parentIdMapName: 'topId'
    });
    this.menuService.clear();
    this.menuService.add(m);
    this.menuService.resume();
  }
  getMenuByModuleId(moduleId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let menus: any[] = [];

      this.http.get('system/menu/list', { category: moduleId, isMenu: 1, status: 1, ps: 9999 }).subscribe({
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
          resolve(menus);
        },
        complete: () => {
          reject([]);
        }
      });
    });
  }
}
