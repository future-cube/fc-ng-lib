<p align="center">
  <a href="https://ng-alain.com">
    <img width="100" src="https://ng-alain.com/assets/img/logo-color.svg">
  </a>
</p>

<h1 align="center">基于 NG-ALAIN 实现</h1>

<div align="center">
  Out-of-box UI solution for enterprise applications, Let developers focus on business.

  [![GitHub Release Date](https://img.shields.io/github/release-date/ng-alain/ng-alain.svg?style=flat-square)](https://github.com/future-cube/fc-ng-lib/releases)
  [![NPM version](https://img.shields.io/npm/v/ng-alain.svg?style=flat-square)](https://www.npmjs.com/package/@future-cube/theme)

</div>

## Quickstart

在其他项目中，使用 `npm install @future-cube/theme --save` 安装类库

## Demo

+ 迁出 `git clone https://github.com/future-cube/fc-ng-lib.git`
+ 安装第三方类库 `yarn`
+ 启动 `npm run start`
> 注意
>
> 部分功能需后端支持，基于Yii2框架开发。表格及表单功能开发完成后，统一提交到开源库中
>

## Features

- [X] 全局配置
  - [X] 全局配置获取表格结构的接口地址，通过传入Key值来获取指定的列配置信息
  - [X] 全局配置获取表单结构的接口地址，通过传入Key值来获取指定的表单配置信息（开发时考虑SCHEMA和UI是否分开处理）
  - [X] 全局配置Quill编辑器的默认参数，将会替换组件库中内置的默认值。使用过程中，可以通过传入参数重新设置每个参数。
- [X] 表格增强
  - [X] 自行指定请求数据接口地址（使用StHelper Service，从后端获取列配置信息）
  - [ ] 增加页面显示数量、排序等其他表格的配置的后端数据支持
  - [ ] 增加表格列配置数据生成UI
- [ ] 表单增强
  - [ ] 从后端获取配置信息
  - [ ] 增加表单结构及视图配置可视化编辑
  - [ ] 增加小挂件
    - [X] Quill 编辑器
    - [ ] 其他挂件
- [ ] 协同编辑
  - [ ] 使Quill编辑器可以独立使用，从现有小挂件中提取出
  - [ ] 其他协同开发工作
- [ ] 演示项目支持
  - [ ] 菜单管理
    - [X] 查看
    - [ ] 管理
  - [ ] 文档管理
    - [X] 查看
    - [ ] 管理
  - [ ] 演示管理
  - [ ] 功能支持
    - [X] 远程获取表单配置
    - [X] Quill编辑器
    - [ ] 表单配置生成器（见上方表单增强）
    - [ ] 表格配置生成器（见上方表格增强）
- [ ] 其他待补充功能

## App Shots

![表格](https://user-images.githubusercontent.com/2936579/205030235-b49891b5-cd0a-414a-9a2a-869ab43c7452.png)


### License

同 Ng-alain

The MIT License (see the [LICENSE](https://github.com/ng-alain/ng-alain/blob/master/LICENSE) file for the full text)
