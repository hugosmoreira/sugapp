/**
 * News Screen — Editorial news feed with featured article and category tabs
 *
 * Pulls published articles from Supabase via articlesService. No mock
 * fallback: when there are no rows, renders an empty state.
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  colors,
  spacing,
  typography,
  fontWeight,
  radius,
} from '../../src/constants/theme';

import NewsHeader from '../../src/components/news/NewsHeader';
import NewsCategoryTabs, {
  type NewsCategoryTabValue,
} from '../../src/components/news/NewsCategoryTabs';
import FeaturedNewsCard from '../../src/components/news/FeaturedNewsCard';
import NewsArticleCard from '../../src/components/news/NewsArticleCard';
import { listArticles } from '../../src/services/articlesService';
import type { NewsArticle } from '../../src/types/types';

function pickFeatured(articles: NewsArticle[]): NewsArticle | undefined {
  if (articles.length === 0) return undefined;
  const flagged = articles.find((a) => a.featured === true);
  if (flagged) return flagged;
  // Fallback: newest by publishedAt (already sorted desc by service).
  return articles[0];
}

export default function NewsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<NewsCategoryTabValue>('All News');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listArticles();
      setArticles(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load articles.';
      setError(message);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const filteredArticles = useMemo(() => {
    if (activeTab === 'All News') return articles;
    return articles.filter((a) => a.category === activeTab);
  }, [articles, activeTab]);

  const featuredArticle = pickFeatured(filteredArticles);
  const standardArticles = filteredArticles.filter(
    (a) => a.id !== featuredArticle?.id,
  );

  const navigateToArticle = (id: string) => {
    router.push(`/news/${id}` as const);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <NewsHeader />
        <NewsCategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {loading ? (
          <View style={styles.stateContainer}>
            <ActivityIndicator size="large" color={colors.gold} />
            <Text style={styles.stateText}>Loading articles…</Text>
          </View>
        ) : error ? (
          <View style={styles.stateContainer}>
            <Ionicons name="alert-circle-outline" size={36} color={colors.gold} />
            <Text style={styles.stateText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={fetchArticles}
              activeOpacity={0.8}
            >
              <Text style={styles.retryText}>RETRY</Text>
            </TouchableOpacity>
          </View>
        ) : filteredArticles.length === 0 ? (
          <View style={styles.stateContainer}>
            <Ionicons name="newspaper-outline" size={36} color={colors.muted} />
            <Text style={styles.stateText}>No articles available yet.</Text>
          </View>
        ) : (
          <>
            {featuredArticle && (
              <FeaturedNewsCard
                article={featuredArticle}
                onPress={() => navigateToArticle(featuredArticle.id)}
              />
            )}

            {standardArticles.map((article) => (
              <NewsArticleCard
                key={article.id}
                article={article}
                onPress={() => navigateToArticle(article.id)}
              />
            ))}
          </>
        )}
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
  stateContainer: {
    paddingVertical: spacing.xxxxl,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
  },
  stateText: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.medium,
    color: colors.muted,
    textAlign: 'center',
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
});
