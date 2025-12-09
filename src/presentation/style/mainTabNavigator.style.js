import { Image } from 'react-native';
import Theme from '../../config/themes/index';

import testIcon from '../../../assets/test.png';

const labels = {
  Study: '闯关',
  Wordbook: '词书',
  Translate: '翻译',
  Profile: '我的',
};

const mainTabNavigatorStyle = ({ route }) => {
  return {
    //标题
    headerShown: true,
    headerStyle: {
      backgroundColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
      height: 34,
    },
    //屏幕
    sceneStyle: {},
    //底部导航栏
    tabBarActiveTintColor: Theme.colors.primary,
    tabBarInactiveTintColor: Theme.colors.textSecondary,
    tabBarIcon: ({ focused, size }) => {
      const color = focused ? Theme.colors.primary : Theme.colors.textSecondary;
      return (
        <Image
          source={testIcon}
          style={{
            width: size,
            height: size,
            tintColor: color,
            alignSelf: 'center',
          }}
        />
      );
    },
    tabBarLabel: labels[route.name] || route.name,
  };
};

export default mainTabNavigatorStyle;
