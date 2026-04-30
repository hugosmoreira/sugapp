/**
 * AthleteCard — Grid card with portrait, country flag overlay,
 * name, academy, and rating row
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';
import { Athlete } from '../../types/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_GAP = spacing.md;
const CARD_WIDTH = (SCREEN_WIDTH - spacing.lg * 2 - CARD_GAP) / 2;
const IMAGE_HEIGHT = CARD_WIDTH * 1.15;

interface AthleteCardProps {
  athlete: Athlete;
}

export default function AthleteCard({ athlete }: AthleteCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/athlete/${athlete.id}` as const);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.85}
    >
      {/* Image + flag overlay */}
      <View style={styles.imageContainer}>
        <Image
          source={typeof athlete.image === 'number' ? athlete.image : { uri: athlete.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <LinearGradient
          colors={['transparent', 'rgba(21,21,21,0.6)']}
          style={styles.imageGradient}
        />
        {/* Country flag */}
        {athlete.countryCode && (
          <View style={styles.flagBadge}>
            <Text style={styles.flagText}>{athlete.countryCode}</Text>
          </View>
        )}
      </View>

      {/* Info below image */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {athlete.name}
        </Text>
        {athlete.academy && (
          <Text style={styles.academy} numberOfLines={1}>
            {athlete.academy.toUpperCase()}
          </Text>
        )}
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color={colors.gold} />
          <Text style={styles.ratingText}>
            {athlete.rating?.toFixed(1)} • {athlete.weightClass}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    marginBottom: CARD_GAP,
  },
  imageContainer: {
    width: '100%',
    height: IMAGE_HEIGHT,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  flagBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(21,21,21,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagText: {
    fontSize: 16,
  },
  info: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  name: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  academy: {
    fontSize: typography.micro,
    fontWeight: fontWeight.semiBold,
    color: colors.gold,
    letterSpacing: 0.5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  ratingText: {
    fontSize: typography.micro,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
});
