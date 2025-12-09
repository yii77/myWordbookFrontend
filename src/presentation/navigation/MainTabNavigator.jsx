import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import StudyScreen from '../screens/StudyScreen';
import WordbookScreen from '../screens/WordbookScreen';
import TranslateScreen from '../screens/TranslateScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TabScreenOptions from '../style/mainTabNavigator.style';

export default function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={TabScreenOptions}>
      <Tab.Screen name="Study" component={StudyScreen} />
      <Tab.Screen name="Wordbook" component={WordbookScreen} />
      <Tab.Screen name="Translate" component={TranslateScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
