const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({
      success: false,
      error: 'Authentication required'
    });
  }
};

// Get user profile
router.get('/profile', requireAuth, (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      avatar: req.user.avatar,
      role: req.user.role,
      provider: req.user.provider,
      createdAt: req.user.createdAt
    }
  });
});

// Update user profile
router.put('/profile', requireAuth, async (req, res) => {
  try {
    const { name } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    user.name = name || user.name;
    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        provider: user.provider
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update profile'
    });
  }
});

module.exports = router;