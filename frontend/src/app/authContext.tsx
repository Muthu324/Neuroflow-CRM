import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../services/apiClient';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  error: string | null;
  signup: (email: string, username: string, password: string, fullName?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if we have valid tokens
        if (apiClient.isAuthenticated()) {
          const currentUser = await apiClient.getCurrentUser();
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      } catch (err: any) {
        console.error('Auth initialization error:', err);
        apiClient.clearTokens();
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const signup = useCallback(async (email: string, username: string, password: string, fullName?: string) => {
    try {
      setError(null);
      setIsLoading(true);

      await apiClient.signup(email, username, password, fullName);
      // Don't auto-login after signup, require explicit login
      setIsAuthenticated(false);
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || 'Signup failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);

      await apiClient.login(email, password);
      const currentUser = await apiClient.getCurrentUser();
      
      setUser(currentUser);
      setIsAuthenticated(true);
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || 'Login failed';
      setError(message);
      apiClient.clearTokens();
      setIsAuthenticated(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    apiClient.logout();
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      user,
      error,
      signup,
      login,
      logout,
      clearError,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
