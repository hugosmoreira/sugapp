/**
 * News Screen — Editorial news feed with featured article and category tabs
 */
import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '../../src/constants/theme';

import NewsHeader from '../../src/components/news/NewsHeader';
import NewsCategoryTabs, { type NewsCategoryTabValue } from '../../src/components/news/NewsCategoryTabs';
import FeaturedNewsCard from '../../src/components/news/FeaturedNewsCard';
import NewsArticleCard from '../../src/components/news/NewsArticleCard';
import { newsFeed } from '../../src/data/mockData';

export default function NewsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<NewsCategoryTabValue>('All News');

  const filteredArticles = useMemo(() => {
    if (activeTab === 'All News') return newsFeed;
    return newsFeed.filter((a) => a.category === activeTab);
  }, [activeTab]);

  const featuredArticle = filteredArticles.find((a) => a.featured);
  const standardArticles = filteredArticles.filter((a) => !a.featured);

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

        {/* Featured article */}
        {featuredArticle && (
          <FeaturedNewsCard
            article={featuredArticle}
            onPress={() => navigateToArticle(featuredArticle.id)}
          />
        )}

        {/* Standard articles */}
        {standardArticles.map((article) => (
          <NewsArticleCard
            key={article.id}
            article={article}
            onPress={() => navigateToArticle(article.id)}
          />
        ))}
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
});
