/**
 * FightCardHero — Large hero card with fight poster image,
 * MAIN EVENT badge, title, subtitle, WATCH NOW CTA, and info button
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
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_MARGIN = spacing.lg;
const HERO_WIDTH = SCREEN_WIDTH - HERO_MARGIN * 2;
const HERO_HEIGHT = 200;

interface FightCardHeroProps {
  image: number | string;
  title: string;
  subtitle: string;
  onWatch?: () => void;
  onInfo?: () => void;
}

export default function FightCardHero({
  image,
  title,
  subtitle,
  onWatch,
  onInfo,
}: FightCardHeroProps) {
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={typeof image === 'number' ? image : { uri: image }}
        style={styles.image}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.75)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            {/* Badge */}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>MAIN EVENT</Text>
            </View>

            {/* Title + subtitle */}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>

            {/* Buttons row */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.watchBtn}
                onPress={onWatch}
                activeOpacity={0.8}
              >
                <Text style={styles.watchText}>WATCH NOW</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.infoBtn}
                onPress={onInfo}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="information-circle-outline"
                  size={22}
                  color={colors.textPrimary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: HERO_MARGIN,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  image: {
    width: HERO_WIDTH,
    height: HERO_HEIGHT,
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
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(180, 144, 31, 0.85)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm / 2,
    marginBottom: spacing.xs,
  },
  badgeText: {
    fontSize: typography.micro,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: 1,
  },
  title: {
    fontSize: typography.h2,
    fontWeight: fontWeight.extraBold,
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: typography.caption,
    fontWeight: fontWeight.medium,
    color: colors.gold,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  watchBtn: {
    flex: 1,
    backgroundColor: colors.gold,
    paddingVertical: spacing.md,
    borderRadius: radius.sm,
    alignItems: 'center',
  },
  watchText: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.bold,
    color: colors.background,
    letterSpacing: 1,
  },
  infoBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
});
