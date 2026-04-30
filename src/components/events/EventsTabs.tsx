/**
 * EventsTabs — Segmented control for Upcoming / Past toggle
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';

const TAB_OPTIONS = ['Upcoming', 'Past'] as const;
export type EventsTabValue = (typeof TAB_OPTIONS)[number];

interface EventsTabsProps {
  activeTab: EventsTabValue;
  onTabChange: (tab: EventsTabValue) => void;
}

const CONTAINER_HORIZONTAL_MARGIN = spacing.lg;
const CONTAINER_WIDTH =
  Dimensions.get('window').width - CONTAINER_HORIZONTAL_MARGIN * 2;
const TAB_WIDTH = (CONTAINER_WIDTH - spacing.xs * 2) / 2;

export default function EventsTabs({ activeTab, onTabChange }: EventsTabsProps) {
  const activeIndex = TAB_OPTIONS.indexOf(activeTab);
  const translateX = React.useRef(new Animated.Value(activeIndex * TAB_WIDTH)).current;

  React.useEffect(() => {
    Animated.spring(translateX, {
      toValue: activeIndex * TAB_WIDTH,
      useNativeDriver: true,
      tension: 200,
      friction: 25,
    }).start();
  }, [activeIndex, translateX]);

  return (
    <View style={styles.container}>
      {/* Animated sliding indicator */}
      <Animated.View
        style={[
          styles.indicator,
          { width: TAB_WIDTH, transform: [{ translateX }] },
        ]}
      />

      {TAB_OPTIONS.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={styles.tab}
          onPress={() => onTabChange(tab)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab && styles.tabTextActive,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: CONTAINER_HORIZONTAL_MARGIN,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    padding: spacing.xs,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: spacing.xs,
    left: spacing.xs,
    bottom: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.gold,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm + 2,
    zIndex: 1,
  },
  tabText: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.semiBold,
    color: colors.muted,
  },
  tabTextActive: {
    color: colors.background,
    fontWeight: fontWeight.bold,
  },
});
