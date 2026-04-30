/**
 * AthletesSearch — Rounded search input with search icon
 */
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, fontWeight, radius } from '../../constants/theme';

interface AthletesSearchProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function AthletesSearch({ value, onChangeText }: AthletesSearchProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color={colors.muted} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search athletes, academy or country..."
        placeholderTextColor={colors.muted}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.bodySmall,
    fontWeight: fontWeight.regular,
    color: colors.textPrimary,
    height: '100%',
  },
});
