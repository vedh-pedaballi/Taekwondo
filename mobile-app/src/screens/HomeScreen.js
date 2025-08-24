import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../context/ThemeContext';
import {useAuth} from '../context/AuthContext';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const {colors, spacing, typography, shadows} = useTheme();
  const {user} = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const QuickActionCard = ({title, icon, onPress, color}) => (
    <TouchableOpacity
      style={[
        styles.quickActionCard,
        {
          backgroundColor: colors.surface,
          ...shadows.medium,
        },
      ]}
      onPress={onPress}>
      <View style={[styles.iconContainer, {backgroundColor: color}]}>
        <Icon name={icon} size={24} color="#ffffff" />
      </View>
      <Text style={[styles.quickActionTitle, typography.h4, {color: colors.text}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const FeatureCard = ({title, description, image, onPress}) => (
    <TouchableOpacity
      style={[
        styles.featureCard,
        {
          backgroundColor: colors.surface,
          ...shadows.small,
        },
      ]}
      onPress={onPress}>
      <Image source={{uri: image}} style={styles.featureImage} />
      <View style={styles.featureContent}>
        <Text style={[styles.featureTitle, typography.h3, {color: colors.text}]}>
          {title}
        </Text>
        <Text style={[styles.featureDescription, typography.bodySmall, {color: colors.textSecondary}]}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* Header */}
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>
            Welcome to Tornado Sports Club
          </Text>
          <Text style={styles.subtitleText}>
            Excellence in Taekwondo Training
          </Text>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, typography.h2, {color: colors.text}]}>
          Quick Actions
        </Text>
        <View style={styles.quickActionsGrid}>
          <QuickActionCard
            title="Classes"
            icon="school"
            color={colors.primary}
            onPress={() => navigation.navigate('Classes')}
          />
          <QuickActionCard
            title="Events"
            icon="event"
            color={colors.secondary}
            onPress={() => navigation.navigate('Events')}
          />
          <QuickActionCard
            title="Gallery"
            icon="photo-library"
            color={colors.info}
            onPress={() => navigation.navigate('Gallery')}
          />
          <QuickActionCard
            title="About"
            icon="info"
            color={colors.success}
            onPress={() => navigation.navigate('About')}
          />
        </View>
      </View>

      {/* Features */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, typography.h2, {color: colors.text}]}>
          What We Offer
        </Text>
        <FeatureCard
          title="Professional Training"
          description="Learn from certified Taekwondo instructors with years of experience."
          image="https://via.placeholder.com/300x200"
          onPress={() => navigation.navigate('Classes')}
        />
        <FeatureCard
          title="Competition Ready"
          description="Prepare for tournaments and competitions with specialized training programs."
          image="https://via.placeholder.com/300x200"
          onPress={() => navigation.navigate('Events')}
        />
          <FeatureCard
          title="Community"
          description="Join our supportive community of martial artists and fitness enthusiasts."
            image="https://via.placeholder.com/300x200"
            onPress={() => navigation.navigate('About')}
          />
      </View>

      {/* Contact CTA */}
      <View style={[styles.contactSection, {backgroundColor: colors.surface}]}>
        <Text style={[styles.contactTitle, typography.h3, {color: colors.text}]}>
          Ready to Start Your Journey?
        </Text>
        <Text style={[styles.contactText, typography.body, {color: colors.textSecondary}]}>
          Contact us today to learn more about our programs and schedule your first class.
        </Text>
        <TouchableOpacity
          style={[styles.contactButton, {backgroundColor: colors.primary}]}
          onPress={() => navigation.navigate('Contact')}>
          <Text style={styles.contactButtonText}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.9,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActionTitle: {
    textAlign: 'center',
    fontWeight: '600',
  },
  featureCard: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  featureImage: {
    width: '100%',
    height: 150,
  },
  featureContent: {
    padding: 20,
  },
  featureTitle: {
    marginBottom: 8,
  },
  featureDescription: {
    lineHeight: 20,
  },
  contactSection: {
    margin: 20,
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  contactTitle: {
    textAlign: 'center',
    marginBottom: 10,
  },
  contactText: {
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  contactButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen; 