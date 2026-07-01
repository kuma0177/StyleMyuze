import { css } from 'styled-components/native';

export const reset = css`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'System';
  color: #000;
  background-color: #fff;
`;

export const Typography = css`
    font-family: ${(props) => props.theme.fonts.regular};
`;