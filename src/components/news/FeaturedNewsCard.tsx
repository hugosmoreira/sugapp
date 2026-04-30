/**
 * FeaturedNewsCard — Large featured article card with image, FEATURED badge, title, summary
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';
import { NewsArticle } from '../../types/types';

interface FeaturedNewsCardProps {
  article: NewsArticle;
  onPress?: () => void;
}

export default function FeaturedNewsCard({ article, onPress }: FeaturedNewsCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      {/* Image */}
      <Image
        source={typeof article.image === 'number' ? article.image : { uri: article.image }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />

      {/* Meta row: FEATURED badge + date */}
      <View style={styles.metaRow}>
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>FEATURED</Text>
        </View>
        <Text style={styles.date}>{article.date || article.publishedAt}</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>{article.title}</Text>

      {/* Summary */}
      {article.summary && (
        <Text style={styles.summary} numberOfLines={2}>
          {article.summary}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  featuredBadge: {
    backgroundColor: colors.gold,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm / 2,
  },
  featuredText: {
    fontSize: typography.micro - 1,
    fontWeight: fontWeight.bold,
    color: colors.background,
    letterSpacing: 0.5,
  },
  date: {
    fontSize: typography.caption,
    fontWeight: fontWeight.regular,
    color: colors.muted,
  },
  title: {
    fontSize: typography.h3,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  summary: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.regular,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
