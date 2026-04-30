/**
 * StatusPill — Small rounded pill badge for mat / status
 * Examples: "MAT 1", "MAT 2", "FINISHED"
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';

interface StatusPillProps {
  label: string;
  variant?: 'default' | 'finished';
}

export default function StatusPill({ label, variant = 'default' }: StatusPillProps) {
  const isFinished = variant === 'finished' || label === 'FINISHED';

  return (
    <View style={[styles.pill, isFinished && styles.pillFinished]}>
      <Text style={[styles.text, isFinished && styles.textFinished]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm / 2,
    borderWidth: 1,
    borderColor: colors.gold,
    backgroundColor: 'transparent',
  },
  pillFinished: {
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.12)',
  },
  text: {
    fontSize: typography.micro - 1,
    fontWeight: fontWeight.bold,
    color: colors.gold,
    letterSpacing: 0.5,
  },
  textFinished: {
    color: '#4CAF50',
  },
});
