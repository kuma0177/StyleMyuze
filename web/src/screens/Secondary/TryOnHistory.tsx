import Layout from '../../styles/components/Layout';
import styled from 'styled-components';

const Page = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  color: ${({ theme }) => theme.colors.textSecondaryLight};
  font-size: 15px;
`;

const TryOnHistory = () => (
  <Layout>
    <Page>No try-on history yet.</Page>
  </Layout>
);

export default TryOnHistory;
