import { useState, useEffect, useMemo } from 'react';

export function useWordbookFilter(wordbooks, categories) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const [subcategoryExpanded, setSubcategoryExpanded] = useState(false);

  // 默认选择
  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
      setSelectedSubcategory(categories[0].subcategories[0]);
    }
  }, [categories]);

  // 分类切换
  function selectCategory(category) {
    setSelectedCategory(category);
    setSelectedSubcategory(category.subcategories[0] || null);
    setSubcategoryExpanded(false);
  }

  // 子分类切换
  function selectSubcategory(subcategory) {
    setSelectedSubcategory(subcategory);
  }

  // 过滤词书
  const filteredWordbooks = useMemo(() => {
    return wordbooks.filter(wb => {
      if (wb.category !== selectedCategory?.name) {
        return false;
      }

      if (selectedSubcategory === '全部') {
        return true;
      }

      return wb.subcategory === selectedSubcategory;
    });
  }, [wordbooks, selectedCategory, selectedSubcategory]);

  return {
    selectedCategory,
    selectedSubcategory,
    subcategoryExpanded,
    filteredWordbooks,

    selectCategory,
    selectSubcategory,
    setSubcategoryExpanded,
  };
}
