/**
 * FeaturedScheduleCard — Hero card with fight image, title, and CTA
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = spacing.lg;
const CARD_WIDTH = SCREEN_WIDTH - CARD_MARGIN * 2;
const CARD_HEIGHT = 180;

interface FeaturedScheduleCardProps {
  image: number | string;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

export default function FeaturedScheduleCard({
  image,
  title,
  subtitle,
  onPress,
}: FeaturedScheduleCardProps) {
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={typeof image === 'number' ? image : { uri: image }}
        style={styles.image}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={onPress}
              activeOpacity={0.8}
            >
              <Text style={styles.ctaText}>VIEW TALE OF THE TAPE</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: CARD_MARGIN,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  imageStyle: {
    borderRadius: radius.lg,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  content: {
    gap: spacing.xs,
  },
  title: {
    fontSize: typography.h2,
    fontWeight: fontWeight.extraBold,
    color: colors.textPrimary,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: typography.caption,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  ctaButton: {
    backgroundColor: colors.gold,
    paddingVertical: spacing.md,
    borderRadius: radius.sm,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.bold,
    color: colors.background,
    letterSpacing: 1,
  },
});
