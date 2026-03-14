# Quick Start Guide

Get your Gym Management System up and running in 5 minutes!

## Prerequisites

- Node.js (v14+) - [Download here](https://nodejs.org/)
- MongoDB - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free)
- Git - [Download here](https://git-scm.com/)

## 🚀 Quick Setup

### 1. Clone the Repository
```bash
git clone https://github.com/mahajankiran2006-pixel/gym_project.git
cd gym_project
```

### 2. Backend Setup (Terminal 1)
```bash
cd gym-backend
npm install
```

Create `.env` file:
```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` with your settings:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gym_db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

Seed the database and start:
```bash
npm run seed
npm run dev
```

✅ Backend running at `http://localhost:5000`

### 3. Frontend Setup (Terminal 2)
```bash
cd gym-frontend
npm install
npm start
```

✅ Frontend running at `http://localhost:3000`

## 🎯 Test the Application

### Default Login Credentials
- **Admin**: `admin@gym.com` / `admin123`
- **User**: `user@gym.com` / `user123`

### Test Features
1. **Browse Courses** - View available fitness programs
2. **Shop Products** - Browse gym equipment and supplements  
3. **User Registration** - Create new account
4. **Admin Dashboard** - Login as admin to manage content
5. **Place Orders** - Test the checkout process

## 🔧 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
# Windows: Check Services or start manually
mongod

# Mac/Linux: 
brew services start mongodb-community
# or
sudo systemctl start mongod
```

### Port Already in Use
```bash
# Kill process on port 3000 or 5000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Clear Cache Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📱 Mobile Testing

The application is responsive! Test on:
- Desktop browsers
- Mobile browsers  
- Tablet browsers

## 🌐 API Testing

Test the API endpoints:
```bash
# Health check
curl http://localhost:5000/api/health

# Get courses
curl http://localhost:5000/api/courses

# Get products
curl http://localhost:5000/api/products
```

## 🚀 Next Steps

1. **Customize Content** - Update courses, products, and trainers via admin panel
2. **Branding** - Replace logos and colors in the frontend
3. **Deploy** - Check `DEPLOYMENT.md` for deployment options
4. **Security** - Change JWT secret and secure your database

## 📚 Project Structure

```
gym_project/
├── gym-backend/          # Node.js API server
│   ├── src/
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth middleware
│   │   └── config/       # Database config
│   └── package.json
├── gym-frontend/         # React application
│   ├── src/
│   │   ├── pages/        # React pages
│   │   ├── components/   # Reusable components
│   │   └── context/      # State management
│   └── package.json
└── README.md
```

## 🆘 Need Help?

1. Check the logs in your terminal
2. Verify all environment variables are set
3. Ensure MongoDB is running
4. Check firewall/antivirus isn't blocking ports
5. Review the full `README.md` for detailed information

## 🎉 Success!

If you see the gym website at `http://localhost:3000`, you're all set! 

Start exploring the features and customizing the application for your gym business.