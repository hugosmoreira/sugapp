/**
 * Athletes Screen — Grid of athlete cards with search and filter
 *
 * Pulls athletes from Supabase via athletesService. Falls back to a
 * clearly-labeled mock preview only when the Supabase table is missing
 * (relation does not exist). Otherwise shows real loading / error / empty.
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  colors,
  spacing,
  typography,
  fontWeight,
  radius,
} from '../../src/constants/theme';

import AthletesHeader from '../../src/components/athletes/AthletesHeader';
import AthletesSearch from '../../src/components/athletes/AthletesSearch';
import AthletesFilters, {
  type AthleteFilterValue,
} from '../../src/components/athletes/AthletesFilters';
import AthletesGrid from '../../src/components/athletes/AthletesGrid';
import { listAthletes } from '../../src/services/athletesService';
import type { Athlete } from '../../src/types/types';

export default function AthletesScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<AthleteFilterValue>('all');
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAthletes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listAthletes();
      setAthletes(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load athletes.';
      setError(message);
      setAthletes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAthletes();
  }, [fetchAthletes]);

  const filteredAthletes = useMemo(() => {
    let result = athletes;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          (a.weightClass && a.weightClass.toLowerCase().includes(q)),
      );
    }

    if (filter !== 'all') {
      result = result.filter(
        (a) => a.category === filter || a.category === 'all',
      );
    }

    return result;
  }, [athletes, search, filter]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <AthletesHeader />
        <AthletesSearch value={search} onChangeText={setSearch} />
        <AthletesFilters active={filter} onFilterChange={setFilter} />

        {loading ? (
          <View style={styles.stateContainer}>
            <ActivityIndicator size="large" color={colors.gold} />
            <Text style={styles.stateText}>Loading athletes…</Text>
          </View>
        ) : error ? (
          <View style={styles.stateContainer}>
            <Ionicons name="alert-circle-outline" size={36} color={colors.gold} />
            <Text style={styles.stateText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={fetchAthletes}
              activeOpacity={0.8}
            >
              <Text style={styles.retryText}>RETRY</Text>
            </TouchableOpacity>
          </View>
        ) : filteredAthletes.length === 0 ? (
          <View style={styles.stateContainer}>
            <Text style={styles.stateText}>No athletes found.</Text>
          </View>
        ) : (
          <AthletesGrid athletes={filteredAthletes} />
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
  scroll: {
    flex: 1,
  },
  stateContainer: {
    paddingVertical: spacing.xxxxl,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
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
