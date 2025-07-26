const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    sparse: true
  },
  githubId: {
    type: String,
    sparse: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  provider: {
    type: String,
    enum: ['google', 'github'],
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for OAuth providers
userSchema.index({ googleId: 1 }, { sparse: true });
userSchema.index({ githubId: 1 }, { sparse: true });

module.exports = mongoose.model('User', userSchema);