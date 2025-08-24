import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../context/ThemeContext';

const CustomTabBar = ({state, descriptors, navigation}) => {
  const {colors, spacing, typography, shadows} = useTheme();

  const getIconName = (routeName) => {
    switch (routeName) {
      case 'Home':
        return 'home';
      case 'Classes':
        return 'schedule';
      case 'Events':
        return 'event';
      case 'Gallery':
        return 'photo-library';
      case 'Profile':
        return 'person';
      default:
        return 'circle';
    }
  };

  const getTabLabel = (routeName) => {
    switch (routeName) {
      case 'Home':
        return 'Home';
      case 'Classes':
        return 'Classes';
      case 'Events':
        return 'Events';
      case 'Gallery':
        return 'Gallery';
      case 'Profile':
        return 'Profile';
      default:
        return routeName;
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.surface}]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel || getTabLabel(route.name);
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tab,
              {
                backgroundColor: isFocused ? colors.primary : 'transparent',
                borderRadius: spacing.md,
              },
            ]}>
            <View style={styles.tabContent}>
              <Icon
                name={getIconName(route.name)}
                size={24}
                color={isFocused ? '#ffffff' : colors.textSecondary}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.label,
                  {
                    color: isFocused ? '#ffffff' : colors.textSecondary,
                    ...typography.bodySmall,
                  },
                ]}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  tab: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default CustomTabBar; 