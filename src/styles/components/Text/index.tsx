import React from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { useTheme } from 'styled-components/native';

interface CustomTextProps extends TextProps {
  fontStyle?: 'normal' | 'italic';
  fontSize?: number;
  color?: string;
  fontWeight?: TextStyle['fontWeight'];
  children: React.ReactNode;
}

const Text: React.FC<CustomTextProps> = ({
  fontStyle,
  fontSize,
  color,
  fontWeight,
  style,
  children,
  ...rest
}) => {
  const theme = useTheme();

  const resolvedFontWeight =
    fontWeight ?? theme.weight?.regular ?? '400';

  return (
    <RNText
      style={[
        {
          fontFamily: theme.fonts?.regular || 'System',
          fontSize: fontSize ?? theme.fontSize?.medium,
          color: color ?? theme.colors?.textPrimary ?? '#030318',
          fontStyle: fontStyle ?? 'normal',
          fontWeight: resolvedFontWeight,
        } as TextStyle,
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

export default Text;
