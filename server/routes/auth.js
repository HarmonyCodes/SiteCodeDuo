const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login?error=google_auth_failed' }),
  (req, res) => {
    // Successful authentication
    res.redirect(process.env.CLIENT_URL + '/admin');
  }
);

// GitHub OAuth routes
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login?error=github_auth_failed' }),
  (req, res) => {
    // Successful authentication
    res.redirect(process.env.CLIENT_URL + '/admin');
  }
);

// Get current user
router.get('/user', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        avatar: req.user.avatar,
        role: req.user.role,
        provider: req.user.provider
      }
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'Not authenticated'
    });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: 'Logout failed'
      });
    }
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  });
});

module.exports = router;