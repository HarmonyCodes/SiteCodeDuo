export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user';
  provider: 'google' | 'github';
  createdAt?: string;
}

export interface SiteContent {
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

export interface AuthContextType {
  user: User | null;
  login: (provider: 'google' | 'github') => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  checkAuthStatus: () => Promise<void>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}