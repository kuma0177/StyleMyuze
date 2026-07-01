import React from 'react';
import { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';
import { useTheme } from 'styled-components/native';
import Toast from 'react-native-toast-message';

const SuccessToastView: React.FC<any> = (props) => {
  const theme = useTheme();
  return (
    <BaseToast
      {...props}
      style={{ borderLeftColor: theme.colors.success, backgroundColor: theme.colors.white }}
      contentContainerStyle={{ paddingHorizontal: theme.spacing.medium }}
      text1Style={{ color: theme.colors.textPrimary, fontWeight: theme.weight.medium }}
      text2Style={{ color: theme.colors.textSecondary }}
    />
  );
};

const ErrorToastView: React.FC<any> = (props) => {
  const theme = useTheme();
  return (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: theme.colors.error, backgroundColor: theme.colors.white }}
      text1Style={{ color: theme.colors.textPrimary, fontWeight: theme.weight.medium }}
      text2Style={{ color: theme.colors.textSecondary }}
    />
  );
};

export const toastConfig: ToastConfig = {
  success: (props) => <SuccessToastView {...props} />,
  error:   (props) => <ErrorToastView {...props} />,
};

const ToastProvider: React.FC = () => (
  <Toast config={toastConfig} topOffset={60} visibilityTime={2500} position="top" />
);

export default ToastProvider;