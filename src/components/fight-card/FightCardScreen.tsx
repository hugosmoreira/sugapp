/**
 * FightCardScreen — Reusable fight card screen component
 *
 * Renders header, hero, main card matchups, preliminaries, and custom tab bar.
 * Can be used as a standalone screen or embedded as a tab in Event Detail.
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight } from '../../constants/theme';
import { FightCardEvent } from '../../types/types';

import FightCardHeader from './FightCardHeader';
import FightCardHero from './FightCardHero';
import MainCardSection from './MainCardSection';
import PreliminariesSection from './PreliminariesSection';

interface FightCardScreenProps {
  data: FightCardEvent;
  /** If true, renders its own header (standalone mode). If false, omits it (tab mode). */
  standalone?: boolean;
}

// Custom bottom tab config
const BOTTOM_TABS = [
  { key: 'fights', label: 'FIGHTS', icon: 'trophy' as const, active: true },
  { key: 'tickets', label: 'TICKETS', icon: 'ticket' as const, active: false },
  { key: 'rankings', label: 'RANKINGS', icon: 'bar-chart' as const, active: false },
  { key: 'profile', label: 'PROFILE', icon: 'person' as const, active: false },
];

export default function FightCardScreen({
  data,
  standalone = false,
}: FightCardScreenProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header (standalone only) */}
        {standalone && (
          <FightCardHeader
            title={data.eventTitle}
            subtitle={data.eventSubtitle}
          />
        )}

        {/* Hero banner */}
        <FightCardHero
          image={data.heroImage}
          title={data.heroTitle}
          subtitle={data.heroSubtitle}
        />

        {/* Main card */}
        <MainCardSection matchups={data.mainCard} />

        {/* Prelims */}
        <PreliminariesSection fights={data.preliminaries} />

        {/* Bottom spacing */}
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
  // Custom tab bar
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
