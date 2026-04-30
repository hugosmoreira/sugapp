/**
 * MainCardSection — "THE MAIN CARD" section heading + list of matchup rows
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, fontWeight } from '../../constants/theme';
import { FightMatchup } from '../../types/types';
import FightMatchupRow from './FightMatchupRow';

interface MainCardSectionProps {
  matchups: FightMatchup[];
}

export default function MainCardSection({ matchups }: MainCardSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>THE MAIN CARD</Text>
      {matchups.map((matchup) => (
        <FightMatchupRow key={matchup.id} matchup={matchup} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  heading: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.bold,
    color: colors.textSecondary,
    letterSpacing: 3,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
});
