import React from 'react';
import { Users, Eye, Settings, BarChart3 } from 'lucide-react';
import { useSiteContent } from '../../hooks/useSiteContent';
import { LoadingSpinner } from '../../components/UI/LoadingSpinner';

export const Dashboard: React.FC = () => {
  const { content, loading } = useSiteContent();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const stats = [
    { name: 'Total Views', value: '2,543', icon: Eye, color: 'bg-blue-500' },
    { name: 'Site Visitors', value: '1,234', icon: Users, color: 'bg-green-500' },
    { name: 'Page Updates', value: '12', icon: Settings, color: 'bg-purple-500' },
    { name: 'Performance', value: '98%', icon: BarChart3, color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">לוח בקרה</h1>
        <p className="text-gray-600 mt-2">
          ברוך הבא! הנה סקירה של ביצועי האתר שלך.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Settings className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Company name updated</p>
                <p className="text-xs text-gray-500">
                  Last updated: {content?.updatedAt ? new Date(content.updatedAt).toLocaleDateString() : 'Never'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Eye className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Site content published</p>
                <p className="text-xs text-gray-500">Updated by: {content?.updatedBy || 'Unknown'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/content"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Settings className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900">Edit Content</h3>
              <p className="text-sm text-gray-600">Update site content and settings</p>
            </a>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">View Site</h3>
              <p className="text-sm text-gray-600">Preview your live website</p>
            </a>
            <div className="p-4 border border-gray-200 rounded-lg opacity-50">
              <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900">Analytics</h3>
              <p className="text-sm text-gray-600">Coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};