import Layout from '../../styles/components/Layout';
import styled from 'styled-components';

const Page = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Item = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 16px;
`;

const Q = styled.p`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 6px;
`;

const A = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondaryLight};
  line-height: 1.5;
`;

const HelpAndSupport = () => (
  <Layout>
    <Page>
      <Item>
        <Q>How does Myuze work?</Q>
        <A>Tell Myuze what you're looking for and it will suggest outfits tailored to your style and body shape. You can also generate visual previews of suggested looks.</A>
      </Item>
      <Item>
        <Q>How do I reset my style preferences?</Q>
        <A>Go to your profile and tap "Edit profile" to update your style preferences and body information.</A>
      </Item>
      <Item>
        <Q>Contact us</Q>
        <A>Email us at support@myuze.app for any questions or feedback.</A>
      </Item>
    </Page>
  </Layout>
);

export default HelpAndSupport;
