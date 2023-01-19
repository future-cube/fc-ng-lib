import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { AppHelperService } from '@future-cube/theme';

@Component({
  selector: 'app-settings-database-list',
  templateUrl: './list.component.html'
})
export class SettingsDatabaseListComponent implements OnInit {
  @ViewChild(STComponent) st!: STComponent;
  url = '/system/database/list';
  columns = [{ title: 'loading' }];
  columns_extend = {
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
        console.log(i);
        return i.ENGINE === i._ENGINE ? i.ENGINE : `${i.ENGINE}<small>(${i._ENGINE})</small>`;
      }
    }
  };
  searchSchema: SFSchema = {
    properties: {
      TABLE_NAME: { type: 'string', title: 'Table Name' }
    }
  };
  constructor(public appHelper: AppHelperService) {}

  ngOnInit(): void {
    this.appHelper.stHelper.getColumns('dev_table', this.columns_extend).subscribe(res => {
      this.st.resetColumns({ columns: res, emitReload: true });
    });
  }
  add() {}
}
