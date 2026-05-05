/**
 * NewsArticleCard — Standard article card with image, category, title, date, excerpt
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';
import { NewsArticle } from '../../types/types';
import { formatArticleDate } from '../../utils/formatDate';

interface NewsArticleCardProps {
  article: NewsArticle;
  onPress?: () => void;
}

export default function NewsArticleCard({ article, onPress }: NewsArticleCardProps) {
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
          <Ionicons name="image-outline" size={32} color={colors.muted} />
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

      <Text style={styles.category}>{article.category.toUpperCase()}</Text>

      <Text style={styles.title}>{article.title}</Text>

      {formattedDate ? <Text style={styles.date}>{formattedDate}</Text> : null}

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
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
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
  excerpt: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.regular,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
