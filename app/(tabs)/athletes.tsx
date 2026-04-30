/**
 * Athletes Screen — Grid of athlete cards with search and filter
 */
import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../src/constants/theme';

import AthletesHeader from '../../src/components/athletes/AthletesHeader';
import AthletesSearch from '../../src/components/athletes/AthletesSearch';
import AthletesFilters, { type AthleteFilterValue } from '../../src/components/athletes/AthletesFilters';
import AthletesGrid from '../../src/components/athletes/AthletesGrid';
import { athletesGrid } from '../../src/data/mockData';

export default function AthletesScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<AthleteFilterValue>('all');

  const filteredAthletes = useMemo(() => {
    let result = athletesGrid;

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          (a.academy && a.academy.toLowerCase().includes(q)) ||
          (a.country && a.country.toLowerCase().includes(q)),
      );
    }

    // Category filter
    if (filter !== 'all') {
      result = result.filter(
        (a) => a.category === filter || a.category === 'all',
      );
    }

    return result;
  }, [search, filter]);

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
        <AthletesGrid athletes={filteredAthletes} />
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
});
