# Company Site Builder MVP

A comprehensive web application for building and managing company websites with an admin panel for content management.

## 🌟 Features

- **Dynamic Website**: Three-page website (Home, About, Contact) with API-driven content
- **Admin Panel**: Secure admin interface at `/admin` with authentication
- **Content Management**: Easy-to-use forms for editing company information, page content, and contact details
- **Responsive Design**: Modern, mobile-first design with Tailwind CSS
- **Real-time Updates**: Changes reflect immediately across the website
- **Protected Routes**: Authentication-required admin access
- **Professional UI**: Clean, intuitive interface with smooth animations

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Code Quality**: ESLint + TypeScript

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd company-site-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🔐 Admin Access

To access the admin panel:

1. Navigate to `/admin` or `/login`
2. Use the demo credentials:
   - **Email**: admin@company.com
   - **Password**: admin123

## 📁 Project Structure

```
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
```

## 🎨 Design System

The application uses a consistent design system with:

- **Colors**: Primary blue (#3B82F6), secondary slate (#64748B), success green (#10B981), error red (#EF4444)
- **Typography**: System font stack with proper hierarchy
- **Spacing**: 8px grid system
- **Components**: Reusable UI components with consistent styling
- **Responsive**: Mobile-first design with breakpoints for tablet and desktop

## 🔧 Configuration

### Environment Variables

For production deployment, you can configure:

```env
VITE_API_URL=your-api-endpoint
VITE_APP_NAME=Your Company Name
```

### Customization

1. **Content**: Use the admin panel to update all content
2. **Styling**: Modify Tailwind classes in components
3. **Colors**: Update the color system in Tailwind config
4. **Images**: Replace stock images with your own via the admin panel

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Upload the `dist` folder contents to your web server

## 🧪 Testing

The project includes basic unit tests. To run tests:

```bash
npm run test
```

### Test Coverage

- Authentication flow
- Content management operations
- API service functions
- UI component rendering

## 🔒 Security Notes

- Admin authentication is currently demo-only
- For production, implement proper OAuth integration
- Use environment variables for sensitive data
- Enable HTTPS in production

## 🚀 Production Considerations

### Backend Integration

To convert this to a full-stack application:

1. **Database**: Replace localStorage with MongoDB/PostgreSQL
2. **Authentication**: Implement OAuth with Google/GitHub
3. **API**: Create Express.js/Node.js backend
4. **File Upload**: Add image upload functionality
5. **Validation**: Add server-side validation
6. **Security**: Implement proper CORS, rate limiting, etc.

### Performance Optimization

- Implement image lazy loading
- Add caching strategies
- Optimize bundle size
- Add service worker for offline functionality

## 📝 API Documentation

### Current Implementation

The app currently uses a mock API service that stores data in localStorage. For production:

#### Endpoints to Implement

```typescript
GET    /api/content          # Get site content
PUT    /api/content          # Update site content
POST   /auth/login           # User authentication
POST   /auth/logout          # User logout
GET    /auth/user            # Get current user
```

### Data Models

#### SiteContent
```typescript
{
  id: string;
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
  updatedAt: string;
  updatedBy: string;
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

1. Check the documentation above
2. Review the code comments
3. Open an issue on GitHub
4. Contact the development team

## 🔄 Changelog

### v1.0.0 (Current)
- Initial MVP release
- Basic content management
- Responsive design
- Admin authentication
- Three-page website structure

### Upcoming Features
- Image upload functionality
- SEO optimization tools
- Analytics dashboard
- Multi-language support
- Custom theme builder