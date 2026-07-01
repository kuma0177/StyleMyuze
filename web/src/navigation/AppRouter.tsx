import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import TabBar from '../styles/components/TabBar';
import Loader from '../styles/components/Loader';
import styled from 'styled-components';

const Register = lazy(() => import('../screens/Auth/Register'));
const VerifyOtp = lazy(() => import('../screens/Auth/VerifyOtp'));
const Home = lazy(() => import('../screens/Home'));
const LookBook = lazy(() => import('../screens/LookBook'));
const Discover = lazy(() => import('../screens/Discover'));
const Onboarding = lazy(() => import('../screens/User/Onboarding'));
const Profile = lazy(() => import('../screens/User/Profile'));
const FitPreferences = lazy(() => import('../screens/Secondary/FitPreferences'));
const TryOnHistory = lazy(() => import('../screens/Secondary/TryOnHistory'));
const PrivacyPolicy = lazy(() => import('../screens/Secondary/PrivacyPolicy'));
const HelpAndSupport = lazy(() => import('../screens/Secondary/HelpAndSupport'));

const Shell = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TAB_PATHS = ['/', '/lookbook', '/discover'];

const TabBarWrapper: React.FC = () => {
  const location = useLocation();
  if (!TAB_PATHS.includes(location.pathname)) return null;
  return <TabBar />;
};

const AppRouter: React.FC = () => {
  const { user } = useAppSelector(s => s.auth);
  const { loading } = useAppSelector(s => s.async);

  if (loading) return <Loader />;

  if (!user?.id) {
    return (
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="*" element={<Navigate to="/register" replace />} />
        </Routes>
      </Suspense>
    );
  }

  if (user.isNew) {
    return (
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="*" element={<Navigate to="/onboarding?step=0" replace />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <Shell>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lookbook" element={<LookBook />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/fit-preferences" element={<FitPreferences />} />
          <Route path="/try-on-history" element={<TryOnHistory />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/help-support" element={<HelpAndSupport />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <TabBarWrapper />
    </Shell>
  );
};

export default AppRouter;
