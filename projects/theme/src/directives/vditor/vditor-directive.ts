import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[fc-vditor]'
})
export class FcVditorDirective implements OnInit {
  @Input('times') times!: number | [];
  constructor(private ref: TemplateRef<any>, private vc: ViewContainerRef) {}

  ngOnInit(): void {
    console.log(this.ref);
    console.log(this.vc);
    // return;
    // console.log(this.times);
    // let items = [];
    // if (typeof this.times === 'number') {
    //   items = Array(this.times).fill(null);
    // }
    // console.log(items);

    // items.forEach((item, index) => {
    //   this.vc.createEmbeddedView('<div></div>', {
    //     $implicit: item,
    //     index: index,
    //     even: index % 2 === 0,
    //     odd: index % 2 === 1
    //   });
    // });
  }
}
