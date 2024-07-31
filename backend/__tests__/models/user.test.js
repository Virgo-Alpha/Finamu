require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../models/User');
const { connectToDatabase, closeDatabaseConnection } = require('../../config/db');

beforeAll(async () => {
  await connectToDatabase();
});

afterEach(async () => {
  // Clear users collection after each test
  await User.deleteMany({});
});

afterAll(async () => {
  await closeDatabaseConnection();
});

describe('User Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should create a user with hashed password', async () => {
    const userData = { firstName: 'Test', lastName: 'User', email: 'test@example.com', phoneNumber: '1234567890', password: 'password123' };
    const user = new User(userData);
    await user.save();

    expect(user.password).not.toBe(userData.password); // Check that password is hashed
  });

  it('should not allow duplicate email registration', async () => {
    const userData = { firstName: 'Test', lastName: 'User', email: 'test@example.com', phoneNumber: '1234567890', password: 'password123' };
    try {
      await new User(userData).save();
    } catch (error) {
      expect(error.code).toBe(11000);
    }
  });
});
