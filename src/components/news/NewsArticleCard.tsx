/**
 * NewsArticleCard — Standard article card with image, category, title, date, summary
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';
import { NewsArticle } from '../../types/types';

interface NewsArticleCardProps {
  article: NewsArticle;
  onPress?: () => void;
}

export default function NewsArticleCard({ article, onPress }: NewsArticleCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      {/* Image */}
      <Image
        source={typeof article.image === 'number' ? article.image : { uri: article.image }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />

      {/* Category */}
      <Text style={styles.category}>{article.category.toUpperCase()}</Text>

      {/* Title */}
      <Text style={styles.title}>{article.title}</Text>

      {/* Date */}
      <Text style={styles.date}>{article.date || article.publishedAt}</Text>

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
    marginBottom: spacing.xxl,
    gap: spacing.sm,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    marginBottom: spacing.xs,
  },
  category: {
    fontSize: typography.micro,
    fontWeight: fontWeight.bold,
    color: colors.gold,
    letterSpacing: 1,
  },
  title: {
    fontSize: typography.body,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  date: {
    fontSize: typography.caption,
    fontWeight: fontWeight.regular,
    color: colors.muted,
  },
  summary: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.regular,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
