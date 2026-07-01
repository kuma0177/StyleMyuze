import styled from 'styled-components/native';

export const Card = styled.View`
  background-color: ${(props) => props.theme.colors.surface};
  padding: ${(props) => props.theme.spacing.large}px;
  margin-vertical: ${(props) => props.theme.spacing.small}px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;