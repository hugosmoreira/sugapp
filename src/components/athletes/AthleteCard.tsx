/**
 * AthleteCard — Grid card with portrait, name, weight class, and record/rank line
 */
import React, { useState } from 'react';
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
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage =
    typeof athlete.image === 'number' ||
    (typeof athlete.image === 'string' && athlete.image.trim().length > 0);
  const showPlaceholder = !hasImage || imageFailed;

  const handlePress = () => {
    router.push(`/athlete/${athlete.id}` as const);
  };

  const metaParts: string[] = [];
  if (athlete.rank !== undefined) metaParts.push(`#${athlete.rank}`);
  if (athlete.record) metaParts.push(athlete.record);
  const metaLine = metaParts.join(' • ');

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.85}
    >
      <View style={styles.imageContainer}>
        {showPlaceholder ? (
          <View style={[styles.image, styles.placeholder]}>
            <Ionicons name="person-outline" size={36} color={colors.muted} />
          </View>
        ) : (
          <Image
            source={typeof athlete.image === 'number' ? athlete.image : { uri: athlete.image }}
            style={styles.image}
            contentFit="cover"
            transition={200}
            onError={() => setImageFailed(true)}
          />
        )}
        <LinearGradient
          colors={['transparent', 'rgba(21,21,21,0.6)']}
          style={styles.imageGradient}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {athlete.name}
        </Text>
        {athlete.weightClass ? (
          <Text style={styles.weightClass} numberOfLines={1}>
            {athlete.weightClass.toUpperCase()}
          </Text>
        ) : null}
        {metaLine ? (
          <Text style={styles.meta} numberOfLines={1}>
            {metaLine}
          </Text>
        ) : null}
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
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
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
  weightClass: {
    fontSize: typography.micro,
    fontWeight: fontWeight.semiBold,
    color: colors.gold,
    letterSpacing: 0.5,
  },
  meta: {
    fontSize: typography.micro,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
