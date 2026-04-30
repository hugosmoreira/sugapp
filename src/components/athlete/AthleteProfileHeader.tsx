/**
 * AthleteProfileHeader — Avatar with gold ring, name, academy, country/belt line
 */
import React from 'react';
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
  return (
    <View style={styles.container}>
      {/* Avatar with gold ring */}
      <View style={styles.avatarWrapper}>
        <Image
          source={typeof athlete.avatar === 'number' ? athlete.avatar : { uri: athlete.avatar }}
          style={styles.avatar}
          contentFit="cover"
          transition={200}
        />
        {/* Badge */}
        <View style={styles.badge}>
          <Ionicons name="checkmark-circle" size={18} color={colors.gold} />
        </View>
      </View>

      {/* Name */}
      <Text style={styles.name}>{athlete.name}</Text>

      {/* Academy */}
      <Text style={styles.academy}>{athlete.academy}</Text>

      {/* Country | Belt */}
      <View style={styles.metaRow}>
        <Ionicons name="globe-outline" size={13} color={colors.textSecondary} />
        <Text style={styles.metaText}>
          {athlete.country} | {athlete.belt}
        </Text>
      </View>
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
  academy: {
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.medium,
    color: colors.gold,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    fontSize: typography.caption,
    fontWeight: fontWeight.regular,
    color: colors.textSecondary,
  },
});
