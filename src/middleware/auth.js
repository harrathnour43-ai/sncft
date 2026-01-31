const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'sncft_secret_key_2024';

// Authentication middleware
const authenticate = async (req, res, next) => {
    try {
        console.log('🔐 === AUTHENTICATION MIDDLEWARE ===');
        console.log('📋 Request headers:', req.headers);
        
        // Get token from header
        const authHeader = req.header('Authorization');
        
        if (!authHeader) {
            console.log('❌ No Authorization header found');
            return res.status(401).json({ 
                success: false, 
                message: 'Access denied. No token provided.' 
            });
        }

        // Check if token starts with 'Bearer '
        if (!authHeader.startsWith('Bearer ')) {
            console.log('❌ Invalid token format. Expected "Bearer <token>"');
            return res.status(401).json({ 
                success: false, 
                message: 'Access denied. Invalid token format.' 
            });
        }

        // Extract token
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        console.log('🎫 Token extracted:', token.substring(0, 20) + '...');

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('✅ Token verified:', decoded);

        // Get user from database
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            console.log('❌ User not found for ID:', decoded.userId);
            return res.status(401).json({ 
                success: false, 
                message: 'Access denied. User not found.' 
            });
        }

        console.log('✅ User authenticated:', { id: user._id, email: user.email });
        
        // Attach user to request
        req.user = {
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        };

        next();
    } catch (error) {
        console.error('❌ Authentication error:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false, 
                message: 'Access denied. Invalid token.' 
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false, 
                message: 'Access denied. Token expired.' 
            });
        }

        res.status(500).json({ 
            success: false, 
            message: 'Server error during authentication.' 
        });
    }
};

module.exports = authenticate;
