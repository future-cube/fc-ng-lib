import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ModalHelper, ModalHelperOptions } from '@delon/theme';
import { FcListPickerComponent } from '@future-cube/ng-lib/components';
import { FcListPickerOptions } from '@future-cube/ng-lib/components/list-picker/list-picker.options';
import { AppHelperService } from '@future-cube/ng-lib/services';

/****
 *
 * 使用示例
 *
 *
 */
@Directive({
  selector: '[fc-list-picker]',
  exportAs: 'FcListPicker'
})
export class FcListPickerDirective {
  @Input() params!: FcListPickerOptions;
  @Input() size?: 'sm' | 'md' | 'lg' | 'xl' | '' | number = 'lg';
  /** 是否精准（默认：`true`），若返回值非空值（`null`或`undefined`）视为成功，否则视为错误 */
  @Input() exact?: boolean = true;

  @Output() readonly selected = new EventEmitter();

  constructor(private elementRef: ElementRef, private modal: ModalHelper, private appHelper: AppHelperService) {
    // console.log('bs-file-picker');
  }

  @HostListener('click')
  onClick(): void {
    const options: ModalHelperOptions = {
      size: this.size,
      exact: this.exact
    };
    console.log(this.params);
    this.appHelper.modal.create(FcListPickerComponent, this.params, options).subscribe((r: any) => {
      console.log(r);
      this.selected.emit(r);
    });
  }
}
