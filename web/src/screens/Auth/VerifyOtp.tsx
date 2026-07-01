import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { loginSuccess } from '../../store/slices/AuthSlice';
import CustomInput from '../../styles/components/Input';
import Button from '../../styles/components/Button';
import Layout from '../../styles/components/Layout';

const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Header = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimaryLight};
`;

const Sub = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondaryLight};
`;

const ResendRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
`;

const ResendLink = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
  cursor: pointer;
`;

const VerifyOtp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    dispatch(loginSuccess({ user: null }));
    navigate('/');
  };

  return (
    <Layout>
      <Page>
        <Top>
          <Header>
            <Title>Check Email for code</Title>
            <Sub>Please enter your email address to receive a verification code</Sub>
          </Header>
          <CustomInput
            formKey="otp"
            type="otp"
            label=""
            value={otp}
            onChange={(_, val) => setOtp(val)}
          />
          <ResendRow>
            <span style={{ color: '#8288A0' }}>Didn't receive a code?</span>
            <ResendLink>Resend</ResendLink>
          </ResendRow>
        </Top>
        <Button buttonType="primary" title="Verify code" onPress={handleVerify} />
      </Page>
    </Layout>
  );
};

export default VerifyOtp;
