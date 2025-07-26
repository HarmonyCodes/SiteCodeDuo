import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Lock, AlertCircle, Github } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/UI/Button';

export const Login: React.FC = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, login, loading } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  if (user) {
    return <Navigate to={from} replace />;
  }

  // Check for error in URL params
  React.useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const errorParam = urlParams.get('error');
    if (errorParam === 'google_auth_failed') {
      setError('Google authentication failed. Please try again.');
    } else if (errorParam === 'github_auth_failed') {
      setError('GitHub authentication failed. Please try again.');
    }
  }, [location]);

  const handleLogin = async (provider: 'google' | 'github') => {
    setLoading(true);
    setError('');
    
    try {
      await login(provider);
    } catch (err) {
      setError('Authentication failed. Please try again.');
      setLoading(false);
    }
  };

  // Google icon component
  const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Lock className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            התחברות למערכת הניהול
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            התחבר כדי לגשת לפאנל הניהול
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <Button
              onClick={() => handleLogin('google')}
              loading={loading}
              className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              size="lg"
            >
              <GoogleIcon />
              <span className="mr-3">התחבר עם Google</span>
            </Button>

            <Button
              onClick={() => handleLogin('github')}
              loading={loading}
              className="w-full bg-gray-900 text-white hover:bg-gray-800"
              size="lg"
            >
              <Github className="w-5 h-5" />
              <span className="mr-3">התחבר עם GitHub</span>
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-md text-center">
            <p className="text-sm text-blue-800 leading-relaxed">
              <strong>הוראות התחברות:</strong><br />
              בחר את ספק האימות המועדף עליך (Google או GitHub) כדי להתחבר למערכת הניהול.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};