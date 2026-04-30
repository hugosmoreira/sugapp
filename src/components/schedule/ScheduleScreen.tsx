/**
 * ScheduleScreen — Reusable event schedule screen component
 *
 * Renders header, category tabs, featured card, event timeline, and custom tab bar.
 * Supports standalone mode (own header + tab bar) or embedded tab mode.
 */
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight } from '../../constants/theme';
import { ScheduleEvent } from '../../types/types';

import ScheduleHeader from './ScheduleHeader';
import ScheduleTabs, { type ScheduleTabValue } from './ScheduleTabs';
import FeaturedScheduleCard from './FeaturedScheduleCard';
import EventTimeline from './EventTimeline';

interface ScheduleScreenProps {
  data: ScheduleEvent;
  /** If true renders its own header + custom tab bar. If false, omits them (tab mode). */
  standalone?: boolean;
}

const BOTTOM_TABS = [
  { key: 'home', label: 'HOME', icon: 'home-outline' as const, active: false },
  { key: 'schedule', label: 'SCHEDULE', icon: 'calendar' as const, active: true },
  { key: 'fighters', label: 'FIGHTERS', icon: 'people' as const, active: false },
  { key: 'profile', label: 'PROFILE', icon: 'person-outline' as const, active: false },
];

export default function ScheduleScreen({
  data,
  standalone = false,
}: ScheduleScreenProps) {
  const [activeTab, setActiveTab] = useState<ScheduleTabValue>('MAIN CARD');

  const getTimelineItems = () => {
    switch (activeTab) {
      case 'MAIN CARD':
        return data.mainCard;
      case 'PRELIMS':
        return data.prelims;
      case 'GRAPPLING':
        return data.grappling;
      default:
        return data.mainCard;
    }
  };

  const items = getTimelineItems();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header (standalone only) */}
        {standalone && (
          <ScheduleHeader
            title={data.eventTitle}
            subtitle={data.eventSubtitle}
          />
        )}

        {/* Category tabs */}
        <ScheduleTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Featured card (only on MAIN CARD tab) */}
        {activeTab === 'MAIN CARD' && (
          <FeaturedScheduleCard
            image={data.heroImage}
            title={data.heroTitle}
            subtitle={data.heroSubtitle}
          />
        )}

        {/* Timeline */}
        <EventTimeline items={items} />

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Custom bottom tab bar (standalone only) */}
      {standalone && (
        <View style={styles.customTabBar}>
          {BOTTOM_TABS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={styles.customTab}
              activeOpacity={0.7}
            >
              <Ionicons
                name={tab.icon as any}
                size={22}
                color={tab.active ? colors.gold : colors.muted}
              />
              <Text
                style={[
                  styles.customTabLabel,
                  tab.active && styles.customTabLabelActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  bottomSpacer: {
    height: spacing.xxxl,
  },
  customTabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: spacing.sm,
    paddingTop: spacing.sm,
  },
  customTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
  },
  customTabLabel: {
    fontSize: typography.micro,
    fontWeight: fontWeight.semiBold,
    color: colors.muted,
    letterSpacing: 0.5,
  },
  customTabLabelActive: {
    color: colors.gold,
  },
});
