/**
 * ArticleContent — Renders structured article sections
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';
import { ArticleSection } from '../../types/types';
import ArticleQuote from './ArticleQuote';

interface ArticleContentProps {
  sections: ArticleSection[];
}

export default function ArticleContent({ sections }: ArticleContentProps) {
  return (
    <View style={styles.container}>
      {sections.map((section, index) => {
        switch (section.type) {
          case 'paragraph':
            return (
              <Text key={index} style={styles.paragraph}>
                {section.content}
              </Text>
            );
          case 'heading':
            return (
              <Text key={index} style={styles.heading}>
                {section.content}
              </Text>
            );
          case 'quote':
            return <ArticleQuote key={index} text={section.content ?? ''} />;
          case 'image':
            return (
              <Image
                key={index}
                source={typeof section.image === 'number' ? section.image : { uri: section.image }}
                style={styles.inlineImage}
                contentFit="cover"
                transition={200}
              />
            );
          default:
            return null;
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.lg,
  },
  paragraph: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.regular,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  heading: {
    fontSize: typography.h3,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  inlineImage: {
    width: '100%',
    height: 180,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
});
