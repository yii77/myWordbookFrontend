import { View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import styles from '../style/appPage.style';

export default function AppPage({ children, style }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, style]}>
      <View style={{ height: insets.top }} />
      {children}
    </View>
  );
}
