/**
 * FeaturedEventBanner — Hero banner for the featured event
 * Full-width card with event poster, gradient overlay, countdown, and CTA button
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';
import { Event } from '../../types/types';

function resolveImageSource(value: number | string): ImageSourcePropType | null {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim().length > 0) {
    return { uri: value };
  }
  return null;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_HEIGHT = 240;

// ─── Countdown helpers ───────────────────────────────────────

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

function calcTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  };
}

const pad = (n: number) => n.toString().padStart(2, '0');

// ─── Component ───────────────────────────────────────────────

interface FeaturedEventBannerProps {
  event: Event;
  onPress?: () => void;
}

export default function FeaturedEventBanner({ event, onPress }: FeaturedEventBannerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(event.date));
  const [imageError, setImageError] = useState<boolean>(false);

  const update = useCallback(() => setTimeLeft(calcTimeLeft(event.date)), [event.date]);

  useEffect(() => {
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [update]);

  useEffect(() => {
    setImageError(false);
  }, [event.image]);

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Split title for the two-line hero treatment ("SUG" small + "CHAMPIONSHIP 52" large)
  const parts = event.title.split(' ');
  const titleTop = parts.slice(0, 1).join(' ');
  const titleBottom = parts.slice(1).join(' ');

  const imageSource = resolveImageSource(event.image);
  const showImage = imageSource !== null && !imageError;

  const overlay = (
    <LinearGradient
      colors={['transparent', 'rgba(0,0,0,0.85)']}
      style={styles.gradient}
    >
      <View style={styles.content}>
        <Text style={styles.titleTop}>{titleTop}</Text>
        {titleBottom ? (
          <Text style={styles.titleBottom}>{titleBottom}</Text>
        ) : null}

        <Text style={styles.meta}>
          {[event.city, event.state].filter(Boolean).join(', ')} • {formattedDate}
        </Text>

        {/* Countdown */}
        <View style={styles.countdown}>
          <View style={styles.countUnit}>
            <Text style={styles.countValue}>{pad(timeLeft.days)}</Text>
            <Text style={styles.countLabel}>DAYS</Text>
          </View>
          <Text style={styles.countSep}>:</Text>
          <View style={styles.countUnit}>
            <Text style={styles.countValue}>{pad(timeLeft.hours)}</Text>
            <Text style={styles.countLabel}>HRS</Text>
          </View>
          <Text style={styles.countSep}>:</Text>
          <View style={styles.countUnit}>
            <Text style={styles.countValue}>{pad(timeLeft.minutes)}</Text>
            <Text style={styles.countLabel}>MIN</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaText}>VIEW EVENT</Text>
        </TouchableOpacity>
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
    height: BANNER_HEIGHT,
    overflow: 'hidden',
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
    paddingBottom: spacing.lg,
  },
  content: {
    gap: 4,
  },
  titleTop: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.bold,
    color: colors.textSecondary,
    letterSpacing: 1,
  },
  titleBottom: {
    fontSize: typography.h1,
    fontWeight: fontWeight.extraBold,
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  meta: {
    fontSize: typography.caption,
    fontWeight: fontWeight.medium,
    color: colors.gold,
    marginBottom: 2,
  },
  // Countdown
  countdown: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },
  countUnit: { alignItems: 'center' },
  countValue: {
    fontSize: typography.h2,
    fontWeight: fontWeight.bold,
    color: colors.gold,
  },
  countLabel: {
    fontSize: typography.micro,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
    marginTop: 2,
  },
  countSep: {
    fontSize: typography.h2,
    fontWeight: fontWeight.bold,
    color: colors.gold,
  },
  // CTA
  ctaButton: {
    alignSelf: 'center',
    backgroundColor: colors.gold,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xxxl,
    borderRadius: radius.full,
    marginTop: spacing.sm,
  },
  ctaText: {
    fontSize: typography.caption,
    fontWeight: fontWeight.bold,
    color: colors.background,
    letterSpacing: 1.5,
  },
});
