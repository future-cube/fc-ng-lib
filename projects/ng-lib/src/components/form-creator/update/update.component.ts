import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { SFComponent, SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { AppHelperService } from '@future-cube/ng-lib/services';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { FcFormCreatorCreateConfig, FcFormCreatorUpdateConfig } from '../types';

@Component({
  selector: 'fc-form-creator-update',
  templateUrl: './update.component.html'
})
export class FcFormCreatorUpdateComponent implements OnInit {
  @ViewChild('sf', { static: true }) sf!: SFComponent;
  // 传入的初始值
  @Input() record: any = {};
  // 配置信息
  @Input() config!: FcFormCreatorUpdateConfig;
  // 从远程获取到的数据
  i: any;

  constructor(public http: _HttpClient, private modalRef: NzModalRef, public appHelper: AppHelperService) {}

  ngOnInit(): void {
    this.http.get(this.config.get_url!, { id: this.record[this.config.pkName] }).subscribe((item: any) => {
      if (this.config.afterInit) {
        item = this.config.afterInit(item);
      }
      this.i = item;
    });
  }

  // ngOnChanges(): void {}

  /**
   *
   * @todo 把提交数据独立出来。执行时，可直接返回数据，然后由发起方处理后，再行提交。
   */
  save(value: any): void {
    // 如果有设置，则只允许列表中的属性，其他移除
    if (this.config.allowSaveAttr && this.config.allowSaveAttr.length > 0 && Object.keys(value).length > 0) {
      for (let v of Object.keys(value)) {
        if (this.config.allowSaveAttr.indexOf(v) === -1) {
          delete value[v];
        }
      }
    }
    // @todo 此处不应该直接把params填充到body中。应该是放置在get参数中。
    this.http
      .put(this.config.save_url!, { ...value }, { ...this.config.params, id: this.record[this.config.pkName] })
      .subscribe((res: any) => {
        this.modalRef.close(res);
      });
  }

  close() {
    this.modalRef.close();
  }
}
