/**
 * Event Detail Screen — Dynamic route [id]
 *
 * Full-screen event detail with hero, meta, tabs, and tab content.
 * Currently shows Overview tab; other tabs are placeholders.
 */
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight, radius } from '../../src/constants/theme';

import EventHero from '../../src/components/event/EventHero';
import EventMetaRow from '../../src/components/event/EventMetaRow';
import EventTabs, { type EventTabValue } from '../../src/components/event/EventTabs';
import EventOverviewTab from '../../src/components/event/EventOverviewTab';
import FightCardScreen from '../../src/components/fight-card/FightCardScreen';
import ScheduleScreen from '../../src/components/schedule/ScheduleScreen';
import { fightCardData, scheduleData } from '../../src/data/mockData';
import {
  getEventById,
  type EventDetailWithExtras,
} from '../../src/services/eventsService';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<EventTabValue>('Overview');
  const [event, setEvent] = useState<EventDetailWithExtras | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = useCallback(async () => {
    if (!id) {
      setLoading(false);
      setError('Invalid event id.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getEventById(id);
      setEvent(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load event.';
      setError(message);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const handlePurchaseTickets = useCallback(() => {
    if (event?.ticketUrl) {
      Linking.openURL(event.ticketUrl).catch(() => {});
    }
  }, [event?.ticketUrl]);

  if (loading) {
    return (
      <View style={[styles.screen, styles.center, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color={colors.gold} />
        <Text style={styles.stateText}>Loading event…</Text>
      </View>
    );
  }

  if (error || !event) {
    return (
      <View style={[styles.screen, styles.center, { paddingTop: insets.top }]}>
        <Text style={styles.notFoundText}>
          {error ?? 'Event not found'}
        </Text>
        <TouchableOpacity
          onPress={error ? fetchEvent : () => router.back()}
          style={styles.backLink}
        >
          <Text style={styles.backLinkText}>
            {error ? 'RETRY' : 'Go back'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const eventId = id ?? '';

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Hero */}
        <EventHero event={event} />

        {/* Header overlay (absolute over hero) */}
        <View style={[styles.headerOverlay, { paddingTop: insets.top + spacing.xs }]}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Event Details</Text>
          <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
            <Ionicons name="share-outline" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Meta row */}
        <EventMetaRow event={event} />

        {/* Tabs */}
        <EventTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab content */}
        {activeTab === 'Overview' && (
          <EventOverviewTab
            event={event}
            onPurchaseTickets={handlePurchaseTickets}
          />
        )}
        {activeTab === 'Fight Card' && fightCardData[eventId] && (
          <FightCardScreen data={fightCardData[eventId]} />
        )}
        {activeTab === 'Fight Card' && !fightCardData[eventId] && (
          <View style={styles.placeholderTab}>
            <Text style={styles.placeholderText}>Fight Card — Coming Soon</Text>
          </View>
        )}
        {activeTab === 'Schedule' && scheduleData[eventId] && (
          <ScheduleScreen data={scheduleData[eventId]} />
        )}
        {activeTab === 'Schedule' && !scheduleData[eventId] && (
          <View style={styles.placeholderTab}>
            <Text style={styles.placeholderText}>Schedule — Coming Soon</Text>
          </View>
        )}
        {activeTab === 'Athletes' && (
          <View style={styles.placeholderTab}>
            <Text style={styles.placeholderText}>Athletes — Coming Soon</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  stateText: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.medium,
    color: colors.muted,
  },
  // Header overlay
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    zIndex: 10,
  },
  headerBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
  },
  // Not found
  notFoundText: {
    fontSize: typography.h3,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  backLink: {
    marginTop: spacing.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.gold,
  },
  backLinkText: {
    fontSize: typography.caption,
    color: colors.gold,
    fontWeight: fontWeight.bold,
    letterSpacing: 1.5,
  },
  // Placeholder tabs
  placeholderTab: {
    paddingVertical: spacing.xxxxl * 2,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: typography.body,
    fontWeight: fontWeight.medium,
    color: colors.muted,
  },
});
