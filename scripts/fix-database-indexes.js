const mongoose = require('mongoose');
const Booking = require('../src/models/Booking');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sncft';

async function fixDatabaseIndexes() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB successfully');

        // Get the booking collection
        const db = mongoose.connection.db;
        const collection = db.collection('bookings');

        console.log('\n🔍 Checking existing indexes...');
        const indexes = await collection.indexes();
        console.log('📋 Current indexes:', indexes);

        // Check for problematic bookingReference index
        const bookingRefIndex = indexes.find(index => index.key.bookingReference);
        if (bookingRefIndex) {
            console.log('⚠️ Found bookingReference index:', bookingRefIndex);
            
            // Drop the problematic index
            console.log('🗑️ Dropping bookingReference index...');
            await collection.dropIndex('bookingReference_1');
            console.log('✅ bookingReference index dropped');
        }

        // Check for any documents with null bookingReference
        console.log('\n🔍 Checking for documents with null bookingReference...');
        const nullRefDocs = await collection.find({ bookingReference: null }).toArray();
        console.log(`📊 Found ${nullRefDocs.length} documents with null bookingReference`);

        if (nullRefDocs.length > 0) {
            console.log('🔧 Updating documents with null bookingReference...');
            const bulkOps = nullRefDocs.map(doc => ({
                updateOne: {
                    filter: { _id: doc._id },
                    update: { 
                        $set: { 
                            bookingReference: `REF${Date.now()}${Math.floor(Math.random() * 1000)}${doc._id.toString().slice(-6)}` 
                        }
                    }
                }
            }));

            await collection.bulkWrite(bulkOps);
            console.log('✅ Updated all documents with null bookingReference');
        }

        // Recreate the bookingReference index properly
        console.log('\n🔧 Creating proper bookingReference index...');
        await collection.createIndex({ bookingReference: 1 }, { unique: true, sparse: false });
        console.log('✅ bookingReference index created successfully');

        // Verify the fix
        console.log('\n🔍 Verifying the fix...');
        const finalIndexes = await collection.indexes();
        console.log('📋 Final indexes:', finalIndexes);

        // Test creating a new booking
        console.log('\n🧪 Testing booking creation...');
        const testBooking = {
            id: `TEST${Date.now()}`,
            bookingReference: `REF${Date.now()}${Math.floor(Math.random() * 1000)}`,
            userId: 'test-user',
            trainNumber: 'TN-TEST',
            from: 'tunis',
            to: 'sfax',
            departureDate: '2024-12-25',
            departureTime: '10:00',
            arrivalTime: '13:00',
            passengers: 1,
            class: 'Economy',
            price: 45.50,
            status: 'upcoming'
        };

        const created = await Booking.create(testBooking);
        console.log('✅ Test booking created successfully:', created.id);

        // Clean up test booking
        await Booking.deleteOne({ id: created.id });
        console.log('🧹 Test booking cleaned up');

        console.log('\n🎉 Database indexes fixed successfully!');
        console.log('✅ Booking system should now work correctly');

    } catch (error) {
        console.error('❌ Error fixing database indexes:', error);
        console.error('Error details:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed');
    }
}

fixDatabaseIndexes();
