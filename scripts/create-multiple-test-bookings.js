const mongoose = require('mongoose');
const Booking = require('../src/models/Booking');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sncft';

async function createMultipleTestBookings() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB successfully');

        const userId = '6977721677d404c81b88680f';
        const cities = ['tunis', 'sfax', 'sousse', 'monastir', 'bizerte'];
        const classes = ['Economy', 'Business', 'First'];
        const statuses = ['confirmed', 'upcoming', 'completed'];
        
        // Create 5 test bookings
        const testBookings = [];
        for (let i = 1; i <= 5; i++) {
            const fromCity = cities[Math.floor(Math.random() * cities.length)];
            let toCity = cities[Math.floor(Math.random() * cities.length)];
            while (toCity === fromCity) {
                toCity = cities[Math.floor(Math.random() * cities.length)];
            }
            
            const departureDate = new Date();
            departureDate.setDate(departureDate.getDate() + (i - 3)); // Mix of past and future dates
            
            const booking = {
                id: `BK${Date.now()}${i}`,
                bookingReference: `REF${Date.now()}${i}`,
                userId: userId,
                trainNumber: `TN-${1000 + i}`,
                from: fromCity,
                to: toCity,
                departureDate: departureDate.toISOString().split('T')[0],
                departureTime: `${8 + i}:00`,
                arrivalTime: `${11 + i}:00`,
                passengers: Math.floor(Math.random() * 3) + 1,
                class: classes[Math.floor(Math.random() * classes.length)],
                price: 50 + (i * 15),
                status: statuses[Math.floor(Math.random() * statuses.length)],
                createdAt: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)) // Different creation times
            };
            
            testBookings.push(booking);
        }

        console.log('🎫 Creating multiple test bookings...');
        
        // Clear existing test bookings first
        await Booking.deleteMany({ userId: userId });
        console.log('🧹 Cleared existing test bookings');

        // Insert new test bookings
        const createdBookings = await Booking.insertMany(testBookings);
        console.log(`✅ Created ${createdBookings.length} test bookings successfully!`);

        // Verify the bookings were saved
        const savedBookings = await Booking.find({ userId }).sort({ createdAt: -1 });
        console.log(`📊 Total bookings for user ${userId}: ${savedBookings.length}`);
        
        savedBookings.forEach((booking, index) => {
            console.log(`  ${index + 1}. ${booking.trainNumber} - ${booking.from} → ${booking.to} - ${booking.status}`);
        });

        // Test the API response structure
        console.log('\n🧪 Testing API response format...');
        const response = {
            success: true,
            count: savedBookings.length,
            data: savedBookings
        };
        console.log('📤 API Response:', JSON.stringify(response, null, 2));

    } catch (error) {
        console.error('❌ Error creating test bookings:', error);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed');
    }
}

createMultipleTestBookings();
