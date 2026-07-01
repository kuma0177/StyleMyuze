import styled from 'styled-components';

interface TextProps {
  fontSize?: number;
  fontWeight?: string | number;
  color?: string;
  fontFamily?: string;
}

const Text = styled.span<TextProps>`
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '14px')};
  font-weight: ${({ fontWeight }) => fontWeight ?? '400'};
  color: ${({ color, theme }) => color ?? theme.colors.textPrimary};
  font-family: ${({ fontFamily, theme }) => fontFamily ?? theme.fonts.regular};
  line-height: 1.5;
`;

export default Text;
