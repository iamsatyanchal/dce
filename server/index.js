require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/User'); // For seeding admin

dotenv.config();

const app = express();

// Connect to Database
connectDB();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1 && !origin.endsWith('.vercel.app')) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());

// Seed Default Admin
const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@dce.ac.in' });
    if (!adminExists) {
      const admin = new User({
        email: 'admin@dce.ac.in',
        password: 'admin123', // Will be hashed by pre-save hook
        isAdmin: true
      });
      await admin.save();
      console.log('Default Admin Created: admin@dce.ac.in / admin123');
    }
  } catch (error) {
    console.error('Admin seeding error:', error);
  }
};
seedAdmin();

// Routes
app.use('/api/navigation', require('./routes/navigationRoutes'));
app.use('/api/content', require('./routes/contentRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/auth', authRoutes);
app.use('/api/images', require('./routes/imageRoutes'));
app.use('/api/important-links', require('./routes/importantLinkRoutes')); // Mount link routes
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/student-life', require('./routes/studentLifeRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));

app.get('/', (req, res) => {
  res.send('DCE Darbhanga Clone API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
