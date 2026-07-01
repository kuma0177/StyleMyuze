import Layout from '../../styles/components/Layout';
import styled from 'styled-components';

const Page = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  line-height: 1.7;
`;

const PrivacyPolicy = () => (
  <Layout>
    <Page>
      <p>Your privacy is important to us. Myuze collects only the data necessary to provide AI-powered styling recommendations. We do not sell your personal data.</p>
      <br />
      <p>Data collected includes: profile information (name, gender, body measurements), style preferences, and chat history. This data is stored securely in Firebase.</p>
    </Page>
  </Layout>
);

export default PrivacyPolicy;
