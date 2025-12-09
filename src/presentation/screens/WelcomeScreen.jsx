import { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import CheckBox from '@react-native-community/checkbox';

import styles from '../style/welcomeScreen.style';
import test from '../../../assets/app.png';
import { showCustomAlert } from '../../logic/hooks/useCustomAlert';
import Theme from '../../config/themes';

export default function WelcomeScreen({ navigation }) {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleLogin = () => {
    if (!isAgreed) {
      showCustomAlert(
        <Text style={styles.modalTitle}>服务协议及隐私保护</Text>,
        <Text style={styles.modalMessageContent}>
          我已阅读并同意
          <Text style={styles.linkText}>《服务协议》</Text>和
          <Text style={styles.linkText}>《隐私条款》</Text>
        </Text>,
        [
          {
            text: '不同意',
            style: [styles.modalFirstButton],
            alertButtonText: styles.modalFirstButtonText,
          },
          {
            text: '同意',
            onPress: () => navigation.navigate('Login'),
            style: [styles.modalSecondButton],
            alertButtonText: styles.modalSecondButtonText,
          },
        ],
      );
      return;
    }
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={test} style={styles.appLogo} />
      <Text style={styles.appNameText}>我的词书</Text>
      <Text style={styles.welcomeText}>你的词书，一切由你定义</Text>

      <TouchableOpacity
        onPress={handleLogin}
        activeOpacity={0.7}
        style={[styles.loginButton, styles.firstLoginButton]}
      >
        <Text style={[styles.loginButtonText, styles.firstLoginButtonText]}>
          登录
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogin}
        activeOpacity={1}
        style={[styles.loginButton, styles.secondLoginButton]}
      >
        <Text style={[styles.loginButtonText, styles.secondLoginButtonText]}>
          注册账号
        </Text>
      </TouchableOpacity>

      <View style={styles.agreementContainer}>
        <CheckBox
          value={isAgreed}
          onValueChange={newValue => setIsAgreed(newValue)}
          style={styles.checkBox}
          tintColors={{
            true: Theme.colors.primary,
            false: Theme.colors.primary,
          }}
        />
        <Text>
          我已阅读并同意{' '}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate('ServiceAgreement')}
          >
            {' '}
            《服务协议》{' '}
          </Text>
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate('PrivacyPolicy')}
          >
            {' '}
            《隐私条款》{' '}
          </Text>
        </Text>
      </View>
    </View>
  );
}
