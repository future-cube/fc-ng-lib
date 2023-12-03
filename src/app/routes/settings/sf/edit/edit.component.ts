import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { STData } from '@delon/abc/st';
import { SFCheckboxWidgetSchema, SFComponent, SFSchema, SFSchemaEnum, SFUISchema } from '@delon/form';
import { FcListPickerOptions } from '@future-cube/ng-lib/components/list-picker/list-picker.options';
import { AppHelperService } from '@future-cube/ng-lib/services';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { of, Subject, debounceTime, distinctUntilChanged } from 'rxjs';

import * as EditSfSchemaConfig from './config';
import PreviewConfig from './config-base';
import ConfigPropertie from './config-propertie';
import ConfigPropertieUi from './config-propertie-ui';
import ConfigUi from './config-ui';

// @link https://blog.csdn.net/qq_64436918/article/details/127899005 ES6数组常用方法

@Component({
  selector: 'app-settings-st-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class SettingsSfEditComponent implements OnInit {
  // 防抖
  private getDataTerms = new Subject<string>();

  // 预览表单组件
  @ViewChild('sfPreview') sfPreview!: SFComponent;
  previewSchema: SFSchema = { properties: {}, required: [] };
  previewUi: SFUISchema = {
    '*': { grid: { gutter: 24, span: 12 }, spanLabelFixed: 120 }
  };

  // 表单配置组件,用于设置表单的配置
  @ViewChild('sfConfigBase') sfConfigBase!: SFComponent;
  configBaseSchema = PreviewConfig.schema;
  configBaseUi = PreviewConfig.ui;

  // 表单UI组件,用于设置表单的UI
  @ViewChild('sfConfigUi') sfConfigUi!: SFComponent;
  configUiSchema: SFSchema = ConfigUi.schema;
  configUiUi: SFUISchema = ConfigUi.ui;

  // 字段结构配置器
  @ViewChild('sfConfigPropertie') sfConfigPropertie!: SFComponent;
  configPropertieSchema: SFSchema = ConfigPropertie.schema;
  configPropertieUi: SFUISchema = ConfigPropertie.ui;

  // 字段结构配置器
  @ViewChild('sfConfigPropertieUi') sfConfigPropertieUi!: SFComponent;
  configPropertieUiSchema: SFSchema = ConfigPropertieUi.schema;
  configPropertieUiUi: SFUISchema = ConfigPropertieUi.ui;

  // 存储指定表的列信息做为备选项(从后台获取表字段并存下来)
  options: STData[] = [];

  // other
  schemas: any[] = []; // 表格结构,存储时,转为字符串形式.(前端,预览表单的结构)
  ui: any = {}; // 表格UI,存储时,转为字符串形式.(前端,预览表单的结构)
  config: any = {}; //表格配置,存储时,转为字符串形式.(前端,预览表单的结构)

  // 请求配置信息接口地址
  url = '/system/sf/config/view';

  // 基础信息表单
  baseSchema: SFSchema = {
    properties: {
      title: { type: 'string', title: '名称' },
      token: { type: 'string', title: '令牌' },
      desc: { type: 'string', title: '说明' },
      status: {
        type: 'number',
        default: 1,
        enum: [
          { label: '有效', value: 1 },
          { label: '无效', value: 0 }
        ],
        title: '状态'
      }
    }
  };
  baseUi: SFUISchema = {};

  showEdit = false; // 显示编辑基本信息
  item: any = {}; // 存储当前配置记录的信息

  requiredList: any[] = [];

  // 配置字段结构配置器的可用项
  @ViewChild('sfSchemaKeys') sfSchemaKeys!: SFComponent;

  // 以上为已使用的内容
  @Input() record!: STData;
  editSchemaIndex?: number = undefined; // 是否显示编辑列属性的表单,设置为undefined时不显示
  schemakeys: string[] = EditSfSchemaConfig.defaultKeys; // 默认启用哪些属性

  // 设置启用哪些属性的表单
  schemaKeySchema: SFSchema = {
    properties: {
      keys: {
        type: 'string',
        title: '',
        default: this.schemakeys,
        ui: {
          asyncData: () => {
            const properties = ConfigPropertie.schema.properties!['value']!.properties!;
            const data = this.appHelper.sfHelper.convertToEnum(properties, 'value.title', 'key');
            return of(data);
          },
          widget: 'checkbox',
          styleType: 'button',
          spanControl: 24,
          grid: { span: 24 },
          spanLabelFixed: 1, // @todo 此处,样式有问题
          span: 6, // 指定每一项 4 个单元的布局
          change: (res: boolean | SFSchemaEnum[]) => {
            const keys = this.sfSchemaKeys.value['keys'];
            // 让下方的配置器只使用所选的有效属性.
            this.resetSfSchemasConfigSchema(keys);
          }
        } as SFCheckboxWidgetSchema
      }
    },
    ui: {
      grid: { span: 24 }
    }
  };

  constructor(public appHelper: AppHelperService, private drawerRef: NzDrawerRef, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadData();
    this.getDataTerms
      .pipe(
        // 请求防抖 300毫秒
        debounceTime(300),
        // 等待，直到搜索内容发生了变化。
        distinctUntilChanged()
      )
      .subscribe(term => {
        this.resetSfSchema();
      });
  }

  // 这个是由原来的表单,根据指定属性来配置哪些属性可用.
  resetSfSchemasConfigSchema = (keys: string[]): void => {
    //
    this.configPropertieSchema = ConfigPropertie.getSFSchema(keys);
    // 设置字段属性配置器的有效属性
    this.sfConfigPropertie.refreshSchema(this.configPropertieSchema);
  };

  // 刷新表单预览
  resetSfSchema = () => {
    console.log('当前和数据库保质一致的数据', this.schemas);
    // 将后台数据转换为表单结构
    EditSfSchemaConfig.dataToSchema(this.previewSchema, this.schemas);

    // 将后台数据转换为表单结构
    this.previewUi['*'] = this.ui;

    // 重载表单结构
    this.sfPreview.refreshSchema(this.previewSchema, this.previewUi);
  };

  // 加载指定表格的配置信息
  loadData() {
    this.appHelper.http
      .get('/system/sf/config/view', {
        id: this.record['id']
      })
      .subscribe((res: any) => {
        this.item = res;
        this.schemas = res.schemas ? JSON.parse(res.schemas) : [];
        this.ui = res.ui ? JSON.parse(res.ui) : [];
        this.config = res.config ? JSON.parse(res.config) : [];
        this.resetSfSchema();
      });
  }

  // 保存表格基本配置信息
  save($event: { [key: string]: any }) {
    const { schemas, ...value } = $event;
    this.appHelper.http.put('/system/sf/config/update', value, { id: this.record['id'] }).subscribe((res: any) => {
      this.item = res;
      this.appHelper.msg.success('信息已更新');
      this.showEdit = false;
    });
  }

  // 把表单配置信息保存到数据库中
  sfPreviewSaveSchema() {
    console.log(this.ui, this.config);
    this.appHelper.http
      .put(
        '/system/sf/config/update',
        { schemas: JSON.stringify(this.schemas), ui: JSON.stringify(this.ui), config: JSON.stringify(this.config) },
        { id: this.record['id'] }
      )
      .subscribe((res: any) => {
        this.appHelper.msg.success('信息已更新');
      });
  }
  // 验证预览表单
  sfPreviewValidator() {
    // this.sfPreview.validator();
    if (this.sfPreview.valid) {
      this.appHelper.msg.success(`表单值为：${JSON.stringify(this.sfPreview.value)}`);
    } else {
      this.appHelper.msg.success('请查检录入信息是否正确');
    }
  }

  // 刷新预览表单的配置
  sfConfigBaseChange(event: any) {
    const p = event.path.slice(1);
    this.config[p] = event.value[p];
    this.resetSfSchema();
  }

  // 刷新预览表单的布局
  sfConfigUiChange(event: any) {
    this.ui = event;
    this.getDataTerms.next(event); // 做个防抖
  }

  // 从表的字段信息加载备选列信息
  loadColumnFromTable() {
    const params: FcListPickerOptions = {
      schema: {
        properties: { TABLE_NAME: { title: '表名', type: 'string' } }
      },
      columns: [
        {
          title: '编号',
          index: 'id',
          width: '100px'
        },
        {
          title: '表',
          index: 'TABLE_NAME'
        },
        {
          title: '状态',
          index: 'status',
          width: '100px'
        }
      ],
      // 加载表格地址
      url: 'system/database/table/list'
    };
    this.appHelper.listPicker.create(params).subscribe((res: any) => {
      this.appHelper.http.get('system/database/column/list', { tableName: res['TABLE_NAME'], ps: 999 }).subscribe((res: any) => {
        this.options = res.items;
      });
    });
  }

  // 添加一个空白属性
  addEmptySchema() {
    const rand = Math.floor(Math.random() * 89999999) + 10000000;
    this.schemas.push({
      key: `r${rand}`,
      value: { title: `随机${rand}`, type: 'string' }
    });
    this.resetSfSchema();
  }

  // 从指定表的字段中,快速将指定的字段移入可选列
  addSchema(option: STData) {
    const title = option['title'] || option['COLUMN_COMMENT'] || option['COLUMN_NAME'];
    this.schemas.push({
      key: option['COLUMN_NAME'],
      value: { title: title, type: 'string' }
    });
    this.resetSfSchema();
  }
  // 从备选列中移除指定列配置
  removeSchema(i: number) {
    this.schemas.splice(i, 1);
    this.resetSfSchema();
  }

  // 把当前字段的属性更新到预览信息中,此时未存储到后端
  saveSchemaConfig() {
    const $event = this.sfConfigPropertie.value as { key: string; value: { [key: string]: any } };
    this.schemas[this.editSchemaIndex!] = $event;
    this.editSchemaIndex = undefined;
    this.resetSfSchema();
  }

  // 点击编辑列后,显示列信息编辑器
  editSchemaConfig(i: number) {
    if (this.editSchemaIndex !== undefined && this.editSchemaIndex === i) {
      this.editSchemaIndex = undefined;
      return;
    }
    this.resetSfSchemasConfigSchema(this.schemakeys);
    this.editSchemaIndex = i;
  }

  // 拖动以排序列
  drag(event: CdkDragDrop<string[]>) {
    //如果在同意容器内移動
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    //如果在不同容器中拖动
    else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.resetSfSchema();
  }
}
