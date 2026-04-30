/**
 * EventPosterCard — Small event poster card for horizontal carousel
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';
import { EventParticipated } from '../../types/types';

interface EventPosterCardProps {
  event: EventParticipated;
  onPress?: () => void;
}

const POSTER_WIDTH = 105;
const POSTER_HEIGHT = 130;

export default function EventPosterCard({ event, onPress }: EventPosterCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image
        source={typeof event.posterImage === 'number' ? event.posterImage : { uri: event.posterImage }}
        style={styles.poster}
        contentFit="cover"
        transition={200}
      />
      <Text style={styles.name} numberOfLines={1}>
        {event.eventName}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: POSTER_WIDTH,
    gap: spacing.sm,
  },
  poster: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  name: {
    fontSize: typography.caption,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
});
