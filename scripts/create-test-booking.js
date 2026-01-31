const mongoose = require('mongoose');
const Booking = require('../src/models/Booking');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sncft';

async function createTestBooking() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB successfully');

        // Create a test booking for your user
        const userId = '6977721677d404c81b88680f';
        const testBooking = {
            id: `BK${Date.now()}${Math.floor(Math.random() * 1000)}`,
            bookingReference: `REF${Date.now()}${Math.floor(Math.random() * 1000)}`,
            userId: userId,
            trainNumber: 'TN-1234',
            from: 'tunis',
            to: 'sfax',
            departureDate: '2024-12-25',
            departureTime: '10:00',
            arrivalTime: '13:00',
            passengers: 2,
            class: 'Economy',
            price: 85.50,
            status: 'confirmed',
            createdAt: new Date()
        };

        console.log('🎫 Creating test booking...');
        console.log('📋 Booking data:', testBooking);

        const booking = await Booking.create(testBooking);
        console.log('✅ Test booking created successfully!');
        console.log('🆔 Booking ID:', booking.id);
        console.log('👤 User ID:', booking.userId);
        console.log('📊 Status:', booking.status);

        // Verify the booking was saved
        console.log('\n🔍 Verifying booking was saved...');
        const savedBookings = await Booking.find({ userId }).sort({ createdAt: -1 });
        console.log(`📊 Found ${savedBookings.length} bookings for user ${userId}`);
        
        savedBookings.forEach((booking, index) => {
            console.log(`  ${index + 1}. ${booking.id} - ${booking.status} - ${booking.from} → ${booking.to}`);
        });

        // Test the API response
        console.log('\n🧪 Testing API response format...');
        const response = {
            success: true,
            count: savedBookings.length,
            data: savedBookings
        };
        console.log('📤 API Response:', JSON.stringify(response, null, 2));

    } catch (error) {
        console.error('❌ Error creating test booking:', error);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed');
    }
}

createTestBooking();
