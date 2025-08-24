import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';

const WinnersScreen = () => {
  const {colors, spacing, typography, shadows} = useTheme();

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.header, {backgroundColor: colors.secondary}]}>
        <Text style={[styles.headerTitle, typography.h1, {color: '#ffffff'}]}>
          National Winners
        </Text>
        <Text style={[styles.headerSubtitle, typography.body, {color: '#ffffff'}]}>
          Celebrating our champions
        </Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={[styles.winnersCard, {backgroundColor: colors.surface, ...shadows.small}]}>
          <Text style={[styles.winnersTitle, typography.h2, {color: colors.text}]}>
            Our Champions
          </Text>
          <Text style={[styles.winnersText, typography.body, {color: colors.textSecondary}]}>
            We're proud to showcase our national winners and their achievements. These athletes represent the dedication and excellence of our training programs.
          </Text>
          <Text style={[styles.winnersText, typography.body, {color: colors.textSecondary}]}>
            Winner profiles and photos coming soon...
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
  winnersCard: {
    borderRadius: 12,
    padding: 20,
  },
  winnersTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  winnersText: {
    marginBottom: 16,
    lineHeight: 22,
  },
});

export default WinnersScreen; 