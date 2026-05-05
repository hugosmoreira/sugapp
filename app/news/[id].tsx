/**
 * News Article Detail — Dynamic route [id]
 *
 * Loads a single article from Supabase and renders the hero image,
 * category, title, body, author, and published date.
 */
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight, radius } from '../../src/constants/theme';

import NewsArticleHeader from '../../src/components/news/NewsArticleHeader';
import NewsHeroImage from '../../src/components/news/NewsHeroImage';
import ArticleMetaRow from '../../src/components/news/ArticleMetaRow';
import ArticleContent from '../../src/components/news/ArticleContent';
import { getArticleById } from '../../src/services/articlesService';
import { formatArticleDate } from '../../src/utils/formatDate';
import type { ArticleDetail } from '../../src/types/types';

export default function NewsArticleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticle = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getArticleById(id);
      setArticle(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load article.');
      setArticle(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  if (loading) {
    return (
      <View style={[styles.screen, styles.center, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.screen, styles.center, { paddingTop: insets.top }]}>
        <Ionicons name="alert-circle-outline" size={36} color={colors.gold} />
        <Text style={styles.notFoundText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchArticle}
          activeOpacity={0.8}
        >
          <Text style={styles.retryText}>RETRY</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
        <View style={{ paddingTop: insets.top }}>
          <NewsArticleHeader />
        </View>

        <NewsHeroImage image={article.heroImage} />

        <ArticleMetaRow
          category={article.category}
          title={article.title}
          author={article.author}
          date={formatArticleDate(article.date)}
          readTime={article.readTime}
        />

        <ArticleContent sections={article.sections} />

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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  notFoundText: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.medium,
    color: colors.muted,
    textAlign: 'center',
  },
  backLink: {
    marginTop: spacing.lg,
  },
  backLinkText: {
    fontSize: typography.bodySmall,
    color: colors.gold,
    fontWeight: fontWeight.semiBold,
  },
  retryButton: {
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.gold,
  },
  retryText: {
    fontSize: typography.caption,
    fontWeight: fontWeight.bold,
    color: colors.gold,
    letterSpacing: 1.5,
  },
  bottomSpacer: {
    height: spacing.xxxxl,
  },
});
