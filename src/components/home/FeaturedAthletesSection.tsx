/**
 * FeaturedAthletesSection — Horizontal row of circular athlete avatars
 */
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { spacing } from '../../constants/theme';
import { Athlete } from '../../types/types';
import SectionHeader from '../common/SectionHeader';
import AthleteAvatar from '../common/AthleteAvatar';

interface FeaturedAthletesSectionProps {
  athletes: Athlete[];
  onRankings?: () => void;
  onAthletePress?: (athlete: Athlete) => void;
}

export default function FeaturedAthletesSection({
  athletes,
  onRankings,
  onAthletePress,
}: FeaturedAthletesSectionProps) {
  return (
    <View>
      <SectionHeader title="FEATURED ATHLETES" actionText="RANKINGS" onActionPress={onRankings} />
      <FlatList
        data={athletes}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <AthleteAvatar athlete={item} onPress={() => onAthletePress?.(item)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.lg,
  },
});
