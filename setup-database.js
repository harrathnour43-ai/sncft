// MongoDB Setup Script for SNCFT Database
// Run this script to populate your database with sample data

const mongoose = require('mongoose');
const Train = require('./src/models/Train');
const User = require('./src/models/User');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sncft_db').then(async () => {
    console.log('Connected to MongoDB');

    // Clear existing data
    await Train.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample trains
    const trains = [
        {
            trainNumber: "TN-101",
            type: "express",
            from: "tunis",
            to: "sfax",
            departureTime: "08:00",
            arrivalTime: "11:30",
            duration: "3h 30m",
            features: ["WiFi", "Restaurant", "AC"],
            prices: {
                economy: 25,
                business: 45,
                first: 75
            },
            isActive: true
        },
        {
            trainNumber: "TN-202",
            type: "regional",
            from: "tunis",
            to: "sousse",
            departureTime: "14:00",
            arrivalTime: "16:45",
            duration: "2h 45m",
            features: ["AC", "Snacks"],
            prices: {
                economy: 20,
                business: 35,
                first: 55
            },
            isActive: true
        },
        {
            trainNumber: "TN-303",
            type: "high-speed",
            from: "tunis",
            to: "monastir",
            departureTime: "19:00",
            arrivalTime: "20:15",
            duration: "1h 15m",
            features: ["WiFi", "Restaurant", "AC", "Power Outlets"],
            prices: {
                economy: 30,
                business: 50,
                first: 80
            },
            isActive: true
        },
        {
            trainNumber: "TN-404",
            type: "express",
            from: "sfax",
            to: "bizerte",
            departureTime: "07:30",
            arrivalTime: "12:00",
            duration: "4h 30m",
            features: ["WiFi", "Restaurant", "AC"],
            prices: {
                economy: 35,
                business: 60,
                first: 95
            },
            isActive: true
        },
        {
            trainNumber: "TN-505",
            type: "regional",
            from: "sousse",
            to: "gabes",
            departureTime: "10:00",
            arrivalTime: "13:30",
            duration: "3h 30m",
            features: ["AC", "Snacks"],
            prices: {
                economy: 25,
                business: 40,
                first: 65
            },
            isActive: true
        }
    ];

    await Train.insertMany(trains);
    console.log('Sample trains inserted');

    // Insert sample user
    const user = {
        firstName: "Mohamed",
        lastName: "Ben Ali",
        email: "mohamed.benali@email.com",
        phone: "+216 713 344 444",
        password: "password123", // In production, hash this password
        role: "user"
    };

    await User.create(user);
    console.log('Sample user created');

    // Create indexes for better performance
    await Train.createIndexes([
        { from: 1, to: 1, departureTime: 1 },
        { trainNumber: 1 }
    ]);

    await User.createIndexes([
        { email: 1 },
        { phone: 1 }
    ]);

    console.log('Database indexes created');
    console.log('Database setup completed successfully!');
    
    process.exit(0);
}).catch(error => {
    console.error('Database setup failed:', error);
    process.exit(1);
});
