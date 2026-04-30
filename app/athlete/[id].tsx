/**
 * Athlete Profile Screen — Dynamic route [id]
 *
 * Full-screen athlete profile with avatar, stats, bio, upcoming fight,
 * past fights, and events participated carousel.
 */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight } from '../../src/constants/theme';

import AthleteProfileHeader from '../../src/components/athlete/AthleteProfileHeader';
import AthleteStats from '../../src/components/athlete/AthleteStats';
import AthleteBio from '../../src/components/athlete/AthleteBio';
import UpcomingFightCard from '../../src/components/athlete/UpcomingFightCard';
import PastFightRow from '../../src/components/athlete/PastFightRow';
import EventsParticipatedCarousel from '../../src/components/athlete/EventsParticipatedCarousel';
import { athleteProfiles } from '../../src/data/mockData';

export default function AthleteProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const athlete = athleteProfiles[id ?? ''];

  if (!athlete) {
    return (
      <View style={[styles.screen, styles.center, { paddingTop: insets.top }]}>
        <Text style={styles.notFoundText}>Athlete not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.backLinkText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + spacing.xs }]}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Athlete Profile</Text>
          <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
            <Ionicons name="share-outline" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Profile */}
        <AthleteProfileHeader athlete={athlete} />

        {/* Stats */}
        <AthleteStats stats={athlete.stats} />

        {/* Bio */}
        <AthleteBio bio={athlete.bio} />

        {/* Upcoming Fight */}
        {athlete.upcomingFight && (
          <UpcomingFightCard fight={athlete.upcomingFight} />
        )}

        {/* Past Fights */}
        <View style={styles.pastFightsSection}>
          <View style={styles.sectionHeadingRow}>
            <Ionicons name="time-outline" size={18} color={colors.textPrimary} />
            <Text style={styles.sectionHeading}>Past Fights</Text>
          </View>
          <View style={styles.pastFightsList}>
            {athlete.pastFights.map((fight) => (
              <PastFightRow key={fight.id} fight={fight} />
            ))}
          </View>
        </View>

        {/* Events Participated */}
        <EventsParticipatedCarousel events={athlete.eventsParticipated} />

        {/* Bottom spacer */}
        <View style={styles.bottomSpacer} />
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
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
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
  },
  backLink: {
    marginTop: spacing.lg,
  },
  backLinkText: {
    fontSize: typography.bodySmall,
    color: colors.gold,
    fontWeight: fontWeight.semiBold,
  },
  // Past Fights
  pastFightsSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.md,
  },
  sectionHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionHeading: {
    fontSize: typography.h3,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  pastFightsList: {
    gap: spacing.sm,
  },
  bottomSpacer: {
    height: spacing.xxxxl,
  },
});
