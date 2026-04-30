/**
 * AthletesFilters — Pill-shaped filter buttons: All Athletes, Pro League, Top Rated
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';

export type AthleteFilterValue = 'all' | 'pro_league' | 'top_rated';

const FILTERS: { key: AthleteFilterValue; label: string }[] = [
  { key: 'all', label: 'All Athletes' },
  { key: 'pro_league', label: 'Pro League' },
  { key: 'top_rated', label: 'Top Rated' },
];

interface AthletesFiltersProps {
  active: AthleteFilterValue;
  onFilterChange: (filter: AthleteFilterValue) => void;
}

export default function AthletesFilters({ active, onFilterChange }: AthletesFiltersProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {FILTERS.map((filter) => {
        const isActive = active === filter.key;
        return (
          <TouchableOpacity
            key={filter.key}
            style={[styles.pill, isActive && styles.pillActive]}
            onPress={() => onFilterChange(filter.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  pill: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pillActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  pillText: {
    fontSize: typography.caption,
    fontWeight: fontWeight.semiBold,
    color: colors.textSecondary,
  },
  pillTextActive: {
    color: colors.background,
  },
});
