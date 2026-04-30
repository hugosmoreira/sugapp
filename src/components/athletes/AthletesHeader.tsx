/**
 * AthletesHeader — Top header: menu, "ATHLETES", notification bell
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight } from '../../constants/theme';

export default function AthletesHeader() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
        <Ionicons name="menu" size={24} color={colors.textPrimary} />
      </TouchableOpacity>

      <Text style={styles.title}>ATHLETES</Text>

      <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
        <Ionicons name="notifications-outline" size={22} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.h3,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: 2,
  },
});
