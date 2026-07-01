import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { ButtonType, CustomButtonProps } from '../../../utils/types/components';

const getButtonStyles = (
  buttonType: ButtonType,
  theme: any,
  disabled?: boolean,
) => {
  switch (buttonType) {
    case 'primary':
      return {
        backgroundColor: disabled ? theme.colors.gray100 : theme.colors.primary,
        borderColor: 'transparent',
        textColor: disabled
          ? theme.colors.textDisabled
          : theme.colors.textSecondary,
        fontSize: theme.fontSize.medium,
        fontWeight: theme.weight.medium,
      };
    case 'secondary':
      return {
        backgroundColor: 'transparent',
        borderColor: theme.colors.border2,
        textColor: disabled
          ? theme.colors.textDisabled
          : theme.colors.textSecondaryLight,
        fontSize: theme.fontSize.medium,
        fontWeight: theme.weight.semibold,
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        borderColor: theme.colors.border2,
        textColor: disabled ? theme.colors.textDisabled : theme.colors.gray600,
        fontSize: theme.fontSize.medium,
        fontWeight: theme.weight.regular,
        borderRadius: theme.borderRadius.xsmall,
      };
    case 'ghost':
      return {
        borderColor: theme.colors.primary,
        textColor: theme.colors.primary,
        fontSize: theme.fontSize.medium,
        fontWeight: theme.weight.regular,
        borderRadius: theme.borderRadius.small,
      };
    default:
      return {
        borderColor: theme.colors.primary,
        textColor: theme.colors.primary,
        fontSize: theme.fontSize.medium,
        fontWeight: theme.weight.regular,
      };
  }
};

const ButtonContainer = styled.TouchableOpacity<{
  bg: string;
  borderColor: string;
  borderRadius: number;
}>`
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
  height: 44px;
  background-color: ${({ bg }) => bg};
  border-radius: ${({ borderRadius }) => borderRadius}px;
  border-width: 1px;
  border-color: ${({ borderColor }) => borderColor};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const ButtonText = styled.Text<{
  color: string;
  fontSize: number;
  fontWeight: number;
  fontFamily: string;
}>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ fontWeight }) => fontWeight};
  font-family: ${({ fontFamily }) => fontFamily};
`;

const CustomButton: React.FC<CustomButtonProps> = ({
  Icon,
  title = '',
  onPress = () => {},
  buttonType = 'primary',
  disabled = false,
  style,
  buttonTextStyle,
  ...rest
}) => {
  const theme = useTheme();
  const {
    backgroundColor,
    borderColor,
    borderRadius = theme.borderRadius.xsmall,
    textColor,
    fontSize,
    fontWeight,
  } = getButtonStyles(buttonType, theme, disabled);

  return (
    <ButtonContainer
      bg={backgroundColor}
      borderColor={borderColor}
      disabled={disabled}
      borderRadius={borderRadius}
      onPress={onPress}
      style={style}
      activeOpacity={0.85}
      {...rest}
    >
      {Icon && <Icon />}
      {title !== '' && (
        <ButtonText
          color={textColor}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontFamily={theme.fonts.regular}
          style={buttonTextStyle}
        >
          {title}
        </ButtonText>
      )}
    </ButtonContainer>
  );
};

export default CustomButton;
