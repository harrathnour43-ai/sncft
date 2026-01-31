const Booking = require('../models/Booking');
const Train = require('../models/Train');
const User = require('../models/User');

// @desc    Create new booking
// @route   POST /api/bookings
// @access   Private
exports.createBooking = async (req, res) => {
    try {
        console.log('🎫 === BACKEND BOOKING CREATION ===');
        console.log('📥 Received booking request:', req.body);
        
        const { 
            trainNumber, 
            from, 
            to, 
            departureDate, 
            departureTime, 
            arrivalTime,
            passengers, 
            class: travelClass, 
            price 
        } = req.body;

        // Normalize data to match enum values
        const normalizedFrom = from ? from.toLowerCase() : from;
        const normalizedTo = to ? to.toLowerCase() : to;
        const normalizedClass = travelClass ? travelClass.charAt(0).toUpperCase() + travelClass.slice(1).toLowerCase() : travelClass;

        console.log('🔍 Extracted booking data:');
        console.log('  🚂 Train:', trainNumber);
        console.log('  📍 Route:', `${normalizedFrom} → ${normalizedTo}`);
        console.log('  📅 Date:', departureDate);
        console.log('  ⏰ Time:', departureTime);
        console.log('  👥 Passengers:', passengers);
        console.log('  🏷️ Class:', normalizedClass);
        console.log('  💰 Price:', price);

        // Generate unique booking ID and reference
        const bookingId = `BK${Date.now()}${Math.floor(Math.random() * 1000)}`;
        const bookingReference = `REF${Date.now()}${Math.floor(Math.random() * 1000)}`;
        console.log('🆔 Generated booking ID:', bookingId);
        console.log('🎫 Generated booking reference:', bookingReference);
        
        // Determine booking status based on departure date
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const departure = new Date(departureDate);
        departure.setHours(0, 0, 0, 0);
        
        const status = 'confirmed'; // Set status to confirmed when booking is created
        console.log('📊 Booking status:', status);

        console.log('💾 Saving booking to database...');
        const booking = await Booking.create({
            id: bookingId,
            bookingReference: bookingReference,
            userId: req.user ? req.user.id : 'guest', // Use authenticated user ID
            trainNumber,
            from: normalizedFrom,
            to: normalizedTo,
            departureDate,
            departureTime,
            arrivalTime,
            passengers,
            class: normalizedClass,
            price,
            status, // Set to confirmed
            createdAt: new Date()
        });

        console.log('✅ Booking saved successfully:', booking);
        console.log('📊 Booking details:');
        console.log('  🆔 ID:', booking.id);
        console.log('  👤 User ID:', booking.userId);
        console.log('  🚂 Train:', booking.trainNumber);
        console.log('  📍 Route:', `${booking.from} → ${booking.to}`);
        console.log('  📅 Date:', booking.departureDate);
        console.log('  📊 Status:', booking.status);
        console.log('  🕐 Created:', booking.createdAt);

        res.status(201).json({
            success: true,
            data: booking,
            message: 'Booking created successfully'
        });
    } catch (error) {
        console.error('❌ === BOOKING CREATION ERROR ===');
        console.error('❌ Error type:', error.name);
        console.error('❌ Error message:', error.message);
        console.error('❌ Error stack:', error.stack);
        
        // Handle specific MongoDB duplicate key errors
        if (error.name === 'MongoServerError' && error.code === 11000) {
            console.error('❌ MongoDB Duplicate Key Error:', error.keyValue);
            const duplicateField = Object.keys(error.keyValue)[0];
            return res.status(400).json({ 
                success: false,
                message: `Duplicate ${duplicateField}. Please try again.`,
                field: duplicateField,
                value: error.keyValue[duplicateField]
            });
        }
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            console.error('❌ Validation Error Details:');
            Object.keys(error.errors).forEach(field => {
                console.error(`❌ ${field}:`, error.errors[field].message);
            });
            return res.status(400).json({ 
                success: false,
                message: 'Validation failed: ' + error.message,
                validationErrors: Object.keys(error.errors).map(field => ({
                    field,
                    message: error.errors[field].message,
                    value: error.errors[field].value
                }))
            });
        }
        
        console.error('❌ Generic server error:', error);
        res.status(500).json({ 
            success: false,
            message: error.message || 'Internal server error during booking creation'
        });
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings/user/:userId
// @access   Private
exports.getUserBookings = async (req, res) => {
    try {
        console.log('🔍 === GET USER BOOKINGS ===');
        const userId = req.params.userId || (req.user ? req.user.id : 'guest');
        console.log('👤 Requested userId:', userId);
        console.log('👤 Authenticated user:', req.user);
        
        const bookings = await Booking.find({ userId })
            .sort({ createdAt: -1 });

        console.log('📋 Found bookings:', bookings.length);
        console.log('📋 Bookings data:', bookings);

        // Update status based on current date
        const updatedBookings = bookings.map(booking => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const departureDate = new Date(booking.departureDate);
            departureDate.setHours(0, 0, 0, 0);
            
            if (departureDate < today && booking.status === 'upcoming') {
                booking.status = 'completed';
                booking.save();
            }
            
            return booking;
        });

        console.log('📤 Sending response:', {
            success: true,
            count: updatedBookings.length,
            data: updatedBookings
        });

        res.status(200).json({
            success: true,
            count: updatedBookings.length,
            data: updatedBookings
        });
    } catch (error) {
        console.error('❌ Error fetching user bookings:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
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
            isActive: true
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
