# Gym Management System

A full-stack gym management application built with React frontend and Node.js/Express backend.

## Project Structure

- `gym-frontend/` - React frontend application
- `gym-backend/` - Node.js/Express backend API

## Features

- User authentication and authorization
- Trainer management
- Course management
- Product management
- Order processing
- Contact management

## Technologies Used

### Frontend
- React 19.2.0
- React Router DOM
- Axios for API calls
- Bootstrap for styling

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd gym-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

5. Seed the database (optional):
   ```bash
   npm run seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

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

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5000`.

## API Endpoints

The backend provides RESTful API endpoints for:
- User authentication (`/api/auth`)
- User management (`/api/users`)
- Trainer management (`/api/trainers`)
- Course management (`/api/courses`)
- Product management (`/api/products`)
- Order management (`/api/orders`)
- Contact management (`/api/contacts`)

## Deployment

### Environment Variables
Make sure to set the following environment variables in your production environment:
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens

### Production Build
To create a production build of the frontend:
```bash
cd gym-frontend
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is licensed under the MIT License.