import { Component, OnInit, ViewChild } from '@angular/core';
import { STComponent, STColumn } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';
import { AppHelperService } from '@future-cube/ng-lib/services';

@Component({
  selector: 'app-doc-list',
  templateUrl: './list.component.html'
})
export class DocListComponent implements OnInit {
  @ViewChild(STComponent) st!: STComponent;
  url = 'system/doc/list?sort=topId,rank.desc';
  columns = [{ title: 'loading' }];
  columns_extend = {
    title: {
      type: 'link',
      click: (record: any) => {
        console.log(record);
        return `/doc/edit/${record.id}`;
      }
    } as STColumn,
    status: {
      format: (i: any, col: any, index: any) => {
        return i.status ? '有效' : '无效';
      }
    }
  };
  constructor(public appHelper: AppHelperService) {}

  ngOnInit(): void {
    this.appHelper.stHelper.getColumns('doc_column_config', this.columns_extend).subscribe(res => {
      this.st.resetColumns({ columns: res, emitReload: true });
    });
  }
}
