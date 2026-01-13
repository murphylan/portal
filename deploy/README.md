# Murphy Portal 部署指南

## 服务器环境准备

### 1. 安装 Node.js 22

```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc

# 安装 Node.js 22
nvm install 22
nvm use 22
nvm alias default 22

# 验证
node -v  # v22.x.x
```

### 2. 安装 pnpm 和 PM2

```bash
npm install -g pnpm pm2
```

### 3. 安装 Nginx

```bash
sudo apt update
sudo apt install nginx -y
```

---

## SSL 证书配置

### 1. 上传证书到服务器

```bash
# 在本地执行
scp -r ssl/ ubuntu@159.75.253.245:~/

# 在服务器上执行
ssh ubuntu@159.75.253.245
sudo mkdir -p /etc/nginx/ssl
sudo mv ~/ssl/* /etc/nginx/ssl/
sudo chmod 600 /etc/nginx/ssl/murphylan.cloud.key
sudo chmod 644 /etc/nginx/ssl/murphylan.cloud_bundle.pem
# 创建别名（Nginx 配置中使用 .crt）
sudo ln -sf /etc/nginx/ssl/murphylan.cloud_bundle.pem /etc/nginx/ssl/murphylan.cloud_bundle.crt
```

---

## Nginx 配置

### 1. 上传并启用配置

```bash
# 在本地执行
scp deploy/nginx-portal.conf ubuntu@159.75.253.245:~/

# 在服务器上执行
ssh ubuntu@159.75.253.245
sudo mv ~/nginx-portal.conf /etc/nginx/sites-available/portal
sudo ln -sf /etc/nginx/sites-available/portal /etc/nginx/sites-enabled/

# 删除默认配置（可选）
sudo rm -f /etc/nginx/sites-enabled/default

# 测试并重启
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl status nginx
```

---

## 应用部署

### 方法一：手动上传 + 部署脚本（推荐）

```bash
# 1. 在本地打包代码（排除 node_modules 等）
cd /Users/zla3/work/murphy/portal
tar --exclude='node_modules' --exclude='.next' --exclude='.git' -czf portal.tar.gz .

# 2. 上传到服务器
scp portal.tar.gz ubuntu@159.75.253.245:~/

# 3. 在服务器上解压并部署
ssh ubuntu@159.75.253.245
mkdir -p /home/ubuntu/apps/portal
cd /home/ubuntu/apps/portal
tar -xzf ~/portal.tar.gz
chmod +x deploy/deploy.sh
./deploy/deploy.sh
```

### 方法二：rsync 同步（适合频繁更新）

```bash
# 在本地执行 - 同步代码到服务器
rsync -avz --exclude='node_modules' --exclude='.next' --exclude='.git' \
  /Users/zla3/work/murphy/portal/ ubuntu@159.75.253.245:/home/ubuntu/apps/portal/

# 在服务器上执行部署
ssh ubuntu@159.75.253.245
cd /home/ubuntu/apps/portal
./deploy/deploy.sh
```

### 方法三：完全手动部署

```bash
# 在服务器上执行

# 1. 创建目录（代码已手动复制）
mkdir -p /home/ubuntu/logs
cd /home/ubuntu/apps/portal

# 2. 安装依赖并构建
pnpm install --frozen-lockfile
pnpm build

# 3. 复制静态文件
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

# 4. 复制 PM2 配置
cp deploy/ecosystem.config.js .next/standalone/

# 5. 启动应用
cd .next/standalone
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # 设置开机自启
```

---

## 常用命令

### PM2 管理

```bash
pm2 status                    # 查看状态
pm2 logs murphy-portal        # 查看日志
pm2 restart murphy-portal     # 重启应用
pm2 stop murphy-portal        # 停止应用
pm2 delete murphy-portal      # 删除应用
pm2 monit                     # 监控面板
```

### Nginx 管理

```bash
sudo nginx -t                 # 测试配置
sudo systemctl restart nginx  # 重启
sudo systemctl status nginx   # 查看状态
sudo tail -f /var/log/nginx/error.log  # 查看错误日志
```

### 更新部署

```bash
# 方法1: 本地打包上传
cd /Users/zla3/work/murphy/portal
tar --exclude='node_modules' --exclude='.next' --exclude='.git' -czf portal.tar.gz .
scp portal.tar.gz ubuntu@159.75.253.245:~/

# 服务器解压并重新部署
ssh ubuntu@159.75.253.245
cd /home/ubuntu/apps/portal
tar -xzf ~/portal.tar.gz
./deploy/deploy.sh

# 方法2: rsync 增量同步（更快）
rsync -avz --exclude='node_modules' --exclude='.next' --exclude='.git' \
  /Users/zla3/work/murphy/portal/ ubuntu@159.75.253.245:/home/ubuntu/apps/portal/
ssh ubuntu@159.75.253.245 "cd /home/ubuntu/apps/portal && ./deploy/deploy.sh"
```

---

## 端口分配

| 应用 | 端口 | 域名 |
|------|------|------|
| Portal (门户) | 3000 | murphylan.cloud |
| Requirement | 3001 | req.murphylan.cloud |
| Activity | 3002 | activity.murphylan.cloud |
| Face | 3003 | face.murphylan.cloud |

---

## 故障排查

### 1. 应用无法启动

```bash
# 检查日志
pm2 logs murphy-portal --lines 100

# 直接运行测试
cd /home/ubuntu/apps/portal/.next/standalone
node server.js
```

### 2. Nginx 502 错误

```bash
# 检查应用是否运行
pm2 status

# 检查端口
netstat -tlnp | grep 3000

# 检查 Nginx 错误日志
sudo tail -f /var/log/nginx/error.log
```

### 3. SSL 证书问题

```bash
# 检查证书文件
ls -la /etc/nginx/ssl/

# 测试 SSL
openssl s_client -connect murphylan.cloud:443 -servername murphylan.cloud
```

---

## 快速部署命令（一键）

在本地终端执行：

```bash
# 同步并部署
rsync -avz --exclude='node_modules' --exclude='.next' --exclude='.git' \
  /Users/zla3/work/murphy/portal/ ubuntu@159.75.253.245:/home/ubuntu/apps/portal/ \
  && ssh ubuntu@159.75.253.245 "cd /home/ubuntu/apps/portal && ./deploy/deploy.sh"
```
