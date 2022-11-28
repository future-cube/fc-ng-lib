import { Component, OnInit, ViewChild } from '@angular/core';
import { STComponent } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';
import { AppHelperService } from '@future-cube/theme';

@Component({
  selector: 'app-demo-table-columns',
  templateUrl: './table-columns.component.html'
})
export class DemoTableColumnsComponent implements OnInit {
  @ViewChild(STComponent) st!: STComponent;
  url = '/table/data';
  columns = [{ title: 'loading' }];
  columns_extend = {
    status: {
      format: (i: any, col: any, index: any) => {
        return i.status ? '存在' : '无效';
      }
    }
  };
  constructor(public appHelper: AppHelperService) {}

  ngOnInit(): void {
    this.appHelper.stHelper.getColumns('dev_table', this.columns_extend).subscribe(res => {
      this.st.resetColumns({ columns: res, emitReload: true });
    });
  }
}
