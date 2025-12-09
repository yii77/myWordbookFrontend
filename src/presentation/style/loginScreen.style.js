import { StyleSheet } from 'react-native';

import Theme from '../../config/themes/index';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
    paddingTop: 34,
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },

  backIconContainer: {
    position: 'absolute',
    left: 0,
    height: '100%',
    paddingHorizontal: 16,
  },

  backIcon: {
    fontSize: 20,
    fontWeight: 500,
  },

  headerTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 400,
  },

  loginFormContainer: {
    gap: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
    width: '100%',
  },

  textInput: {
    borderRadius: 7,
    backgroundColor: '#eaeaea65',
    paddingLeft: 8,
  },

  forgetPasswordText: {
    color: '#737171ff',
    fontSize: 14,
    textAlign: 'right',
  },

  loginButton: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: Theme.colors.primary,
  },

  loginText: {
    color: Theme.colors.background,
    fontSize: 16,
  },
});
