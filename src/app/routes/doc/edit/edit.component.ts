import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SFComponent, SFRadioWidgetSchema, SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { AppHelperService } from '@future-cube/ng-lib/services';
import { SfQuillConfig } from '@future-cube/ng-lib/sf-widget';

@Component({
  selector: 'app-doc-edit',
  templateUrl: './edit.component.html'
})
export class DocEditComponent implements OnInit {
  @ViewChild('sf') sf!: SFComponent;
  id: number | string = '';
  data: any;
  schema: SFSchema = {
    properties: {
      title: {
        type: 'string',
        title: '标题',
        maxLength: 200
      },
      topId: {
        type: 'number',
        title: '父级'
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
            console.log(value);
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
      rank: {
        type: 'number',
        title: '权重'
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
  constructor(private cdr: ChangeDetectorRef, private appHelper: AppHelperService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((res: any) => {
      this.id = res.id;
      this.load(res.id);
    });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
  submit(value: any) {
    // this.sf.validator();
    // console.log(this.sf, value);
    // return;\'9
    if (!this.sf.valid) {
      this.appHelper.msg.error('表单验证不通过，请检查后再试');
      return;
    }
    if (!this.id) {
      this.appHelper.http.post('/system/doc/create', value).subscribe((res: any) => {
        this.id = res.id;
        this.router.navigateByUrl('/doc/list');
      });
    } else {
      this.appHelper.http.put('/system/doc/update', value, { id: this.id }).subscribe((res: any) => {
        this.id = res.id;
        this.router.navigateByUrl('/doc/list');
      });
    }
  }
  load(id: number | string) {
    this.appHelper.http.get('/system/doc/view', { id: id }).subscribe((res: any) => {
      this.data = res;
      // this.cdr.detectChanges();
    });
  }
}
