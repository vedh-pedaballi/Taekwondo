import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../context/ThemeContext';
import {useAuth} from '../context/AuthContext';

const SignupScreen = ({navigation}) => {
  const {colors, spacing, typography, shadows} = useTheme();
  const {signup} = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    beltRank: '',
    team: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const beltRanks = [
    'White Belt',
    'Yellow Belt',
    'Green Belt',
    'Blue Belt',
    'Red Belt',
    'Black Belt',
  ];

  const teams = [
    'A Team',
    'B Team',
    'Youth Team',
    'Beginners Team',
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: ''}));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateName = (name) => {
    return name.length >= 2;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.beltRank) {
      newErrors.beltRank = 'Please select your belt rank';
    }

    if (!formData.team) {
      newErrors.team = 'Please select your team';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const result = await signup(formData);

      if (result.success) {
        Alert.alert('Success', 'Account created successfully!');
      } else {
        Alert.alert('Signup Failed', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: colors.background}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          style={styles.header}>
          <View style={styles.headerContent}>
            <View style={[styles.logoContainer, {backgroundColor: '#ffffff'}]}>
              <Text style={[styles.logoText, {color: colors.primary}]}>TS</Text>
            </View>
            <Text style={[styles.headerTitle, typography.h1, {color: '#ffffff'}]}>
              Join Our Team
            </Text>
            <Text style={[styles.headerSubtitle, typography.body, {color: '#ffffff'}]}>
              Create your account
            </Text>
          </View>
        </LinearGradient>

        {/* Form */}
        <View style={styles.formContainer}>
            {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, typography.bodySmall, {color: colors.text}]}>
                Full Name
              </Text>
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: colors.surface,
                  borderColor: errors.name ? colors.error : colors.border,
                  ...shadows.small,
                },
              ]}>
              <Icon name="person" size={20} color={colors.textSecondary} />
                <TextInput
                style={[styles.input, {color: colors.text}]}
                  placeholder="Enter your full name"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.name}
                  onChangeText={(value) => updateFormData('name', value)}
                  autoCapitalize="words"
                />
              </View>
              {errors.name && (
                <Text style={[styles.errorText, {color: colors.error}]}>
                  {errors.name}
                </Text>
              )}
            </View>

            {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, typography.bodySmall, {color: colors.text}]}>
                Email
              </Text>
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: colors.surface,
                  borderColor: errors.email ? colors.error : colors.border,
                  ...shadows.small,
                },
              ]}>
              <Icon name="email" size={20} color={colors.textSecondary} />
                <TextInput
                style={[styles.input, {color: colors.text}]}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.email}
                  onChangeText={(value) => updateFormData('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {errors.email && (
                <Text style={[styles.errorText, {color: colors.error}]}>
                  {errors.email}
                </Text>
              )}
            </View>

            {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, typography.bodySmall, {color: colors.text}]}>
                Password
              </Text>
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: colors.surface,
                  borderColor: errors.password ? colors.error : colors.border,
                  ...shadows.small,
                },
              ]}>
              <Icon name="lock" size={20} color={colors.textSecondary} />
                <TextInput
                style={[styles.input, {color: colors.text}]}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.password}
                  onChangeText={(value) => updateFormData('password', value)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}>
                  <Icon
                    name={showPassword ? 'visibility' : 'visibility-off'}
                    size={20}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={[styles.errorText, {color: colors.error}]}>
                  {errors.password}
                </Text>
              )}
            </View>

            {/* Confirm Password Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, typography.bodySmall, {color: colors.text}]}>
                Confirm Password
              </Text>
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: colors.surface,
                  borderColor: errors.confirmPassword ? colors.error : colors.border,
                  ...shadows.small,
                },
              ]}>
              <Icon name="lock" size={20} color={colors.textSecondary} />
                <TextInput
                style={[styles.input, {color: colors.text}]}
                  placeholder="Confirm your password"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.confirmPassword}
                  onChangeText={(value) => updateFormData('confirmPassword', value)}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeButton}>
                  <Icon
                    name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                    size={20}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && (
                <Text style={[styles.errorText, {color: colors.error}]}>
                  {errors.confirmPassword}
                </Text>
              )}
            </View>

            {/* Belt Rank Selection */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, typography.bodySmall, {color: colors.text}]}>
                Belt Rank
              </Text>
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: colors.surface,
                  borderColor: errors.beltRank ? colors.error : colors.border,
                  ...shadows.small,
                },
              ]}>
              <Icon name="emoji-events" size={20} color={colors.textSecondary} />
                <TextInput
                style={[styles.input, {color: colors.text}]}
                  placeholder="Select your belt rank"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.beltRank}
                  onChangeText={(value) => updateFormData('beltRank', value)}
                  editable={false}
                  onPressIn={() => {
                  // Simple selection for now
                    updateFormData('beltRank', 'White Belt');
                  }}
                />
              </View>
              {errors.beltRank && (
                <Text style={[styles.errorText, {color: colors.error}]}>
                  {errors.beltRank}
                </Text>
              )}
            </View>

            {/* Team Selection */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, typography.bodySmall, {color: colors.text}]}>
                Team
              </Text>
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: colors.surface,
                  borderColor: errors.team ? colors.error : colors.border,
                  ...shadows.small,
                },
              ]}>
              <Icon name="group" size={20} color={colors.textSecondary} />
                <TextInput
                style={[styles.input, {color: colors.text}]}
                  placeholder="Select your team"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.team}
                  onChangeText={(value) => updateFormData('team', value)}
                  editable={false}
                  onPressIn={() => {
                  // Simple selection for now
                    updateFormData('team', 'Beginners Team');
                  }}
                />
              </View>
              {errors.team && (
                <Text style={[styles.errorText, {color: colors.error}]}>
                  {errors.team}
                </Text>
              )}
            </View>

            {/* Signup Button */}
            <TouchableOpacity
              style={[
                styles.signupButton,
                {
                backgroundColor: colors.primary,
                opacity: loading ? 0.7 : 1,
                },
              ]}
              onPress={handleSignup}
              disabled={loading}>
              {loading ? (
              <ActivityIndicator color="#ffffff" />
              ) : (
              <Text style={styles.signupButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={[styles.loginText, {color: colors.textSecondary}]}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={[styles.loginLink, {color: colors.primary}]}>
                  Sign In
                </Text>
              </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  headerTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    textAlign: 'center',
    opacity: 0.9,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  eyeButton: {
    padding: 5,
  },
  errorText: {
    fontSize: 12,
    marginTop: 5,
  },
  signupButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  signupButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SignupScreen; 