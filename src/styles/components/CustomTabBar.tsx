import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import HomeIcon from '../../assets/icons/Home';
import LookBookIcon from '../../assets/icons/LookBook';
import DiscoverIcon from '../../assets/icons/Discover';
import { flexCenter, halfWidth } from '../mixins';
import theme from '../theme';
import Text from './Text';

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => (
  <View style={styles.container}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

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

      return (
        <TouchableOpacity
          key={route.key}
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={`tab-bar-button-${route.name.toLowerCase()}`}
          onPress={onPress}
          style={[styles.tab, { gap: theme.spacing.small }]}
        >
          {isFocused ? (
            <View
              style={[
                flexCenter,
                halfWidth,
                {
                  gap: theme.spacing.small / 2,
                  borderWidth: theme.borderWidth.thin,
                  borderColor: theme.colors.primary,
                },
              ]}
            />
          ) : (
            <View
              style={[
                flexCenter,
                {
                  gap: theme.spacing.small / 2,
                  backgroundColor: theme.colors.white,
                },
              ]}
            />
          )}
          {typeof label === 'function' ? (
            label({
              focused: isFocused,
              color: isFocused ? '#673ab7' : '#222',
              position: 'below-icon',
              children: route.name,
            })
          ) : (
            <View style={[flexCenter, { gap: theme.spacing.small / 2 }]}>
              {route.name === 'Home' ? (
                <HomeIcon
                  color={
                    isFocused
                      ? theme.colors.textPrimary
                      : theme.colors.textSecondaryLight
                  }
                  strokeColor={
                    isFocused
                      ? theme.colors.textPrimary
                      : theme.colors.textSecondaryLight
                  }
                />
              ) : route.name === 'Lookbook' ? (
                <LookBookIcon
                  color={
                    isFocused
                      ? theme.colors.textPrimary
                      : theme.colors.textSecondaryLight
                  }
                />
              ) : route.name === 'Discover' ? (
                <DiscoverIcon
                  color={
                    isFocused
                      ? theme.colors.textPrimary
                      : theme.colors.textSecondaryLight
                  }
                />
              ) : null}
              <Text
                color={
                  isFocused
                    ? theme.colors.textPrimary
                    : theme.colors.textSecondaryLight
                }
                fontSize={theme.fontSize.small}
              >
                {label}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#fff',
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    paddingHorizontal: 36,
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
});

export default CustomTabBar;
