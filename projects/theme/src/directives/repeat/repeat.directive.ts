import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[fc-repeat]'
})
export class FcRepeatDirective implements OnInit {
  @Input('times') times!: number | [];
  constructor(private ref: TemplateRef<any>, private vc: ViewContainerRef) {}

  ngOnInit(): void {
    console.log(this.times);
    let items = [];
    if (typeof this.times === 'number') {
      items = Array(this.times).fill(null);
    }
    console.log(items);

    items.forEach((item, index) => {
      this.vc.createEmbeddedView(this.ref, {
        $implicit: item,
        index: index,
        even: index % 2 === 0,
        odd: index % 2 === 1
      });
    });
  }
}
