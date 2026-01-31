const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    console.log('🔍 === UPDATE USER PROFILE ===');
    
    const userId = req.user ? req.user.id : req.params.userId;
    console.log('👤 User ID:', userId);
    
    const { fullName, email, phoneNumber } = req.body;
    console.log('📝 Profile data:', { fullName, email, phoneNumber });

    // Validate input
    if (!fullName || !email || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Phone number validation (Tunisian numbers)
    const phoneRegex = /^[2-9]\d{7}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid Tunisian phone number (8 digits starting with 2-9)'
      });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if email is already taken by another user
    if (email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email is already in use by another account'
        });
      }
    }

    // Split fullName into firstName and lastName
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Update user profile
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phone = phoneNumber;
    
    await user.save();

    console.log('✅ Profile updated successfully');
    console.log('📤 Updated user:', {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone
    });

    // Return updated user data (without password)
    const userResponse = {
      id: user._id,
      fullName: `${user.firstName} ${user.lastName}`,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phone,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: userResponse
    });

  } catch (error) {
    console.error('❌ Error updating profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile. Please try again.'
    });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    console.log('🔍 === GET USER PROFILE ===');
    
    const userId = req.user ? req.user.id : req.params.userId;
    console.log('👤 User ID:', userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log('✅ Profile retrieved successfully');

    // Return user data (without password)
    const userResponse = {
      id: user._id,
      fullName: `${user.firstName} ${user.lastName}`,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phone,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.status(200).json({
      success: true,
      data: userResponse
    });

  } catch (error) {
    console.error('❌ Error getting profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve profile. Please try again.'
    });
  }
};
