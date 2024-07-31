const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const connectToDatabase = async () => {
  const url = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

const closeDatabaseConnection = async () => {
  await mongoose.connection.close();
};

module.exports = {
  connectToDatabase,
  closeDatabaseConnection,
  connectDB
};

