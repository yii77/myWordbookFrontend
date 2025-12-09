import { StyleSheet, Dimensions } from 'react-native';

import Theme from '../../config/themes/index';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
    paddingTop: 34,
  },

  appLogo: {
    width: width * 0.33,
    height: width * 0.33,
    position: 'relative',
    bottom: height * 0.17,
    borderRadius: 17,
  },

  appNameText: {
    fontSize: 28,
    fontWeight: 500,
    position: 'relative',
    bottom: height * 0.17,
  },

  welcomeText: {
    fontSize: 20,
    fontWeight: 400,
    position: 'relative',
    bottom: height * 0.17 - 10,
    color: '#868383ff',
  },

  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    borderRadius: 20,
    padding: 10,
    margin: 12,
    position: 'relative',
    top: 5,
  },

  firstLoginButton: {
    backgroundColor: Theme.colors.primary,
  },

  secondLoginButton: {
    backgroundColor: Theme.colors.background,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },

  loginButtonText: {
    fontSize: 16,
    fontWeight: 500,
  },

  firstLoginButtonText: {
    color: Theme.colors.background,
  },

  secondLoginButtonText: {
    color: Theme.colors.primary,
  },

  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
  },

  checkBox: {
    transform: [{ scale: 0.8 }],
  },

  linkText: {
    color: Theme.colors.primary,
    fontSize: 15,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 400,
    textAlign: 'center',
  },

  modalMessageContent: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
  },

  modalFirstButton: {
    alignItems: 'center',
    width: '47%',
    backgroundColor: '#ffffffff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },

  modalFirstButtonText: {
    fontSize: 16,
    color: '#050000ff',
  },

  modalSecondButton: {
    alignItems: 'center',
    width: '47%',
    backgroundColor: Theme.colors.primary,
  },

  modalSecondButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});
