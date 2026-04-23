const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const queueRoutes = require('./routes/queueRoutes');
const reportRoutes = require('./routes/reportRoutes');


const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const { protect } = require('./middleware/authMiddleware');

const { 
  generateToken, 
  getLiveQueue, 
  rescheduleToken, 
  getTokenHistory, 
  cancelToken, 
  archiveToken,
  startTokenCleanup
} = require('./controllers/queueController');

// Start background cleanup
startTokenCleanup();

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// CORS
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/queue', queueRoutes);
app.use('/api/reports', reportRoutes);

// Static folders
const dirname = path.resolve();
app.use('/uploads', express.static(path.join(dirname, 'backend/uploads')));

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
