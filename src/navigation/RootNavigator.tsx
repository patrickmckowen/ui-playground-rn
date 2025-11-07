import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ExperimentScreen from '../screens/ExperimentScreen';

export type RootStackParamList = {
  Home: undefined;
  Experiment: { slug: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Experiments' }} />
      <Stack.Screen
        name="Experiment"
        component={ExperimentScreen}
        options={({ route }) => ({ title: route.params.slug })}
      />
    </Stack.Navigator>
  );
}
