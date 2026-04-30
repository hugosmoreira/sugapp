/**
 * Schedule Test Route — standalone view
 */
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, fontWeight } from '../src/constants/theme';
import ScheduleScreen from '../src/components/schedule/ScheduleScreen';
import { scheduleData } from '../src/data/mockData';

export default function ScheduleRoute() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const data = scheduleData['evts-001'];

  if (!data) {
    return (
      <View style={[styles.screen, styles.center, { paddingTop: insets.top }]}>
        <Text style={styles.notFoundText}>Schedule not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.backLinkText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScheduleScreen data={data} standalone />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
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
});
