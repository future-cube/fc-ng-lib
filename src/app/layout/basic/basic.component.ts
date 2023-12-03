import { Component } from '@angular/core';
import { SettingsService, User } from '@delon/theme';
import { LayoutDefaultOptions } from '@delon/theme/layout-default';
import { environment } from '@env/environment';

@Component({
  selector: 'layout-basic',
  template: `
    <layout-default [options]="options" [asideUser]="asideUserTpl" [content]="contentTpl" [customError]="null">
      <layout-default-header-item direction="left">
        <a layout-default-header-item-trigger href="//github.com/future-cube/ng-lib" target="_blank">
          <i nz-icon nzType="github"></i>
        </a>
      </layout-default-header-item>
      <layout-default-header-item direction="left">
        <a layout-default-header-item-trigger href="//www.npmjs.com/package/@future-cube/ng-lib" target="_blank">
          <i nz-icon nzType="tags" nzTheme="outline"></i>
        </a>
      </layout-default-header-item>
      <layout-default-header-item direction="right">
        <a layout-default-header-item-trigger routerLink="/demo"> 演示 </a>
      </layout-default-header-item>
      <layout-default-header-item direction="right">
        <a layout-default-header-item-trigger routerLink="/doc"> 文档 </a>
      </layout-default-header-item>
      <layout-default-header-item direction="right">
        <a layout-default-header-item-trigger routerLink="/settings"> 设置 </a>
      </layout-default-header-item>
      <!-- <layout-default-header-item direction="right">
        <header-user></header-user>
      </layout-default-header-item> -->
      <ng-template #asideUserTpl>
        <!-- <div nz-dropdown nzTrigger="click" [nzDropdownMenu]="userMenu" class="alain-default__aside-user">
          <nz-avatar class="alain-default__aside-user-avatar" [nzSrc]="user.avatar"></nz-avatar>
          <div class="alain-default__aside-user-info">
            <strong>{{ user.name }}</strong>
            <p class="mb0">{{ user.email }}</p>
          </div>
        </div>
        <nz-dropdown-menu #userMenu="nzDropdownMenu">
          <ul nz-menu>
            <li nz-menu-item routerLink="/pro/account/center">{{ 'menu.account.center' | i18n }}</li>
            <li nz-menu-item routerLink="/pro/account/settings">{{ 'menu.account.settings' | i18n }}</li>
          </ul>
        </nz-dropdown-menu> -->
      </ng-template>
      <ng-template #contentTpl>
        <router-outlet></router-outlet>
      </ng-template>
    </layout-default>
  `
})
export class LayoutBasicComponent {
  options: LayoutDefaultOptions = {
    logoExpanded: `./assets/logo-full.svg`,
    logoCollapsed: `./assets/logo.svg`
  };
  searchToggleStatus = false;
  showSettingDrawer = !environment.production;
  get user(): User {
    return this.settings.user;
  }

  constructor(private settings: SettingsService) {}
}
