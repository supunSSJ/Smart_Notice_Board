const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Admin = require('../models/admin.model');

const seedAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected.');

    // Check if any admin already exists to prevent duplicate seeding
    const existingAdmin = await Admin.findOne({ email: 'admin@smartboard.com' });
    if (existingAdmin) {
      console.log('Admin user natively exists! Proceed to the login panel.');
      process.exit(0);
    }

    // Create the default baseline admin
    await Admin.create({
      name: 'System Admin',
      email: 'admin@smartboard.com',
      password: '1234Smart#', // Change this immediately after first login
      role: 'superadmin'
    });

    console.log('✅ Default superadmin created successfully! You can now log in.');
    console.log('Email: admin@smartboard.com');
    console.log('Password: SecurePassword123!');
    process.exit(0);
  } catch (error) {
    console.error('Error securely seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
