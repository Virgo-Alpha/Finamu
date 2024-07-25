require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Project = require('../models/Project');
const User = require('../models/User');

const MongoDB_connection_string = process.env.MONGO_URI;

mongoose.connect(MongoDB_connection_string, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const createDummyData = async () => {
  try {
    await Project.deleteMany({});
    await User.deleteMany({});

    // Create dummy users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const dummyUsers = [
      { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: hashedPassword, phoneNumber: '812357219' },
      { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', password: hashedPassword, phoneNumber: '889731200' },
    ];

    const users = await User.insertMany(dummyUsers);

    const dummyProjects = [
      {
        name: 'Project Alpha',
        description: 'An exciting new film project.',
        targetAmount: 100000,
        smallestTokenAmount: 100,
        projectStartDate: new Date(),
        projectEndDate: new Date(),
        country: 'Country A',
        tags: ['action', 'thriller'],
        filmmaker: users[0]._id,
        status: 'public',
        risk: 'low',
        contributionDetails: {
          bankAccount: '123456789',
          mobileMoney: '987654321',
          paypal: 'alpha@project.com',
        },
        smartContractDetails: {
          roi: 10,
          dateOfRoi: new Date(),
          flopPlan: 'Plan in case of flop',
        },
      },
      {
        name: 'Project Beta',
        description: 'A documentary on wildfires.',
        targetAmount: 50000,
        smallestTokenAmount: 50,
        projectStartDate: new Date(),
        projectEndDate: new Date(),
        country: 'Country B',
        tags: ['documentary', 'environment'],
        filmmaker: users[1]._id,
        status: 'private',
        risk: 'high',
        contributionDetails: {
          bankAccount: '123456789',
          mobileMoney: '987654321',
          paypal: 'beta@project.com',
        },
        smartContractDetails: {
          roi: 15,
          dateOfRoi: new Date(),
          flopPlan: 'Plan in case of flop',
        },
      },
    ];

    await Project.insertMany(dummyProjects);
    console.log('Dummy users and projects inserted');
  } catch (error) {
    console.error('Error creating dummy data:', error);
  } finally {
    mongoose.connection.close();
  }
};

createDummyData();
