// PM2 配置文件
// 使用方法: pm2 start ecosystem.config.js

module.exports = {
  apps: [
    {
      name: 'murphy-portal',
      script: 'server.js',
      cwd: '/home/ubuntu/apps/portal/.next/standalone',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',
      },
      // 日志配置
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: '/home/ubuntu/logs/portal-error.log',
      out_file: '/home/ubuntu/logs/portal-out.log',
      merge_logs: true,
    },
  ],
};
