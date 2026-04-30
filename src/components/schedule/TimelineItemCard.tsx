/**
 * TimelineItemCard — A single card in the event timeline
 * Shows time/label header, matchup title, description, and status pill
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';
import { ScheduleItem } from '../../types/types';
import StatusPill from './StatusPill';

interface TimelineItemCardProps {
  item: ScheduleItem;
  onPress?: () => void;
}

export default function TimelineItemCard({ item, onPress }: TimelineItemCardProps) {
  const isFinished = item.status === 'finished';

  return (
    <TouchableOpacity
      style={[styles.card, item.featured && styles.cardFeatured]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Top row: time + label + status pill */}
      <View style={styles.topRow}>
        <Text style={[styles.timeLabel, isFinished && styles.timeLabelFinished]}>
          {item.time} • {item.label}
        </Text>
        <StatusPill
          label={item.mat}
          variant={isFinished ? 'finished' : 'default'}
        />
      </View>

      {/* Title */}
      <Text style={[styles.title, isFinished && styles.titleFinished]}>
        {item.title}
      </Text>

      {/* Description */}
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  cardFeatured: {
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeLabel: {
    fontSize: typography.caption,
    fontWeight: fontWeight.bold,
    color: colors.gold,
    letterSpacing: 0.3,
  },
  timeLabelFinished: {
    color: colors.muted,
  },
  title: {
    fontSize: typography.body,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  titleFinished: {
    color: colors.textSecondary,
  },
  description: {
    fontSize: typography.caption,
    fontWeight: fontWeight.regular,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
