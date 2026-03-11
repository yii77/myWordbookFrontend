import { useEffect } from 'react';

import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import { useWordbooksData } from '../../logic/hooks/useWordbookData';
import { useWordbookFilter } from '../../logic/hooks/useWordbookFilter';
import { useDownloadWordbook } from '../../logic/hooks/useDownloadWordbook';

import AppPage from '../components/AppPage';
import generalStyles from '../style/general.style';
import styles from '../style/ViewWordbookScreen.style';

export default function ViewWordbookScreen({ navigation }) {
  const route = useRoute();
  const { currentWordbookId } = route.params || {};

  const { wordbooks, categories, loading, error } = useWordbooksData();

  const {
    selectedCategory,
    selectedSubcategory,
    subcategoryExpanded,
    filteredWordbooks,
    selectCategory,
    selectSubcategory,
    setSubcategoryExpanded,
  } = useWordbookFilter(wordbooks, categories);

  const { handleDownload } = useDownloadWordbook(navigation);

  //标题栏

  function renderHeader() {
    return (
      <View style={generalStyles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={generalStyles.backIconContainer}
        >
          <Text style={generalStyles.backIcon}>←</Text>
        </TouchableOpacity>

        <Text style={generalStyles.headerTitle}>词书</Text>
      </View>
    );
  }

  //搜索框

  function renderSearch() {
    return (
      <TextInput
        placeholder="输入词书名称搜索"
        style={generalStyles.searchTextInput}
        onFocus={() => navigation.navigate('SearchWordbookScreen')}
      />
    );
  }

  // 词书分类

  function CategoryItem({ item, isSelected, onPress, isLast }) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.defaultCategory, isLast ? { marginRight: 0 } : null]}
      >
        <Text
          style={[
            styles.defaultCategoryText,
            isSelected ? styles.categoryTextSelected : null,
          ]}
        >
          {item.name}
        </Text>

        {isSelected && <View style={styles.categorySelected} />}
      </TouchableOpacity>
    );
  }

  function renderCategories() {
    return (
      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={item => item.name}
          contentContainerStyle={{ alignItems: 'center' }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <CategoryItem
              item={item}
              isSelected={selectedCategory?.name === item.name}
              onPress={() => selectCategory(item)}
              isLast={index === categories.length - 1}
            />
          )}
        />
      </View>
    );
  }

  // 分割线

  function renderDividingLine() {
    return <View style={generalStyles.dividingLine}></View>;
  }

  // 词书子分类

  function SubcategoryItem({
    item,
    isSelected,
    onPress,
    isButton,
    needMarginRight,
  }) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.defaultSubcategory,
          needMarginRight && styles.subcategoryItemMargin,
          isSelected && !isButton ? styles.subcategorySelected : null,
          isButton ? styles.expandButton : null,
        ]}
      >
        <Text
          style={[
            styles.defaultSubcategoryText,
            isSelected && !isButton ? styles.subcategoryTextSelected : null,
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  }

  function renderSubcategories() {
    if (!selectedCategory) return null;

    const subcategories = selectedCategory.subcategories || [];

    const MAX_LINES = 2;
    const ITEMS_PER_LINE = 4;
    const MAX_VISIBLE = MAX_LINES * ITEMS_PER_LINE;

    let displayItems = subcategoryExpanded
      ? subcategories
      : subcategories.slice(0, MAX_VISIBLE);

    if (!subcategoryExpanded && subcategories.length > MAX_VISIBLE) {
      displayItems = [...displayItems.slice(0, MAX_VISIBLE - 1), '⌵'];
    } else if (subcategoryExpanded && subcategories.length > MAX_VISIBLE) {
      displayItems = [...displayItems, '︿'];
    }

    return (
      <View style={styles.subcategoryContainer}>
        {displayItems.map((item, index) => {
          const needMarginRight = (index + 1) % 4 !== 0;

          return (
            <SubcategoryItem
              key={item + index}
              item={item}
              isSelected={selectedSubcategory === item}
              isButton={item === '⌵' || item === '︿'}
              needMarginRight={needMarginRight}
              onPress={() => {
                if (item === '⌵') {
                  setSubcategoryExpanded(true);
                } else if (item === '︿') {
                  setSubcategoryExpanded(false);
                } else {
                  selectSubcategory(item);
                }
              }}
            />
          );
        })}
      </View>
    );
  }

  // 词书

  function WordbookItem({ item }) {
    const isCurrent = item._id === currentWordbookId;

    return (
      <TouchableOpacity
        style={styles.wordbookContainer}
        onPress={() => handleDownload(item)}
      >
        <View style={styles.wordbookImage}></View>

        <View style={styles.wordbookInfoContainer}>
          <Text style={styles.wordbookName}>{item.name}</Text>

          {item.description ? (
            <Text style={styles.description}>{item.description}</Text>
          ) : null}

          <View style={styles.thirdRow}>
            <Text style={styles.wordCount}>
              {item.book_word_count ?? 0} 个单词
            </Text>

            {isCurrent && (
              <View style={styles.learningTag}>
                <Text style={styles.learningTagText}>正在学习</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  function renderWordbooks() {
    if (loading) return <Text>正在加载</Text>;

    if (error) return <Text>{error}</Text>;

    if (filteredWordbooks.length === 0) {
      return <Text>你还没有自定义词书 ~</Text>;
    }

    return (
      <FlatList
        data={filteredWordbooks}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <WordbookItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  // 总页面

  // if (downloading) showCustomAlert('下载词书', '正在处理词书，请稍后', []);

  return (
    <AppPage>
      {renderHeader()}

      {renderSearch()}

      {renderCategories()}

      {renderDividingLine()}

      {renderSubcategories()}

      {renderWordbooks()}
    </AppPage>
  );
}
