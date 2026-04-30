/**
 * EventTimeline — Vertical timeline of schedule items
 * Renders connecting line + circular icons + cards
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, fontWeight } from '../../constants/theme';
import { ScheduleItem } from '../../types/types';
import TimelineIcon from './TimelineIcon';
import TimelineItemCard from './TimelineItemCard';

interface EventTimelineProps {
  items: ScheduleItem[];
}

export default function EventTimeline({ items }: EventTimelineProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>EVENT TIMELINE</Text>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <View key={item.id} style={styles.row}>
            {/* Left column: icon + connecting line */}
            <View style={styles.iconColumn}>
              <TimelineIcon iconType={item.iconType} status={item.status} />
              {!isLast && <View style={styles.connector} />}
            </View>

            {/* Right column: card */}
            <View style={styles.cardColumn}>
              <TimelineItemCard item={item} />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  heading: {
    fontSize: typography.caption,
    fontWeight: fontWeight.bold,
    color: colors.textSecondary,
    letterSpacing: 3,
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconColumn: {
    width: 40,
    alignItems: 'center',
    marginRight: spacing.md,
  },
  connector: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  cardColumn: {
    flex: 1,
    marginBottom: spacing.lg,
  },
});
