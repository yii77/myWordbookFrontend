import { StyleSheet, Dimensions } from 'react-native';

import Theme from '../../config/themes/index';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  alertBox: {
    width: width * 0.8,
    backgroundColor: Theme.colors.surface,
    borderRadius: 14,
    padding: 16,
    gap: 16,
  },

  alertTitle: {
    fontSize: 18,
    fontWeight: 400,
    textAlign: 'left',
  },

  alertMessage: {
    fontSize: 15,
    textAlign: 'left',
    lineHeight: 24,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    gap: 16,
  },

  alertButton: {
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    width: '40%',
    backgroundColor: '#ffffffff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },

  alertButtonText: {
    color: '#050000ff',
    fontSize: 16,
  },
});
