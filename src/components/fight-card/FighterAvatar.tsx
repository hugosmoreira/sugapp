/**
 * FighterAvatar — Circular fighter portrait with optional ranking badge
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { colors, spacing, typography, fontWeight } from '../../constants/theme';

const AVATAR_SIZE = 72;

interface FighterAvatarProps {
  image: number | string;
  rank?: number;
  size?: number;
}

export default function FighterAvatar({
  image,
  rank,
  size = AVATAR_SIZE,
}: FighterAvatarProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={typeof image === 'number' ? image : { uri: image }}
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
        contentFit="cover"
        transition={200}
      />
      {rank != null && (
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>#{rank}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  avatar: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.gold,
  },
  rankBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 22,
    alignItems: 'center',
  },
  rankText: {
    fontSize: typography.micro - 1,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
});
