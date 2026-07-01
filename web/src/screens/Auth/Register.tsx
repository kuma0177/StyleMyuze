import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startLoading, stopLoading } from '../../store/slices/Async';
import { populateUser } from '../../store/slices/AuthSlice';
import { useFirebaseContext } from '../../utils/hooks/useFirebaseContext';
import { User } from '../../utils/types/Auth';
import Logo from '../../assets/icons/Logo';
import GoogleIcon from '../../assets/icons/Google';
import Button from '../../styles/components/Button';
import TitleHeader from '../../styles/components/TitleHeader';
import Loader from '../../styles/components/Loader';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  position: relative;
`;

const HeroGradient = styled.div`
  background: linear-gradient(135deg, #D3C6FF40 0%, #B5E7FE40 33%, #FFD0A540 66%, #D0F9FB40 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 42%;
  flex-direction: column;
  gap: 8px;
`;

const Tagline = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textSecondaryLight};
`;

const Scroll = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.gray400};
  font-size: 14px;
  & > hr {
    flex: 1;
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.backgroundLight};
  }
`;

const EmailInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  height: 48px;
  padding: 0 12px;
  font-size: 14px;
  width: 100%;
  outline: none;
  &:focus { border-color: ${({ theme }) => theme.colors.primary}; }
  &::placeholder { color: ${({ theme }) => theme.colors.textSecondaryLight}; }
`;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.async);
  const { googleSignIn, createUser } = useFirebaseContext();

  const handleGoogleSignIn = async () => {
    dispatch(startLoading());
    try {
      const user = await googleSignIn() as User;
      if (user?.isNew) await createUser(user);
      dispatch(populateUser(user));
    } catch (e) {
      console.error('Google sign-in error:', e);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <Page>
      {loading && <Loader />}
      <HeroGradient>
        <Logo />
        <Tagline>Find your style with AI.</Tagline>
        <Tagline>Try it on. Own it.</Tagline>
      </HeroGradient>

      <Scroll>
        <TitleHeader title="Sign in" subTitle="Enter your email address to complete sign in" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button Icon={GoogleIcon} title="Continue with Google" onPress={handleGoogleSignIn} buttonType="outline" />
        </div>

        <Divider>
          <hr />
          <span>Or sign in with</span>
          <hr />
        </Divider>

        <EmailInput type="email" placeholder="Enter your email address" />

        <Button title="Sign in" onPress={() => navigate('/verify-otp')} buttonType="primary" />
      </Scroll>
    </Page>
  );
};

export default Register;
