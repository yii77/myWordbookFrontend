import { createContext, useState, useEffect, useMemo } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { getAccessToken } from '../../data/services/getAccessToken';
import { API_ENDPOINTS } from '../../config/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // AuthProvider渲染时执行一次，查询用户登录状态（登录则保存）、设置检查结束状态
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        let refreshToken = await AsyncStorage.getItem('refreshToken');

        // 情况一：未登录
        if (!refreshToken) {
          await AsyncStorage.clear();
          return;
        }

        // 情况二：登录失效
        const res = await fetch(API_ENDPOINTS.check, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        if (res.status == 401) {
          await AsyncStorage.clear();
          return;
        }

        // 已登录

        // 登录时效不足
        const newRefreshToken = res.headers.get('x-refresh-token');
        if (newRefreshToken) {
          await AsyncStorage.setItem('refreshToken', newRefreshToken);
          refreshToken = newRefreshToken;
        }

        // 用refreshToken，生成accessToken，存入上下文用于访问api
        try {
          const newAccessToken = await getAccessToken(refreshToken);
          setAccessToken(newAccessToken);
        } catch (err) {
          console.error('刷新 accessToken 失败', err);
          return null;
        }

        // 获取用户信息，保存
        const storedUser = await AsyncStorage.getItem('user');
        setUser(JSON.parse(storedUser));
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  // 登录函数
  const login = async (userData, refreshToken) => {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    await AsyncStorage.setItem('refreshToken', refreshToken);

    setUser(userData);
    const newAccessToken = await getAccessToken(refreshToken);
    setAccessToken(newAccessToken);
  };

  // 登出函数
  const logout = async () => {
    setUser(null);
    setAccessToken(null);
    await AsyncStorage.clear();
  };

  // 刷新accessToken函数
  const renewAccessToken = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      if (!refreshToken) return null;

      const newAccessToken = await getAccessToken(refreshToken);
      setAccessToken(newAccessToken);
      return newAccessToken;
    } catch (err) {
      console.error('刷新 accessToken 失败', err);
      return null;
    }
  };

  const value = useMemo(
    () => ({ user, accessToken, loading, login, logout, renewAccessToken }),
    [user, accessToken, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
