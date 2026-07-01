import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Sub = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondaryLight};
`;

const TitleHeader = ({ title, subTitle }: { title: string; subTitle?: string }) => (
  <Wrapper>
    <Title>{title}</Title>
    {subTitle && <Sub>{subTitle}</Sub>}
  </Wrapper>
);

export default TitleHeader;
