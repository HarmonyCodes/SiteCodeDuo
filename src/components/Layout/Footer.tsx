import React from 'react';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';
import { useSiteContent } from '../../hooks/useSiteContent';

export const Footer: React.FC = () => {
  const { content } = useSiteContent();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">
                {content?.companyName || 'Company Site'}
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {content?.aboutContent.description || 'Building innovative solutions for tomorrow.'}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              {content?.contactContent.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">{content.contactContent.email}</span>
                </div>
              )}
              {content?.contactContent.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">{content.contactContent.phone}</span>
                </div>
              )}
              {content?.contactContent.address && (
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-blue-400 mt-1" />
                  <span className="text-gray-300">{content.contactContent.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="/" className="block text-gray-300 hover:text-white transition-colors">
                Home
              </a>
              <a href="/about" className="block text-gray-300 hover:text-white transition-colors">
                About
              </a>
              <a href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {content?.companyName || 'Company Site'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};