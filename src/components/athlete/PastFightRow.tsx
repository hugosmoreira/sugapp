/**
 * PastFightRow — Single past fight result row with win/loss icon
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';
import { PastFight } from '../../types/types';

interface PastFightRowProps {
  fight: PastFight;
}

export default function PastFightRow({ fight }: PastFightRowProps) {
  const isWin = fight.result === 'win';

  return (
    <View style={styles.row}>
      {/* Result icon */}
      <View style={[styles.iconCircle, isWin ? styles.iconWin : styles.iconLoss]}>
        <Ionicons
          name={isWin ? 'checkmark' : 'close'}
          size={16}
          color={isWin ? '#4CAF50' : '#F44336'}
        />
      </View>

      {/* Fight info */}
      <View style={styles.info}>
        <Text style={styles.opponent}>{fight.opponent}</Text>
        <Text style={styles.method}>{fight.method}</Text>
      </View>

      {/* Date */}
      <Text style={styles.date}>{fight.date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWin: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
  },
  iconLoss: {
    backgroundColor: 'rgba(244, 67, 54, 0.15)',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  opponent: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  method: {
    fontSize: typography.caption,
    fontWeight: fontWeight.regular,
    color: colors.textSecondary,
  },
  date: {
    fontSize: typography.caption,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
});
