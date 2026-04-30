/**
 * RulesetGrid — 2-column grid of rule cards
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '../../constants/theme';
import { Ruleset } from '../../types/types';
import RuleCard from './RuleCard';

interface RulesetGridProps {
  ruleset: Ruleset;
}

export default function RulesetGrid({ ruleset }: RulesetGridProps) {
  const rules = [
    { label: 'FORMAT', value: ruleset.format },
    { label: 'TIME LIMIT', value: ruleset.timeLimit },
    { label: 'OVERTIME', value: ruleset.overtime },
    { label: 'UNIFORM', value: ruleset.uniform },
  ];

  return (
    <View style={styles.grid}>
      <View style={styles.row}>
        <RuleCard label={rules[0].label} value={rules[0].value} />
        <RuleCard label={rules[1].label} value={rules[1].value} />
      </View>
      <View style={styles.row}>
        <RuleCard label={rules[2].label} value={rules[2].value} />
        <RuleCard label={rules[3].label} value={rules[3].value} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
});
