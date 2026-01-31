const express = require('express');
const authenticate = require('../middleware/auth');
const {
  updateProfile,
  getProfile
} = require('../controllers/profileController');

const router = express.Router();

// Protect all routes
router.use(authenticate);

// Update user profile
router.put('/update', updateProfile);

// Get user profile
router.get('/me', getProfile);

module.exports = router;
