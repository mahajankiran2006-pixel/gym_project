# Deployment Guide

This guide covers different deployment options for the Gym Management System.

## Quick Deploy Options

### 1. Heroku (Recommended for beginners)

#### Backend Deployment
```bash
# Install Heroku CLI first
cd gym-backend
heroku create your-gym-backend
heroku addons:create mongolab:sandbox
heroku config:set JWT_SECRET=your_super_secret_jwt_key
git subtree push --prefix gym-backend heroku main
```

#### Frontend Deployment
```bash
cd gym-frontend
npm run build
# Deploy to Netlify, Vercel, or GitHub Pages
```

### 2. Railway

1. Connect your GitHub repository to Railway
2. Create two services: one for backend, one for frontend
3. Set environment variables in Railway dashboard
4. Deploy automatically on git push

### 3. DigitalOcean App Platform

1. Connect GitHub repository
2. Configure build and run commands
3. Set environment variables
4. Deploy with automatic scaling

### 4. AWS (Advanced)

#### Using AWS Elastic Beanstalk
```bash
# Install EB CLI
cd gym-backend
eb init
eb create production
eb deploy
```

#### Using AWS EC2
1. Launch EC2 instance
2. Install Node.js and MongoDB
3. Clone repository
4. Configure nginx as reverse proxy
5. Use PM2 for process management

## Environment Variables

### Production Environment Variables
```env
# Backend (.env)
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gym_production
JWT_SECRET=your_super_secure_jwt_secret_minimum_32_characters
NODE_ENV=production

# Frontend (build time)
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## Database Setup

### MongoDB Atlas (Cloud)
1. Create account at mongodb.com
2. Create new cluster
3. Add database user
4. Whitelist IP addresses
5. Get connection string

### Local MongoDB
```bash
# Install MongoDB
# Windows: Download from mongodb.com
# Mac: brew install mongodb-community
# Ubuntu: sudo apt install mongodb

# Start MongoDB
mongod --dbpath /path/to/data/directory
```

## SSL/HTTPS Setup

### Using Let's Encrypt (Free)
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Process Management

### Using PM2
```bash
# Install PM2
npm install -g pm2

# Start backend
cd gym-backend
pm2 start src/server.js --name gym-backend

# Start with environment file
pm2 start src/server.js --name gym-backend --env production

# Save PM2 configuration
pm2 save
pm2 startup
```

## Nginx Configuration

```nginx
# /etc/nginx/sites-available/gym-app
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /path/to/gym-frontend/build;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Docker Deployment

### Dockerfile for Backend
```dockerfile
# gym-backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

### Dockerfile for Frontend
```dockerfile
# gym-frontend/Dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  mongodb:
    image: mongo:4.4
    restart: always
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password

  backend:
    build: ./gym-backend
    restart: always
    ports:
      - "5000:5000"
    environment:
      MONGODB_URI: mongodb://admin:password@mongodb:27017/gym_db?authSource=admin
      JWT_SECRET: your_jwt_secret
    depends_on:
      - mongodb

  frontend:
    build: ./gym-frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

## Monitoring and Logging

### Application Monitoring
```bash
# Install monitoring tools
npm install -g pm2-logrotate
pm2 install pm2-server-monit

# View logs
pm2 logs gym-backend
pm2 monit
```

### Health Checks
Add to backend (gym-backend/src/app.js):
```javascript
// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Set secure JWT secret (minimum 32 characters)
- [ ] Enable CORS only for your domain
- [ ] Use environment variables for secrets
- [ ] Keep dependencies updated
- [ ] Implement rate limiting
- [ ] Use helmet.js for security headers
- [ ] Validate and sanitize user inputs
- [ ] Set up database backups
- [ ] Monitor application logs

## Backup Strategy

### Database Backup
```bash
# MongoDB backup
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/gym_db" --out backup/

# Restore
mongorestore --uri="mongodb+srv://username:password@cluster.mongodb.net/gym_db" backup/gym_db/
```

### Automated Backups
```bash
# Cron job for daily backups
0 2 * * * /usr/local/bin/mongodump --uri="$MONGODB_URI" --out /backups/$(date +\%Y\%m\%d)
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check backend CORS configuration
   - Verify frontend API URL

2. **Database Connection**
   - Check MongoDB URI format
   - Verify network access (IP whitelist)
   - Test connection string

3. **Build Failures**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall
   - Check Node.js version compatibility

4. **Performance Issues**
   - Enable gzip compression
   - Optimize database queries
   - Use CDN for static assets
   - Implement caching

### Logs Location
- PM2 logs: `~/.pm2/logs/`
- Nginx logs: `/var/log/nginx/`
- Application logs: Check your logging configuration

## Support

For deployment issues:
1. Check the logs first
2. Verify environment variables
3. Test database connectivity
4. Check firewall/security group settings
5. Review the troubleshooting section above