import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { getExperiment } from '../experiments/registry';

export type ExperimentScreenProps = NativeStackScreenProps<RootStackParamList, 'Experiment'>;

export default function ExperimentScreen({ route }: ExperimentScreenProps) {
  const { slug } = route.params;
  const experiment = getExperiment(slug);

  if (!experiment) {
    return (
      <View style={styles.center}>
        <Text style={styles.mono}>No experiment found for slug: {slug}</Text>
      </View>
    );
  }

  const Screen = experiment.Screen;
  return <Screen />;
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  mono: { fontFamily: 'Courier', color: '#6B7280' },
});
