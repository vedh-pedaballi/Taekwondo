import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';

const AboutScreen = () => {
  const {colors, spacing, typography, shadows} = useTheme();

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.header, {backgroundColor: colors.primary}]}>
        <Text style={[styles.headerTitle, typography.h1, {color: '#ffffff'}]}>
          About Us
        </Text>
        <Text style={[styles.headerSubtitle, typography.body, {color: '#ffffff'}]}>
          Learn about Tornado Sports Club
        </Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={[styles.aboutCard, {backgroundColor: colors.surface, ...shadows.small}]}>
          <Text style={[styles.aboutTitle, typography.h2, {color: colors.text}]}>
            Tornado Sports Club
          </Text>
          <Text style={[styles.aboutText, typography.body, {color: colors.textSecondary}]}>
            We are an international Taekwondo team dedicated to excellence in martial arts training and competition. Our club provides comprehensive training programs for students of all skill levels, from beginners to advanced competitors.
          </Text>
          <Text style={[styles.aboutText, typography.body, {color: colors.textSecondary}]}>
            Our experienced instructors are committed to helping each student reach their full potential while promoting discipline, respect, and physical fitness.
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
  aboutCard: {
    borderRadius: 12,
    padding: 20,
  },
  aboutTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  aboutText: {
    marginBottom: 16,
    lineHeight: 22,
  },
});

export default AboutScreen; 