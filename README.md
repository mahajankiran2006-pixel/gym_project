<<<<<<< HEAD
# Gym Management System

A full-stack gym management website with course enrollment, product shop, trainer profiles, and order management.

## Features

### User Features
- **User Authentication**: Register, login, and password management
- **Course Browsing**: View available fitness courses with details
- **Course Enrollment**: Purchase courses with COD or test card payment
- **Product Shop**: Browse and purchase gym products and supplements
- **Shopping Cart**: Add/remove products, manage quantities
- **Order Management**: View order history and status
- **Trainer Profiles**: View trainer information and specialties
- **Gallery**: Browse workout images and trainer profiles

### Admin Features
- **Admin Dashboard**: Complete management interface
- **Order Management**: View all orders, update status and payment status
- **Course Management**: Create, edit, and delete courses
- **Product Management**: Create, edit, and delete products
- **Trainer Management**: Create, edit, and delete trainers

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React 19
- React Router for navigation
- Axios for API calls
- Context API for state management

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd gym-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `gym-backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gym_db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

4. Start MongoDB (if running locally):
```bash
# On Windows (if MongoDB is installed as a service, it should start automatically)
# On Mac/Linux:
mongod
```

5. Seed the database with initial data:
```bash
npm run seed
```

This will create:
- Admin user: `admin@gym.com` / `admin123`
- Regular user: `user@gym.com` / `user123`
- Sample courses, products, and trainers

6. Start the backend server:
```bash
# Development mode (with auto-reload):
npm run dev

# Production mode:
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd gym-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/change-password` - Change password (authenticated)

### Courses
- `GET /api/courses` - Get all active courses (public)
- `POST /api/courses` - Create course (admin only)
- `PUT /api/courses/:id` - Update course (admin only)
- `DELETE /api/courses/:id` - Delete course (admin only)

### Products
- `GET /api/products` - Get all active products (public)
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Trainers
- `GET /api/trainers` - Get all active trainers (public)
- `POST /api/trainers` - Create trainer (admin only)
- `PUT /api/trainers/:id` - Update trainer (admin only)
- `DELETE /api/trainers/:id` - Delete trainer (admin only)

### Orders
- `POST /api/orders` - Create order (authenticated)
- `GET /api/orders/my` - Get user's orders (authenticated)
- `GET /api/orders` - Get all orders (admin only)
- `PUT /api/orders/:id` - Update order (admin only)

## Payment Methods

### Test Card Payment
- Card Number: `4242424242424242`
- CVV: Any 3+ digit number
- Expiry: Any future date (MM/YY format)

### Cash on Delivery (COD)
- No payment required at checkout
- Payment status will be marked as "pending"

## Project Structure

```
Gym/
├── gym-backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js          # MongoDB connection
│   │   ├── middleware/
│   │   │   └── authMiddleware.js  # JWT authentication
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Course.js
│   │   │   ├── Product.js
│   │   │   ├── Trainer.js
│   │   │   └── Order.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── courseRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── trainerRoutes.js
│   │   │   └── orderRoutes.js
│   │   ├── scripts/
│   │   │   └── seed.js       # Database seeding script
│   │   ├── app.js            # Express app configuration
│   │   └── server.js         # Server entry point
│   └── package.json
│
├── gym-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/
│   │   │       ├── Header.js
│   │   │       └── Footer.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── About.js
│   │   │   ├── Courses.js
│   │   │   ├── Pricing.js
│   │   │   ├── Shop.js
│   │   │   ├── Gallery.js
│   │   │   ├── Blog.js
│   │   │   ├── Contact.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Profile.js
│   │   │   ├── Checkout.js
│   │   │   └── AdminDashboard.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

## Usage

1. **As a User:**
   - Register or login to your account
   - Browse courses and enroll in training programs
   - Shop for gym products and supplements
   - View your order history in the profile page
   - View trainer profiles in the gallery

2. **As an Admin:**
   - Login with admin credentials (`admin@gym.com` / `admin123`)
   - Access the Admin Dashboard from the navigation menu
   - Manage courses, products, trainers, and orders
   - Update order statuses and payment information

## Security Notes

- Change the `JWT_SECRET` in production
- Use environment variables for sensitive data
- Implement rate limiting for production
- Add input validation and sanitization
- Use HTTPS in production
- Implement proper CORS policies

## Development

### Running in Development Mode

Backend:
```bash
cd gym-backend
npm run dev
```

Frontend:
```bash
cd gym-frontend
npm start
```

### Building for Production

Frontend:
```bash
cd gym-frontend
npm run build
```

The build folder will contain the production-ready static files.

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the `MONGODB_URI` in `.env` file
- Verify MongoDB connection string format

### CORS Issues
- Backend CORS is configured to allow all origins in development
- Update CORS settings for production

### Port Already in Use
- Change the PORT in `.env` file
- Or kill the process using the port

## License

This project is for educational purposes.

## Contributing

Feel free to submit issues and enhancement requests!

=======
# Gym_Website_nodeJS
>>>>>>> d40060c4ddaca090a71e2812f0acda095f48db8e
