/**
 * EventHero — Hero image section with gradient overlay, type badge, title, and subtitle
 */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';
import { EventDetail } from '../../types/types';

function resolveImageSource(value: number | string): ImageSourcePropType | null {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim().length > 0) {
    return { uri: value };
  }
  return null;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_HEIGHT = 280;

const TYPE_LABELS = {
  MAIN_EVENT: 'MAIN EVENT',
  OPEN_TOURNAMENT: 'OPEN TOURNAMENT',
  QUALIFIER: 'QUALIFIERS',
} as const;

interface EventHeroProps {
  event: EventDetail;
}

export default function EventHero({ event }: EventHeroProps) {
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    setImageError(false);
  }, [event.heroImage]);

  const imageSource = resolveImageSource(event.heroImage);
  const showImage = imageSource !== null && !imageError;

  const overlay = (
    <LinearGradient
      colors={['rgba(0,0,0,0.15)', 'rgba(11,11,11,0.92)']}
      style={styles.gradient}
    >
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{TYPE_LABELS[event.type]}</Text>
        </View>
        <Text style={styles.title}>{event.title}</Text>
        {event.subtitle && (
          <View style={styles.subtitleRow}>
            <Text style={styles.locationPin}>◉</Text>
            <Text style={styles.subtitle}>{event.subtitle}</Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      {showImage && imageSource ? (
        <ImageBackground
          source={imageSource}
          style={styles.image}
          resizeMode="cover"
          onError={() => setImageError(true)}
        >
          {overlay}
        </ImageBackground>
      ) : (
        <View style={[styles.image, styles.placeholderBg]}>{overlay}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: HERO_HEIGHT,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderBg: {
    backgroundColor: colors.surface,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  content: {
    gap: spacing.sm,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(180, 144, 31, 0.85)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 1,
    borderRadius: radius.sm / 2,
  },
  badgeText: {
    fontSize: typography.micro,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: 1,
  },
  title: {
    fontSize: typography.h1,
    fontWeight: fontWeight.extraBold,
    color: colors.textPrimary,
    lineHeight: 34,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  locationPin: {
    fontSize: 8,
    color: colors.textSecondary,
  },
  subtitle: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.regular,
    color: colors.textSecondary,
  },
});
