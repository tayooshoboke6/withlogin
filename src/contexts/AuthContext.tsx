import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define types for our authentication context
interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address?: string;
  gender?: 'male' | 'female' | 'other';
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address?: string;
  gender?: 'male' | 'female' | 'other';
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // On component mount, check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        try {
          // Set the default Authorization header for all requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // TODO: Replace with actual API endpoint when backend is ready
          // Fetch user details from backend using the stored token
          // const response = await axios.get('/api/user');
          // setUser(response.data);
          // setIsAuthenticated(true);
          
          // For now, we'll use mock data if token exists
          setUser({
            id: 1,
            email: 'user@example.com',
            firstName: 'John',
            lastName: 'Doe'
          });
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Error authenticating user:', err);
          localStorage.removeItem('auth_token');
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Login function - will be replaced with actual API call
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API endpoint when backend is ready
      // const response = await axios.post('/api/login', { email, password });
      // const { token, user: userData } = response.data;
      
      // Mock successful login
      const token = 'mock_token_' + Math.random().toString(36).substring(2);
      const userData = {
        id: 1,
        email,
        firstName: 'John',
        lastName: 'Doe'
      };
      
      // Store token in localStorage
      localStorage.setItem('auth_token', token);
      
      // Set authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userData);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Google login function - will be implemented when backend is ready
  const loginWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Implement Google authentication
      // This will be integrated with backend once ready
      console.log('Google login not implemented yet');
      setError('Google login will be available once the backend is ready');
    } catch (err: any) {
      setError(err.message || 'Failed to login with Google');
    } finally {
      setIsLoading(false);
    }
  };

  // Apple login function - will be implemented when backend is ready
  const loginWithApple = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Implement Apple authentication
      // This will be integrated with backend once ready
      console.log('Apple login not implemented yet');
      setError('Apple login will be available once the backend is ready');
    } catch (err: any) {
      setError(err.message || 'Failed to login with Apple');
    } finally {
      setIsLoading(false);
    }
  };

  // Register function - will be replaced with actual API call
  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API endpoint when backend is ready
      // const response = await axios.post('/api/register', userData);
      // const { token, user: newUser } = response.data;
      
      // Mock successful registration
      const token = 'mock_token_' + Math.random().toString(36).substring(2);
      const newUser = {
        id: 1,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        address: userData.address,
        gender: userData.gender
      };
      
      // Store token in localStorage
      localStorage.setItem('auth_token', token);
      
      // Set authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(newUser);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('auth_token');
    
    // Remove authorization header
    delete axios.defaults.headers.common['Authorization'];
    
    // Reset state
    setUser(null);
    setIsAuthenticated(false);
  };

  // Clear any error messages
  const clearError = () => {
    setError(null);
  };

  // Provide the auth context value to all children
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        loginWithGoogle,
        loginWithApple,
        register,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
