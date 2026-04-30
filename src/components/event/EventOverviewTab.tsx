/**
 * EventOverviewTab — Overview tab content for Event Detail screen
 *
 * Sections: Event Description, Venue Information (card + map), Ruleset (grid), Bottom CTA
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';
import { EventDetail } from '../../types/types';
import VenueCard from './VenueCard';
import RulesetGrid from './RulesetGrid';
import EventImage from '../common/EventImage';

function hasImage(value: number | string): boolean {
  if (typeof value === 'number') return true;
  return typeof value === 'string' && value.trim().length > 0;
}

interface EventOverviewTabProps {
  event: EventDetail;
  onPurchaseTickets?: () => void;
}

export default function EventOverviewTab({
  event,
  onPurchaseTickets,
}: EventOverviewTabProps) {
  return (
    <View style={styles.container}>
      {/* ─── Event Description ──── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Event Description</Text>
        <Text style={styles.descriptionText}>{event.description}</Text>
      </View>

      {/* ─── Venue Information ──── */}
      {(event.venue || event.address) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Venue Information</Text>
          <VenueCard
            name={event.venue}
            address={event.address}
            note="Capacity: 1,400. All ages event with bar available for 21+."
          />

          {hasImage(event.mapImage) && (
            <View style={styles.mapContainer}>
              <EventImage
                source={event.mapImage}
                style={styles.mapImage}
                transition={200}
              />
            </View>
          )}
        </View>
      )}

      {/* ─── Ruleset ──── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ruleset</Text>
        <RulesetGrid ruleset={event.ruleset} />
      </View>

      {/* ─── Bottom CTA ──── */}
      <View style={styles.ctaSection}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={onPurchaseTickets}
          activeOpacity={0.8}
        >
          <Ionicons name="ticket-outline" size={18} color={colors.background} />
          <Text style={styles.ctaText}>Purchase Your Tickets Now</Text>
        </TouchableOpacity>
        <Text style={styles.disclaimer}>
          Tickets are non-refundable. Card subject to change.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.xl,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xxl,
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.h3,
    fontWeight: fontWeight.bold,
    color: colors.gold,
    marginBottom: spacing.xs,
  },
  descriptionText: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.regular,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  mapContainer: {
    borderRadius: radius.md,
    overflow: 'hidden',
    height: 160,
    backgroundColor: colors.surface,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  ctaSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
    alignItems: 'center',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.gold,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    width: '100%',
  },
  ctaText: {
    fontSize: typography.body,
    fontWeight: fontWeight.bold,
    color: colors.background,
    letterSpacing: 0.3,
  },
  disclaimer: {
    fontSize: typography.micro,
    fontWeight: fontWeight.regular,
    color: colors.muted,
    textAlign: 'center',
  },
});
