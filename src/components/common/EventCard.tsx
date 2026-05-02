/**
 * EventCard — Compact card for the horizontal event list
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';
import { Event } from '../../types/types';
import EventImage from './EventImage';

const CARD_WIDTH = (Dimensions.get('window').width - spacing.lg * 2 - spacing.md) / 2;
const CARD_IMAGE_HEIGHT = 110;

interface EventCardProps {
  event: Event;
  onPress?: () => void;
}

export default function EventCard({ event, onPress }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <EventImage source={event.image} style={styles.image} transition={200} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {event.title}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {formattedDate} • {[event.city, event.state].filter(Boolean).join(', ')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    borderRadius: radius.sm,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  image: {
    width: '100%',
    height: CARD_IMAGE_HEIGHT,
  },
  info: {
    padding: spacing.sm,
    gap: 4,
  },
  title: {
    fontSize: typography.caption,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  meta: {
    fontSize: typography.micro,
    fontWeight: fontWeight.regular,
    color: colors.textSecondary,
  },
});
