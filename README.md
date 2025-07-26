# Company Site Builder - Full Stack

A comprehensive full-stack web application for building and managing company websites with OAuth authentication and real-time content management.

## 🌟 Features

- **Full-Stack Architecture**: Separate client and server with REST API
- **OAuth Authentication**: Login with Google and GitHub
- **Dynamic Website**: Three-page website (Home, About, Contact) with database-driven content
- **Admin Panel**: Secure admin interface with role-based access
- **Content Management**: Easy-to-use forms for editing company information, page content, and contact details
- **Responsive Design**: Modern, mobile-first design with Tailwind CSS
- **Database Storage**: MongoDB for persistent data storage
- **Session Management**: Secure session-based authentication
- **Professional UI**: Clean, intuitive interface with smooth animations

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Authentication**: Passport.js (Google OAuth, GitHub OAuth)
- **Session Store**: MongoDB (connect-mongo)
- **Security**: CORS, Express Session

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Google OAuth credentials
- GitHub OAuth credentials

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd company-site-builder
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with:
   - MongoDB connection string
   - Google OAuth credentials
   - GitHub OAuth credentials
   - Session secret

5. Start MongoDB (if running locally):
```bash
mongod
```

6. Start both client and server:
```bash
npm run dev:full
```

Or start them separately:
```bash
# Terminal 1 - Server
npm run dev:server

# Terminal 2 - Client
npm run dev:client
```

7. Open your browser and visit `http://localhost:5173`

## 🔐 OAuth Setup

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
6. Copy Client ID and Client Secret to `.env`

### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:5000/api/auth/github/callback`
4. Copy Client ID and Client Secret to `.env`

## 🔐 Authentication

The application uses OAuth for authentication:

1. Navigate to `/login`
2. Choose your preferred authentication method:
   - **Google**: Login with your Google account
   - **GitHub**: Login with your GitHub account
3. After successful authentication, you'll be redirected to the admin panel
4. First user to register becomes an admin automatically

## 🏗️ Architecture

### Client-Server Communication
- **API Base URL**: `http://localhost:5000/api`
- **Authentication**: Session-based with HTTP-only cookies
- **CORS**: Configured for cross-origin requests
- **Proxy**: Vite dev server proxies `/api` requests to backend

## 📁 Project Structure

```
├── server/                  # Backend application
│   ├── config/             # Configuration files
│   │   └── passport.js     # Passport OAuth strategies
│   ├── models/             # MongoDB models
│   │   ├── User.js         # User model
│   │   └── SiteContent.js  # Site content model
│   ├── routes/             # API routes
│   │   ├── auth.js         # Authentication routes
│   │   ├── content.js      # Content management routes
│   │   └── user.js         # User management routes
│   └── index.js            # Server entry point
src/
├── components/           # Reusable UI components
│   ├── Layout/          # Main site layout components
│   ├── UI/              # Basic UI components (Button, Input, etc.)
│   └── admin/           # Admin-specific components
├── contexts/            # React contexts (Auth)
├── hooks/               # Custom React hooks
├── pages/               # Page components
│   └── admin/           # Admin panel pages
├── services/            # API services and data management
├── types/               # TypeScript type definitions
└── App.tsx              # Main application component
.env                     # Environment variables
.env.example             # Environment variables template
```

## 🎨 Design System

The application uses a consistent design system with:

- **Colors**: Primary blue (#3B82F6), secondary slate (#64748B), success green (#10B981), error red (#EF4444)
- **Typography**: System font stack with proper hierarchy
- **Spacing**: 8px grid system
- **Components**: Reusable UI components with consistent styling
- **Responsive**: Mobile-first design with breakpoints for tablet and desktop

```env
VITE_API_URL=your-api-endpoint
VITE_APP_NAME=Your Company Name
```

### Customization

1. **Content**: Use the admin panel to update all website content
2. **Styling**: Modify Tailwind classes in React components
3. **Colors**: Update the color system in `tailwind.config.js`
4. **Database Schema**: Modify models in `server/models/`

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
3. Deploy with default settings

### Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Heroku (Full-Stack)

1. Create Heroku app
2. Add MongoDB Atlas add-on
3. Configure environment variables
4. Deploy both client and server

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Upload the `dist` folder contents to your web server

3. Deploy server to your hosting provider
4. Configure environment variables on server

## 🔒 Security Notes

- OAuth authentication with Google and GitHub
- Session-based authentication with HTTP-only cookies
- CORS protection configured
- MongoDB connection with authentication
- Use environment variables for sensitive data
- Enable HTTPS in production
- Implement rate limiting for production
- Add input validation and sanitization

## 🚀 Production Enhancements

### Performance Optimization

- Implement image lazy loading
- Add Redis caching for sessions and content
- Optimize bundle size
- Add service worker for offline functionality
- Implement CDN for static assets

### Additional Features

- File upload for images
- Email notifications
- Analytics dashboard
- Multi-language support
- SEO optimization
- Backup and restore functionality

## 📝 API Documentation

### Authentication Endpoints

```
GET    /api/auth/google           # Initiate Google OAuth
GET    /api/auth/google/callback  # Google OAuth callback
GET    /api/auth/github           # Initiate GitHub OAuth
GET    /api/auth/github/callback  # GitHub OAuth callback
GET    /api/auth/user             # Get current user
POST   /api/auth/logout           # Logout user
```

### Content Management Endpoints

```
GET    /api/content              # Get site content (public)
PUT    /api/content              # Update site content (admin)
PUT    /api/content/company-name # Update company name (admin)
PUT    /api/content/home         # Update home content (admin)
PUT    /api/content/about        # Update about content (admin)
PUT    /api/content/contact      # Update contact content (admin)
```

### User Management Endpoints

```
GET    /api/user/profile         # Get user profile
PUT    /api/user/profile         # Update user profile
```

### Data Models

#### User
```typescript
{
  _id: ObjectId;
  googleId?: string;
  githubId?: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'google' | 'github';
  role: 'admin' | 'user';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### SiteContent
```typescript
{
  _id: ObjectId;
  companyName: string;
  homeContent: {
    title: string;
    subtitle: string;
    description: string;
    heroImage?: string;
  };
  aboutContent: {
    title: string;
    description: string;
    mission: string;
    vision: string;
  };
  contactContent: {
    title: string;
    email: string;
    phone: string;
    address: string;
    socialLinks: {
      twitter?: string;
      linkedin?: string;
      facebook?: string;
    };
  };
  updatedBy: ObjectId; // Reference to User
  createdAt: Date;
  updatedAt: Date;
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 🐛 Troubleshooting

- **MongoDB Connection**: Ensure MongoDB is running and connection string is correct
- **OAuth Issues**: Verify OAuth app settings and callback URLs
- **CORS Errors**: Check that client URL is configured in server CORS settings
- **Session Issues**: Ensure session secret is set and MongoDB store is working

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

1. Check the documentation above
2. Review the code comments
3. Open an issue on GitHub
4. Contact the development team

## 🔄 Changelog

### v2.0.0 (Current)
- Full-stack architecture with Express.js backend
- MongoDB database integration
- OAuth authentication (Google + GitHub)
- Session-based authentication
- RESTful API design
- Responsive design
- Role-based access control
- Real-time content management
- Three-page website structure

### Upcoming Features
- Image upload functionality
- SEO optimization tools
- Analytics dashboard
- Multi-language support
- Custom theme builder
- Email notifications
- Advanced analytics