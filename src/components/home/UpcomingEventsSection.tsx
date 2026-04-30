/**
 * UpcomingEventsSection — Horizontal scroll of upcoming event cards
 */
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { spacing } from '../../constants/theme';
import { Event } from '../../types/types';
import SectionHeader from '../common/SectionHeader';
import EventCard from '../common/EventCard';

interface UpcomingEventsSectionProps {
  events: Event[];
  onViewAll?: () => void;
  onEventPress?: (event: Event) => void;
}

export default function UpcomingEventsSection({
  events,
  onViewAll,
  onEventPress,
}: UpcomingEventsSectionProps) {
  return (
    <View>
      <SectionHeader title="UPCOMING EVENTS" actionText="VIEW ALL" onActionPress={onViewAll} />
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <EventCard event={item} onPress={() => onEventPress?.(item)} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.lg,
  },
  separator: {
    width: spacing.md,
  },
});
