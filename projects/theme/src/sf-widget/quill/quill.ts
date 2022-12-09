import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ControlWidget, FormProperty, SFComponent, SFItemComponent } from '@delon/form';
import { deepCopy, deepMerge, LazyService } from '@delon/util';
import { Blur, ContentChange, EditorChangeContent, EditorChangeSelection, Focus, QuillEditorBase, SelectionChange } from 'ngx-quill';
import Quill from 'quill';

import { FcConfigService } from './../../theme/services/config';
import { SfQuillConfig } from './types';
// import QuillMarkdown from 'quilljs-markdown';
// @link https://kang-bing-kui.gitbook.io/quill/wen-dang-document/configuration 手册
// @link https://www.kancloud.cn/liuwave/quill/1409379 手册
// @link https://blog.csdn.net/React_Community/article/details/123492567 Yjs的实现

declare const QuillMarkdown: any;

@Component({
  selector: 'quill',
  template: `
    <sf-item-wrap [id]="id" [schema]="schema" [ui]="ui" [showError]="showError" [error]="error" [showTitle]="schema.title">
      <!-- 开始自定义控件区域 -->
      <!-- [config]="config" [loading]="loading" {{ value }} -->
      <!-- 结束自定义控件区域 -->
      <!-- [debug]="config.debug" -->
      <quill-editor
        [format]="config.format"
        [theme]="config.theme"
        [modules]="config.modules"
        [readOnly]="config.readOnly"
        [placeholder]="config.placeholder"
        [maxLength]="config.maxLength"
        [minLength]="config.minLength"
        [required]="config.required"
        [formats]="config.formats"
        [customToolbarPosition]="config.customToolbarPosition"
        [sanitize]="config.sanitize"
        [beforeRender]="config.beforeRender"
        [styles]="config.styles"
        [strict]="config.strict"
        [scrollingContainer]="config.scrollingContainer"
        [bounds]="config.bounds"
        [customOptions]="config.customOptions"
        [customModules]="config.customModules"
        [trackChanges]="config.trackChanges"
        [preserveWhitespace]="config.preserveWhitespace"
        [classes]="config.classes"
        [trimOnValidation]="config.trimOnValidation"
        [linkPlaceholder]="config.linkPlaceholder"
        [compareValues]="config.compareValues"
        [filterNull]="config.filterNull"
        [debounceTime]="config.debounceTime"
        [defaultEmptyValue]="config.defaultEmptyValue"
        [modules]="config.modules"
        [ngModel]="content"
        (onEditorCreated)="onEditorCreated($event)"
        (onContentChanged)="onContentChanged($event)"
        (onSelectionChanged)="onSelectionChanged($event)"
        (onEditorChanged)="onEditorChanged($event)"
        (onFocus)="onBlur($event)"
        (onBlur)="onBlur($event)"
      >
      </quill-editor>
    </sf-item-wrap>
    <!-- (ngModelChange)="change($event)" -->
  `,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuillWidget extends ControlWidget implements OnInit {
  /* 用于注册小部件 KEY 值 */
  static readonly KEY = 'quill';
  // 编辑器对象
  editor!: Quill;
  // 内容变量
  content: string = '';

  // 组件所需要的参数，建议使用 `ngOnInit` 获取
  config: SfQuillConfig = {
    required: false,
    customToolbarPosition: 'top',
    styles: { height: '300px' },
    strict: true,
    customOptions: [],
    customModules: [],
    preserveWhitespace: false,
    trimOnValidation: false,
    compareValues: false,
    filterNull: false
  };

  constructor(
    private lazy: LazyService,
    public fcs: FcConfigService,
    cd: ChangeDetectorRef,
    injector: Injector,
    sfItemComp?: SFItemComponent,
    sfComp?: SFComponent
  ) {
    super(cd, injector, sfItemComp, sfComp);
  }

  ngOnInit(): void {
    console.warn('init quill widget');
    // this.loadingTip = this.ui.loadingTip || '加载中……';

    // 使用自定义值替换组件默认值
    const config = this.fcs.merge('quill', this.config);
    // 使用动态表单传入的值替换值
    this.config = deepMerge({}, config, this.ui['config']);

    console.log(deepCopy(this.config));
  }

  private get deltaProperty(): FormProperty | undefined {
    const delta = this.ui['delta'];
    if (!delta) return undefined;
    const prop = this.formProperty;
    return prop.parent!.getProperty(delta);
  }

  // reset 可以更好的解决表单重置过程中所需要的新数据问题
  override reset(value: string) {
    this.content = value || '';
    this.setValue(value);
    this.detectChanges();
  }

  // 修改内容后的处理
  change(value: ContentChange) {
    this.setValue(value.html || '');
    this.detectChanges();
    this.deltaProperty?.resetValue(JSON.stringify(value.content), true);
    this.deltaProperty?.widget.detectChanges();
    if (this.ui['change']) this.ui['change'](value);
  }

  // 编辑器实例
  onEditorCreated($event: Quill | any) {
    this.editor = $event;
    // new QuillMarkdown($event);
    this.lazy
      .load([
        `//cdn.jsdelivr.net/npm/quilljs-markdown@latest/dist/quilljs-markdown.js`,
        `//cdn.jsdelivr.net/npm/quilljs-markdown@latest/dist/quilljs-markdown-common-style.css`
      ])
      .then(() => {
        const quillMarkdown = new QuillMarkdown(this.editor, {});
        // do something
      });
  }
  // 文本已更新
  onContentChanged($event: ContentChange | any) {
    this.change($event);
  }
  // 选择被更新，也为 onBlur 和 onFocus 触发，因为选择改变了
  onSelectionChanged($event: SelectionChange | any) {
    // console.log('onSelectionChanged', $event);
  }

  // 文本或选择已更新 - 独立于源
  onEditorChanged($event: EditorChangeContent | EditorChangeSelection | any) {
    // console.log('onEditorChanged', $event);
  }
  // 编辑器被聚焦
  onFocus($event: Focus | any) {
    // console.log('onFocus', $event);
  }
  // 编辑器模糊
  onBlur($event: Blur | any) {
    // console.log('onBlur', $event);
  }
}
