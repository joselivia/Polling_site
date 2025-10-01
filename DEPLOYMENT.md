# Deployment Guide

## Overview

This guide covers deploying the Polling Site application to various environments including development, staging, and production.

## Table of Contents

1. [Environment Setup](#environment-setup)
2. [Local Development](#local-development)
3. [Production Deployment](#production-deployment)
4. [Docker Deployment](#docker-deployment)
5. [Environment Variables](#environment-variables)
6. [Performance Optimization](#performance-optimization)
7. [Security Checklist](#security-checklist)
8. [Monitoring and Maintenance](#monitoring-and-maintenance)

## Environment Setup

### System Requirements

#### Minimum Requirements

- **CPU**: 2 cores
- **RAM**: 4GB
- **Storage**: 10GB SSD
- **Network**: Stable internet connection

#### Recommended Requirements

- **CPU**: 4+ cores
- **RAM**: 8GB+
- **Storage**: 20GB+ SSD
- **Network**: High-speed internet with low latency

### Software Dependencies

```bash
# Node.js (LTS version)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 for process management (production)
npm install -g pm2

# Nginx (reverse proxy)
sudo apt update
sudo apt install nginx
```

## Local Development

### 1. Development Setup

```bash
# Clone repository
git clone https://github.com/joselivia/Polling_site.git
cd Polling_site

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your settings

# Start development server
npm run dev
```

### 2. Development Environment Variables

```bash
# .env.local
NODE_ENV=development
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:8082
NEXT_PUBLIC_SECONDARY_API_URL=http://localhost:8081
```

## Production Deployment

### Option 1: Traditional Server Deployment

#### 1. Server Preparation

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Create application user
sudo adduser polling-app
sudo usermod -aG sudo polling-app
```

#### 2. Application Deployment

```bash
# Switch to app user
sudo su - polling-app

# Clone repository
git clone https://github.com/joselivia/Polling_site.git
cd Polling_site

# Install dependencies
npm ci --only=production

# Build application
npm run build

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'polling-site',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
EOF

# Create logs directory
mkdir logs

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 3. Nginx Configuration

```bash
# Create Nginx configuration
sudo tee /etc/nginx/sites-available/polling-site << EOF
server {
    listen 80;
    server_name admin.jitumemkenya.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/polling-site /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 4. SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d admin.jitumemkenya.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Option 2: Vercel Deployment

#### 1. Prepare for Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

#### 2. Vercel Configuration

Create `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Option 3: Docker Deployment

#### 1. Create Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3001

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Start application
CMD ["npm", "start"]
```

#### 2. Docker Compose

```yaml
# docker-compose.yml
version: "3.8"
services:
  polling-site:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
    restart: unless-stopped
    volumes:
      - ./logs:/app/logs
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - polling-site
    restart: unless-stopped
```

#### 3. Deploy with Docker

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Scale application
docker-compose up -d --scale polling-site=3
```

## Environment Variables

### Production Environment Variables

```bash
# .env.production
NODE_ENV=production
PORT=3001
NEXT_PUBLIC_API_URL=https://api.jitumemkenya.com
NEXT_PUBLIC_SECONDARY_API_URL=https://api2.jitumemkenya.com

# Security
JWT_SECRET=your-super-secret-jwt-key
SESSION_SECRET=your-session-secret

# Database (if applicable)
DATABASE_URL=postgresql://user:password@localhost:5432/polling_db

# External Services
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
SENDGRID_API_KEY=your-sendgrid-api-key

# Monitoring
SENTRY_DSN=your-sentry-dsn
```

### Environment-specific Configuration

```javascript
// config/environment.js
const config = {
  development: {
    api: {
      baseURL: "http://localhost:8082",
      baseURL2: "http://localhost:8081",
    },
    hostname: "localhost",
    port: 3001,
  },
  production: {
    api: {
      baseURL: "https://api.jitumemkenya.com",
      baseURL2: "https://api2.jitumemkenya.com",
    },
    hostname: "admin.jitumemkenya.com",
    port: process.env.PORT || 3001,
  },
};

module.exports = config[process.env.NODE_ENV || "development"];
```

## Performance Optimization

### 1. Build Optimization

```javascript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  compress: true,
  images: {
    domains: ["api.jitumemkenya.com"],
    formats: ["image/webp", "image/avif"],
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
```

### 2. PM2 Optimization

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "polling-site",
      script: "server.js",
      instances: "max",
      exec_mode: "cluster",
      max_memory_restart: "1G",
      node_args: "--max-old-space-size=1024",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
};
```

### 3. Nginx Caching

```nginx
# Add to nginx configuration
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(html)$ {
    expires 1h;
    add_header Cache-Control "public";
}
```

## Security Checklist

### 1. Application Security

- [ ] Use HTTPS in production
- [ ] Implement proper authentication
- [ ] Validate all user inputs
- [ ] Sanitize user-generated content
- [ ] Use environment variables for secrets
- [ ] Enable security headers
- [ ] Implement rate limiting
- [ ] Regular security updates

### 2. Server Security

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Configure firewall
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443

# Disable root login
sudo sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sudo systemctl restart ssh

# Install fail2ban
sudo apt install fail2ban
```

### 3. Application Security Headers

```javascript
// In your Express middleware or Nginx config
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Strict-Transport-Security", "max-age=31536000");
  next();
});
```

## Monitoring and Maintenance

### 1. Application Monitoring

```bash
# PM2 monitoring
pm2 monit

# Check application status
pm2 status

# View logs
pm2 logs

# Restart application
pm2 restart all
```

### 2. Health Checks

```javascript
// health-check.js
const http = require("http");

const options = {
  hostname: "localhost",
  port: 3001,
  path: "/api/health",
  method: "GET",
  timeout: 5000,
};

const req = http.request(options, (res) => {
  console.log(`Health check: ${res.statusCode}`);
  process.exit(res.statusCode === 200 ? 0 : 1);
});

req.on("error", (err) => {
  console.error("Health check failed:", err);
  process.exit(1);
});

req.end();
```

### 3. Backup Strategy

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/polling-site"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /home/polling-app/Polling_site

# Backup database (if applicable)
# pg_dump polling_db > $BACKUP_DIR/db_$DATE.sql

# Cleanup old backups (keep 7 days)
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: $DATE"
```

### 4. Log Management

```bash
# Logrotate configuration
sudo tee /etc/logrotate.d/polling-site << EOF
/home/polling-app/Polling_site/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 polling-app polling-app
    postrotate
        pm2 reloadLogs
    endscript
}
EOF
```

## Troubleshooting

### Common Issues

#### 1. Application Won't Start

```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs

# Check port availability
netstat -tulpn | grep 3001

# Restart application
pm2 restart all
```

#### 2. High Memory Usage

```bash
# Check memory usage
pm2 monit

# Restart with memory limit
pm2 restart all --max-memory-restart 1G
```

#### 3. SSL Certificate Issues

```bash
# Check certificate status
sudo certbot certificates

# Renew certificate
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run
```

### Emergency Procedures

#### 1. Rollback Deployment

```bash
# Revert to previous version
git checkout previous-stable-tag
npm ci --only=production
npm run build
pm2 restart all
```

#### 2. Scale Down

```bash
# Reduce instances
pm2 scale polling-site 1
```

#### 3. Database Issues

```bash
# Check database connectivity
# Implement database health check
# Have backup restoration procedure ready
```

## Post-Deployment Checklist

- [ ] Application is accessible via domain
- [ ] SSL certificate is properly configured
- [ ] All API endpoints are working
- [ ] Admin login is functional
- [ ] Poll creation works correctly
- [ ] Voting system functions properly
- [ ] Results display correctly
- [ ] File uploads work
- [ ] Email notifications work (if implemented)
- [ ] Monitoring is set up
- [ ] Backups are configured
- [ ] Security scanning completed
- [ ] Performance testing passed
- [ ] Load testing completed

---

This deployment guide should help you successfully deploy the Polling Site application to production environments.
