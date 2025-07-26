import axios from 'axios';
import { SiteContent, ApiResponse, User } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for session cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

class ApiService {
  // Auth methods
  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await api.get('/auth/user');
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to get user' 
      };
    }
  }

  async logout(): Promise<ApiResponse<void>> {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to logout' 
      };
    }
  }

  // Content methods
  async getSiteContent(): Promise<ApiResponse<SiteContent>> {
    try {
      const response = await api.get('/content');
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to fetch site content' 
      };
    }
  }

  async updateSiteContent(content: Partial<SiteContent>): Promise<ApiResponse<SiteContent>> {
    try {
      const response = await api.put('/content', content);
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to update site content' 
      };
    }
  }

  async updateCompanyName(companyName: string): Promise<ApiResponse<SiteContent>> {
    try {
      const response = await api.put('/content/company-name', { companyName });
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to update company name' 
      };
    }
  }

  async updateHomeContent(homeContent: SiteContent['homeContent']): Promise<ApiResponse<SiteContent>> {
    try {
      const response = await api.put('/content/home', { homeContent });
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to update home content' 
      };
    }
  }

  async updateAboutContent(aboutContent: SiteContent['aboutContent']): Promise<ApiResponse<SiteContent>> {
    try {
      const response = await api.put('/content/about', { aboutContent });
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to update about content' 
      };
    }
  }

  async updateContactContent(contactContent: SiteContent['contactContent']): Promise<ApiResponse<SiteContent>> {
    try {
      const response = await api.put('/content/contact', { contactContent });
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to update contact content' 
      };
    }
  }

  // User methods
  async getUserProfile(): Promise<ApiResponse<User>> {
    try {
      const response = await api.get('/user/profile');
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to get user profile' 
      };
    }
  }

  async updateUserProfile(name: string): Promise<ApiResponse<User>> {
    try {
      const response = await api.put('/user/profile', { name });
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to update user profile' 
      };
    }
  }

  // OAuth login URLs
  getGoogleLoginUrl(): string {
    return `${API_BASE_URL}/auth/google`;
  }

  getGitHubLoginUrl(): string {
    return `${API_BASE_URL}/auth/github`;
  }
}

export const apiService = new ApiService();