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
npm login
# npx npm-login-with-param --username xingkoo --password "hVh*b4$J/nS.v9n" --email xingkoo@gmail.com

echo "准备发布..."
CURRENT_DIR=$(cd $(dirname $0); pwd)
cd $CURRENT_DIR
cd ../dist/@future-cube/theme
pwd

# echo "更新版本包..."
# echo "请输入更新包类型：1：补丁包，2：小版本，3：大版本，0：终止"
# while true
# do
#   read vs
#   case $vs in
#       0)  exit
#       ;;
#       1)  npm version patch
#       break;
#       ;;
#       2)  npm version minor
#       break;
#       ;;
#       3)  npm version major
#       break;
#       ;;
#       *)  echo "请输入更新包类型：1、补丁包，2、小版本，3、大版本"
#       ;;
#   esac
# done


echo "发布中..."
npm publish --access=public

# 改回npm源地址,很多时候我们用的是淘宝镜像源
npm config set registry=https://registry.npm.taobao.org

echo -e "\n发布成功\n"
exit
