/**
 * VenueCard — Rounded info card with venue name, address, and capacity note
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';

interface VenueCardProps {
  name: string;
  address: string;
  note?: string;
}

export default function VenueCard({ name, address, note }: VenueCardProps) {
  return (
    <View style={styles.card}>
      {/* Venue icon + info */}
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Ionicons name="business" size={20} color={colors.gold} />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
      </View>

      {/* Note row */}
      {note && (
        <View style={styles.noteRow}>
          <Ionicons name="information-circle-outline" size={16} color={colors.gold} />
          <Text style={styles.noteText}>{note}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  address: {
    fontSize: typography.caption,
    fontWeight: fontWeight.regular,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  noteText: {
    flex: 1,
    fontSize: typography.caption,
    fontWeight: fontWeight.regular,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
