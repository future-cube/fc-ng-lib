import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, STData } from '@delon/abc/st';
import { SFCheckboxWidgetSchema, SFComponent, SFSchema, SFSchemaEnum, SFUISchema, SFValue } from '@delon/form';
import { FcListPickerOptions } from '@future-cube/ng-lib/components/list-picker/list-picker.options';
import { AppHelperService } from '@future-cube/ng-lib/services';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { filter, of } from 'rxjs';

import {
  StColumnsConfigKeys,
  StColumnsConfigSchema,
  FilterStColumnsConfigSchema,
  StColumnsConfigUi,
  StColumnsConfigDefaultKeys
} from './st.columns.config.schema';

@Component({
  selector: 'app-settings-st-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class SettingsStEditComponent implements OnInit {
  @ViewChild('sfBase') sfBase!: SFComponent;
  @ViewChild('sfColumnConfig') sfColumnConfig!: SFComponent;
  @ViewChild('sfColumnKeys') sfColumnKeys!: SFComponent;
  @ViewChild(STComponent) st!: STComponent;
  @Input() record!: STData;
  url = '/system/st/config/view'; // 请求配置信息接口地址
  options: STData[] = []; // 存储指定表的列信息做为备选项
  columns: any[] = []; // 表格结构,存储时,转为字符串形式.
  editColumnIndex?: number = undefined; // 是否显示编辑列属性的表单,设置为undefined时不显示
  columnSchema: SFSchema = StColumnsConfigSchema; // 修改列属性的表单
  columnUi: SFUISchema = StColumnsConfigUi; // 修改列属性的表单UI
  defaultColumnkeys: string[] = StColumnsConfigDefaultKeys; // 默认启用哪些属性

  // 设置启用哪些属性的表单
  columnKeySchema: SFSchema = {
    properties: {
      keys: {
        type: 'string',
        title: '有效属性',
        default: this.defaultColumnkeys,
        ui: {
          asyncData: () => of(StColumnsConfigKeys),
          widget: 'checkbox',
          styleType: 'button',
          span: 3, // 指定每一项 8 个单元的布局
          change: (res: boolean | SFSchemaEnum[]) => {
            const keys = this.sfColumnKeys.value['keys'];
            console.log(keys);
            this.resetStColumnsConfigSchema(keys);
          }
        } as SFCheckboxWidgetSchema
      },
      width: {
        type: 'string',
        title: '宽度数据类型',
        default: 'number',
        enum: ['number', 'string'],
        ui: {
          widget: 'radio',
          styleType: 'button',
          optional: '特别注意',
          optionalHelp: '由字符切换至数字格式时,请对值进行加减操作,以改变值的类型.否则可能还会存成数字,导致列宽不生效.',
          change: (res: SFValue) => {
            const v = this.sfColumnConfig.getProperty('/width')?.value;
            this.columnSchema.properties!['width'].type = res;
            this.sfColumnConfig.refreshSchema(this.columnSchema);
            this.sfColumnConfig.getProperty('/width')?.setValue(v, true);
          }
        }
      },
      ynTruthType: {
        type: 'string',
        title: '徽章化真值类型',
        default: 'number',
        enum: ['number', 'string', 'boolean'],
        ui: {
          widget: 'radio',
          styleType: 'button',
          optional: '特别注意',
          optionalHelp: '由字符切换至数字格式时,请对值进行加减操作,以改变值的类型.否则可能还会存成数字,导致列宽不生效.',
          change: (res: SFValue) => {
            let v = this.sfColumnConfig.getProperty('/yn/truth')?.value;
            switch (res) {
              case 'number':
                v = 1 * v;
                break;
              case 'string':
                v = v.toString();
                break;
              case 'boolean':
                v = v.toBoolean();
                break;
            }
            console.log(res);
            console.log(v);
            this.columnSchema.properties!['yn'].properties!['truth'].type = res;
            this.sfColumnConfig.refreshSchema(this.columnSchema);
            this.sfColumnConfig.getProperty('/yn/truth')?.setValue(v, true);
          }
        }
      }
    }
  };

  constructor(public appHelper: AppHelperService, private drawerRef: NzDrawerRef, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadData();
  }

  // 根据指定属性,配置当前表配置可使用哪些信息
  resetStColumnsConfigSchema = (keys: string[]): void => {
    this.columnSchema = FilterStColumnsConfigSchema(keys);
    console.log(this.columnSchema);
    this.sfColumnConfig.refreshSchema(this.columnSchema);
  };

  // 加载指定表格的配置信息
  loadData() {
    this.appHelper.http
      .get('/system/st/config/view', {
        id: this.record['id']
      })
      .subscribe((res: any) => {
        console.log(res.columns);
        this.columns = res.columns ? JSON.parse(res.columns) : [];
      });
  }

  // 把列配置信息保存到数据库中
  saveColumn() {
    this.appHelper.http
      .put('/system/st/config/update', { columns: JSON.stringify(this.columns) }, { id: this.record['id'] })
      .subscribe((res: any) => {
        this.appHelper.msg.success('信息已更新');
      });
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

  // 添加一个空白列
  addEmptyColumn() {
    this.columns.push({ title: '空白列' });
    this.st.resetColumns({ columns: this.columns });
  }

  // 从指定表的字段中,快速将指定的字段移入可选列
  addColumn(option: STData) {
    this.columns.push({ title: option['title'] || option['COLUMN_COMMENT'] || option['COLUMN_NAME'], index: option['COLUMN_NAME'] });
    this.st.resetColumns({ columns: this.columns });
  }

  // 点击编辑列后,显示列信息编辑器
  editColumnConfig(i: number) {
    if (this.editColumnIndex !== undefined) {
      this.editColumnIndex = undefined;
      return;
    }
    this.resetStColumnsConfigSchema(this.defaultColumnkeys);
    this.editColumnIndex = i;
  }

  saveColumnConfig($event: any) {
    console.log($event);
    this.columns[this.editColumnIndex!] = $event;
    console.log(this.columns);
    this.editColumnIndex = undefined;
    this.st.resetColumns({ columns: this.columns });
  }

  // 从备选列中移除指定列配置
  removeColumn(i: number) {
    this.columns.splice(i, 1);
    this.st.resetColumns({ columns: this.columns });
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
    this.st.resetColumns({ columns: this.columns });
  }
}
