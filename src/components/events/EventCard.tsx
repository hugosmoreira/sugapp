/**
 * EventCard — Full-width card for the Events screen
 *
 * Layout based on the design screenshot:
 * - Large event image at top with type badge + "ON SALE" badge
 * - Event title
 * - Location row with pin icon
 * - Date row with calendar icon
 * - CTA button (VIEW FIGHT CARD / DETAILS / NOTIFY ME)
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  colors,
  spacing,
  typography,
  fontWeight,
  radius,
} from '../../constants/theme';
import { Event, EventType } from '../../types/types';
import EventImage from '../common/EventImage';

// ─── Helpers ─────────────────────────────────────────────────

const TYPE_LABELS: Record<EventType, string> = {
  MAIN_EVENT: 'MAIN EVENT',
  OPEN_TOURNAMENT: 'OPEN TOURNAMENT',
  QUALIFIER: 'QUALIFIERS',
};

function getCtaText(event: Event): string {
  if (event.status === 'past') return 'VIEW RESULTS';
  if (event.type === 'MAIN_EVENT') return 'VIEW FIGHT CARD';
  if (event.type === 'QUALIFIER') return 'NOTIFY ME';
  return 'DETAILS';
}

function formatEventDate(dateStr: string): string {
  const d = new Date(dateStr);
  const month = d.toLocaleDateString('en-US', { month: 'short' });
  const day = d.getDate();
  const year = d.getFullYear();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  const m = minutes.toString().padStart(2, '0');
  return `${month} ${day}, ${year} • ${h}:${m} ${ampm} PST`;
}

// ─── Component ───────────────────────────────────────────────

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const router = useRouter();
  const typeLabel = event.type ? TYPE_LABELS[event.type] : undefined;
  const ctaText = getCtaText(event);
  const isMainEvent = event.type === 'MAIN_EVENT';
  const isQualifier = event.type === 'QUALIFIER';

  const handlePress = () => {
    router.push(`/event/${event.id}` as const);
  };

  return (
    <View style={styles.card}>
      {/* Image section */}
      <View style={styles.imageContainer}>
        <EventImage source={event.image} style={styles.image} />

        {/* Gradient overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.4)']}
          style={styles.imageOverlay}
        />

        {/* Type badge (bottom-left of image) */}
        {typeLabel && (
          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>{typeLabel}</Text>
          </View>
        )}

        {/* ON SALE badge (bottom-right of image) */}
        {event.ticketsAvailable && isMainEvent && (
          <View style={styles.onSaleBadge}>
            <Text style={styles.onSaleText}>ON{'\n'}SALE</Text>
          </View>
        )}
      </View>

      {/* Content section */}
      <View style={styles.content}>
        {/* Type label for non-main events */}
        {typeLabel && !isMainEvent && (
          <Text style={styles.typeLabel}>{typeLabel}</Text>
        )}

        {/* Title */}
        <Text style={styles.title}>{event.title.toUpperCase()}</Text>

        {/* Location row */}
        {isMainEvent && (
          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.metaText}>
              {event.city}, {event.state} • {event.venue}
            </Text>
          </View>
        )}

        {/* Date row for main events */}
        {isMainEvent && (
          <View style={styles.metaRow}>
            <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.metaText}>{formatEventDate(event.date)}</Text>
          </View>
        )}

        {/* Location + date single line for non-main events */}
        {!isMainEvent && (
          <>
            <Text style={styles.metaTextSmall}>
              {event.city}, {event.state} • {formatEventDate(event.date).split(' • ')[0]}
            </Text>
            <Text style={styles.venueText}>{event.venue}</Text>
          </>
        )}

        {/* Tickets info for qualifiers */}
        {isQualifier && !event.ticketsAvailable && (
          <Text style={styles.ticketsInfo}>Tickets Available Soon</Text>
        )}

        {/* CTA */}
        <TouchableOpacity
          style={[
            styles.ctaButton,
            isMainEvent && styles.ctaButtonPrimary,
            isQualifier && styles.ctaButtonOutline,
          ]}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.ctaText,
              isMainEvent && styles.ctaTextPrimary,
              isQualifier && styles.ctaTextOutline,
            ]}
          >
            {ctaText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────

const IMAGE_HEIGHT = 180;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  // Image
  imageContainer: {
    width: '100%',
    height: IMAGE_HEIGHT,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  typeBadge: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
    backgroundColor: 'rgba(180, 144, 31, 0.85)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm / 2,
  },
  typeBadgeText: {
    fontSize: typography.micro,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: 0.8,
  },
  onSaleBadge: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.gold,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm / 2,
    alignItems: 'center',
  },
  onSaleText: {
    fontSize: typography.micro - 1,
    fontWeight: fontWeight.bold,
    color: colors.background,
    textAlign: 'center',
    lineHeight: 12,
  },
  // Content
  content: {
    padding: spacing.lg,
    gap: spacing.xs + 2,
  },
  typeLabel: {
    fontSize: typography.micro,
    fontWeight: fontWeight.bold,
    color: colors.gold,
    letterSpacing: 1,
    marginBottom: 2,
  },
  title: {
    fontSize: typography.h3,
    fontWeight: fontWeight.extraBold,
    color: colors.textPrimary,
    letterSpacing: 0.3,
    lineHeight: 24,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  metaText: {
    fontSize: typography.caption,
    fontWeight: fontWeight.regular,
    color: colors.textSecondary,
  },
  metaTextSmall: {
    fontSize: typography.caption,
    fontWeight: fontWeight.regular,
    color: colors.textSecondary,
  },
  venueText: {
    fontSize: typography.caption,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ticketsInfo: {
    fontSize: typography.caption,
    fontWeight: fontWeight.regular,
    color: colors.gold,
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },
  // CTA
  ctaButton: {
    alignSelf: 'flex-end',
    backgroundColor: colors.surfaceAlt,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xxl,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.gold,
    marginTop: spacing.sm,
  },
  ctaButtonPrimary: {
    alignSelf: 'stretch',
    backgroundColor: colors.gold,
    borderColor: colors.gold,
    alignItems: 'center',
  },
  ctaButtonOutline: {
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    borderColor: colors.gold,
  },
  ctaText: {
    fontSize: typography.caption,
    fontWeight: fontWeight.bold,
    color: colors.gold,
    letterSpacing: 1,
  },
  ctaTextPrimary: {
    color: colors.background,
  },
  ctaTextOutline: {
    color: colors.textSecondary,
  },
});
