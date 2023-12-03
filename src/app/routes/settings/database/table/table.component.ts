import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { STColumn, STComponent, STData } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { AppHelperService } from '@future-cube/ng-lib/services';

@Component({
  selector: 'app-settings-database-table',
  templateUrl: './table.component.html',
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
export class SettingsDatabaseTableComponent implements OnInit {
  @ViewChild(STComponent) st!: STComponent;
  @Input() record!: any;
  url = '/system/database/column/list';
  params: any = {};
  no_register_column: any;
  columns: STColumn[] = [
    { title: 'ID', index: 'id', width: 80, className: 'text-center', fixed: 'left' },
    {
      title: '状态',
      width: 80,
      className: 'text-center',
      fixed: 'left',
      index: '_COLUMN_TYPE',
      format(item, col, index) {
        return item._COLUMN_TYPE === item.COLUMN_TYPE ? '存在' : '<font class="text-red">不存在</font>';
      }
    },
    { title: '字段', index: 'COLUMN_NAME' },
    { title: '类型', index: 'COLUMN_TYPE' },
    { title: '说明', index: 'COLUMN_COMMENT' },
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
            this.syncColumn(record['COLUMN_NAME']);
          }
        }
      ]
    }
  ];
  searchSchema: SFSchema = {
    properties: {
      COLUMN_NAME: { type: 'string', title: '列名' }
    }
  };
  constructor(public appHelper: AppHelperService) {}

  ngOnInit(): void {
    this.params['tableName'] = this.record.TABLE_NAME;
    // this.appHelper.stHelper.getColumns('dev_table', this.columns_extend, this.otherColumn).subscribe((res: any) => {
    //   console.log(res);
    //   this.columns = res;
    //   this.st.resetColumns({ columns: res, emitReload: true });
    // });
    this.loadNoRegister();
  }

  process = (data: STData[], rawData?: any): STData[] => {
    return data;
  };

  add() {}

  loadNoRegister() {
    this.no_register_column = undefined;
    this.appHelper.http.get('/system/database/column/no-register', { tableName: this.record['TABLE_NAME'] }).subscribe((res: any) => {
      this.no_register_column = res.items;
    });
  }

  syncColumn(columnName?: string) {
    this.appHelper.http
      .post('/system/database/column/sync-column', { tableName: this.record['TABLE_NAME'], columnName })
      .subscribe((res: any) => {
        this.st.reload();
      });
  }

  importColumn(columnName?: string) {
    this.appHelper.http
      .post('/system/database/column/import', { tableName: this.record['TABLE_NAME'], columnName })
      .subscribe((res: any) => {
        this.loadNoRegister();
        this.st.reload();
        this.appHelper.msg.success('操作已完成');
      });
  }
  showTableDetail(record: STData) {}
}
