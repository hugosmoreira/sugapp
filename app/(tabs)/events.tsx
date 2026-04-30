/**
 * Events Screen
 *
 * Displays upcoming and past grappling events with a
 * segmented tab switcher and premium event cards.
 *
 * Data is fetched live from Supabase via `eventsService`.
 */
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight, radius } from '../../src/constants/theme';

import EventsTabs, { type EventsTabValue } from '../../src/components/events/EventsTabs';
import EventsList from '../../src/components/events/EventsList';
import {
  listPastEvents,
  listUpcomingEvents,
} from '../../src/services/eventsService';
import type { Event } from '../../src/types/types';

export default function EventsScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<EventsTabValue>('Upcoming');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async (tab: EventsTabValue) => {
    setLoading(true);
    setError(null);
    try {
      const data =
        tab === 'Upcoming' ? await listUpcomingEvents() : await listPastEvents();
      setEvents(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load events.';
      setError(message);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents(activeTab);
  }, [activeTab, fetchEvents]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} activeOpacity={0.7}>
          <Ionicons name="menu" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>EVENTS</Text>

        <TouchableOpacity style={styles.headerIcon} activeOpacity={0.7}>
          <Ionicons name="person-outline" size={22} color={colors.gold} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <EventsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      {loading ? (
        <View style={styles.stateContainer}>
          <ActivityIndicator size="large" color={colors.gold} />
          <Text style={styles.stateText}>Loading events…</Text>
        </View>
      ) : error ? (
        <View style={styles.stateContainer}>
          <Ionicons name="alert-circle-outline" size={36} color={colors.gold} />
          <Text style={styles.stateText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => fetchEvents(activeTab)}
            activeOpacity={0.8}
          >
            <Text style={styles.retryText}>RETRY</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <EventsList events={events} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: typography.body,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: 2,
  },
  stateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  stateText: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.medium,
    color: colors.muted,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.gold,
  },
  retryText: {
    fontSize: typography.caption,
    fontWeight: fontWeight.bold,
    color: colors.gold,
    letterSpacing: 1.5,
  },
});
