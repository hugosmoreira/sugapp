/**
 * AthleteStats — Three horizontal stat cards: Fights, Wins, Losses
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';
import { AthleteStats as AthleteStatsType } from '../../types/types';

interface AthleteStatsProps {
  stats: AthleteStatsType;
}

export default function AthleteStats({ stats }: AthleteStatsProps) {
  const items = [
    { value: stats.fights, label: 'FIGHTS' },
    { value: stats.wins, label: 'WINS' },
    { value: stats.losses, label: 'LOSSES' },
  ];

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View key={item.label} style={styles.card}>
          <Text style={styles.value}>{item.value}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    gap: spacing.xs,
  },
  value: {
    fontSize: typography.h2,
    fontWeight: fontWeight.bold,
    color: colors.gold,
  },
  label: {
    fontSize: typography.micro,
    fontWeight: fontWeight.semiBold,
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
});
