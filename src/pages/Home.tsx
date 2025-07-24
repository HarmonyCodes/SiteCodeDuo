import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useSiteContent } from '../hooks/useSiteContent';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { Button } from '../components/UI/Button';

export const Home: React.FC = () => {
  const { content, loading, error } = useSiteContent();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading content: {error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  const features = [
    'Professional website design',
    'Mobile-responsive layout',
    'Easy content management',
    'SEO optimization',
    'Fast loading times',
    '24/7 support'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                {content?.homeContent.title || 'Welcome to Our Company'}
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100">
                {content?.homeContent.subtitle || 'Your Success is Our Mission'}
              </p>
              <p className="text-lg mb-8 text-blue-50 leading-relaxed">
                {content?.homeContent.description || 'We provide innovative solutions to help your business grow.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-blue-50 border-white">
                  Learn More
                </Button>
              </div>
            </div>
            {content?.homeContent.heroImage && (
              <div className="relative">
                <img
                  src={content.homeContent.heroImage}
                  alt="Hero"
                  className="rounded-lg shadow-2xl w-full h-96 object-cover"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose {content?.companyName || 'Us'}?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We deliver exceptional results through innovation, expertise, and dedication to your success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-lg font-medium text-gray-900">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their business needs.
          </p>
          <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50 border-white">
            Contact Us Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};