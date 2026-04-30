/**
 * News Article Detail — Dynamic route [id]
 *
 * Full-screen editorial article with hero image, category badge,
 * structured content (paragraphs, headings, quotes, inline images), and tags.
 */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography, fontWeight } from '../../src/constants/theme';

import NewsArticleHeader from '../../src/components/news/NewsArticleHeader';
import NewsHeroImage from '../../src/components/news/NewsHeroImage';
import ArticleMetaRow from '../../src/components/news/ArticleMetaRow';
import ArticleContent from '../../src/components/news/ArticleContent';
import ArticleTags from '../../src/components/news/ArticleTags';
import { articleDetails } from '../../src/data/mockData';

export default function NewsArticleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const article = articleDetails[id ?? ''];

  if (!article) {
    return (
      <View style={[styles.screen, styles.center, { paddingTop: insets.top }]}>
        <Text style={styles.notFoundText}>Article not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.backLinkText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header */}
        <View style={{ paddingTop: insets.top }}>
          <NewsArticleHeader />
        </View>

        {/* Hero image */}
        <NewsHeroImage image={article.heroImage} />

        {/* Meta: badge, title, author */}
        <ArticleMetaRow
          category={article.category}
          title={article.title}
          author={article.author}
          date={article.date}
          readTime={article.readTime}
        />

        {/* Structured content */}
        <ArticleContent sections={article.sections} />

        {/* Tags */}
        <ArticleTags tags={article.tags} />

        {/* Bottom spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: typography.h3,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  backLink: {
    marginTop: spacing.lg,
  },
  backLinkText: {
    fontSize: typography.bodySmall,
    color: colors.gold,
    fontWeight: fontWeight.semiBold,
  },
  bottomSpacer: {
    height: spacing.xxxxl,
  },
});
