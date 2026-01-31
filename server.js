const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/bookings', require('./src/routes/bookingRoutes'));
app.use('/api/trains', require('./src/routes/bookingRoutes'));
app.use('/api/contact', require('./src/routes/contactRoutes'));
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/profile', require('./src/routes/profileRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
