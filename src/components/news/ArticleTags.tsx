/**
 * ArticleTags — Pill-shaped tag buttons at bottom of article
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';

interface ArticleTagsProps {
  tags: string[];
}

export default function ArticleTags({ tags }: ArticleTagsProps) {
  return (
    <View style={styles.container}>
      {tags.map((tag) => (
        <View key={tag} style={styles.pill}>
          <Text style={styles.pillText}>{tag}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.sm,
  },
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.gold,
    backgroundColor: 'transparent',
  },
  pillText: {
    fontSize: typography.caption,
    fontWeight: fontWeight.semiBold,
    color: colors.gold,
  },
});
