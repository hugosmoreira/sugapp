/**
 * EventsList — FlatList of EventCards for the Events screen
 */
import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { spacing, colors, typography, fontWeight } from '../../constants/theme';
import { Event } from '../../types/types';
import EventCard from './EventCard';

interface EventsListProps {
  events: Event[];
}

export default function EventsList({ events }: EventsListProps) {
  if (events.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No events found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <EventCard event={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: spacing.xxxl,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xxxxl * 2,
  },
  emptyText: {
    fontSize: typography.body,
    fontWeight: fontWeight.medium,
    color: colors.muted,
  },
});
