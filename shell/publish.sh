#!/usr/bin/env bash
set -e

# 修改npm源地址
npm config get registry
npm config set registry=https://registry.npmjs.org/

# 构建发布包(指定lib时，无需移入目录)
echo "构建中..."
ng build theme

# 登陆输入自己的npm账号和密码，还有邮箱
# echo '登录'
# npm login

echo "发布中..."
cd ../dist/theme
npm publish --access=public

# 改回npm源地址,很多时候我们用的是淘宝镜像源
npm config set registry=https://registry.npm.taobao.org

echo -e "\n发布成功\n"
exit
