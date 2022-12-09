import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { MenuManageComponent } from '@future-cube/theme';

@Component({
  selector: 'app-settings-menu',
  styleUrls: ['./menu.component.less'],
  templateUrl: './menu.component.html'
})
export class SettingsMenuComponent implements OnInit, AfterViewInit {
  @ViewChild('fmm', { static: true }) fmm!: MenuManageComponent;

  // 显示到哪个级别，0为不限制
  level: number = 0;

  // 获取菜单列表的接口地址
  url: string = '/system/menu/list';

  clickTitle = (item: any) => {
    console.log(item);
  };

  // 重新载入菜单数据
  reload() {
    this.fmm.getData();
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngAfterViewInit(): void {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
}
