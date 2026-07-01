import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useIsFocused, useRoute } from '@react-navigation/native';

import BackIcon from '../../assets/icons/Back';
import HamburgerIcon from '../../assets/icons/Hamburger';
import Logo from '../../assets/icons/Logo';
import NotificationIcon from '../../assets/icons/Notification';
import LeftSlidingModal from './Modal/Left';
import Text from './Text';
import GradientProgressBar from './GradientProgressBar';

import { useAppSelector } from '../../store/hooks';
import useAppNavigation from '../../utils/hooks/useNavigation';
import { flex1, flexCenter, justifyContentCenter } from '../mixins';
import { RootStackParamList } from '../../utils/types/Navigation';
import Drawer from './Drawer';
import theme from '../theme';

interface HeaderProps {
  children?: React.ReactNode;
  showRight?: boolean;
  rightElement?: React.ReactNode;
}

type RouteName = keyof RootStackParamList;

const ROOT_ROUTES = ['Home', 'Lookbook', 'Discover'] as const;
const SECONDARY_SCREEN = ['Onboarding'] as const;

const LabelText: React.FC<{ text: string }> = ({ text }) => (
  <Text
    style={{
      textAlign: 'center',
      fontWeight: '600',
      fontSize: theme.fontSize.large,
      lineHeight: 24,
    }}
  >
    {text}
  </Text>
);

const CurrentPage: React.FC<{
  currentOnboardingForm: number;
  totalOnboardingForm: number;
}> = ({ currentOnboardingForm, totalOnboardingForm }) => (
  <View style={justifyContentCenter}>
    <Text color={theme.colors.textPrimary} fontSize={theme.fontSize.large}>
      {currentOnboardingForm}{' '}
      <Text color={theme.colors.textSecondaryLight}>
        of {totalOnboardingForm}
      </Text>
    </Text>
  </View>
);

// Clamp helper
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const Header: React.FC<HeaderProps> = () => {
  const { colors } = theme;
  const { user } = useAppSelector(state => state.auth);

  const navigation = useAppNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);

  // Safely read params just once per change
  const params = useMemo(
    () => (route.params ?? {}) as Record<string, any>,
    [route.params],
  );
  const routeName = route.name as RouteName;

  const currentOnboardingForm = useMemo(
    () => Number(params.current ?? 0) + 1,
    [params],
  );
  const totalOnboardingForm = useMemo(
    () => Number(params.total ?? 4),
    [params.total],
  );
  const progress = useMemo(
    () => clamp01(currentOnboardingForm / Math.max(1, totalOnboardingForm)),
    [currentOnboardingForm, totalOnboardingForm],
  );

  useEffect(() => {
    if ((ROOT_ROUTES as readonly string[]).includes(route.name)) {
      setCanGoBack(false);
    } else if ((SECONDARY_SCREEN as readonly string[]).includes(route.name)) {
      setCanGoBack(true);
    } else {
      setCanGoBack(navigation.canGoBack());
    }
  }, [isFocused, navigation, route.name]);

  const handleBackNavigation = useCallback(() => {
    if ((SECONDARY_SCREEN as readonly string[]).includes(route.name)) {
      navigation.navigate('App');
    } else {
      navigation.goBack();
    }
  }, [navigation, route.name]);

  const handleOnClose = useCallback(() => setDrawerVisible(false), []);

  // --- NEW: switch-based renderers with default null ---
  const renderCenterLabel = useCallback((): React.ReactNode => {
    switch (routeName) {
      case 'Home':
      case 'Lookbook':
      case 'Discover':
        return (
          <View style={[flexCenter, flex1]}>
            <Logo height={28} width={101} />
          </View>
        );
      case 'Onboarding':
        return user?.isNew || currentOnboardingForm !== 1 ? (
          <GradientProgressBar progress={progress} />
        ) : (
          <LabelText text="Edit profile" />
        );
      case 'UserProfile': 
        return <LabelText text="Details" />
      case 'FitPreferences': 
        return <LabelText text="Fit preferences" />
      case 'TryOnHistory': 
        return <LabelText text="Try on history" />
      case 'PrivacyPolicy': 
        return <LabelText text="Privacy policy" />
      case 'HelpAndSupport': 
        return <LabelText text="Help & support" />
      default:
        return null;
    }
  }, [routeName, user?.isNew, currentOnboardingForm, progress]);

  const renderRightLabel = useCallback((): React.ReactNode => {
    switch (routeName) {
      case 'Home':
      case 'Lookbook':
      case 'Discover':
        return <NotificationIcon />;
      case 'Onboarding':
        return (
          <CurrentPage
            currentOnboardingForm={currentOnboardingForm}
            totalOnboardingForm={totalOnboardingForm}
          />
        );
      default:
        return null;
    }
  }, [routeName, currentOnboardingForm, totalOnboardingForm]);

  return (
    <View style={[styles.headerContainer, { borderColor: colors.border }]}>
      {/* Left */}
      <View style={styles.sideCol}>
        {!user?.isNew &&
          (canGoBack ? (
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={handleBackNavigation}
              hitSlop={HIT_SLOP}
            >
              <BackIcon />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => setDrawerVisible(true)}
                hitSlop={HIT_SLOP}
              >
                <HamburgerIcon />
              </TouchableOpacity>
              <LeftSlidingModal visible={drawerVisible} onClose={handleOnClose}>
                <Drawer />
              </LeftSlidingModal>
            </>
          ))}
      </View>

      {/* Center */}
      <View style={styles.centerCol}>{renderCenterLabel()}</View>

      {/* Right */}
      <View style={styles.sideCol}>{renderRightLabel()}</View>
    </View>
  );
};

const HIT_SLOP = { top: 10, left: 10, right: 10, bottom: 10 };

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 6,
  },
  sideCol: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerCol: {
    flex: 1,
    justifyContent: 'center',
    height: 60,
  },
  iconBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
