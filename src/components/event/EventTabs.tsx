/**
 * EventTabs — Tab row for event detail sections
 * Overview | Fight Card | Schedule | Athletes
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, typography, fontWeight } from '../../constants/theme';

const TABS = ['Overview', 'Fight Card', 'Schedule', 'Athletes'] as const;
export type EventTabValue = (typeof TABS)[number];

interface EventTabsProps {
  activeTab: EventTabValue;
  onTabChange: (tab: EventTabValue) => void;
}

export default function EventTabs({ activeTab, onTabChange }: EventTabsProps) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => onTabChange(tab)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xl,
  },
  tab: {
    paddingBottom: spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.gold,
  },
  tabText: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.medium,
    color: colors.muted,
  },
  tabTextActive: {
    color: colors.textPrimary,
    fontWeight: fontWeight.semiBold,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
});
