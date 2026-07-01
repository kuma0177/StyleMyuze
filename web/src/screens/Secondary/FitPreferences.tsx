import Layout from '../../styles/components/Layout';
import styled from 'styled-components';

const Page = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  color: ${({ theme }) => theme.colors.textSecondaryLight};
  font-size: 15px;
`;

const FitPreferences = () => (
  <Layout>
    <Page>Fit preferences coming soon.</Page>
  </Layout>
);

export default FitPreferences;
