import { useState } from 'react';

import CustomAlert from '../../presentation/components/CustomAlert';

let setGlobalVisible = null;
let setGlobalTitle = null;
let setGlobalMessage = null;
let setGlobalButtons = null;

// Provider 用于挂载 Modal
export function CustomAlertProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [buttons, setButtons] = useState([]);

  // 暴露给全局函数，支持任何地方操作弹窗
  setGlobalVisible = setVisible;
  setGlobalTitle = setTitle;
  setGlobalMessage = setMessage;
  setGlobalButtons = setButtons;

  return (
    <>
      {children}
      <CustomAlert
        visible={visible}
        title={title}
        message={message}
        buttons={buttons}
      />
    </>
  );
}

// 全局调用函数
export function showCustomAlert(title, message, buttons) {
  if (
    setGlobalVisible &&
    setGlobalTitle &&
    setGlobalMessage &&
    setGlobalButtons
  ) {
    // 根据是否传入按钮数组，生成最终按钮
    const finalButtons = buttons?.length
      ? // 传入按钮
        buttons.map(btn => ({
          ...btn, // 保留原本按钮属性
          onPress: () => {
            // 若已设置点击处理事件，执行且隐藏弹窗
            // 若未设置，直接隐藏弹窗
            btn.onPress?.();
            setGlobalVisible(false);
          },
        }))
      : // 未传入按钮，使用默认按钮
        [{ text: '确定', onPress: () => setGlobalVisible(false) }];

    setGlobalTitle(title);
    setGlobalMessage(message);
    setGlobalButtons(finalButtons);
    setGlobalVisible(true);
  } else {
    console.warn('CustomAlertProvider 未挂载');
  }
}
