const express = require('express');
const router = express.Router();
const {
    createBooking,
    getUserBookings,
    searchTrains
} = require('../controllers/bookingController');

router.route('/').post(createBooking);
router.route('/user').get(getUserBookings);
router.route('/search').post(searchTrains);

module.exports = router;
