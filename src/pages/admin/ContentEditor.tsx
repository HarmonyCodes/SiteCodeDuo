import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';
import { useSiteContent } from '../../hooks/useSiteContent';
import { apiService } from '../../services/api';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Textarea } from '../../components/UI/Textarea';
import { LoadingSpinner } from '../../components/UI/LoadingSpinner';

type TabType = 'company' | 'home' | 'about' | 'contact';

export const ContentEditor: React.FC = () => {
  const { content, loading, refetch } = useSiteContent();
  const [activeTab, setActiveTab] = useState<TabType>('company');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form states
  const [companyName, setCompanyName] = useState('');
  const [homeContent, setHomeContent] = useState({
    title: '',
    subtitle: '',
    description: '',
    heroImage: ''
  });
  const [aboutContent, setAboutContent] = useState({
    title: '',
    description: '',
    mission: '',
    vision: ''
  });
  const [contactContent, setContactContent] = useState({
    title: '',
    email: '',
    phone: '',
    address: '',
    socialLinks: {
      twitter: '',
      linkedin: '',
      facebook: ''
    }
  });

  useEffect(() => {
    if (content) {
      setCompanyName(content.companyName);
      setHomeContent(content.homeContent);
      setAboutContent(content.aboutContent);
      setContactContent(content.contactContent);
    }
  }, [content]);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setSaveMessage({ type, text });
    setTimeout(() => setSaveMessage(null), 5000);
  };

  const handleSave = async (section: TabType) => {
    setSaving(true);
    
    try {
      let response;
      
      switch (section) {
        case 'company':
          response = await apiService.updateCompanyName(companyName);
          break;
        case 'home':
          response = await apiService.updateHomeContent(homeContent);
          break;
        case 'about':
          response = await apiService.updateAboutContent(aboutContent);
          break;
        case 'contact':
          response = await apiService.updateContactContent(contactContent);
          break;
      }
      
      if (response.success) {
        showMessage('success', 'Content saved successfully!');
        refetch();
      } else {
        showMessage('error', response.error || 'Failed to save content');
      }
    } catch (error) {
      showMessage('error', 'An error occurred while saving');
    }
    
    setSaving(false);
  };

  const tabs = [
    { id: 'company' as TabType, name: 'Company' },
    { id: 'home' as TabType, name: 'Home Page' },
    { id: 'about' as TabType, name: 'About Page' },
    { id: 'contact' as TabType, name: 'Contact Page' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Content Editor</h1>
        <p className="text-gray-600 mt-2">
          Update your website content and settings.
        </p>
      </div>

      {saveMessage && (
        <div className={`p-4 rounded-md ${saveMessage.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex">
            {saveMessage.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-400" />
            )}
            <div className="ml-3">
              <p className={`text-sm ${saveMessage.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                {saveMessage.text}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'company' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Company Settings</h2>
              <div className="max-w-lg">
                <Input
                  label="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter your company name"
                  helperText="This will appear in the header and throughout the site"
                />
              </div>
              <Button
                onClick={() => handleSave('company')}
                loading={saving}
                className="flex items-center"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}

          {activeTab === 'home' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">תוכן עמוד הבית</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Input
                    label="כותרת ראשית"
                    value={homeContent.title}
                    onChange={(e) => setHomeContent({ ...homeContent, title: e.target.value })}
                    placeholder="ברוכים הבאים לחברה שלכם"
                  />
                  <Input
                    label="כותרת משנה"
                    value={homeContent.subtitle}
                    onChange={(e) => setHomeContent({ ...homeContent, subtitle: e.target.value })}
                    placeholder="הסלוגן או כותרת המשנה שלכם"
                  />
                  <Input
                    label="קישור לתמונת רקע"
                    value={homeContent.heroImage}
                    onChange={(e) => setHomeContent({ ...homeContent, heroImage: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    helperText="אופציונלי: קישור לתמונת רקע"
                  />
                </div>
                <div>
                  <Textarea
                    label="תיאור"
                    value={homeContent.description}
                    onChange={(e) => setHomeContent({ ...homeContent, description: e.target.value })}
                    placeholder="ספר למבקרים על החברה שלך..."
                    rows={8}
                  />
                </div>
              </div>
              <Button
                onClick={() => handleSave('home')}
                loading={saving}
                className="flex items-center"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">About Page Content</h2>
              <div className="space-y-4">
                <Input
                  label="Page Title"
                  value={aboutContent.title}
                  onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
                  placeholder="About Our Company"
                />
                <Textarea
                  label="Company Description"
                  value={aboutContent.description}
                  onChange={(e) => setAboutContent({ ...aboutContent, description: e.target.value })}
                  placeholder="Tell your company's story..."
                  rows={4}
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Textarea
                    label="Mission Statement"
                    value={aboutContent.mission}
                    onChange={(e) => setAboutContent({ ...aboutContent, mission: e.target.value })}
                    placeholder="Our mission is to..."
                    rows={4}
                  />
                  <Textarea
                    label="Vision Statement"
                    value={aboutContent.vision}
                    onChange={(e) => setAboutContent({ ...aboutContent, vision: e.target.value })}
                    placeholder="Our vision is to..."
                    rows={4}
                  />
                </div>
              </div>
              <Button
                onClick={() => handleSave('about')}
                loading={saving}
                className="flex items-center"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Contact Page Content</h2>
              <div className="space-y-4">
                <Input
                  label="Page Title"
                  value={contactContent.title}
                  onChange={(e) => setContactContent({ ...contactContent, title: e.target.value })}
                  placeholder="Get In Touch"
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Input
                      label="Email Address"
                      type="email"
                      value={contactContent.email}
                      onChange={(e) => setContactContent({ ...contactContent, email: e.target.value })}
                      placeholder="contact@company.com"
                    />
                    <Input
                      label="Phone Number"
                      value={contactContent.phone}
                      onChange={(e) => setContactContent({ ...contactContent, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Textarea
                      label="Address"
                      value={contactContent.address}
                      onChange={(e) => setContactContent({ ...contactContent, address: e.target.value })}
                      placeholder="123 Main St, City, State 12345"
                      rows={3}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media Links</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Input
                      label="Twitter URL"
                      value={contactContent.socialLinks.twitter}
                      onChange={(e) => setContactContent({
                        ...contactContent,
                        socialLinks: { ...contactContent.socialLinks, twitter: e.target.value }
                      })}
                      placeholder="https://twitter.com/company"
                    />
                    <Input
                      label="LinkedIn URL"
                      value={contactContent.socialLinks.linkedin}
                      onChange={(e) => setContactContent({
                        ...contactContent,
                        socialLinks: { ...contactContent.socialLinks, linkedin: e.target.value }
                      })}
                      placeholder="https://linkedin.com/company/company"
                    />
                    <Input
                      label="Facebook URL"
                      value={contactContent.socialLinks.facebook}
                      onChange={(e) => setContactContent({
                        ...contactContent,
                        socialLinks: { ...contactContent.socialLinks, facebook: e.target.value }
                      })}
                      placeholder="https://facebook.com/company"
                    />
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleSave('contact')}
                loading={saving}
                className="flex items-center"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};