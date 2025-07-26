const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists with this Google ID
    let user = await User.findOne({ googleId: profile.id });
    
    if (user) {
      return done(null, user);
    }

    // Check if user exists with same email
    user = await User.findOne({ email: profile.emails[0].value });
    
    if (user) {
      // Link Google account to existing user
      user.googleId = profile.id;
      user.avatar = profile.photos[0].value;
      await user.save();
      return done(null, user);
    }

    // Create new user
    user = new User({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      avatar: profile.photos[0].value,
      provider: 'google',
      role: 'admin' // First user is admin, you can change this logic
    });

    await user.save();
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/api/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists with this GitHub ID
    let user = await User.findOne({ githubId: profile.id });
    
    if (user) {
      return done(null, user);
    }

    // Check if user exists with same email
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.username}@github.local`;
    user = await User.findOne({ email: email });
    
    if (user) {
      // Link GitHub account to existing user
      user.githubId = profile.id;
      user.avatar = profile.photos[0].value;
      await user.save();
      return done(null, user);
    }

    // Create new user
    user = new User({
      githubId: profile.id,
      email: email,
      name: profile.displayName || profile.username,
      avatar: profile.photos[0].value,
      provider: 'github',
      role: 'admin' // First user is admin, you can change this logic
    });

    await user.save();
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));