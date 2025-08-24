import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from 'react-native-netinfo';

class ApiService {
  constructor() {
    this.baseURL = 'http://localhost:5000'; // Change this to your Flask server URL
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      async config => {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    // Response interceptor to handle errors
    this.api.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          await AsyncStorage.removeItem('auth_token');
          await AsyncStorage.removeItem('user_data');
        }
        return Promise.reject(error);
      },
    );
  }

  async initialize() {
    // Check network connectivity
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      throw new Error('No internet connection');
    }
  }

  // Authentication endpoints
  async login(email, password) {
    try {
      const response = await this.api.post('/LoginPage', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async signup(userData) {
    try {
      const response = await this.api.post('/SignupPage', userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async verifyToken(token) {
    try {
      const response = await this.api.get('/profile', {
        headers: {Authorization: `Bearer ${token}`},
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  async updateProfile(token, profileData) {
    try {
      const response = await this.api.post('/profile', profileData, {
        headers: {Authorization: `Bearer ${token}`},
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async forgotPassword(email) {
    try {
      const response = await this.api.post('/ForgotPassword', {email});
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async resetPassword(code, newPassword) {
    try {
      const response = await this.api.post('/ResetPassword', {
        code,
        new_password: newPassword,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Content endpoints
  async getHomeData() {
    try {
      const response = await this.api.get('/');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getClasses() {
    try {
      const response = await this.api.get('/classes');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getEvents() {
    try {
      const response = await this.api.get('/Events');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getGallery() {
    try {
      const response = await this.api.get('/Gallery');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAboutUs() {
    try {
      const response = await this.api.get('/AboutUs');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getContact() {
    try {
      const response = await this.api.get('/Contact');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getNationalWinners() {
    try {
      const response = await this.api.get('/national-winners');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getUSATeamMembers() {
    try {
      const response = await this.api.get('/usa-team-members');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getMyClasses() {
    try {
      const response = await this.api.get('/MyClasses');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Contact form submission
  async submitContactForm(formData) {
    try {
      const response = await this.api.post('/contact', formData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Newsletter subscription
  async subscribeNewsletter(email) {
    try {
      const response = await this.api.post('/subscribe', {email});
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Image upload
  async uploadProfilePicture(imageData) {
    try {
      const formData = new FormData();
      formData.append('profile_picture', imageData);

      const response = await this.api.post('/profile/upload-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Offline data sync
  async syncOfflineData(offlineData) {
    try {
      const response = await this.api.post('/api/sync', offlineData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handling
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      const {status, data} = error.response;
      switch (status) {
        case 400:
          return new Error(data.error || 'Bad request');
        case 401:
          return new Error('Unauthorized. Please login again.');
        case 403:
          return new Error('Access forbidden');
        case 404:
          return new Error('Resource not found');
        case 500:
          return new Error('Server error. Please try again later.');
        default:
          return new Error(data.error || 'An error occurred');
      }
    } else if (error.request) {
      // Network error
      return new Error('Network error. Please check your connection.');
    } else {
      // Other error
      return new Error('An unexpected error occurred');
    }
  }

  // Utility methods
  getImageUrl(filename) {
    return `${this.baseURL}/images/${filename}`;
  }

  getWinnerImageUrl(filename) {
    return `${this.baseURL}/winner-images/${filename}`;
  }

  getTeamImageUrl(filename) {
    return `${this.baseURL}/team-images/${filename}`;
  }

  getProfilePictureUrl(filename) {
    return `${this.baseURL}/static/profile_pictures/${filename}`;
  }
}

export const apiService = new ApiService(); 