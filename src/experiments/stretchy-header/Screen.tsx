import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

const HEADER_MAX = 180;
const HEADER_MIN = 72;

export function Screen() {
  const y = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      y.value = e.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const height = interpolate(-y.value, [0, HEADER_MAX], [HEADER_MIN, HEADER_MAX], Extrapolation.CLAMP);
    const opacity = interpolate(-y.value, [0, HEADER_MAX * 0.7], [1, 0.5], Extrapolation.CLAMP);
    return {
      height,
      opacity,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerStyle]}>
        <Text style={styles.headerText}>Stretchy Header</Text>
      </Animated.View>
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.rowText}>Row {i + 1}</Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

export default Screen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B1220' },
  header: {
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 16,
  },
  headerText: { color: 'white', fontSize: 20, fontWeight: '700' },
  content: { padding: 16 },
  row: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  rowText: { color: '#D1D5DB', fontSize: 16 },
});
