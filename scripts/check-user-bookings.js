const mongoose = require('mongoose');
const Booking = require('../src/models/Booking');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sncft';

async function checkUserBookings() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB successfully');

        // Get all bookings to see what's in the database
        console.log('\n🔍 Checking all bookings in database...');
        const allBookings = await Booking.find({}).sort({ createdAt: -1 });
        console.log(`📊 Total bookings in database: ${allBookings.length}`);
        
        if (allBookings.length > 0) {
            console.log('📋 All bookings:');
            allBookings.forEach((booking, index) => {
                console.log(`  ${index + 1}. ID: ${booking.id}`);
                console.log(`     User ID: ${booking.userId}`);
                console.log(`     Status: ${booking.status}`);
                console.log(`     Route: ${booking.from} → ${booking.to}`);
                console.log(`     Date: ${booking.departureDate}`);
                console.log(`     Created: ${booking.createdAt}`);
                console.log('     ---');
            });
        }

        // Check bookings for specific user
        const userId = '6977721677d404c81b88680f'; // Your user ID
        console.log(`\n🔍 Checking bookings for user: ${userId}`);
        const userBookings = await Booking.find({ userId }).sort({ createdAt: -1 });
        console.log(`📊 Bookings for user ${userId}: ${userBookings.length}`);
        
        if (userBookings.length > 0) {
            console.log('📋 User bookings:');
            userBookings.forEach((booking, index) => {
                console.log(`  ${index + 1}. ID: ${booking.id}`);
                console.log(`     Status: ${booking.status}`);
                console.log(`     Route: ${booking.from} → ${booking.to}`);
                console.log(`     Date: ${booking.departureDate}`);
                console.log(`     Created: ${booking.createdAt}`);
                console.log('     ---');
            });
        } else {
            console.log('❌ No bookings found for this user');
        }

        // Test the API response format
        console.log('\n🧪 Testing API response format...');
        const response = {
            success: true,
            count: userBookings.length,
            data: userBookings
        };
        console.log('📤 API Response:', JSON.stringify(response, null, 2));

    } catch (error) {
        console.error('❌ Error checking bookings:', error);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed');
    }
}

checkUserBookings();
