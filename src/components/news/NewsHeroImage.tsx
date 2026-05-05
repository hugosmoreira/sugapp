/**
 * NewsHeroImage — Full-width hero with gradient overlay. Renders a dark
 * placeholder when the source URL is missing or fails to load.
 */
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_HEIGHT = 220;

interface NewsHeroImageProps {
  image: number | string;
}

export default function NewsHeroImage({ image }: NewsHeroImageProps) {
  const [failed, setFailed] = useState(false);
  const hasImage =
    typeof image === 'number' ||
    (typeof image === 'string' && image.trim().length > 0);
  const showPlaceholder = !hasImage || failed;

  return (
    <View style={styles.container}>
      {showPlaceholder ? (
        <View style={[styles.image, styles.placeholder]}>
          <Ionicons name="image-outline" size={48} color={colors.muted} />
        </View>
      ) : (
        <Image
          source={typeof image === 'number' ? image : { uri: image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
          onError={() => setFailed(true)}
        />
      )}
      <LinearGradient
        colors={['transparent', colors.background]}
        style={styles.gradient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: HERO_HEIGHT,
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
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
});
