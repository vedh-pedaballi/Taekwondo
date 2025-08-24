import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';

const ContactScreen = () => {
  const {colors, spacing, typography, shadows} = useTheme();

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.header, {backgroundColor: colors.primary}]}>
        <Text style={[styles.headerTitle, typography.h1, {color: '#ffffff'}]}>
          Contact Us
        </Text>
        <Text style={[styles.headerSubtitle, typography.body, {color: '#ffffff'}]}>
          Get in touch with our team
        </Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={[styles.contactCard, {backgroundColor: colors.surface, ...shadows.small}]}>
          <Text style={[styles.contactTitle, typography.h2, {color: colors.text}]}>
            Get in Touch
          </Text>
          <Text style={[styles.contactText, typography.body, {color: colors.textSecondary}]}>
            We'd love to hear from you! Contact us for more information about our classes, events, or any other inquiries.
          </Text>
          <Text style={[styles.contactText, typography.body, {color: colors.textSecondary}]}>
            Contact information coming soon...
          </Text>
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
  headerTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    textAlign: 'center',
    opacity: 0.9,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  contactCard: {
    borderRadius: 12,
    padding: 20,
  },
  contactTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  contactText: {
    marginBottom: 16,
    lineHeight: 22,
  },
});

export default ContactScreen; 