/**
 * NewsCard — Horizontal news list item with thumbnail and text
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';
import { NewsArticle } from '../../types/types';
import { formatArticleDate } from '../../utils/formatDate';

interface NewsCardProps {
  article: NewsArticle;
  onPress?: () => void;
}

const THUMBNAIL_SIZE = 72;

export default function NewsCard({ article, onPress }: NewsCardProps) {
  const [failed, setFailed] = useState(false);
  const hasImage =
    typeof article.image === 'number' ||
    (typeof article.image === 'string' && article.image.trim().length > 0);
  const showPlaceholder = !hasImage || failed;
  const formatted =
    formatArticleDate(article.publishedAt) || article.publishedAt;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {showPlaceholder ? (
        <View style={[styles.thumbnail, styles.placeholder]}>
          <Ionicons name="image-outline" size={24} color={colors.muted} />
        </View>
      ) : (
        <Image
          source={typeof article.image === 'number' ? article.image : { uri: article.image }}
          style={styles.thumbnail}
          contentFit="cover"
          transition={200}
          onError={() => setFailed(true)}
        />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.category}>{article.category}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        {formatted ? <Text style={styles.time}>{formatted}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
    alignItems: 'center',
  },
  thumbnail: {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  category: {
    fontSize: typography.micro,
    fontWeight: fontWeight.bold,
    color: colors.gold,
    letterSpacing: 1,
  },
  title: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  time: {
    fontSize: typography.micro,
    fontWeight: fontWeight.regular,
    color: colors.textSecondary,
  },
});
