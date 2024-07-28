// scripts/resetUsers.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust the path if needed
const bcrypt = require('bcryptjs');

const MongoDB_connection_string = process.env.MONGO_URI;

const newUsers = [
  { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phoneNumber: '1234567890', password: 'Password@1' },
  { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phoneNumber: '1234567891', password: 'Password@2' },
  { firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', phoneNumber: '1234567892', password: 'Password@3' },
  { firstName: 'Bob', lastName: 'Brown', email: 'bob.brown@example.com', phoneNumber: '1234567893', password: 'Password@4' },
  { firstName: 'Charlie', lastName: 'Davis', email: 'charlie.davis@example.com', phoneNumber: '1234567894', password: 'Password@5' }
];

async function resetUsers() {
  try {
    await mongoose.connect(MongoDB_connection_string, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');

    // Delete all users
    await User.deleteMany({});
    console.log('All users deleted.');

    // Hash passwords for new users
    const hashedUsers = await Promise.all(newUsers.map(async (userData) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      return { ...userData, password: hashedPassword };
    }));

    // Insert new users
    const users = await User.insertMany(hashedUsers);
    console.log('New users created:', users);

    console.log('Database reset successful.');
    
    // Display all users in the platform
    const allUsers = await User.find({});
    console.log('All users:', allUsers);

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

resetUsers();
