/**
 * EventImage — Resilient image renderer for event posters/heroes
 *
 * Accepts a number (require) or a remote URL string and renders
 * a clean dark placeholder if the source is missing or fails to load.
 * Always uses cover fit so images never stretch.
 */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Image, ImageStyle } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme';

type Source = number | string | null | undefined;

interface EventImageProps {
  source: Source;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  transition?: number;
  iconSize?: number;
}

function resolveSource(source: Source) {
  if (typeof source === 'number') return source;
  if (typeof source === 'string' && source.trim().length > 0) {
    return { uri: source };
  }
  return undefined;
}

export default function EventImage({
  source,
  style,
  containerStyle,
  transition = 250,
  iconSize = 32,
}: EventImageProps) {
  const initialResolved = resolveSource(source);
  const [hasError, setHasError] = useState<boolean>(!initialResolved);

  useEffect(() => {
    setHasError(!resolveSource(source));
  }, [source]);

  if (hasError) {
    return (
      <View style={[styles.placeholder, containerStyle, style as ViewStyle]}>
        <Ionicons name="image-outline" size={iconSize} color={colors.muted} />
      </View>
    );
  }

  return (
    <Image
      source={resolveSource(source)}
      style={style}
      contentFit="cover"
      transition={transition}
      onError={() => setHasError(true)}
    />
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
