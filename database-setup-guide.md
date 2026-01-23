# SNCFT Railway Database Setup Guide

## Prerequisites
1. MongoDB installed on your system
2. Node.js and npm installed
3. MongoDB Compass (optional, for GUI management)

## Step 1: Install MongoDB Driver
```bash
npm install mongodb
# or for the project
npm install mongoose
```

## Step 2: Database Connection Setup

### Create database connection file: `src/config/database.js`
```javascript
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sncft_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### Environment variables: `.env`
```
MONGODB_URI=mongodb://localhost:27017/sncft_db
NODE_ENV=development
PORT=5000
```

## Step 3: Database Schema Models

### User Model: `src/models/User.js`
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add a first name'],
        trim: true,
        maxlength: [50, 'First name cannot be more than 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Please add a last name'],
        trim: true,
        maxlength: [50, 'Last name cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number'],
        match: [/^\+216\s?\d{8}$/, 'Please add a valid Tunisian phone number']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
```

### Booking Model: `src/models/Booking.js`
```javascript
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    train: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Train',
        required: true
    },
    from: {
        type: String,
        required: [true, 'Please specify departure city'],
        enum: ['tunis', 'sfax', 'sousse', 'monastir', 'bizerte', 'gabes', 'tozeur', 'djerba']
    },
    to: {
        type: String,
        required: [true, 'Please specify arrival city'],
        enum: ['tunis', 'sfax', 'sousse', 'monastir', 'bizerte', 'gabes', 'tozeur', 'djerba']
    },
    departureDate: {
        type: Date,
        required: [true, 'Please specify departure date']
    },
    returnDate: {
        type: Date
    },
    passengers: {
        type: Number,
        required: [true, 'Please specify number of passengers'],
        min: [1, 'At least 1 passenger required'],
        max: [6, 'Maximum 6 passengers allowed']
    },
    class: {
        type: String,
        required: [true, 'Please specify class'],
        enum: ['economy', 'business', 'first'],
        default: 'economy'
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['credit', 'debit', 'cash'],
        required: [true, 'Please specify payment method']
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending'
    },
    bookingReference: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
```

### Train Model: `src/models/Train.js`
```javascript
const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    trainNumber: {
        type: String,
        required: [true, 'Train number is required'],
        unique: true
    },
    type: {
        type: String,
        required: [true, 'Train type is required'],
        enum: ['express', 'regional', 'high-speed']
    },
    from: {
        type: String,
        required: [true, 'Departure city is required'],
        enum: ['tunis', 'sfax', 'sousse', 'monastir', 'bizerte', 'gabes', 'tozeur', 'djerba']
    },
    to: {
        type: String,
        required: [true, 'Arrival city is required'],
        enum: ['tunis', 'sfax', 'sousse', 'monastir', 'bizerte', 'gabes', 'tozeur', 'djerba']
    },
    departureTime: {
        type: String,
        required: [true, 'Departure time is required']
    },
    arrivalTime: {
        type: String,
        required: [true, 'Arrival time is required']
    },
    duration: {
        type: String,
        required: [true, 'Duration is required']
    },
    features: [{
        type: String,
        enum: ['WiFi', 'Restaurant', 'AC', 'Snacks', 'Power Outlets']
    }],
    prices: {
        economy: {
            type: Number,
            required: [true, 'Economy price is required'],
            min: [0, 'Price cannot be negative']
        },
        business: {
            type: Number,
            required: [true, 'Business price is required'],
            min: [0, 'Price cannot be negative']
        },
        first: {
            type: Number,
            required: [true, 'First class price is required'],
            min: [0, 'Price cannot be negative']
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Train', trainSchema);
```

### Contact Model: `src/models/Contact.js`
```javascript
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: [50, 'First name cannot be more than 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: [50, 'Last name cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\+216\s?\d{8}$/, 'Please add a valid Tunisian phone number']
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        enum: ['booking', 'schedule', 'complaint', 'suggestion', 'technical', 'other']
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        maxlength: [1000, 'Message cannot be more than 1000 characters']
    },
    status: {
        type: String,
        enum: ['new', 'in-progress', 'resolved', 'closed'],
        default: 'new'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', contactSchema);
```

## Step 4: Database Controllers

### Booking Controller: `src/controllers/bookingController.js`
```javascript
const Booking = require('../models/Booking');
const Train = require('../models/Train');
const User = require('../models/User');

// @desc    Create new booking
// @route   POST /api/bookings
// @access   Private
exports.createBooking = async (req, res) => {
    try {
        const { trainId, from, to, departureDate, returnDate, passengers, class: travelClass, paymentMethod } = req.body;

        // Get train details
        const train = await Train.findById(trainId);
        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        }

        // Calculate total price
        const basePrice = train.prices[travelClass];
        const totalPrice = basePrice * passengers;

        // Generate booking reference
        const bookingReference = 'SNCFT' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();

        const booking = await Booking.create({
            user: req.user.id,
            train: trainId,
            from,
            to,
            departureDate,
            returnDate,
            passengers,
            class: travelClass,
            totalPrice,
            paymentMethod,
            bookingReference
        });

        res.status(201).json({
            success: true,
            data: booking,
            message: 'Booking created successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings
// @access   Private
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate('train', 'trainNumber type from to departureTime arrivalTime duration')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Search trains
// @route   POST /api/trains/search
// @access   Public
exports.searchTrains = async (req, res) => {
    try {
        const { from, to, departureDate, passengers, class: travelClass } = req.body;

        const trains = await Train.find({
            from,
            to,
            isActive: true,
            departureDate: {
                $gte: new Date(departureDate)
            }
        }).sort({ departureTime: 1 });

        res.status(200).json({
            success: true,
            count: trains.length,
            data: trains
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
```

### Contact Controller: `src/controllers/contactController.js`
```javascript
const Contact = require('../models/Contact');

// @desc    Create contact message
// @route   POST /api/contact
// @access   Public
exports.createContact = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, subject, message } = req.body;

        const contact = await Contact.create({
            firstName,
            lastName,
            email,
            phone,
            subject,
            message
        });

        res.status(201).json({
            success: true,
            data: contact,
            message: 'Contact message sent successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access   Private (Admin)
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
```

## Step 5: API Routes

### Booking Routes: `src/routes/bookingRoutes.js`
```javascript
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    createBooking,
    getUserBookings,
    searchTrains
} = require('../controllers/bookingController');

router.route('/').post(protect, createBooking);
router.route('/user').get(protect, getUserBookings);
router.route('/search').post(searchTrains);

module.exports = router;
```

### Contact Routes: `src/routes/contactRoutes.js`
```javascript
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    createContact,
    getContacts
} = require('../controllers/contactController');

router.route('/').post(createContact);
router.route('/').get(protect, authorize('admin'), getContacts);

module.exports = router;
```

## Step 6: MongoDB Queries for Testing

### Create Database and Insert Sample Data
```javascript
// Connect to MongoDB
use sncft_db

// Insert sample trains
db.trains.insertMany([
    {
        trainNumber: "TN-101",
        type: "express",
        from: "tunis",
        to: "sfax",
        departureTime: "08:00",
        arrivalTime: "11:30",
        duration: "3h 30m",
        features: ["WiFi", "Restaurant", "AC"],
        prices: {
            economy: 25,
            business: 45,
            first: 75
        },
        isActive: true,
        createdAt: new Date()
    },
    {
        trainNumber: "TN-202",
        type: "regional",
        from: "tunis",
        to: "sousse",
        departureTime: "14:00",
        arrivalTime: "16:45",
        duration: "2h 45m",
        features: ["AC", "Snacks"],
        prices: {
            economy: 20,
            business: 35,
            first: 55
        },
        isActive: true,
        createdAt: new Date()
    }
]);

// Insert sample users
db.users.insertOne({
    firstName: "Mohamed",
    lastName: "Ben Ali",
    email: "mohamed.benali@email.com",
    phone: "+216 71 334 444",
    password: "hashedpassword123",
    role: "user",
    createdAt: new Date()
});

// Create indexes for better performance
db.trains.createIndex({ from: 1, to: 1, departureDate: 1 });
db.bookings.createIndex({ user: 1, createdAt: -1 });
db.contacts.createIndex({ createdAt: -1 });
```

### Common MongoDB Queries
```javascript
// Find trains between cities
db.trains.find({
    from: "tunis",
    to: "sfax",
    isActive: true
}).sort({ departureTime: 1 });

// Find user bookings
db.bookings.find({
    user: ObjectId("user_id_here")
}).populate("train").sort({ createdAt: -1 });

// Find contacts by status
db.contacts.find({
    status: "new"
}).sort({ createdAt: -1 });

// Aggregate booking statistics
db.bookings.aggregate([
    {
        $group: {
            _id: "$status",
            count: { $sum: 1 },
            totalRevenue: { $sum: "$totalPrice" }
        }
    }
]);

// Find available trains for specific date
db.trains.find({
    from: "tunis",
    to: "sfax",
    departureDate: {
        $gte: ISODate("2024-01-15T00:00:00Z"),
        $lt: ISODate("2024-01-16T00:00:00Z")
    }
});
```

## Step 7: Environment Setup

### Install dependencies
```bash
npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken cors helmet morgan
npm install -D nodemon concurrently
```

### Package.json scripts
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "server": "concurrently \"npm run server\" \"npm run client\"",
    "install-client": "npm install --prefix client",
    "build-client": "npm run build --prefix client"
  }
}
```

## Step 8: Server Setup

### Main server file: `server.js`
```javascript
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
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
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/trains', require('./routes/bookingRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

## Step 9: Testing the Database

### Test with MongoDB Compass
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017/sncft_db`
3. Browse collections: users, trains, bookings, contacts
4. Verify data insertion

### Test with Node.js
```bash
# Start the server
npm run dev

# Test API endpoints
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@email.com","phone":"+216 71 334 444","subject":"booking","message":"Test message"}'
```

## Step 10: Security Considerations

### Environment Variables
```bash
# Never commit these to version control
MONGODB_URI=mongodb://localhost:27017/sncft_db
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=production
```

### Database Security
```javascript
// Use MongoDB connection with authentication
const mongoURI = `mongodb+srv://username:password@cluster.mongodb.net/sncft_db?retryWrites=true&w=majority`;

// Enable MongoDB authentication in production
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin'
};
```

## Summary

This setup provides:
1. **Complete database schema** for SNCFT railway system
2. **RESTful API endpoints** for all operations
3. **Data validation** and security measures
4. **MongoDB queries** for common operations
5. **Scalable architecture** for future growth
6. **Authentication system** for user management
7. **Booking system** with train integration
8. **Contact system** for customer support

Follow these steps sequentially to set up your MongoDB database for the SNCFT website!
