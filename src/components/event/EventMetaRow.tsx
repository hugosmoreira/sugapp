/**
 * EventMetaRow — Date, doors time, and Get Tickets button
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';
import { EventDetail } from '../../types/types';

interface EventMetaRowProps {
  event: EventDetail;
  onGetTickets?: () => void;
}

export default function EventMetaRow({ event, onGetTickets }: EventMetaRowProps) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <View style={styles.infoGroup}>
        <View style={styles.infoItem}>
          <Ionicons name="calendar-outline" size={15} color={colors.textSecondary} />
          <Text style={styles.infoText}>{formattedDate}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="time-outline" size={15} color={colors.textSecondary} />
          <Text style={styles.infoText}>Doors: {event.doorsTime}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.ticketButton}
        onPress={onGetTickets}
        activeOpacity={0.8}
      >
        <Text style={styles.ticketText}>Get Tickets</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  infoGroup: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  infoText: {
    fontSize: typography.caption,
    fontWeight: fontWeight.regular,
    color: colors.textSecondary,
  },
  ticketButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.gold,
    paddingVertical: spacing.sm - 1,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.sm,
  },
  ticketText: {
    fontSize: typography.caption,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
  },
});
