/**
 * Home Screen — Main landing screen
 * Composes: Header → FeaturedEventBanner → UpcomingEventsSection
 *           → FeaturedAthletesSection → LatestNewsSection
 *
 * Featured + upcoming events are loaded from Supabase. Athletes and
 * news still use mock data until their services are wired up.
 */
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, fontWeight } from '../../src/constants/theme';

import Header from '../../src/components/common/Header';
import FeaturedEventBanner from '../../src/components/home/FeaturedEventBanner';
import UpcomingEventsSection from '../../src/components/home/UpcomingEventsSection';
import FeaturedAthletesSection from '../../src/components/home/FeaturedAthletesSection';
import LatestNewsSection from '../../src/components/home/LatestNewsSection';

import { featuredAthletes, latestNews } from '../../src/data/mockData';
import {
  getFeaturedEvent,
  listUpcomingEvents,
} from '../../src/services/eventsService';
import type { Event } from '../../src/types/types';

export default function HomeScreen() {
  const router = useRouter();
  const [featured, setFeatured] = useState<Event | null>(null);
  const [upcoming, setUpcoming] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState<boolean>(true);
  const [eventsError, setEventsError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoadingEvents(true);
      setEventsError(null);
      try {
        const [featuredData, upcomingData] = await Promise.all([
          getFeaturedEvent(),
          listUpcomingEvents(),
        ]);
        if (!mounted) return;
        const fallbackFeatured =
          featuredData ?? upcomingData[0] ?? null;
        setFeatured(fallbackFeatured);
        setUpcoming(
          fallbackFeatured
            ? upcomingData.filter((e) => e.id !== fallbackFeatured.id)
            : upcomingData,
        );
      } catch (err) {
        if (!mounted) return;
        const message =
          err instanceof Error ? err.message : 'Failed to load events.';
        setEventsError(message);
      } finally {
        if (mounted) setLoadingEvents(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        {loadingEvents ? (
          <View style={styles.heroPlaceholder}>
            <ActivityIndicator size="large" color={colors.gold} />
          </View>
        ) : eventsError ? (
          <View style={styles.heroPlaceholder}>
            <Text style={styles.heroPlaceholderText}>{eventsError}</Text>
          </View>
        ) : featured ? (
          <FeaturedEventBanner
            event={featured}
            onPress={() => router.push(`/event/${featured.id}` as const)}
          />
        ) : (
          <View style={styles.heroPlaceholder}>
            <Text style={styles.heroPlaceholderText}>
              No upcoming events yet.
            </Text>
          </View>
        )}

        {/* Upcoming Events */}
        {!loadingEvents && !eventsError && upcoming.length > 0 && (
          <UpcomingEventsSection
            events={upcoming}
            onEventPress={(event) =>
              router.push(`/event/${event.id}` as const)
            }
          />
        )}

        {/* Divider */}
        <View style={styles.divider} />

        {/* Featured Athletes */}
        <FeaturedAthletesSection athletes={featuredAthletes} />

        {/* Divider */}
        <View style={styles.divider} />

        {/* Latest News */}
        <LatestNewsSection articles={latestNews} />

        <View style={styles.bottomPadding} />
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
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  bottomPadding: {
    height: spacing.xxxl,
  },
  heroPlaceholder: {
    height: 240,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  heroPlaceholderText: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.medium,
    color: colors.muted,
    textAlign: 'center',
  },
});
