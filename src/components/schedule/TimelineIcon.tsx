/**
 * TimelineIcon — Circular icon for the vertical timeline
 * Uses Ionicons mapped from ScheduleIconType
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../constants/theme';
import { ScheduleIconType, ScheduleStatus } from '../../types/types';

const ICON_MAP: Record<ScheduleIconType, string> = {
  trophy: 'trophy',
  swords: 'infinite',
  timer: 'timer-outline',
  flag: 'flag',
};

const ICON_SIZE = 40;

interface TimelineIconProps {
  iconType: ScheduleIconType;
  status: ScheduleStatus;
}

export default function TimelineIcon({ iconType, status }: TimelineIconProps) {
  const isFinished = status === 'finished';
  const iconName = ICON_MAP[iconType] || 'ellipse';

  return (
    <View style={[styles.container, isFinished && styles.containerFinished]}>
      <Ionicons
        name={iconName as any}
        size={18}
        color={isFinished ? colors.muted : colors.gold}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    borderWidth: 2,
    borderColor: colors.gold,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  containerFinished: {
    borderColor: colors.muted,
    backgroundColor: colors.surface,
  },
});
