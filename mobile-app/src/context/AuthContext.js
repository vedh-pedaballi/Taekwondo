import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for stored authentication data
        const storedToken = await AsyncStorage.getItem('auth_token');
        const storedUser = await AsyncStorage.getItem('user_data');

        if (storedToken && storedUser) {
          const userData = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        await logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      
      // Simulate login for testing
      const mockUser = {id: 1, email, name: 'Test User'};
      const mockToken = 'mock_token_123';
        
        // Store authentication data
      await AsyncStorage.setItem('auth_token', mockToken);
      await AsyncStorage.setItem('user_data', JSON.stringify(mockUser));
        
      setToken(mockToken);
      setUser(mockUser);
        setIsAuthenticated(true);
        
        return {success: true};
    } catch (error) {
      console.error('Login error:', error);
      return {success: false, error: 'Login failed. Please try again.'};
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setIsLoading(true);
      
      // Simulate signup for testing
      const mockUser = {id: 1, ...userData};
      const mockToken = 'mock_token_123';
        
        // Store authentication data
      await AsyncStorage.setItem('auth_token', mockToken);
      await AsyncStorage.setItem('user_data', JSON.stringify(mockUser));
        
      setToken(mockToken);
      setUser(mockUser);
        setIsAuthenticated(true);
        
        return {success: true};
    } catch (error) {
      console.error('Signup error:', error);
      return {success: false, error: 'Signup failed. Please try again.'};
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Clear stored data
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user_data');
      
      // Reset state
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const updatedUser = {...user, ...profileData};
        
        // Update stored user data
        await AsyncStorage.setItem('user_data', JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        return {success: true};
    } catch (error) {
      console.error('Profile update error:', error);
      return {success: false, error: 'Profile update failed. Please try again.'};
    }
  };

  const forgotPassword = async (email) => {
    try {
      // Simulate forgot password
      return {success: true, message: 'Password reset email sent.'};
    } catch (error) {
      console.error('Forgot password error:', error);
      return {success: false, error: 'Password reset failed. Please try again.'};
    }
  };

  const resetPassword = async (code, newPassword) => {
    try {
      // Simulate password reset
      return {success: true, message: 'Password reset successful.'};
    } catch (error) {
      console.error('Reset password error:', error);
      return {success: false, error: 'Password reset failed. Please try again.'};
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    token,
    login,
    signup,
    logout,
    updateProfile,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 