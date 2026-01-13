#!/bin/bash
# Murphy Portal 部署脚本
# 使用方法: 
#   1. 手动将代码复制到服务器 /home/ubuntu/apps/portal
#   2. cd /home/ubuntu/apps/portal && ./deploy/deploy.sh

set -e

# 配置变量
APP_NAME="murphy-portal"
APP_DIR="/home/ubuntu/apps/portal"

echo "🚀 开始部署 Murphy Portal..."

# 1. 创建日志目录
echo "📁 创建目录..."
mkdir -p /home/ubuntu/logs

# 2. 进入应用目录
cd $APP_DIR

# 3. 检查代码是否存在
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 未找到 package.json"
    echo "请先将代码复制到 $APP_DIR 目录"
    exit 1
fi

echo "✓ 代码已就绪"

# 4. 安装 pnpm（如果未安装）
if ! command -v pnpm &> /dev/null; then
    echo "📦 安装 pnpm..."
    npm install -g pnpm
fi

# 5. 安装依赖
echo "📦 安装依赖..."
pnpm install --frozen-lockfile

# 6. 构建应用
echo "🔨 构建应用..."
pnpm build

# 7. 复制静态文件到 standalone 目录
echo "📋 复制静态文件..."
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

# 8. 安装 PM2（如果未安装）
if ! command -v pm2 &> /dev/null; then
    echo "📦 安装 PM2..."
    npm install -g pm2
fi

# 9. 复制 PM2 配置文件
cp deploy/ecosystem.config.js .next/standalone/

# 10. 停止旧进程并启动新进程
echo "🔄 重启应用..."
cd .next/standalone
pm2 delete $APP_NAME 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save

echo ""
echo "✅ 部署完成！"
echo ""
echo "📊 查看状态: pm2 status"
echo "📜 查看日志: pm2 logs $APP_NAME"
echo "🔄 重启应用: pm2 restart $APP_NAME"
