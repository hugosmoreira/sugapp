/**
 * LatestNewsSection — Vertical list of news cards
 */
import React from 'react';
import { View } from 'react-native';
import { NewsArticle } from '../../types/types';
import SectionHeader from '../common/SectionHeader';
import NewsCard from '../common/NewsCard';

interface LatestNewsSectionProps {
  articles: NewsArticle[];
  onArticlePress?: (article: NewsArticle) => void;
}

export default function LatestNewsSection({
  articles,
  onArticlePress,
}: LatestNewsSectionProps) {
  return (
    <View>
      <SectionHeader title="LATEST NEWS" />
      {articles.map((article) => (
        <NewsCard
          key={article.id}
          article={article}
          onPress={() => onArticlePress?.(article)}
        />
      ))}
    </View>
  );
}
