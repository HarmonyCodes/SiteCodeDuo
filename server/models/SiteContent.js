const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    default: 'החברה שלי'
  },
  homeContent: {
    title: {
      type: String,
      default: 'ברוכים הבאים לחברה שלי'
    },
    subtitle: {
      type: String,
      default: 'בונים את הטכנולוגיה של המחר היום'
    },
    description: {
      type: String,
      default: 'אנחנו חברת טכנולוגיה מובילה המתמחה בפתרונות חדשניים שמשנים עסקים ומניעים צמיחה.'
    },
    heroImage: {
      type: String,
      default: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop'
    }
  },
  aboutContent: {
    title: {
      type: String,
      default: 'אודות החברה שלנו'
    },
    description: {
      type: String,
      default: 'נוסדה בשנת 2020, החברה שלנו נמצאת בחזית החדשנות הטכנולוגית.'
    },
    mission: {
      type: String,
      default: 'להעצים עסקים באמצעות פתרונות טכנולוגיים חדשניים המניעים יעילות, צמיחה והצלחה.'
    },
    vision: {
      type: String,
      default: 'להיות המובילה העולמית בטכנולוגיה טרנספורמטיבית, ליצור עולם מחובר שבו עסקים משגשגים.'
    }
  },
  contactContent: {
    title: {
      type: String,
      default: 'צור קשר'
    },
    email: {
      type: String,
      default: 'contact@mycompany.co.il'
    },
    phone: {
      type: String,
      default: '+972-50-123-4567'
    },
    address: {
      type: String,
      default: 'רחוב החדשנות 123, תל אביב, ישראל'
    },
    socialLinks: {
      twitter: {
        type: String,
        default: 'https://twitter.com/mycompany'
      },
      linkedin: {
        type: String,
        default: 'https://linkedin.com/company/mycompany'
      },
      facebook: {
        type: String,
        default: 'https://facebook.com/mycompany'
      }
    }
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SiteContent', siteContentSchema);