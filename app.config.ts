import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'UI Playground',
  slug: 'ui-playground-rn',
  ios: {
    bundleIdentifier: 'com.patrickmckowen.ui-playground-rn',
  },
  plugins: [
    'expo-dev-client',
    [
      'expo-build-properties',
      {
        ios: { newArchEnabled: true },
        android: { newArchEnabled: true },
      },
    ],
  ],
};

export default config;
