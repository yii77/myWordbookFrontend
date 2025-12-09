import { useContext } from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import MainTabNavigator from './presentation/navigation/MainTabNavigator';
import AuthStackNavigator from './presentation/navigation/AuthStackNavigator';
import { AuthContext, AuthProvider } from './logic/context/AuthContext';
import { CustomAlertProvider } from './logic/hooks/useCustomAlert';

function RootNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // 待更改：改成加载页面

  return user ? <MainTabNavigator /> : <AuthStackNavigator />;
}

export default function App() {
  return (
    <CustomAlertProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar
            backgroundColor="transparent"
            translucent={true}
            barStyle="dark-content"
          />
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </CustomAlertProvider>
  );
}
