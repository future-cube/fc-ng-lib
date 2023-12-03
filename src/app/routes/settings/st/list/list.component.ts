import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, STData } from '@delon/abc/st';
import { SFObjectWidgetSchema, SFRadioWidgetSchema, SFSchema, SFSchemaEnumType, SFUISchema } from '@delon/form';
import { ModalHelper, ModalHelperOptions, _HttpClient } from '@delon/theme';
import { FcFormCreatorUpdateConfig } from '@future-cube/ng-lib/components/form-creator';
import { AppHelperService } from '@future-cube/ng-lib/services';
import { map, filter } from 'rxjs';

import { SettingsStEditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-settings-st-list',
  templateUrl: './list.component.html',
  styles: [
    `
      :host ::ng-deep {
        .ant-row .ant-col {
          a {
            display: none;
            margin-left: 8px;
          }
          &:hover {
            a {
              display: inline-block;
            }
          }
        }
      }
    `
  ]
})
export class SettingsStListComponent implements OnInit {
  @ViewChild(STComponent) st!: STComponent;
  url = '/system/st/config/list';
  no_register_table: any;
  columns = null;
  columns_extend: { [key: string]: STColumn } = {};
  otherColumn: STColumn[] = [
    {
      title: '操作',
      width: 160,
      index: 19,
      fixed: 'right',
      className: 'text-center',
      buttons: [
        {
          text: '编辑',
          type: 'link',
          click: (record: STData, modal?: any, instance?: STComponent) => {
            this.edit(record);
          }
        },
        {
          text: '配置',
          type: 'link',
          click: (record: STData, modal?: any, instance?: STComponent) => {
            this.config(record);
          }
        }
      ]
    }
  ];
  searchSchema: SFSchema = {
    properties: {
      TABLE_NAME: { type: 'string', title: '表格名' }
    }
  };
  constructor(public appHelper: AppHelperService) {}

  ngOnInit(): void {
    this.appHelper.stHelper.getColumns('st_column_config', this.columns_extend, this.otherColumn).subscribe((res: any) => {
      console.log(res);
      this.columns = res;
      this.st.resetColumns({ columns: res, emitReload: true });
    });
  }

  process = (data: STData[], rawData?: any): STData[] => {
    this.config(data[3]);
    return data;
  };

  // 编辑表格配置
  edit(record: STData) {
    // 基础信息表单
    const sf: SFSchema = {
      properties: {
        title: { type: 'string', title: '名称' },
        token: { type: 'string', title: '令牌' },
        desc: { type: 'string', title: '说明' },
        status: {
          type: 'number',
          default: 1,
          enum: [
            { label: '有效', value: 1 },
            { label: '无效', value: 0 }
          ],
          title: '状态'
        }
      }
    };
    const ui: SFUISchema = {};
    const config: FcFormCreatorUpdateConfig = {
      get_url: 'system/st/config/view',
      pkName: 'id',
      schema: sf,
      ui: ui,
      save_url: 'system/st/config/update'
    };
    const options: ModalHelperOptions = {};
    this.appHelper.sfHelper.update('修改信息', record, config, options).subscribe(() => {
      this.st.reload();
    });
  }

  // 编辑表格配置
  config(record: STData) {
    this.appHelper.drawer
      .create(
        `${record['title']} ( ${record['token'] || ' / '} ) - 表格配置信息生成`,
        SettingsStEditComponent,
        { record },
        { size: 'lg', drawerOptions: { nzPlacement: 'right', nzWidth: '100%', nzBodyStyle: { paddingTop: '8px' } } }
      )
      // .pipe(filter(w => w !== undefined))
      .subscribe((res: any) => {
        console.log(123);
        this.st.reload();
      });
  }
}
