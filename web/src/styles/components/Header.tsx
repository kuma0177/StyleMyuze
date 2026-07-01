import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/icons/Logo';
import BackIcon from '../../assets/icons/Back';
import HamburgerIcon from '../../assets/icons/Hamburger';
import NotificationIcon from '../../assets/icons/Notification';
import GradientProgressBar from './GradientProgressBar';
import Drawer from './Drawer';
import { useAppSelector } from '../../store/hooks';

const Bar = styled.header`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
  background: #fff;
`;

const Side = styled.div`
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconBtn = styled.button`
  background: none;
  border: none;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  &:active { background: ${({ theme }) => theme.colors.gray50}; }
`;

const LabelText = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const PageText = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const PageSub = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondaryLight};
`;

const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 200;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.25s;
`;

const DrawerPanel = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(${({ $open }) => ($open ? '-50%' : 'calc(-50% - 300px)')});
  width: min(300px, 80vw);
  height: 100%;
  background: #fff;
  z-index: 201;
  padding: 60px 20px 24px;
  transition: transform 0.3s ease;
  overflow-y: auto;
`;

const ROOT_ROUTES = ['/', '/lookbook', '/discover'];
const SECONDARY_ROUTES_LABELS: Record<string, string> = {
  '/profile': 'Details',
  '/fit-preferences': 'Fit preferences',
  '/try-on-history': 'Try on history',
  '/privacy-policy': 'Privacy policy',
  '/help-support': 'Help & support',
};

const Header: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const path = location.pathname;
  const isRoot = ROOT_ROUTES.includes(path);
  const isOnboarding = path === '/onboarding';
  const secondaryLabel = SECONDARY_ROUTES_LABELS[path];

  const onboardingStep = Number(new URLSearchParams(location.search).get('step') ?? 0);
  const totalSteps = 4;
  const progress = (onboardingStep + 1) / totalSteps;

  const handleBack = useCallback(() => navigate(-1), [navigate]);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const renderCenter = () => {
    if (isRoot) return <Logo height={28} width={101} />;
    if (isOnboarding) {
      return user?.isNew || onboardingStep !== 0
        ? <div style={{ width: '100%', padding: '0 8px' }}><GradientProgressBar progress={progress} /></div>
        : <LabelText>Edit profile</LabelText>;
    }
    if (secondaryLabel) return <LabelText>{secondaryLabel}</LabelText>;
    return null;
  };

  const renderRight = () => {
    if (isRoot) return <NotificationIcon />;
    if (isOnboarding) return (
      <PageText>{onboardingStep + 1} <PageSub>of {totalSteps}</PageSub></PageText>
    );
    return null;
  };

  return (
    <>
      <Bar>
        <Side>
          {!user?.isNew && (
            isRoot
              ? <IconBtn onClick={() => setDrawerOpen(true)}><HamburgerIcon /></IconBtn>
              : <IconBtn onClick={handleBack}><BackIcon /></IconBtn>
          )}
        </Side>
        <Center>{renderCenter()}</Center>
        <Side>{renderRight()}</Side>
      </Bar>

      <Overlay $open={drawerOpen} onClick={closeDrawer} />
      <DrawerPanel $open={drawerOpen}>
        <Drawer onClose={closeDrawer} />
      </DrawerPanel>
    </>
  );
};

export default Header;
