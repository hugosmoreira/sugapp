/**
 * FightMatchupRow — Centered cinematic matchup row
 *
 * Left fighter → VS (with optional label) → Right fighter
 * Large portraits, bold names, gold gym names
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, fontWeight } from '../../constants/theme';
import { FightMatchup } from '../../types/types';
import FighterAvatar from './FighterAvatar';

interface FightMatchupRowProps {
  matchup: FightMatchup;
}

export default function FightMatchupRow({ matchup }: FightMatchupRowProps) {
  const avatarSize = matchup.featured ? 80 : 68;

  return (
    <View style={[styles.container, matchup.featured && styles.containerFeatured]}>
      {/* Left fighter */}
      <View style={styles.fighterSide}>
        <FighterAvatar
          image={matchup.leftImage}
          rank={matchup.leftRank}
          size={avatarSize}
        />
        <Text style={styles.fighterName} numberOfLines={2}>
          {matchup.leftFighterName.toUpperCase()}
        </Text>
        <Text style={styles.gym}>{matchup.leftGym}</Text>
      </View>

      {/* Center VS */}
      <View style={styles.center}>
        <Text style={styles.vs}>VS</Text>
        {matchup.label && <Text style={styles.label}>{matchup.label}</Text>}
        <Text style={styles.weight}>{matchup.weightClass}</Text>
      </View>

      {/* Right fighter */}
      <View style={styles.fighterSide}>
        <FighterAvatar
          image={matchup.rightImage}
          rank={matchup.rightRank}
          size={avatarSize}
        />
        <Text style={styles.fighterName} numberOfLines={2}>
          {matchup.rightFighterName.toUpperCase()}
        </Text>
        <Text style={styles.gym}>{matchup.rightGym}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  containerFeatured: {
    backgroundColor: colors.surface,
    borderBottomColor: colors.border,
  },
  fighterSide: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.sm,
  },
  fighterName: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    letterSpacing: 0.3,
    lineHeight: 18,
  },
  gym: {
    fontSize: typography.micro,
    fontWeight: fontWeight.medium,
    color: colors.gold,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.sm,
    gap: 2,
  },
  vs: {
    fontSize: typography.body,
    fontWeight: fontWeight.bold,
    color: colors.textSecondary,
  },
  label: {
    fontSize: typography.micro - 1,
    fontWeight: fontWeight.bold,
    color: colors.gold,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  weight: {
    fontSize: typography.micro,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
