/**
 * FeaturedNewsCard — Large featured article card with image, FEATURED badge, title, excerpt
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';
import { NewsArticle } from '../../types/types';
import { formatArticleDate } from '../../utils/formatDate';

interface FeaturedNewsCardProps {
  article: NewsArticle;
  onPress?: () => void;
}

export default function FeaturedNewsCard({ article, onPress }: FeaturedNewsCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage =
    typeof article.image === 'number' ||
    (typeof article.image === 'string' && article.image.trim().length > 0);
  const showPlaceholder = !hasImage || imageFailed;
  const formattedDate = formatArticleDate(article.publishedAt || article.date);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      {showPlaceholder ? (
        <View style={[styles.image, styles.placeholder]}>
          <Ionicons name="image-outline" size={40} color={colors.muted} />
        </View>
      ) : (
        <Image
          source={typeof article.image === 'number' ? article.image : { uri: article.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
          onError={() => setImageFailed(true)}
        />
      )}

      <View style={styles.metaRow}>
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>FEATURED</Text>
        </View>
        {formattedDate ? <Text style={styles.date}>{formattedDate}</Text> : null}
      </View>

      <Text style={styles.title}>{article.title}</Text>

      {article.excerpt ? (
        <Text style={styles.excerpt} numberOfLines={3}>
          {article.excerpt}
        </Text>
      ) : null}
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
    height: 220,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
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
  excerpt: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.regular,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
