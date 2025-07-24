import { SiteContent, ApiResponse } from '../types';

const API_BASE_URL = '/api'; // This would be your actual API URL in production

// Mock data storage (in real app, this would be handled by backend)
const STORAGE_KEY = 'siteContent';

const getStoredContent = (): SiteContent => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Default content
  const defaultContent: SiteContent = {
    id: '1',
    companyName: 'החברה שלי',
    homeContent: {
      title: 'ברוכים הבאים לחברה שלי',
      subtitle: 'בונים את הטכנולוגיה של המחר היום',
      description: 'אנחנו חברת טכנולוגיה מובילה המתמחה בפתרונות חדשניים שמשנים עסקים ומניעים צמיחה. הצוות המומחה שלנו מספק תוכנה מתקדמת ושירותים דיגיטליים.',
      heroImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop'
    },
    aboutContent: {
      title: 'אודות החברה שלנו',
      description: 'נוסדה בשנת 2020, החברה שלנו נמצאת בחזית החדשנות הטכנולוגית. אנחנו מאמינים ביצירת פתרונות שלא רק עונים על האתגרים של היום אלא גם צופים את ההזדמנויות של המחר.',
      mission: 'להעצים עסקים באמצעות פתרונות טכנולוגיים חדשניים המניעים יעילות, צמיחה והצלחה.',
      vision: 'להיות המובילה העולמית בטכנולוגיה טרנספורמטיבית, ליצור עולם מחובר שבו עסקים משגשגים באמצעות מצוינות דיגיטלית.'
    },
    contactContent: {
      title: 'צור קשר',
      email: 'contact@mycompany.co.il',
      phone: '+1 (555) 123-4567',
      address: 'רחוב החדשנות 123, תל אביב, ישראל',
      socialLinks: {
        twitter: 'https://twitter.com/mycompany',
        linkedin: 'https://linkedin.com/company/mycompany',
        facebook: 'https://facebook.com/mycompany'
      }
    },
    updatedAt: new Date().toISOString(),
    updatedBy: 'system'
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultContent));
  return defaultContent;
};

class ApiService {
  private isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getSiteContent(): Promise<ApiResponse<SiteContent>> {
    await this.delay(300); // Simulate network delay
    
    try {
      const content = getStoredContent();
      return { success: true, data: content };
    } catch (error) {
      return { success: false, error: 'Failed to fetch site content' };
    }
  }

  async updateSiteContent(content: Partial<SiteContent>): Promise<ApiResponse<SiteContent>> {
    await this.delay(500); // Simulate network delay
    
    if (!this.isAuthenticated()) {
      return { success: false, error: 'Authentication required' };
    }

    try {
      const currentContent = getStoredContent();
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      const updatedContent: SiteContent = {
        ...currentContent,
        ...content,
        updatedAt: new Date().toISOString(),
        updatedBy: user.email || 'unknown'
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedContent));
      return { success: true, data: updatedContent };
    } catch (error) {
      return { success: false, error: 'Failed to update site content' };
    }
  }

  async updateCompanyName(name: string): Promise<ApiResponse<SiteContent>> {
    return this.updateSiteContent({ companyName: name });
  }

  async updateHomeContent(homeContent: SiteContent['homeContent']): Promise<ApiResponse<SiteContent>> {
    return this.updateSiteContent({ homeContent });
  }

  async updateAboutContent(aboutContent: SiteContent['aboutContent']): Promise<ApiResponse<SiteContent>> {
    return this.updateSiteContent({ aboutContent });
  }

  async updateContactContent(contactContent: SiteContent['contactContent']): Promise<ApiResponse<SiteContent>> {
    return this.updateSiteContent({ contactContent });
  }
}

export const apiService = new ApiService();