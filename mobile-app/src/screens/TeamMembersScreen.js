import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';

const TeamMembersScreen = () => {
  const {colors, spacing, typography, shadows} = useTheme();

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.header, {backgroundColor: colors.primary}]}>
        <Text style={[styles.headerTitle, typography.h1, {color: '#ffffff'}]}>
          USA Team Members
        </Text>
        <Text style={[styles.headerSubtitle, typography.body, {color: '#ffffff'}]}>
          Meet our talented athletes
        </Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={[styles.teamCard, {backgroundColor: colors.surface, ...shadows.small}]}>
          <Text style={[styles.teamTitle, typography.h2, {color: colors.text}]}>
            Our Team
          </Text>
          <Text style={[styles.teamText, typography.body, {color: colors.textSecondary}]}>
            Get to know our USA team members who represent Tornado Sports Club in national and international competitions.
          </Text>
          <Text style={[styles.teamText, typography.body, {color: colors.textSecondary}]}>
            Team member profiles and photos coming soon...
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
  teamCard: {
    borderRadius: 12,
    padding: 20,
  },
  teamTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  teamText: {
    marginBottom: 16,
    lineHeight: 22,
  },
});

export default TeamMembersScreen; 