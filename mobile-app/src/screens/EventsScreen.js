import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../context/ThemeContext';

const EventsScreen = () => {
  const {colors, spacing, typography, shadows} = useTheme();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      // Mock data for testing
      const mockEvents = [
        {
          id: 1,
          title: 'Regional Tournament',
          date: 'December 15, 2024',
          time: '9:00 AM - 5:00 PM',
          description: 'Annual regional Taekwondo tournament for all belt levels.',
          location: 'Community Center',
          type: 'Tournament',
        },
        {
          id: 2,
          title: 'Belt Testing',
          date: 'December 20, 2024',
          time: '6:00 PM - 8:00 PM',
          description: 'Belt promotion testing for all eligible students.',
          location: 'Tornado Sports Club',
          type: 'Testing',
        },
        {
          id: 3,
          title: 'Holiday Workshop',
          date: 'December 28, 2024',
          time: '10:00 AM - 2:00 PM',
          description: 'Special holiday training workshop with guest instructors.',
          location: 'Tornado Sports Club',
          type: 'Workshop',
        },
      ];
      
      // Simulate loading delay
      setTimeout(() => {
        setEvents(mockEvents);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading events:', error);
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadEvents();
    setRefreshing(false);
  };

  const EventCard = ({eventData}) => (
    <TouchableOpacity
      style={[styles.eventCard, {backgroundColor: colors.surface, ...shadows.small}]}>
      <View style={styles.eventHeader}>
        <Icon name="event" size={24} color={colors.secondary} />
        <Text style={[styles.eventTitle, typography.h3, {color: colors.text}]}>
          {eventData.title}
        </Text>
      </View>
      <Text style={[styles.eventDate, typography.body, {color: colors.textSecondary}]}>
        {eventData.date}
      </Text>
      <Text style={[styles.eventTime, typography.body, {color: colors.textSecondary}]}>
        {eventData.time}
      </Text>
      <Text style={[styles.eventDescription, typography.bodySmall, {color: colors.textSecondary}]}>
        {eventData.description}
      </Text>
      <View style={styles.eventFooter}>
        <Text style={[styles.location, typography.bodySmall, {color: colors.primary}]}>
          📍 {eventData.location}
        </Text>
        <Text style={[styles.type, typography.bodySmall, {color: colors.textSecondary}]}>
          {eventData.type}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, {backgroundColor: colors.background}]}>
        <Text style={[styles.loadingText, typography.body, {color: colors.text}]}>
          Loading events...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.header, {backgroundColor: colors.secondary}]}>
        <Text style={[styles.headerTitle, typography.h1, {color: '#ffffff'}]}>
          Events
        </Text>
        <Text style={[styles.headerSubtitle, typography.body, {color: '#ffffff'}]}>
          Stay updated with our latest events and tournaments
        </Text>
      </View>

      {/* Events List */}
      <View style={styles.content}>
        <Text style={[styles.sectionTitle, typography.h2, {color: colors.text}]}>
          Upcoming Events
        </Text>
        
        {events.length > 0 ? (
          events.map((eventData, index) => (
            <EventCard key={index} eventData={eventData} />
          ))
        ) : (
        <View style={[styles.emptyState, {backgroundColor: colors.surface, ...shadows.small}]}>
          <Icon name="event" size={48} color={colors.textSecondary} />
            <Text style={[styles.emptyText, typography.body, {color: colors.textSecondary}]}>
              No events available at the moment.
          </Text>
            <Text style={[styles.emptySubtext, typography.bodySmall, {color: colors.textSecondary}]}>
              Check back later for upcoming events and tournaments.
          </Text>
        </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    textAlign: 'center',
  },
  header: {
    padding: 20,
    paddingTop: 40,
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
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  eventCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventTitle: {
    marginLeft: 12,
    flex: 1,
  },
  eventDate: {
    marginBottom: 4,
    fontWeight: '600',
  },
  eventTime: {
    marginBottom: 8,
    fontWeight: '600',
  },
  eventDescription: {
    lineHeight: 20,
    marginBottom: 12,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontWeight: '600',
  },
  type: {
    fontStyle: 'italic',
  },
  emptyState: {
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    textAlign: 'center',
  },
});

export default EventsScreen; 