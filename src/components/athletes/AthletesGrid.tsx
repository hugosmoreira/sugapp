/**
 * AthletesGrid — 2-column FlatList grid of AthleteCards
 */
import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { colors, spacing, typography, fontWeight } from '../../constants/theme';
import { Athlete } from '../../types/types';
import AthleteCard from './AthleteCard';

interface AthletesGridProps {
  athletes: Athlete[];
}

export default function AthletesGrid({ athletes }: AthletesGridProps) {
  if (athletes.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No athletes found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={athletes}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <AthleteCard athlete={item} />}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.grid}
      scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
  },
  empty: {
    paddingVertical: spacing.xxxxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.body,
    fontWeight: fontWeight.medium,
    color: colors.muted,
  },
});
