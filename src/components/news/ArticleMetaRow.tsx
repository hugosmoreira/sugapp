/**
 * ArticleMetaRow — Category badge, title, author info, date, read time
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';
import { AuthorInfo } from '../../types/types';

interface ArticleMetaRowProps {
  category: string;
  title: string;
  author: AuthorInfo;
  date: string;
  readTime: string;
}

export default function ArticleMetaRow({
  category,
  title,
  author,
  date,
  readTime,
}: ArticleMetaRowProps) {
  return (
    <View style={styles.container}>
      {/* Category badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{category}</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Author row */}
      <View style={styles.authorRow}>
        <Image
          source={typeof author.avatar === 'number' ? author.avatar : { uri: author.avatar }}
          style={styles.authorAvatar}
          contentFit="cover"
        />
        <View style={styles.authorInfo}>
          <View style={styles.authorNameRow}>
            <Text style={styles.authorName}>{author.name}</Text>
            <Text style={styles.dateRight}>{date}</Text>
          </View>
          <View style={styles.authorNameRow}>
            <Text style={styles.authorRole}>{author.role}</Text>
            <Text style={styles.readTime}>{readTime}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.gold,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm / 2,
  },
  badgeText: {
    fontSize: typography.micro - 1,
    fontWeight: fontWeight.bold,
    color: colors.background,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: typography.h2,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    lineHeight: 30,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
  },
  authorInfo: {
    flex: 1,
    gap: 2,
  },
  authorNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorName: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
  },
  authorRole: {
    fontSize: typography.caption,
    fontWeight: fontWeight.regular,
    color: colors.textSecondary,
  },
  dateRight: {
    fontSize: typography.caption,
    fontWeight: fontWeight.regular,
    color: colors.muted,
  },
  readTime: {
    fontSize: typography.caption,
    fontWeight: fontWeight.regular,
    color: colors.muted,
  },
});
