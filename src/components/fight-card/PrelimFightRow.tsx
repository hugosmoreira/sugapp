/**
 * PrelimFightRow — Compact prelim fight list item
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight } from '../../constants/theme';
import { PrelimFight } from '../../types/types';

interface PrelimFightRowProps {
  fight: PrelimFight;
  onPress?: () => void;
}

export default function PrelimFightRow({ fight, onPress }: PrelimFightRowProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.textGroup}>
        <Text style={styles.title}>{fight.title}</Text>
        <Text style={styles.subtitle}>{fight.subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.muted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  textGroup: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: typography.caption,
    fontWeight: fontWeight.regular,
    color: colors.gold,
  },
});
