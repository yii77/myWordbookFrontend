import { useContext, useState, useRef } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { downloadWordbook } from '../../data/services/api/downloadWordbook';
import { insertWordbook } from '../../data/services/local/insertWordbook';
import { insertWords } from '../../data/services/local/insertWords';
import { getWordbookById } from '../../data/services/local/getWordbookById';

import { AuthContext } from '../context/AuthContext';

import { showCustomAlert, hideCustomAlert } from './useCustomAlert';

export function useDownloadWordbook(navigation) {
  const { authFetch } = useContext(AuthContext);
  const [downloading, setDownloading] = useState(false);
  const canceledRef = useRef(false);

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function handleDownload(book) {
    setDownloading(true);
    showCustomAlert('下载词书', '正在处理词书，请稍后', [
      {
        text: '取消',
        onPress: () => {
          canceledRef.current = true; // 设置取消标记
          hideCustomAlert(); // 隐藏弹窗
          setDownloading(false);
        },
        // style: { backgroundColor: '#ccc' },
      },
    ]);

    await delay(2000);

    if (canceledRef.current) return;

    const exists = await getWordbookById(book._id);

    hideCustomAlert();

    if (!exists) {
      const { ok, result } = await downloadWordbook(authFetch, book._id);
      if (!ok) {
        showCustomAlert('下载失败', '网络错误，请稍后再试', []);
        return null;
      }
      try {
        await insertWordbook(book);
        await insertWords(result);
      } catch (err) {
        showCustomAlert('保存失败', err, []);
      }
    }

    await AsyncStorage.setItem('currentWordbook', JSON.stringify(book));

    navigation.navigate('MainTabNavigator', {
      screen: 'StudyScreen',
      params: { book },
    });
  }

  return {
    handleDownload,
    downloading,
  };
}
