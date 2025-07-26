const express = require('express');
const SiteContent = require('../models/SiteContent');
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

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      error: 'Admin access required'
    });
  }
};

// Get site content (public)
router.get('/', async (req, res) => {
  try {
    let content = await SiteContent.findOne().populate('updatedBy', 'name email');
    
    if (!content) {
      // Create default content if none exists
      content = new SiteContent({});
      await content.save();
    }

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch content'
    });
  }
});

// Update site content (admin only)
router.put('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    let content = await SiteContent.findOne();
    
    if (!content) {
      content = new SiteContent({});
    }

    // Update fields
    Object.keys(req.body).forEach(key => {
      if (key !== '_id' && key !== 'createdAt' && key !== 'updatedAt') {
        content[key] = req.body[key];
      }
    });

    content.updatedBy = req.user._id;
    await content.save();

    await content.populate('updatedBy', 'name email');

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update content'
    });
  }
});

// Update company name
router.put('/company-name', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { companyName } = req.body;
    
    let content = await SiteContent.findOne();
    if (!content) {
      content = new SiteContent({});
    }

    content.companyName = companyName;
    content.updatedBy = req.user._id;
    await content.save();

    await content.populate('updatedBy', 'name email');

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Error updating company name:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update company name'
    });
  }
});

// Update home content
router.put('/home', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { homeContent } = req.body;
    
    let content = await SiteContent.findOne();
    if (!content) {
      content = new SiteContent({});
    }

    content.homeContent = { ...content.homeContent, ...homeContent };
    content.updatedBy = req.user._id;
    await content.save();

    await content.populate('updatedBy', 'name email');

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Error updating home content:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update home content'
    });
  }
});

// Update about content
router.put('/about', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { aboutContent } = req.body;
    
    let content = await SiteContent.findOne();
    if (!content) {
      content = new SiteContent({});
    }

    content.aboutContent = { ...content.aboutContent, ...aboutContent };
    content.updatedBy = req.user._id;
    await content.save();

    await content.populate('updatedBy', 'name email');

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Error updating about content:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update about content'
    });
  }
});

// Update contact content
router.put('/contact', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { contactContent } = req.body;
    
    let content = await SiteContent.findOne();
    if (!content) {
      content = new SiteContent({});
    }

    content.contactContent = { ...content.contactContent, ...contactContent };
    content.updatedBy = req.user._id;
    await content.save();

    await content.populate('updatedBy', 'name email');

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Error updating contact content:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update contact content'
    });
  }
});

module.exports = router;