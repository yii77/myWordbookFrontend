import { View, TextInput, TouchableOpacity, Text } from 'react-native';

import { useLogin } from '../../logic/hooks/useLogin';
import styles from '../style/loginScreen.style';

export default function LoginScreen({ navigation }) {
  const { phone, password, setPhone, setPassword, handleLogin } = useLogin();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Welcome')}
          style={styles.backIconContainer}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>手机号登录</Text>
      </View>

      <View style={styles.loginFormContainer}>
        <TextInput
          placeholder="请输入手机号"
          value={phone}
          onChangeText={setPhone}
          autoCapitalize="none"
          style={styles.textInput}
        />
        <TextInput
          placeholder="请输入8-16位字母加数字密码"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
          style={styles.textInput}
        />
        <Text style={styles.forgetPasswordText}>忘记密码</Text>
        <TouchableOpacity
          onPress={handleLogin}
          activeOpacity={1}
          style={styles.loginButton}
        >
          <Text style={styles.loginText}>登录</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
