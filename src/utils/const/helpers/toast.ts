import Toast from 'react-native-toast-message';

type ToastKind = 'success' | 'error' | 'info';

export const showToast = (
  type: ToastKind,
  text1: string,
  text2?: string
) => {
  Toast.show({ type, text1, text2 });
};

export const hideToast = () => Toast.hide();