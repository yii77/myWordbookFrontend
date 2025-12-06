import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';

import styles from '../style/customAlert.style';

export default function CustomAlert({ visible, title, message, buttons }) {
  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          {/* 标题 */}
          {/* 如果是字符串，用文本渲染；如果是自定义组件，直接渲染，支持复杂布局 */}
          {typeof message === 'string' ? (
            <Text style={styles.alertTitle}>{title}</Text>
          ) : (
            title
          )}

          {/* 内容 */}
          {/* 如果是字符串，用文本渲染；如果是自定义组件就直接渲染，方便显示表格、图片等 */}
          <ScrollView>
            {typeof message === 'string' ? (
              <Text style={styles.alertMessage}>{message}</Text>
            ) : (
              message
            )}
          </ScrollView>

          {/* 按钮 */}
          <View style={styles.buttonRow}>
            {buttons.map((btn, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.alertButton, btn.style]}
                activeOpacity={0.7}
                onPress={() => {
                  btn.onPress();
                }}
              >
                <Text style={[styles.alertButtonText, btn.alertButtonText]}>
                  {btn.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}
