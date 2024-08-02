require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/auth');
require('./config/passport')(passport);
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const path = require('path');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Init Middleware
app.use(express.json({ extended: false }));
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// Connect to MongoDB
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit the process with failure code
  }
};

// Connect to the database
connectDB();

app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
// });

// Routes
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working' });
});

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
