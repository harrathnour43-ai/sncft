const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    trainNumber: {
        type: String,
        required: [true, 'Train number is required'],
        unique: true
    },
    type: {
        type: String,
        required: [true, 'Train type is required'],
        enum: ['express', 'regional', 'high-speed']
    },
    from: {
        type: String,
        required: [true, 'Departure city is required'],
        enum: ['tunis', 'sfax', 'sousse', 'monastir', 'bizerte', 'gabes', 'tozeur', 'djerba']
    },
    to: {
        type: String,
        required: [true, 'Arrival city is required'],
        enum: ['tunis', 'sfax', 'sousse', 'monastir', 'bizerte', 'gabes', 'tozeur', 'djerba']
    },
    departureTime: {
        type: String,
        required: [true, 'Departure time is required']
    },
    arrivalTime: {
        type: String,
        required: [true, 'Arrival time is required']
    },
    duration: {
        type: String,
        required: [true, 'Duration is required']
    },
    features: [{
        type: String,
        enum: ['WiFi', 'Restaurant', 'AC', 'Snacks', 'Power Outlets']
    }],
    prices: {
        economy: {
            type: Number,
            required: [true, 'Economy price is required'],
            min: [0, 'Price cannot be negative']
        },
        business: {
            type: Number,
            required: [true, 'Business price is required'],
            min: [0, 'Price cannot be negative']
        },
        first: {
            type: Number,
            required: [true, 'First class price is required'],
            min: [0, 'Price cannot be negative']
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Train', trainSchema);
