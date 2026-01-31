const express = require('express');
const router = express.Router();
const {
    createBooking,
    getUserBookings,
    searchTrains
} = require('../controllers/bookingController');
const authenticate = require('../middleware/auth');

// Apply authentication middleware to protected routes
router.route('/').post(authenticate, createBooking);
router.route('/user/:userId').get(authenticate, getUserBookings);
router.route('/search').post(searchTrains); // Public route - no auth needed

module.exports = router;
