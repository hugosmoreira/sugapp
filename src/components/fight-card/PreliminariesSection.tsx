/**
 * PreliminariesSection — "THE PRELIMINARIES" heading + compact fight rows
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, fontWeight } from '../../constants/theme';
import { PrelimFight } from '../../types/types';
import PrelimFightRow from './PrelimFightRow';

interface PreliminariesSectionProps {
  fights: PrelimFight[];
}

export default function PreliminariesSection({ fights }: PreliminariesSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>THE PRELIMINARIES</Text>
      {fights.map((fight) => (
        <PrelimFightRow key={fight.id} fight={fight} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
  },
  heading: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.bold,
    color: colors.gold,
    letterSpacing: 3,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
});
