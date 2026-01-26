const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    train: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Train',
        required: true
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
        type: Date,
        required: [true, 'Please specify departure date']
    },
    returnDate: {
        type: Date
    },
    passengers: {
        type: Number,
        required: [true, 'Please specify number of passengers'],
        min: [1, 'At least 1 passenger required'],
        max: [6, 'Maximum 6 passengers allowed']
    },
    class: {
        type: String,
        required: [true, 'Please specify class'],
        enum: ['economy', 'business', 'first'],
        default: 'economy'
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['credit', 'debit', 'cash'],
        required: [true, 'Please specify payment method']
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending'
    },
    bookingReference: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
