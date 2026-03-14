import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

// DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Gym Management System API is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: "1.0.0"
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);

export default app;
