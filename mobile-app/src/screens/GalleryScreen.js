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

const GalleryScreen = () => {
  const {colors, spacing, typography, shadows} = useTheme();
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      setLoading(true);
      // Mock data for testing
      const mockGallery = [
        {
          id: 1,
          title: 'Tournament Champions',
          description: 'Our team celebrating victory at the regional tournament',
          imageUrl: 'https://via.placeholder.com/300x200',
          date: 'November 2024',
        },
        {
          id: 2,
          title: 'Training Session',
          description: 'Students practicing advanced techniques',
          imageUrl: 'https://via.placeholder.com/300x200',
          date: 'October 2024',
        },
        {
          id: 3,
          title: 'Belt Ceremony',
          description: 'Congratulations to our newly promoted students',
          imageUrl: 'https://via.placeholder.com/300x200',
          date: 'September 2024',
        },
      ];
      
      // Simulate loading delay
      setTimeout(() => {
        setGallery(mockGallery);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading gallery:', error);
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadGallery();
    setRefreshing(false);
  };

  const GalleryItem = ({item}) => (
    <TouchableOpacity
      style={[styles.galleryItem, {backgroundColor: colors.surface, ...shadows.small}]}>
      <View style={styles.imageContainer}>
        <Icon name="image" size={48} color={colors.textSecondary} />
      </View>
      <View style={styles.itemContent}>
        <Text style={[styles.itemTitle, typography.h4, {color: colors.text}]}>
          {item.title}
        </Text>
        <Text style={[styles.itemDescription, typography.bodySmall, {color: colors.textSecondary}]}>
          {item.description}
        </Text>
        <Text style={[styles.itemDate, typography.bodySmall, {color: colors.primary}]}>
          {item.date}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, {backgroundColor: colors.background}]}>
        <Text style={[styles.loadingText, typography.body, {color: colors.text}]}>
          Loading gallery...
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
          Gallery
        </Text>
        <Text style={[styles.headerSubtitle, typography.body, {color: '#ffffff'}]}>
          Browse our photo collection and memories
        </Text>
      </View>

      {/* Gallery Content */}
      <View style={styles.content}>
        <Text style={[styles.sectionTitle, typography.h2, {color: colors.text}]}>
          Photo Gallery
        </Text>
        
        {gallery.length > 0 ? (
          gallery.map((item, index) => (
            <GalleryItem key={index} item={item} />
          ))
        ) : (
        <View style={[styles.emptyState, {backgroundColor: colors.surface, ...shadows.small}]}>
          <Icon name="photo-library" size={48} color={colors.textSecondary} />
            <Text style={[styles.emptyText, typography.body, {color: colors.textSecondary}]}>
              Gallery coming soon.
          </Text>
            <Text style={[styles.emptySubtext, typography.bodySmall, {color: colors.textSecondary}]}>
              Photos and memories will be available here soon.
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
  galleryItem: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  itemContent: {
    padding: 16,
  },
  itemTitle: {
    marginBottom: 8,
  },
  itemDescription: {
    lineHeight: 20,
    marginBottom: 8,
  },
  itemDate: {
    fontWeight: '600',
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

export default GalleryScreen; 