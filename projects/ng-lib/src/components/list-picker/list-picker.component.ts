import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { STComponent, STColumn, STData, STReq, STChange } from '@delon/abc/st';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'comp-list-picker',
  templateUrl: './list-picker.component.html',
  styleUrls: ['./list-picker.component.less'],
  styles: [
    `
      input {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        transition: all 0.3s;
        padding: 6px;
      }
    `
  ]
})
export class FcListPickerComponent implements OnInit {
  @Input() title?: string; // 标题
  @Input() url!: string; // 请求数据接口
  @Input() schema?: SFSchema; // 表单结构
  @Input() ui?: SFUISchema; //表单ui
  @Input() params: any; // 请求表格数据时的参数
  @Input() columns!: STColumn[]; // 表格结构
  @Input() scroll: { y?: string; x?: string } = { x: '300px' };
  @Input() ps: number = 20;
  @ViewChild('st', { static: false }) st!: STComponent;
  @ViewChild('sf', { static: false }) sf!: STComponent;
  data!: any[]; // 返回的数据

  constructor(private modalRef: NzModalRef) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // 载入列表加载接口地址
    // 添加选择框列
    const selectColumnTitle = '编号';
    const selectColumnName = 'sid';
    this.columns = [{ type: 'radio', width: 30 }, ...this.columns];
  }

  change(ret: STChange): void {
    console.log(ret);
    // 点选选择框
    if (ret.type === 'radio') {
      this.data = ret.radio;
    }
    // 点选行
    if (ret.type === 'click') {
      this.st.clearRadio();
      this.st.setRow(ret.click!.index!, { checked: true });
      this.data = ret.click!.item;
    }
  }
  cancel() {
    this.modalRef.close(undefined);
  }
  ok() {
    this.modalRef.close(this.data);
  }
  dataChange(data: STData[]): STData[] {
    console.log(data);
    return data.map((i, index) => {
      // i.disabled = index === 0;
      return i;
    });
  }
}
