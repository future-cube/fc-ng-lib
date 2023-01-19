import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, STData } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { AppHelperService } from '@future-cube/theme';

@Component({
  selector: 'app-settings-database-list',
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
export class SettingsDatabaseListComponent implements OnInit {
  @ViewChild(STComponent) st!: STComponent;
  url = '/system/database/table/list';
  no_register_table: any;
  columns = null;
  columns_extend: { [key: string]: STColumn } = {
    exist: {
      format: (i: any, col: any, index: any) => {
        return i._ENGINE ? '是' : '<font style="color: red;">否</font>';
      }
    },
    status: {
      format: (i: any, col: any, index: any) => {
        return i.status ? '存在' : '无效';
      }
    },
    ENGINE: {
      format: (i: any, col: any, index: any) => {
        return i.ENGINE === i._ENGINE ? i.ENGINE : `<font class="font-red">≠</font>`;
      }
    }
  };
  otherColumn: STColumn[] = [
    {
      title: '操作',
      width: 100,
      index: 19,
      fixed: 'right',
      className: 'text-center',
      buttons: [
        {
          text: '同步',
          type: 'link',
          click: (record: STData, modal?: any, instance?: STComponent) => {
            this.syncTable(record['TABLE_NAME']);
          }
        }
      ]
    }
  ];
  searchSchema: SFSchema = {
    properties: {
      TABLE_NAME: { type: 'string', title: 'Table Name' }
    }
  };
  constructor(public appHelper: AppHelperService) {}

  ngOnInit(): void {
    this.appHelper.stHelper.getColumns('dev_table', this.columns_extend, this.otherColumn).subscribe((res: any) => {
      console.log(res);
      this.columns = res;
      this.st.resetColumns({ columns: res, emitReload: true });
    });
    this.loadNoRegister();
  }

  process = (data: STData[], rawData?: any): STData[] => {
    return data;
  };

  add() {}

  loadNoRegister() {
    this.no_register_table = undefined;
    this.appHelper.http.get('/system/database/table/no-register').subscribe((res: any) => {
      this.no_register_table = res.items;
    });
  }

  syncTable(tableName?: string) {
    this.appHelper.http.post('/system/database/table/sync-table', { tableName }).subscribe((res: any) => {
      this.st.reload();
    });
  }

  importTable(tableName?: string) {
    this.appHelper.http.post('/system/database/table/import', { tableName }).subscribe((res: any) => {
      this.loadNoRegister();
      this.st.reload();
      this.appHelper.msg.success('操作已完成');
    });
  }
}
