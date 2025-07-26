import { useState, useEffect } from 'react';
import { SiteContent } from '../types';
import { apiService } from '../services/api';

export const useSiteContent = () => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getSiteContent();
      
      if (response.success && response.data) {
        setContent(response.data);
      } else {
        setError(response.error || 'Failed to load content');
      }
    } catch (err) {
      setError('Network error occurred');
    }
    
    setLoading(false);
  };

  const updateContent = async (updates: Partial<SiteContent>) => {
    try {
      const response = await apiService.updateSiteContent(updates);
      
      if (response.success && response.data) {
        setContent(response.data);
        return true;
      } else {
        setError(response.error || 'Failed to update content');
        return false;
      }
    } catch (err) {
      setError('Network error occurred');
      return false;
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return {
    content,
    loading,
    error,
    refetch: fetchContent,
    updateContent
  };
};