const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sncft';

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔗 Connection String: ${MONGODB_URI}`);
    
    // Test the connection by getting collection info
    const db = conn.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log('\n📋 Available Collections:');
    collections.forEach(collection => {
      console.log(`  - ${collection.name}`);
    });
    
    // If bookings collection exists, show sample data
    if (collections.some(c => c.name === 'bookings')) {
      const Booking = require('./src/models/Booking');
      const bookingCount = await Booking.countDocuments();
      console.log(`\n🎫 Total Bookings: ${bookingCount}`);
      
      if (bookingCount > 0) {
        const sampleBooking = await Booking.findOne();
        console.log('\n📄 Sample Booking Structure:');
        console.log(JSON.stringify(sampleBooking, null, 2));
      }
    }
    
    console.log('\n🌐 MongoDB Compass Connection Info:');
    console.log(`   Connection String: ${MONGODB_URI}`);
    console.log(`   Database Name: ${conn.connection.name}`);
    console.log(`   Collection Name: bookings`);
    
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Run the connection
connectDB();

// Handle connection close
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('\n🔌 MongoDB connection closed');
  process.exit(0);
});
