/**
 * NewsHeroImage — Full-width hero with gradient overlay
 */
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_HEIGHT = 220;

interface NewsHeroImageProps {
  image: number | string;
}

export default function NewsHeroImage({ image }: NewsHeroImageProps) {
  return (
    <View style={styles.container}>
      <Image
        source={typeof image === 'number' ? image : { uri: image }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
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
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
});
