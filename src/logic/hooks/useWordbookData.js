import { useEffect, useState, useContext } from 'react';

import { getWordbooks } from '../../data/services/api/getWordbooks';

import { AuthContext } from '../context/AuthContext';

// 生成分类
function generateCategories(wordbooks) {
  const map = {};

  wordbooks.forEach(wb => {
    const cat = wb.category;
    const subcat = wb.subcategory;

    if (!map[cat]) {
      map[cat] = new Set();
    }

    if (subcat) {
      map[cat].add(subcat);
    }
  });

  // 原始分类数组
  const categories = Object.entries(map).map(([name, subSet]) => ({
    name,
    subcategories: ['全部', ...Array.from(subSet)],
  }));

  // 判断是否已经有“我的”
  const hasMy = categories.some(cat => cat.name === '我的');

  if (!hasMy) {
    const myCategory = {
      name: '我的',
      subcategories: [], // 可自定义子分类
    };
    return [myCategory, ...categories];
  }

  return categories;
}
export function useWordbooksData() {
  const [wordbooks, setWordbooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { authFetch } = useContext(AuthContext);

  useEffect(() => {
    async function loadWordbooks() {
      try {
        const { ok, result } = await getWordbooks(authFetch);

        if (ok && result.success) {
          const books = result.data;

          setWordbooks(books);
          setCategories(generateCategories(books));
          setError(null);
        } else {
          setError('网络请求失败');
        }
      } catch (err) {
        console.error(err);
        setError('网络请求失败');
      } finally {
        setLoading(false);
      }
    }

    loadWordbooks();
  }, []);

  return {
    wordbooks,
    categories,
    loading,
    error,
  };
}
