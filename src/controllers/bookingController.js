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
