/**
 * ScheduleTabs — Category tabs: MAIN CARD | PRELIMS | GRAPPLING
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, typography, fontWeight } from '../../constants/theme';

const TABS = ['MAIN CARD', 'PRELIMS', 'GRAPPLING'] as const;
export type ScheduleTabValue = (typeof TABS)[number];

interface ScheduleTabsProps {
  activeTab: ScheduleTabValue;
  onTabChange: (tab: ScheduleTabValue) => void;
}

export default function ScheduleTabs({ activeTab, onTabChange }: ScheduleTabsProps) {
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
    gap: spacing.xxl,
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
    fontWeight: fontWeight.semiBold,
    color: colors.muted,
    letterSpacing: 0.5,
  },
  tabTextActive: {
    color: colors.gold,
    fontWeight: fontWeight.bold,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
});
