/**
 * AthleteProfileHeader — Avatar with gold ring, name, weight class
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight } from '../../constants/theme';
import { AthleteProfile } from '../../types/types';

const AVATAR_SIZE = 110;

interface AthleteProfileHeaderProps {
  athlete: AthleteProfile;
}

export default function AthleteProfileHeader({ athlete }: AthleteProfileHeaderProps) {
  const [failed, setFailed] = useState(false);
  const hasAvatar =
    typeof athlete.avatar === 'number' ||
    (typeof athlete.avatar === 'string' && athlete.avatar.trim().length > 0);
  const showPlaceholder = !hasAvatar || failed;

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        {showPlaceholder ? (
          <View style={[styles.avatar, styles.placeholder]}>
            <Ionicons name="person-outline" size={48} color={colors.muted} />
          </View>
        ) : (
          <Image
            source={typeof athlete.avatar === 'number' ? athlete.avatar : { uri: athlete.avatar }}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
            onError={() => setFailed(true)}
          />
        )}
        <View style={styles.badge}>
          <Ionicons name="checkmark-circle" size={18} color={colors.gold} />
        </View>
      </View>

      <Text style={styles.name}>{athlete.name}</Text>

      {athlete.weightClass ? (
        <Text style={styles.weightClass}>{athlete.weightClass.toUpperCase()}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  avatarWrapper: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2.5,
    borderColor: colors.gold,
    marginBottom: spacing.lg,
    position: 'relative',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: AVATAR_SIZE / 2,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 2,
  },
  name: {
    fontSize: typography.h2,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  weightClass: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.semiBold,
    color: colors.gold,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
