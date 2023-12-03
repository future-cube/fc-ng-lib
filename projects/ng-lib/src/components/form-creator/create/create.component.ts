import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { SFComponent, SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { AppHelperService } from '@future-cube/ng-lib/services';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { FcFormCreatorCreateConfig, FcFormCreatorUpdateConfig } from '../types';

@Component({
  selector: 'fc-form-creator-create',
  templateUrl: './create.component.html'
})
export class FcFormCreatorCreateComponent implements OnInit {
  @ViewChild('sf', { static: true }) sf!: SFComponent;
  // 传入的初始值
  @Input() record: any = {};
  // 配置信息
  @Input() config!: FcFormCreatorCreateConfig;
  // 从远程获取到的数据
  i: any;

  constructor(public http: _HttpClient, private modalRef: NzModalRef, public appHelper: AppHelperService) {}

  ngOnInit(): void {
    this.i = this.record;
  }

  // ngOnChanges(): void {}

  /**
   *
   * @todo 把提交数据独立出来。执行时，可直接返回数据，然后由发起方处理后，再行提交。
   */
  save(value: any): void {
    if (this.config.beforeSave) {
      value = this.config.beforeSave(value);
    }

    this.http.post(this.config.save_url!, { ...value }, this.config.params).subscribe((res: any) => {
      this.modalRef.close(res);
    });
  }

  close() {
    this.modalRef.close();
  }
}
