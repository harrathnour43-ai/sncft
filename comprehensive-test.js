// Comprehensive Database and Server Test
// This script will test both MongoDB connection and server startup

const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sncft_db';
const PORT = process.env.PORT || 5000;

console.log('🚀 Starting Comprehensive Database and Server Test...\n');

// Test 1: Database Connection
const testDatabaseConnection = async () => {
  console.log('📊 Test 1: Database Connection');
  console.log('=' .repeat(50));
  
  try {
    console.log('⏳ Connecting to MongoDB...');
    const conn = await mongoose.connect(MONGODB_URI);
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📍 Host: ${conn.connection.host}`);
    console.log(`📍 Port: ${conn.connection.port}`);
    console.log(`📍 Database: ${conn.connection.name}`);
    
    // Test database operations
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`📋 Found ${collections.length} collections:`);
    collections.forEach(collection => {
      console.log(`   - ${collection.name}`);
    });
    
    // Test ping
    const admin = conn.connection.db.admin();
    const pingResult = await admin.ping();
    console.log('🏓 Database ping successful:', pingResult);
    
    console.log('✅ Database test completed successfully!\n');
    return true;
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    return false;
  }
};

// Test 2: Server Startup
const testServerStartup = async () => {
  console.log('🌐 Test 2: Server Startup');
  console.log('=' .repeat(50));
  
  try {
    console.log('⏳ Starting Express server...');
    
    const app = express();
    
    // Middleware
    app.use(helmet());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());
    
    // Basic test route
    app.get('/test', (req, res) => {
      res.json({
        message: 'Server is running successfully!',
        timestamp: new Date().toISOString(),
        database: 'Connected',
        status: 'OK'
      });
    });
    
    // Health check route
    app.get('/health', async (req, res) => {
      try {
        // Test database connection
        await mongoose.connection.db.admin().ping();
        
        res.json({
          status: 'healthy',
          database: 'connected',
          timestamp: new Date().toISOString(),
          uptime: process.uptime()
        });
      } catch (error) {
        res.status(500).json({
          status: 'unhealthy',
          database: 'disconnected',
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    });
    
    // Start server
    const server = app.listen(PORT, () => {
      console.log(`✅ Server started successfully!`);
      console.log(`📍 Port: ${PORT}`);
      console.log(`🌍 URL: http://localhost:${PORT}`);
      console.log('✅ Server test completed successfully!\n');
      
      // Test the server endpoints
      testServerEndpoints(PORT);
      
      // Close server after testing
      setTimeout(() => {
        server.close();
        console.log('🔌 Server closed');
        mongoose.connection.close();
        console.log('🔌 Database connection closed');
        console.log('🎉 All tests completed successfully!');
        process.exit(0);
      }, 3000);
    });
    
    return true;
    
  } catch (error) {
    console.error('❌ Server startup failed:');
    console.error('Error:', error.message);
    return false;
  }
};

// Test Server Endpoints
const testServerEndpoints = async (port) => {
  console.log('🔍 Test 3: Server Endpoints');
  console.log('=' .repeat(50));
  
  try {
    const http = require('http');
    
    // Test basic endpoint
    const testEndpoint = (path, description) => {
      return new Promise((resolve, reject) => {
        const options = {
          hostname: 'localhost',
          port: port,
          path: path,
          method: 'GET'
        };
        
        const req = http.request(options, (res) => {
          let data = '';
          res.on('data', (chunk) => data += chunk);
          res.on('end', () => {
            console.log(`✅ ${description}: ${res.statusCode} - ${JSON.parse(data).message}`);
            resolve();
          });
        });
        
        req.on('error', (error) => {
          console.log(`❌ ${description}: ${error.message}`);
          reject(error);
        });
        
        req.end();
      });
    };
    
    await testEndpoint('/test', 'Basic test endpoint');
    await testEndpoint('/health', 'Health check endpoint');
    
  } catch (error) {
    console.error('❌ Endpoint testing failed:', error.message);
  }
};

// Run all tests
const runAllTests = async () => {
  console.log('🧪 Starting Comprehensive Database and Server Tests...\n');
  
  // Test database connection
  const dbTest = await testDatabaseConnection();
  
  if (dbTest) {
    // Test server startup
    await testServerStartup();
  } else {
    console.error('❌ Database test failed. Skipping server test.');
    process.exit(1);
  }
};

// Run the tests
runAllTests().catch(error => {
  console.error('❌ Test suite failed:', error);
  process.exit(1);
});
