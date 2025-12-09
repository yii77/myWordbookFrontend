import { useState, useContext } from 'react';

import { AuthContext } from '../context/AuthContext';
import { showCustomAlert } from './useCustomAlert';
import { loginByPhone } from '../../data/services/login';

export function useLogin() {
  const { login } = useContext(AuthContext);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      return;
    }

    try {
      setLoading(true);

      const { ok, data } = await loginByPhone(phone, password);

      if (ok && data.success) {
        await login(
          { userId: data.userId, username: data.username },
          data.refreshToken,
        );
      } else {
        showCustomAlert('登录失败', data.message, []);
      }
    } catch (error) {
      console.log(error);
      showCustomAlert('错误', '网络错误，请稍后再试', []);
    } finally {
      setLoading(false);
    }
  };

  return {
    phone,
    password,
    setPhone,
    setPassword,
    handleLogin,
    loading,
  };
}
