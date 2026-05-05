/**
 * Athlete Profile Screen — Dynamic route [id]
 *
 * Loads the athlete by Supabase id and renders avatar, name, weight class,
 * rank, record, and status. Sections without backing data are omitted.
 */
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight, radius } from '../../src/constants/theme';

import AthleteProfileHeader from '../../src/components/athlete/AthleteProfileHeader';
import { getAthleteById } from '../../src/services/athletesService';
import type { AthleteProfile } from '../../src/types/types';

interface StatTile {
  label: string;
  value: string;
}

function buildStatTiles(athlete: AthleteProfile): StatTile[] {
  const tiles: StatTile[] = [];
  if (athlete.rank !== undefined) {
    tiles.push({ label: 'RANK', value: `#${athlete.rank}` });
  }
  if (athlete.record) {
    tiles.push({ label: 'RECORD', value: athlete.record });
  }
  if (athlete.status) {
    tiles.push({ label: 'STATUS', value: athlete.status.toUpperCase() });
  }
  return tiles;
}

export default function AthleteProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [athlete, setAthlete] = useState<AthleteProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAthlete = useCallback(async () => {
    if (!id) {
      setError('Missing athlete id');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getAthleteById(id);
      setAthlete(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load athlete.');
      setAthlete(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAthlete();
  }, [fetchAthlete]);

  if (loading) {
    return (
      <View style={[styles.screen, styles.center, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.screen, styles.center, { paddingTop: insets.top }]}>
        <Ionicons name="alert-circle-outline" size={36} color={colors.gold} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchAthlete}
          activeOpacity={0.8}
        >
          <Text style={styles.retryText}>RETRY</Text>
        </TouchableOpacity>
      </View>
    );
  }

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

  const tiles = buildStatTiles(athlete);

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
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

        <AthleteProfileHeader athlete={athlete} />

        {tiles.length > 0 && (
          <View style={styles.tileRow}>
            {tiles.map((tile) => (
              <View key={tile.label} style={styles.tile}>
                <Text style={styles.tileValue}>{tile.value}</Text>
                <Text style={styles.tileLabel}>{tile.label}</Text>
              </View>
            ))}
          </View>
        )}

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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
  },
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
  notFoundText: {
    fontSize: typography.h3,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  errorText: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.medium,
    color: colors.muted,
    textAlign: 'center',
  },
  backLink: {
    marginTop: spacing.lg,
  },
  backLinkText: {
    fontSize: typography.bodySmall,
    color: colors.gold,
    fontWeight: fontWeight.semiBold,
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
  tileRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  tile: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    gap: spacing.xs,
  },
  tileValue: {
    fontSize: typography.h3,
    fontWeight: fontWeight.bold,
    color: colors.gold,
  },
  tileLabel: {
    fontSize: typography.micro,
    fontWeight: fontWeight.semiBold,
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  bottomSpacer: {
    height: spacing.xxxxl,
  },
});
