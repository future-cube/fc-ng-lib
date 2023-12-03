# 实现功能





以下为封装的基础方法。

| 方法               | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| toAsync()          | 将数据异步返回                                               |
| getLabel()         | 从SF的下拉菜单数据中获【取指定值】对应的【Label名称】        |
| tryGetAsyncData()  | 先从缓存获取数据，获取不到时使用`getAsyncData()`从远程获取。 |
| getAsyncData()     | 通过远程请求加载下拉列表所需数据                             |
| getDataFromCache() | 通过缓存请求加载下载列表所需数据。同步请求                   |
| resetEnum()        | 重置表单指定的属性下拉列表选项                               |
| transformEnum()    | 转换枚举值的属性名称为指定需要的格式                         |

下为固定的枚举值
| 方法                     | 说明                             |
| ------------------------ | -------------------------------- |
| OnOffStatus()            | 开关类型Enum数据源，值为  0 或 1 |
| DataRoleLevel()          | 指定职位与模型的授权级别         |

下为表单生成器
| 方法                      | 说明                         |
| ------------------------- | ---------------------------- |
| create()       | 创建一个增加记录的表单生成器 |
| update()       | 创建一个更新记录的表单生成器 |
| getDivisionCascaderData() | 省市区县联动                 |

### 示例
```
this.appHelper.sfHelper
  .formCreatorUpdate(
    this.community,
    CommunityInformationSchema.schema,
    CommunityInformationSchema.ui,
    'agency/space/community/view',
    'agency/space/community/update',
    { id: this.communityId },
    `修改 ${this.community!.title} 信息`,
    'id',
    []
  )
  .pipe(filter(w => w !== undefined))
  .subscribe(() => this.loadCommunity());
```

实际上,使用这种方法
(在创建项目联系人时,使用create表单时,也对表单结构进行过处理.但是比较简单.)
(现在这样的,直接把表单暴露出来,更容易操作.不知道和上面一种方法比哪各路更好.)
(考察后,在这里写清楚,并全面整改一致)
```
    const modal = this.appHelper.sfHelper.formCreatorUpdate(
      this.community,
      schema,
      ui,
      'agency/space/community/view',
      'agency/space/community/update-price',
      { id: this.communityId },
      `修改 ${this.community!['title']} 信息`,
      'communityId',
      []
    );

    const comp: any = modal.comp();
    const sf: SFComponent = comp.sf;

    modal.obs().subscribe((res: any) => {
      if (undefined !== res) {
        this.loadCommunity();
      }
    });
```
