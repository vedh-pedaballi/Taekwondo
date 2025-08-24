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

const ClassesScreen = () => {
  const {colors, spacing, typography, shadows} = useTheme();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      setLoading(true);
      // Mock data for testing
      const mockClasses = [
        {
          id: 1,
          title: 'Beginner Taekwondo',
          time: 'Monday & Wednesday 6:00 PM',
          description: 'Perfect for newcomers to martial arts. Learn basic techniques and forms.',
          instructor: 'Master Kim',
          level: 'Beginner',
        },
        {
          id: 2,
          title: 'Intermediate Training',
          time: 'Tuesday & Thursday 7:00 PM',
          description: 'Advanced techniques for experienced students. Focus on sparring and competition.',
          instructor: 'Master Park',
          level: 'Intermediate',
        },
        {
          id: 3,
          title: 'Advanced Competition',
          time: 'Friday 6:30 PM',
          description: 'Elite training for tournament preparation and advanced techniques.',
          instructor: 'Master Lee',
          level: 'Advanced',
        },
        {
          id: 4,
          title: 'Youth Training',
          time: 'Saturday 10:00 AM',
          description: 'Specialized training for young athletes. Fun and educational approach.',
          instructor: 'Master Choi',
          level: 'Youth',
        },
      ];
      
      // Simulate loading delay
      setTimeout(() => {
        setClasses(mockClasses);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading classes:', error);
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadClasses();
    setRefreshing(false);
  };

  const ClassCard = ({classData}) => (
    <TouchableOpacity
      style={[styles.classCard, {backgroundColor: colors.surface, ...shadows.small}]}>
      <View style={styles.classHeader}>
        <Icon name="schedule" size={24} color={colors.primary} />
        <Text style={[styles.classTitle, typography.h3, {color: colors.text}]}>
          {classData.title}
        </Text>
      </View>
      <Text style={[styles.classTime, typography.body, {color: colors.textSecondary}]}>
        {classData.time}
      </Text>
      <Text style={[styles.classDescription, typography.bodySmall, {color: colors.textSecondary}]}>
        {classData.description}
      </Text>
      <View style={styles.classFooter}>
        <Text style={[styles.instructor, typography.bodySmall, {color: colors.primary}]}>
          Instructor: {classData.instructor}
        </Text>
        <Text style={[styles.level, typography.bodySmall, {color: colors.textSecondary}]}>
          Level: {classData.level}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, {backgroundColor: colors.background}]}>
        <Text style={[styles.loadingText, typography.body, {color: colors.text}]}>
          Loading classes...
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
      <View style={[styles.header, {backgroundColor: colors.primary}]}>
        <Text style={[styles.headerTitle, typography.h1, {color: '#ffffff'}]}>
          Classes
        </Text>
        <Text style={[styles.headerSubtitle, typography.body, {color: '#ffffff'}]}>
          View our class schedule and register for sessions
        </Text>
      </View>

      {/* Classes List */}
      <View style={styles.content}>
        <Text style={[styles.sectionTitle, typography.h2, {color: colors.text}]}>
          Available Classes
        </Text>
        
        {classes.length > 0 ? (
          classes.map((classData, index) => (
            <ClassCard key={index} classData={classData} />
          ))
        ) : (
          <View style={[styles.emptyState, {backgroundColor: colors.surface, ...shadows.small}]}>
            <Icon name="schedule" size={48} color={colors.textSecondary} />
            <Text style={[styles.emptyText, typography.body, {color: colors.textSecondary}]}>
              No classes available at the moment.
            </Text>
            <Text style={[styles.emptySubtext, typography.bodySmall, {color: colors.textSecondary}]}>
              Check back later for updated schedules.
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
  classCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  classHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  classTitle: {
    marginLeft: 12,
    flex: 1,
  },
  classTime: {
    marginBottom: 8,
    fontWeight: '600',
  },
  classDescription: {
    lineHeight: 20,
    marginBottom: 12,
  },
  classFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  instructor: {
    fontWeight: '600',
  },
  level: {
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

export default ClassesScreen; 