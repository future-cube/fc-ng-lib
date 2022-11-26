[Angular 应用级别的依赖 Fake](https://www.jianshu.com/p/584729ed49f9)



## 版本升级
> 应当在开发文件中修改版本，不要直接在构建后的版本中修改。

npm version patch  // 升级版本补丁号， 如1.0.0升级到1.0.1
npm version minor // 升级小版本号， 如1.0.0升级到1.1.0
npm version major // 升级大版本号，如1.0.0升级到2.0.0

## 查看历史版本
// 查看历史版本信息（最多100条）
npm view [<pkg>][@<version>] versions
// 假设我的包名是test 版本号是1.0.0
npm view test@1.0.0 versions


## 删除版本

// 假设我的包名是test 测试版本号是1.0.0-beta.0
// 删除包的指定版本
npm unpublish test@1.0.0-beta.0

// 强制删除包的指定版本
npm unpublish test@1.0.0-beta.0 --force

// 删除包
npm unpublish test

// 强制删除包
npm unpublish test --force


## 废弃版本
npm deprecate <pkg>[@<version>] <message>

// 假设我的包名是test 版本号是1.0.1
npm deprecate test '不再维护'
npm deprecate test@1.0.1 '不再维护'
