/**
 * AthleteAvatar — Circular athlete thumbnail with gold ring + name
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { colors, spacing, typography, fontWeight } from '../../constants/theme';
import { Athlete } from '../../types/types';

interface AthleteAvatarProps {
  athlete: Athlete;
  onPress?: () => void;
}

const AVATAR_SIZE = 68;
const RING_WIDTH = 2;

export default function AthleteAvatar({ athlete, onPress }: AthleteAvatarProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.ring}>
        <Image
          source={typeof athlete.image === 'number' ? athlete.image : { uri: athlete.image }}
          style={styles.avatar}
          contentFit="cover"
          transition={200}
        />
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {athlete.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: AVATAR_SIZE + RING_WIDTH * 2 + 16,
  },
  ring: {
    width: AVATAR_SIZE + RING_WIDTH * 2,
    height: AVATAR_SIZE + RING_WIDTH * 2,
    borderRadius: (AVATAR_SIZE + RING_WIDTH * 2) / 2,
    borderWidth: RING_WIDTH,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  name: {
    marginTop: spacing.sm,
    fontSize: typography.micro,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    textAlign: 'center',
  },
});
