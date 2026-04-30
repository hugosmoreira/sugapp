/**
 * Header — Top bar with settings icon, title, and search icon
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography, fontWeight } from '../../constants/theme';

export default function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
        <View style={styles.iconCircle}>
          <Ionicons name="settings-outline" size={18} color={colors.muted} />
        </View>
      </TouchableOpacity>

      <Text style={styles.title}>SUG GRAPPLING</Text>

      <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
        <Ionicons name="search" size={22} color={colors.gold} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.body,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: 2,
  },
});
