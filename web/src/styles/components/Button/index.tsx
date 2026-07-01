import React from 'react';
import styled from 'styled-components';
import { ButtonType, CustomButtonProps } from '../../../utils/types/Components';

const getButtonStyles = (buttonType: ButtonType, theme: any, disabled?: boolean) => {
  switch (buttonType) {
    case 'primary':
      return {
        backgroundColor: disabled ? theme.colors.gray100 : theme.colors.primary,
        borderColor: 'transparent',
        textColor: disabled ? theme.colors.textSecondaryLight : theme.colors.white,
        fontSize: theme.fontSize.medium,
        fontWeight: theme.weight.medium,
        borderRadius: '50px',
      };
    case 'secondary':
      return {
        backgroundColor: 'transparent',
        borderColor: theme.colors.border2,
        textColor: disabled ? theme.colors.textSecondaryLight : theme.colors.textSecondaryLight,
        fontSize: theme.fontSize.medium,
        fontWeight: theme.weight.semibold,
        borderRadius: '50px',
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        borderColor: theme.colors.border2,
        textColor: disabled ? theme.colors.textSecondaryLight : theme.colors.gray600,
        fontSize: theme.fontSize.medium,
        fontWeight: theme.weight.regular,
        borderRadius: '50px',
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        borderColor: theme.colors.primary,
        textColor: theme.colors.primary,
        fontSize: theme.fontSize.medium,
        fontWeight: theme.weight.regular,
        borderRadius: '100px',
      };
    default:
      return {
        backgroundColor: 'transparent',
        borderColor: theme.colors.primary,
        textColor: theme.colors.primary,
        fontSize: theme.fontSize.medium,
        fontWeight: theme.weight.regular,
        borderRadius: '50px',
      };
  }
};

interface StyledBtnProps {
  $bg: string;
  $borderColor: string;
  $borderRadius: string;
  disabled?: boolean;
}

const StyledButton = styled.button<StyledBtnProps>`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 100%;
  background-color: ${({ $bg }) => $bg};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  border: 1px solid ${({ $borderColor }) => $borderColor};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: opacity 0.15s;
  &:active { opacity: 0.75; }
`;

const ButtonText = styled.span<{ $color: string; $fontSize: number; $fontWeight: string | number }>`
  color: ${({ $color }) => $color};
  font-size: ${({ $fontSize }) => $fontSize}px;
  font-weight: ${({ $fontWeight }) => $fontWeight};
`;

const CustomButton: React.FC<CustomButtonProps> = ({
  Icon, title = '', onPress, buttonType = 'primary', disabled = false, style, buttonTextStyle,
}) => {
  const theme = (CustomButton as any).__theme;
  // We pull theme via useTheme inside a wrapper — but since this is not a hook we use styled-components' ThemeConsumer
  return (
    <ThemeButton
      Icon={Icon} title={title} onPress={onPress}
      buttonType={buttonType} disabled={disabled}
      style={style} buttonTextStyle={buttonTextStyle}
    />
  );
};

import { useTheme } from 'styled-components';

const ThemeButton: React.FC<CustomButtonProps> = ({
  Icon, title = '', onPress, buttonType = 'primary', disabled = false, style, buttonTextStyle,
}) => {
  const theme = useTheme();
  const { backgroundColor, borderColor, borderRadius, textColor, fontSize, fontWeight } =
    getButtonStyles(buttonType!, theme, disabled);

  return (
    <StyledButton
      $bg={backgroundColor ?? 'transparent'}
      $borderColor={borderColor}
      $borderRadius={borderRadius ?? '50px'}
      disabled={disabled}
      onClick={disabled ? undefined : onPress}
      style={style}
    >
      {Icon && <Icon />}
      {title !== '' && (
        <ButtonText $color={textColor} $fontSize={fontSize} $fontWeight={fontWeight} style={buttonTextStyle}>
          {title}
        </ButtonText>
      )}
    </StyledButton>
  );
};

export default ThemeButton;
