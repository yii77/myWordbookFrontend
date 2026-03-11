import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabNavigator from './MainTabNavigator';
import ViewWordbookScreen from '../screens/ViewWordbookScreen';
import SearchWordbookScreen from '../screens/SearchWordbookScreen';

export default function RootStackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
      <Stack.Screen name="ViewWordbookScreen" component={ViewWordbookScreen} />
      <Stack.Screen
        name="SearchWordbookScreen"
        component={SearchWordbookScreen}
      />
    </Stack.Navigator>
  );
}
