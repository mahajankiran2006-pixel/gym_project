import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Trainer from '../models/Trainer.js';
import Course from '../models/Course.js';
import Product from '../models/Product.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data (optional - comment out if you want to keep existing data)
    await User.deleteMany({});
    await Trainer.deleteMany({});
    await Course.deleteMany({});
    await Product.deleteMany({});

    console.log('Cleared existing data...');

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const adminPasswordHash = await bcrypt.hash('admin123', salt);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@gym.com',
      passwordHash: adminPasswordHash,
      role: 'admin'
    });
    console.log('Created admin user:', admin.email);

    // Create regular user
    const userPasswordHash = await bcrypt.hash('user123', salt);
    const user = await User.create({
      name: 'John Doe',
      email: 'user@gym.com',
      passwordHash: userPasswordHash,
      role: 'user'
    });
    console.log('Created regular user:', user.email);

    // Create trainers
    const trainers = await Trainer.insertMany([
      {
        name: 'Mike Johnson',
        bio: 'Certified personal trainer with 10+ years of experience in strength training and bodybuilding.',
        specialty: 'Body Building',
        imageUrl: '/assets/img/gallery/team1.png',
        socialLinks: {
          facebook: 'https://facebook.com',
          instagram: 'https://instagram.com',
          twitter: 'https://twitter.com'
        },
        isActive: true
      },
      {
        name: 'Sarah Williams',
        bio: 'Expert in muscle gain and nutrition. Specializes in helping clients build lean muscle mass.',
        specialty: 'Muscle Gain',
        imageUrl: '/assets/img/gallery/team2.png',
        socialLinks: {
          facebook: 'https://facebook.com',
          instagram: 'https://instagram.com',
          twitter: 'https://twitter.com'
        },
        isActive: true
      },
      {
        name: 'David Chen',
        bio: 'Weight loss specialist with proven track record. Focuses on sustainable weight loss strategies.',
        specialty: 'Weight Loss',
        imageUrl: '/assets/img/gallery/team3.png',
        socialLinks: {
          facebook: 'https://facebook.com',
          instagram: 'https://instagram.com',
          twitter: 'https://twitter.com'
        },
        isActive: true
      }
    ]);
    console.log(`Created ${trainers.length} trainers`);

    // Create courses
    const courses = await Course.insertMany([
      {
        title: 'Personal Training - Beginner',
        description: 'Perfect for beginners. Learn the fundamentals of fitness and build a strong foundation.',
        durationMonths: 3,
        pricePerMonth: 30,
        features: [
          'Free riding',
          'Unlimited equipments',
          'Personal trainer',
          'Weight losing classes',
          'Month to month'
        ],
        level: 'beginner',
        imageUrl: '/assets/img/gallery/cat1.png',
        isActive: true
      },
      {
        title: 'Personal Training - Intermediate',
        description: 'Take your fitness to the next level with advanced training techniques.',
        durationMonths: 6,
        pricePerMonth: 50,
        features: [
          'Free riding',
          'Unlimited equipments',
          'Personal trainer',
          'Advanced training',
          'Nutrition guidance',
          'Month to month'
        ],
        level: 'intermediate',
        imageUrl: '/assets/img/gallery/cat2.png',
        isActive: true
      },
      {
        title: 'Personal Training - Advanced',
        description: 'Elite training program for serious athletes and fitness enthusiasts.',
        durationMonths: 12,
        pricePerMonth: 80,
        features: [
          'Free riding',
          'Unlimited equipments',
          'Elite personal trainer',
          'Custom workout plans',
          'Nutrition planning',
          'Progress tracking',
          'Month to month'
        ],
        level: 'advanced',
        imageUrl: '/assets/img/gallery/cat1.png',
        isActive: true
      },
      {
        title: 'Group Training',
        description: 'Train with a group and stay motivated. Great for social fitness enthusiasts.',
        durationMonths: 6,
        pricePerMonth: 25,
        features: [
          'Group sessions',
          'Unlimited equipments',
          'Group trainer',
          'Social environment',
          'Month to month'
        ],
        level: 'beginner',
        imageUrl: '/assets/img/gallery/cat2.png',
        isActive: true
      }
    ]);
    console.log(`Created ${courses.length} courses`);

    // Create products
    const products = await Product.insertMany([
      {
        name: 'Protein Powder - Whey',
        description: 'High-quality whey protein powder for muscle recovery and growth.',
        price: 49.99,
        imageUrl: '/assets/img/gallery/gallery1.png',
        category: 'Supplements',
        stock: 50,
        isActive: true
      },
      {
        name: 'Pre-Workout Energy',
        description: 'Boost your energy and performance with our premium pre-workout supplement.',
        price: 39.99,
        imageUrl: '/assets/img/gallery/gallery2.png',
        category: 'Supplements',
        stock: 30,
        isActive: true
      },
      {
        name: 'Gym Gloves',
        description: 'Professional gym gloves for better grip and protection.',
        price: 24.99,
        imageUrl: '/assets/img/gallery/gallery3.png',
        category: 'Equipment',
        stock: 100,
        isActive: true
      },
      {
        name: 'Resistance Bands Set',
        description: 'Complete set of resistance bands for home workouts.',
        price: 34.99,
        imageUrl: '/assets/img/gallery/gallery4.png',
        category: 'Equipment',
        stock: 40,
        isActive: true
      },
      {
        name: 'Water Bottle - Premium',
        description: 'High-quality shaker bottle for your protein shakes.',
        price: 19.99,
        imageUrl: '/assets/img/gallery/gallery5.png',
        category: 'Accessories',
        stock: 75,
        isActive: true
      },
      {
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat for stretching and floor exercises.',
        price: 29.99,
        imageUrl: '/assets/img/gallery/gallery6.png',
        category: 'Equipment',
        stock: 60,
        isActive: true
      }
    ]);
    console.log(`Created ${products.length} products`);

    console.log('\n✅ Seed data created successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin: admin@gym.com / admin123');
    console.log('User: user@gym.com / user123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

