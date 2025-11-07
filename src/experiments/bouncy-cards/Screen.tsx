import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CARD_W = Math.min(width * 0.85, 360);
const CARD_H = CARD_W * 1.2;
const COLORS = ['#34D399', '#60A5FA', '#F472B6'];

function BouncyCard({ index }: { index: number }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotateZ = useSharedValue(0);

  const pan = Gesture.Pan()
    .onChange((e) => {
      translateX.value += e.changeX;
      translateY.value += e.changeY;
      rotateZ.value = translateX.value / 40;
    })
    .onEnd(() => {
      translateX.value = withSpring(0, { stiffness: 220, damping: 18, mass: 0.9 });
      translateY.value = withSpring(0, { stiffness: 220, damping: 18, mass: 0.9 });
      rotateZ.value = withSpring(0);
    });

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotateZ: `${rotateZ.value}deg` },
      { scale: 1 - index * 0.05 },
      { translateY: -index * 16 },
    ],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.card, { backgroundColor: COLORS[index] }, style]} />
    </GestureDetector>
  );
}

export function Screen() {
  return (
    <View style={styles.container}>
      {[0, 1, 2].map((i) => (
        <BouncyCard key={i} index={i} />
      ))}
    </View>
  );
}

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B1220',
  },
  card: {
    position: 'absolute',
    width: CARD_W,
    height: CARD_H,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
});
