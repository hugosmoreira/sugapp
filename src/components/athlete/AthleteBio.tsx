/**
 * AthleteBio — Bio section with heading and paragraph
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight } from '../../constants/theme';

interface AthleteBioProps {
  bio: string;
}

export default function AthleteBio({ bio }: AthleteBioProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headingRow}>
        <Ionicons name="document-text-outline" size={18} color={colors.textPrimary} />
        <Text style={styles.heading}>Bio</Text>
      </View>
      <Text style={styles.body}>{bio}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.md,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  heading: {
    fontSize: typography.h3,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  body: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.regular,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
