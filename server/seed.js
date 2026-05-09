import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Expert from './models/Expert.js';
import Booking from './models/Booking.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const categories = ['Technology', 'Finance', 'Health', 'Legal', 'Marketing', 'Design'];

const generateSlots = () => {
  const slots = [];
  const times = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  for (let i = 1; i <= 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    // Skip Sundays (day 0)
    if (date.getDay() === 0) continue;

    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD

    // Add 4-5 random time slots per day (not all 7 — looks more realistic)
    const shuffled = times.sort(() => Math.random() - 0.5).slice(0, 5);
    shuffled.forEach(time => {
      slots.push({ date: dateStr, time, isBooked: false });
    });
  }
  return slots;
};

const experts = [
  {
    name: 'Alice Johnson',
    category: 'Technology',
    experience: 8,
    rating: 4.8,
    bio: 'Senior Cloud Architect specializing in AWS and distributed systems.',
    profileImage: 'https://i.pravatar.cc/150?img=1'
  },
  {
    name: 'Michael Chen',
    category: 'Finance',
    experience: 12,
    rating: 4.9,
    bio: 'Ex-Wall Street analyst helping startups with fundraising and financial modeling.',
    profileImage: 'https://i.pravatar.cc/150?img=11'
  },
  {
    name: 'Dr. Sarah Williams',
    category: 'Health',
    experience: 15,
    rating: 5.0,
    bio: 'Board-certified nutritionist and holistic health coach.',
    profileImage: 'https://i.pravatar.cc/150?img=5'
  },
  {
    name: 'David Thompson',
    category: 'Legal',
    experience: 10,
    rating: 4.7,
    bio: 'Corporate lawyer advising tech companies on IP and compliance.',
    profileImage: 'https://i.pravatar.cc/150?img=12'
  },
  {
    name: 'Emma Martinez',
    category: 'Marketing',
    experience: 6,
    rating: 4.6,
    bio: 'Growth hacker and digital marketing strategist for SaaS products.',
    profileImage: 'https://i.pravatar.cc/150?img=9'
  },
  {
    name: 'James Wilson',
    category: 'Design',
    experience: 9,
    rating: 4.9,
    bio: 'Lead UX/UI Designer passionate about accessibility and minimal interfaces.',
    profileImage: 'https://i.pravatar.cc/150?img=15'
  },
  {
    name: 'Robert Davis',
    category: 'Technology',
    experience: 14,
    rating: 4.5,
    bio: 'AI researcher and machine learning engineer focusing on NLP.',
    profileImage: 'https://i.pravatar.cc/150?img=33'
  },
  {
    name: 'Jessica Lee',
    category: 'Finance',
    experience: 7,
    rating: 4.8,
    bio: 'Crypto economics researcher and DeFi consultant.',
    profileImage: 'https://i.pravatar.cc/150?img=20'
  },
  {
    name: 'Dr. Kevin Clark',
    category: 'Health',
    experience: 20,
    rating: 4.9,
    bio: 'Sports medicine specialist working with elite athletes.',
    profileImage: 'https://i.pravatar.cc/150?img=59'
  },
  {
    name: 'Lisa Anderson',
    category: 'Design',
    experience: 11,
    rating: 4.7,
    bio: 'Brand identity expert and creative director for Fortune 500s.',
    profileImage: 'https://i.pravatar.cc/150?img=44'
  }
];

const seedData = async () => {
  try {
    await Expert.deleteMany({});
    await Booking.deleteMany({});
    console.log('🗑️  Cleared old data');
    console.log('🌱 Seeding fresh data with 30-day slots...');
    
    const expertsWithSlots = experts.map(exp => ({
      ...exp,
      availableSlots: generateSlots()
    }));

    await Expert.insertMany(expertsWithSlots);
    console.log('✅ Data Imported successfully');
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error.message}`);
    process.exit(1);
  }
};

seedData();
