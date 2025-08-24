import {apiService} from './ApiService';

export class AuthService {
  static async login(email, password) {
    try {
      const response = await apiService.login(email, password);
      
      if (response.success) {
        return {
          success: true,
          token: response.token,
          user: response.user,
        };
      } else {
        return {
          success: false,
          error: response.error || 'Login failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Login failed. Please try again.',
      };
    }
  }

  static async signup(userData) {
    try {
      const response = await apiService.signup(userData);
      
      if (response.success) {
        return {
          success: true,
          token: response.token,
          user: response.user,
        };
      } else {
        return {
          success: false,
          error: response.error || 'Signup failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Signup failed. Please try again.',
      };
    }
  }

  static async verifyToken(token) {
    try {
      return await apiService.verifyToken(token);
    } catch (error) {
      return false;
    }
  }

  static async updateProfile(token, profileData) {
    try {
      const response = await apiService.updateProfile(token, profileData);
      
      if (response.success) {
        return {
          success: true,
          user: response.user,
        };
      } else {
        return {
          success: false,
          error: response.error || 'Profile update failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Profile update failed. Please try again.',
      };
    }
  }

  static async forgotPassword(email) {
    try {
      const response = await apiService.forgotPassword(email);
      
      if (response.success) {
        return {
          success: true,
          message: response.message || 'Password reset email sent',
        };
      } else {
        return {
          success: false,
          error: response.error || 'Password reset failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Password reset failed. Please try again.',
      };
    }
  }

  static async resetPassword(code, newPassword) {
    try {
      const response = await apiService.resetPassword(code, newPassword);
      
      if (response.success) {
        return {
          success: true,
          message: response.message || 'Password reset successful',
        };
      } else {
        return {
          success: false,
          error: response.error || 'Password reset failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Password reset failed. Please try again.',
      };
    }
  }

  static async uploadProfilePicture(imageData) {
    try {
      const response = await apiService.uploadProfilePicture(imageData);
      
      if (response.success) {
        return {
          success: true,
          imageUrl: response.imageUrl,
        };
      } else {
        return {
          success: false,
          error: response.error || 'Image upload failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Image upload failed. Please try again.',
      };
    }
  }

  // Validation methods
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  static validateName(name) {
    return name && name.trim().length >= 2;
  }

  static validatePhone(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }

  // Password strength checker
  static getPasswordStrength(password) {
    let strength = 0;
    let feedback = [];

    if (password.length >= 8) strength += 1;
    else feedback.push('At least 8 characters');

    if (/[a-z]/.test(password)) strength += 1;
    else feedback.push('At least one lowercase letter');

    if (/[A-Z]/.test(password)) strength += 1;
    else feedback.push('At least one uppercase letter');

    if (/\d/.test(password)) strength += 1;
    else feedback.push('At least one number');

    if (/[@$!%*?&]/.test(password)) strength += 1;
    else feedback.push('At least one special character (@$!%*?&)');

    let strengthText = '';
    let strengthColor = '';

    switch (strength) {
      case 0:
      case 1:
        strengthText = 'Very Weak';
        strengthColor = '#f44336';
        break;
      case 2:
        strengthText = 'Weak';
        strengthColor = '#ff9800';
        break;
      case 3:
        strengthText = 'Fair';
        strengthColor = '#ffc107';
        break;
      case 4:
        strengthText = 'Good';
        strengthColor = '#4caf50';
        break;
      case 5:
        strengthText = 'Strong';
        strengthColor = '#2e7d32';
        break;
      default:
        strengthText = 'Very Weak';
        strengthColor = '#f44336';
    }

    return {
      score: strength,
      text: strengthText,
      color: strengthColor,
      feedback,
    };
  }
} 