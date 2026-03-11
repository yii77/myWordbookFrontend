import { useContext, useEffect } from 'react';
import { StatusBar } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import { initDB } from './data/database/db';

import { AuthContext, AuthProvider } from './logic/context/AuthContext';
import { CustomAlertProvider } from './logic/hooks/useCustomAlert';

import RootStackNavigator from './presentation/navigation/RootStackNavigator';
import AuthStackNavigator from './presentation/navigation/AuthStackNavigator';

function RootNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // 待更改：改成加载页面

  return user ? <RootStackNavigator /> : <AuthStackNavigator />;
}

export default function App() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}
