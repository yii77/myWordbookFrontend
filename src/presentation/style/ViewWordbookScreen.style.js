import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  categoryContainer: {
    paddingTop: 0,
  },

  defaultCategory: {
    paddingVertical: 8,
    marginBottom: 8,
    marginRight: 16,
    alignItems: 'center',
  },

  defaultCategoryText: { color: '#767676', fontWeight: '600', fontSize: 16 },

  categorySelected: {
    position: 'absolute',
    bottom: 5,
    width: 10,
    height: 2,
    borderRadius: 2,
    backgroundColor: '#c84141',
  },

  categoryTextSelected: {
    color: '#212121',
  },

  subcategoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },

  defaultSubcategory: {
    width: '23%',
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 5,
    borderRadius: 16,
  },

  subcategoryItemMargin: {
    marginRight: '2.66%',
  },

  defaultSubcategoryText: {
    fontSize: 12,
    color: '#777777',
    fontWeight: '600',
  },

  subcategorySelected: { backgroundColor: '#c84141' },

  subcategoryTextSelected: {
    color: '#ffffff',
  },

  expandButton: {
    width: 'auto',
    paddingHorizontal: 16,
  },

  wordbookContainer: {
    flexDirection: 'row',
    marginTop: 0,
    marginBottom: 16,
  },

  wordbookImage: {
    width: 60,
    height: 80,
    backgroundColor: '#ced5d5', // 占位颜色
    borderRadius: 8,
    marginRight: 12,
  },

  wordbookInfoContainer: {
    justifyContent: 'space-between',
  },

  wordbookName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },

  wordbookDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  thirdRow: {
    flexDirection: 'row',
  },

  wordCount: {
    fontSize: 12,
    color: '#999',
  },

  learningTag: {
    marginLeft: 16,
  },

  learningTagText: {
    fontSize: 12,
    color: '#c84141',
  },
});
