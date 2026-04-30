/**
 * NewsCategoryTabs — Horizontal category tabs: All News | Competitions | Interviews | Training
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, typography, fontWeight } from '../../constants/theme';

const TABS = ['All News', 'Competitions', 'Interviews', 'Training'] as const;
export type NewsCategoryTabValue = (typeof TABS)[number];

interface NewsCategoryTabsProps {
  activeTab: NewsCategoryTabValue;
  onTabChange: (tab: NewsCategoryTabValue) => void;
}

export default function NewsCategoryTabs({ activeTab, onTabChange }: NewsCategoryTabsProps) {
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
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
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
    color: colors.gold,
    fontWeight: fontWeight.bold,
  },
});
