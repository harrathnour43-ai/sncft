// Database Connection Test Script
// This script will test the MongoDB connection for SNCFT

const mongoose = require('mongoose');
require('dotenv').config();

// Connection configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sncft_db';

console.log('🔍 Testing MongoDB Connection...');
console.log('📍 Connection URI:', MONGODB_URI);

// Test connection
const testConnection = async () => {
  try {
    console.log('⏳ Attempting to connect to MongoDB...');
    
    // Connect to MongoDB
    const conn = await mongoose.connect(MONGODB_URI);
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📍 Host: ${conn.connection.host}`);
    console.log(`📍 Port: ${conn.connection.port}`);
    console.log(`📍 Database: ${conn.connection.name}`);
    
    // Test database operations
    console.log('🧪 Testing database operations...');
    
    // List collections
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`📋 Found ${collections.length} collections:`);
    collections.forEach(collection => {
      console.log(`   - ${collection.name}`);
    });
    
    // Test basic query
    const admin = conn.connection.db.admin();
    const result = await admin.ping();
    console.log('🏓 Ping successful:', result);
    
    console.log('🎉 Database connection test completed successfully!');
    
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    
    // Check for common issues
    if (error.message.includes('ECONNREFUSED')) {
      console.log('💡 Troubleshooting:');
      console.log('   1. Make sure MongoDB is installed and running');
      console.log('   2. Check if MongoDB service is started');
      console.log('   3. Verify the connection string and port');
      console.log('   4. Check if MongoDB is listening on the specified port');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('💡 Troubleshooting:');
      console.log('   1. Check the hostname in the connection string');
      console.log('   2. Verify network connectivity');
      console.log('   3. Check if MongoDB server is accessible');
    } else if (error.message.includes('Authentication')) {
      console.log('💡 Troubleshooting:');
      console.log('   1. Verify username and password');
      console.log('   2. Check if the user has proper permissions');
      console.log('   3. Verify the authentication database');
    }
    
    process.exit(1);
  }
};

// Run the test
testConnection();
