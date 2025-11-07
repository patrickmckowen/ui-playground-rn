import { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { experiments } from '../experiments/registry';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const renderItem = useCallback(({ item }: { item: (typeof experiments)[number] }) => {
    return (
      <Pressable
        style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
        onPress={() => navigation.navigate('Experiment', { slug: item.slug })}
      >
        <Text style={styles.title}>{item.title}</Text>
        {item.description ? <Text style={styles.description}>{item.description}</Text> : null}
      </Pressable>
    );
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={experiments}
        keyExtractor={(it) => it.slug}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16 },
  separator: { height: 12 },
  item: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#111827',
  },
  itemPressed: {
    opacity: 0.8,
  },
  title: { color: 'white', fontSize: 17, fontWeight: '600' },
  description: { color: '#9CA3AF', marginTop: 6 },
});
