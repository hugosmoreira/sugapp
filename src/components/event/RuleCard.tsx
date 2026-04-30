/**
 * RuleCard — Single rule display card (label + value)
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';

interface RuleCardProps {
  label: string;
  value: string;
}

export default function RuleCard({ label, value }: RuleCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    gap: spacing.sm,
  },
  label: {
    fontSize: typography.micro,
    fontWeight: fontWeight.bold,
    color: colors.muted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: typography.body,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
});
