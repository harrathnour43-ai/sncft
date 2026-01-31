const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    bookingReference: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true,
        default: 'guest'
    },
    trainNumber: {
        type: String,
        required: [true, 'Please specify train number']
    },
    from: {
        type: String,
        required: [true, 'Please specify departure city'],
        enum: ['tunis', 'sfax', 'sousse', 'monastir', 'bizerte', 'gabes', 'tozeur', 'djerba']
    },
    to: {
        type: String,
        required: [true, 'Please specify arrival city'],
        enum: ['tunis', 'sfax', 'sousse', 'monastir', 'bizerte', 'gabes', 'tozeur', 'djerba']
    },
    departureDate: {
        type: String,
        required: [true, 'Please specify departure date']
    },
    departureTime: {
        type: String,
        required: [true, 'Please specify departure time']
    },
    arrivalTime: {
        type: String,
        required: [true, 'Please specify arrival time']
    },
    passengers: {
        type: Number,
        required: [true, 'Please specify number of passengers'],
        min: 1,
        max: 10
    },
    class: {
        type: String,
        required: [true, 'Please specify travel class'],
        enum: ['First', 'Second', 'Business', 'Economy', 'Standard', 'Premium']
    },
    price: {
        type: Number,
        required: [true, 'Please specify price']
    },
    status: {
        type: String,
        enum: ['upcoming', 'completed', 'cancelled', 'confirmed'],
        default: 'confirmed'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
