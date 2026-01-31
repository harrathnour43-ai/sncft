const mongoose = require('mongoose');
const Booking = require('../src/models/Booking');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sncft';

async function testBookingStorage() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB successfully');

        // Test 1: Check if we can read existing bookings
        console.log('\n📋 Testing: Read existing bookings');
        const existingBookings = await Booking.find({});
        console.log(`Found ${existingBookings.length} existing bookings`);
        
        if (existingBookings.length > 0) {
            console.log('Sample booking:', existingBookings[0]);
        }

        // Test 2: Create a test booking
        console.log('\n🎫 Testing: Create new booking');
        const testBooking = {
            id: `TEST${Date.now()}`,
            userId: 'test-user',
            trainNumber: 'TN-TEST',
            from: 'tunis',
            to: 'sfax',
            departureDate: '2024-12-25',
            departureTime: '10:00',
            arrivalTime: '13:00',
            passengers: 2,
            class: 'First',
            price: 45.50,
            status: 'upcoming'
        };

        const createdBooking = await Booking.create(testBooking);
        console.log('✅ Test booking created:', createdBooking);

        // Test 3: Read the booking back
        console.log('\n🔍 Testing: Read created booking');
        const foundBooking = await Booking.findOne({ id: createdBooking.id });
        console.log('✅ Booking found:', foundBooking);

        // Test 4: Clean up test booking
        console.log('\n🧹 Testing: Delete test booking');
        await Booking.deleteOne({ id: createdBooking.id });
        console.log('✅ Test booking deleted');

        console.log('\n🎉 All database tests passed!');
        console.log('✅ Booking storage system is working correctly');

    } catch (error) {
        console.error('❌ Database test failed:', error);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed');
    }
}

testBookingStorage();
