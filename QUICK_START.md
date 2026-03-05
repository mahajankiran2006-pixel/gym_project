# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Setup Backend

```bash
cd gym-backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gym_db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### Step 2: Start MongoDB

Make sure MongoDB is running on your system.

### Step 3: Seed Database

```bash
npm run seed
```

This creates:
- Admin: `admin@gym.com` / `admin123`
- User: `user@gym.com` / `user123`
- Sample courses, products, trainers

### Step 4: Start Backend Server

```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

### Step 5: Setup Frontend

Open a new terminal:

```bash
cd gym-frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

## ✅ You're Ready!

1. Visit `http://localhost:3000`
2. Login as admin: `admin@gym.com` / `admin123`
3. Or register a new account
4. Browse courses, shop products, manage content (if admin)

## 🎯 Key Features

- ✅ User authentication & authorization
- ✅ Course browsing & enrollment
- ✅ Product shop with cart
- ✅ Order management
- ✅ Admin dashboard
- ✅ Trainer profiles
- ✅ Order history

## 📝 Test Payment

Use test card for payments:
- Card: `4242424242424242`
- CVV: Any 3+ digits
- Expiry: Any future date

Enjoy your fully functional gym website! 💪

