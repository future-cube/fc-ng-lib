# Theme

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.0.

## Code scaffolding

Run `ng generate component component-name --project theme` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project theme`.
> Note: Don't forget to add `--project theme` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build theme` to build the project. The build artifacts will be stored in the `dist/@future-cube` directory.

## Publishing

After building your library with `ng build theme`, go to the dist folder `cd dist/@future-cube/theme` and run `npm publish --access=public`.

## Running unit tests

Run `ng test theme` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## How to use this library
`table.component.html`
```
<st
  #st
  [data]="url"
  [columns]="columns"
  [scroll]="{ x: '800px' }"
  [widthMode]="{ type: 'strict' }"
  resizable
  [res]="{ reName: { list: 'items' } }"
  [req]="{ lazyLoad: true }"
  [ps]="100"
  size="default"
>
</st>
```
`table.component.ts`
```
import { Component, OnInit, ViewChild } from '@angular/core';
import { STComponent } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';
import { AppHelperService } from '@future-cube/theme';

@Component({
  selector: 'app-demo-table-columns',
  templateUrl: './table-columns.component.html'
})
export class DemoTableColumnsComponent implements OnInit {
  @ViewChild(STComponent) st!: STComponent;
  url = '/table/data';
  columns = [{ title: 'loading' }];
  columns_extend = {
    status: {
      format: (i: any, col: any, index: any) => {
        return i.status ? '存在' : '无效';
      }
    }
  };
  constructor(public appHelper: AppHelperService) {}

  ngOnInit(): void {
    this.appHelper.stHelper.getColumns('dev_table', this.columns_extend).subscribe(res => {
      this.st.resetColumns({ columns: res, emitReload: true });
    });
  }
}
```

