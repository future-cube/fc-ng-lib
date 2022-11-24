

## 定义接口及工厂

在 `sf-helper.type.ts` 中定义 （InjectionToken | 依赖注入）

`SCHEMA_API`

```
export const SCHEMA_API = new InjectionToken<string>('schema-api', {
  providedIn: 'root',
  factory: SCHEMA_API_FACTORY // 见下面代码
});
```

`SCHEMA_API_FACTORY`

```
export function SCHEMA_API_FACTORY(): string {
  return '';
}
```

## 配置服务

在 ` sf-helper.service.ts ` 中,

通过构造函数，把依赖注入到变量中，以供使用，即服务中通过如下代码，变更`url`变量。
```
constructor(
    private injector: Injector,
    @Optional() @Inject(SCHEMA_API) schema_api?: string
  ) {
    if (schema_api) this.url = schema_api;
}
```

## 使用方式

> 在其他需要引用本服务的地方，通过 `providers` 把当前服务设为供应商。并将 `url` 通过传入到服务中，以便设置请求地址

### 定义接口及服务商

// 定义服务中使用的API接口地址
const schemaUrl = ‘/path';

// 从 `sf-helper.types.ts` 中,拿到 `InjectionToken`
const schemaProvides = [{ provide: SCHEMA_API, useValue: schemaUrl }];


### 通过导入独立模块，来启用该服务

> 注意，如果有多个需要注册的服务或者其他时，使用独立的模块用于处理。如果只有一个，则建议直接导入到主应用中去。

```
export class GlobalConfigModule {
  constructor(@Optional() @SkipSelf() parentModule: GlobalConfigModule) {
    throwIfAlreadyLoaded(parentModule, 'GlobalConfigModule');
  }
  static forRoot(): ModuleWithProviders<GlobalConfigModule> {
    return {
      ngModule: GlobalConfigModule,
      providers: [...schemaProvides] // 注意此处
    };
  }

  // 或者

  const schemaUrl = '/path';
  static forRoot(url): ModuleWithProviders<GlobalConfigModule> {
    return {
      ngModule: GlobalConfigModule,
      providers: [{ provide: SCHEMA_URL, useValue: schemaUrl }]
    };
  }
}
```

### 将配置模块，导入到主程序中

> 注意，可以不通过中间模块，而直接在应用的入口处直接导入，方法同上。
> 通过中间模块导入时，请执行forRoot()方法，（查看解决了什么问题）

```
@NgModule({
  declarations: [AppComponent],
  imports: [
    GlobalConfigModule.forRoot(), // 如果是通过
    ...
  ],
  providers: [...],
  bootstrap: [AppComponent]


