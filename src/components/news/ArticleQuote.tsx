/**
 * ArticleQuote — Pull quote with gold left border
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';

interface ArticleQuoteProps {
  text: string;
}

export default function ArticleQuote({ text }: ArticleQuoteProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 3,
    borderLeftColor: colors.gold,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.sm,
  },
  text: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.medium,
    fontStyle: 'italic',
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
