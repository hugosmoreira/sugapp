/**
 * UpcomingFightCard — Card showing the athlete's next scheduled fight
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';
import { UpcomingFight } from '../../types/types';

interface UpcomingFightCardProps {
  fight: UpcomingFight;
  onTickets?: () => void;
}

export default function UpcomingFightCard({ fight, onTickets }: UpcomingFightCardProps) {
  return (
    <View style={styles.section}>
      <View style={styles.headingRow}>
        <Ionicons name="flame-outline" size={18} color={colors.textPrimary} />
        <Text style={styles.heading}>Upcoming Fights</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.eventName}>{fight.event}</Text>
        <View style={styles.fightRow}>
          <View style={styles.fightInfo}>
            <Text style={styles.opponent}>{fight.opponent}</Text>
            <Text style={styles.details}>
              {fight.date} • {fight.location}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.ticketBtn}
            onPress={onTickets}
            activeOpacity={0.8}
          >
            <Text style={styles.ticketText}>TICKETS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.md,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  heading: {
    fontSize: typography.h3,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  eventName: {
    fontSize: typography.micro,
    fontWeight: fontWeight.bold,
    color: colors.gold,
    letterSpacing: 1,
  },
  fightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fightInfo: {
    flex: 1,
    gap: spacing.xs,
    marginRight: spacing.md,
  },
  opponent: {
    fontSize: typography.body,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  details: {
    fontSize: typography.caption,
    fontWeight: fontWeight.regular,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  ticketBtn: {
    backgroundColor: colors.gold,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.sm,
  },
  ticketText: {
    fontSize: typography.micro,
    fontWeight: fontWeight.bold,
    color: colors.background,
    letterSpacing: 0.5,
  },
});
