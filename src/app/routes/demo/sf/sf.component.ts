import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SFComponent, SFRadioWidgetSchema, SFSchema } from '@delon/form';
import { Nl2brPipe } from '@future-cube/ng-lib/pipes';
import { AppHelperService } from '@future-cube/ng-lib/services';
import { SfQuillConfig } from '@future-cube/ng-lib/sf-widget';

@Component({
  selector: 'app-sf',
  templateUrl: './sf.component.html',
  providers: [Nl2brPipe],
  styles: []
})
export class SfComponent implements OnInit {
  @ViewChild('sf') sf!: SFComponent;
  data = {
    title: 'xing.koo@gmail.com',
    content: '',
    delta: '',
    status: 1
  };
  id: number | string = '';
  schema: SFSchema = {
    properties: {
      title: {
        type: 'string',
        title: '标题',
        maxLength: 20
      },
      content: {
        type: 'string',
        minLength: 5,
        ui: {
          debug: true,
          widget: 'quill',
          delta: 'delta',
          config: {
            // placeholder: '开始输入内容...',
            required: true,
            minLength: 5,
            styles: { minHeight: '450px' }
          } as SfQuillConfig,
          change: (value: any) => {
            this.sf.validator();
            this.cdr.detectChanges();
          }
        }
      },
      delta: {
        type: 'string',
        ui: {
          widget: 'text'
        }
      },
      status: {
        type: 'number',
        title: '状态',
        enum: [0, 1],
        ui: {
          widget: 'radio',
          styleType: 'button',
          buttonStyle: 'solid'
        } as SFRadioWidgetSchema
      }
    },
    required: ['content', 'title']
  };
  constructor(public sanitizer: DomSanitizer, private cdr: ChangeDetectorRef, private appHelper: AppHelperService) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
  submit(value: any) {
    // this.sf.validator();
    // console.log(this.sf, this.sf.formData, value, this.sf.valid);
    // return;
    if (!this.sf.valid) {
      return;
    }
    if (!this.id) {
      this.appHelper.http.post('/system/sf/create', value).subscribe((res: any) => {
        this.id = res.data.id;
      });
    } else {
      this.appHelper.http.put('/system/sf/update', value, { id: this.id }).subscribe((res: any) => {
        this.id = res.data.id;
      });
    }
  }
  test1() {
    this.data = {
      title: 'xing.koo@gmail.com',
      content: 'asdfadsfasdfadsf',
      delta: '',
      status: 0
    };
  }
  test2() {
    this.data['content'] = 'lksalflkaslk';
  }
  test3() {
    this.data = { ...this.data, ...{ content: 'lksalflkaslk' } };
  }

  load(id: number | string) {
    this.appHelper.http.get('/system/sf/view', { id: id }).subscribe((res: any) => {
      console.log(res);
      this.data = res.data;
      // this.cdr.detectChanges();
    });
  }
}
