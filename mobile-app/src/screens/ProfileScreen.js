import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../context/ThemeContext';
import {useAuth} from '../context/AuthContext';

const ProfileScreen = () => {
  const {colors, spacing, typography, shadows} = useTheme();
  const {user, logout} = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Logout', style: 'destructive', onPress: logout},
      ],
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Refresh user data if needed
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.header, {backgroundColor: colors.primary}]}>
        <View style={styles.profileInfo}>
          <View style={[styles.avatar, {backgroundColor: colors.secondary}]}>
            <Text style={[styles.avatarText, {color: '#ffffff'}]}>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={[styles.userName, typography.h2, {color: '#ffffff'}]}>
            {user?.name || 'User'}
          </Text>
          <Text style={[styles.userEmail, typography.body, {color: '#ffffff'}]}>
            {user?.email || 'user@example.com'}
          </Text>
        </View>
      </View>

      {/* Profile Content */}
      <View style={styles.content}>
        <Text style={[styles.sectionTitle, typography.h2, {color: colors.text}]}>
          My Profile
        </Text>
        
        <View style={[styles.profileCard, {backgroundColor: colors.surface, ...shadows.small}]}>
          <View style={styles.profileSection}>
            <Icon name="person" size={24} color={colors.primary} />
            <View style={styles.profileInfo}>
              <Text style={[styles.profileLabel, typography.bodySmall, {color: colors.textSecondary}]}>
                Name
              </Text>
              <Text style={[styles.profileValue, typography.body, {color: colors.text}]}>
                {user?.name || 'Not set'}
              </Text>
            </View>
          </View>

          <View style={styles.profileSection}>
            <Icon name="email" size={24} color={colors.primary} />
            <View style={styles.profileInfo}>
              <Text style={[styles.profileLabel, typography.bodySmall, {color: colors.textSecondary}]}>
                Email
              </Text>
              <Text style={[styles.profileValue, typography.body, {color: colors.text}]}>
                {user?.email || 'Not set'}
              </Text>
            </View>
          </View>

          <View style={styles.profileSection}>
            <Icon name="emoji-events" size={24} color={colors.primary} />
            <View style={styles.profileInfo}>
              <Text style={[styles.profileLabel, typography.bodySmall, {color: colors.textSecondary}]}>
                Belt Rank
              </Text>
              <Text style={[styles.profileValue, typography.body, {color: colors.text}]}>
                {user?.belt_rank || 'Not set'}
              </Text>
            </View>
          </View>

          <View style={styles.profileSection}>
            <Icon name="group" size={24} color={colors.primary} />
            <View style={styles.profileInfo}>
              <Text style={[styles.profileLabel, typography.bodySmall, {color: colors.textSecondary}]}>
                Team
              </Text>
              <Text style={[styles.profileValue, typography.body, {color: colors.text}]}>
                {user?.team || 'Not set'}
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, {backgroundColor: colors.primary}]}
            onPress={() => Alert.alert('Coming Soon', 'Edit profile feature coming soon!')}>
            <Icon name="edit" size={20} color="#ffffff" />
            <Text style={[styles.actionButtonText, {color: '#ffffff'}]}>
              Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, {backgroundColor: colors.error}]}
            onPress={handleLogout}>
            <Icon name="logout" size={20} color="#ffffff" />
            <Text style={[styles.actionButtonText, {color: '#ffffff'}]}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  userName: {
    textAlign: 'center',
    marginBottom: 4,
  },
  userEmail: {
    textAlign: 'center',
    opacity: 0.9,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  profileCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  profileLabel: {
    marginBottom: 2,
  },
  profileValue: {
    fontWeight: '600',
  },
  actions: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen; 