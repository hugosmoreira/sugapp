/**
 * EventsParticipatedCarousel — Horizontal scroll of event poster cards
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight } from '../../constants/theme';
import { EventParticipated } from '../../types/types';
import EventPosterCard from './EventPosterCard';

interface EventsParticipatedCarouselProps {
  events: EventParticipated[];
}

export default function EventsParticipatedCarousel({
  events,
}: EventsParticipatedCarouselProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headingRow}>
        <Ionicons name="trophy-outline" size={18} color={colors.gold} />
        <Text style={styles.heading}>Events Participated</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {events.map((event) => (
          <EventPosterCard key={event.eventId} event={event} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.xl,
    gap: spacing.md,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  heading: {
    fontSize: typography.h3,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  scroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
});
