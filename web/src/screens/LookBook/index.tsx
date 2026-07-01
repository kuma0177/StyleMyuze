import Layout from '../../styles/components/Layout';
import styled from 'styled-components';

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondaryLight};
  font-size: 16px;
`;

const LookBook = () => (
  <Layout>
    <Center>Lookbook coming soon</Center>
  </Layout>
);

export default LookBook;
