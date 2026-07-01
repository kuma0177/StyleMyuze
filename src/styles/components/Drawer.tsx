import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Text from './Text';
import { alignItemsCenter, flex1, flexRow } from '../mixins';
import theme from '../theme';
import RightArrowIcon from '../../assets/icons/RightArrowIcon';
import LogoutIcon from '../../assets/icons/LogOutIcon';
import { nanoid } from '@reduxjs/toolkit';
import FitPreferenceIcon from '../../assets/icons/FitPreferenceIcon';
import TryOnIcon from '../../assets/icons/TryOnIcon';
import PrivacyPolicyIcon from '../../assets/icons/PrivacyPolicyIcon';
import HelpSupportIcon from '../../assets/icons/Help&SupportIcon';
import useAppNavigation from '../../utils/hooks/useNavigation';
import { HEIGHT_FULL } from '../../utils/const/screenFractions';
import { useFirebaseContext } from '../../utils/hooks/useFirebaseContext';
import { startLoading, stopLoading } from '../../store/slices/Async';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../store/slices/AuthSlice';
import { clearConversation, removeMessage } from '../../store/slices/ConversationSlice';

const Divider = () => {
  return (
    <View
      style={[
        {
          borderWidth: theme.borderWidth.thin / 2,
          borderColor: theme.colors.gray200,
          height: theme.height.height0,
        },
      ]}
    />
  );
};

const Drawer = () => {
  const { user } = useAppSelector(state => state.auth);
  const navigation = useAppNavigation();
  const { googleSignOut } = useFirebaseContext();
  const dispatch = useAppDispatch();

  const handleProfile = () => {
    navigation.navigate('UserProfile', {
      id: String(user?.id),
    });
  };

  const handleLogOut = async () => {
    dispatch(startLoading());
    try {
        await googleSignOut();
        await AsyncStorage.clear();
        dispatch(clearConversation());
        dispatch(logout());
    } catch (e) {
        console.log("Error while logging out > ", e);
    } finally {
        dispatch(stopLoading());
    }
  };

  const SideOptions = [
    {
      id: nanoid(),
      icon: <FitPreferenceIcon />,
      label: 'Fit preferences',
      rightIcon: <RightArrowIcon />,
      divider: true,
      onClick: () => {
        navigation.navigate('FitPreferences');
      },
    },
    {
      id: nanoid(),
      icon: <TryOnIcon />,
      label: 'Try on history',
      rightIcon: <RightArrowIcon />,
      divider: true,
      onClick: () => {
        navigation.navigate('TryOnHistory');
      },
    },
    {
      id: nanoid(),
      icon: <PrivacyPolicyIcon />,
      label: 'Privacy policy',
      rightIcon: <RightArrowIcon />,
      divider: true,
      onClick: () => {
        navigation.navigate('PrivacyPolicy');
      },
    },
    {
      id: nanoid(),
      icon: <HelpSupportIcon />,
      label: 'Help & support',
      rightIcon: <RightArrowIcon />,
      divider: false,
      onClick: () => {
        navigation.navigate('HelpAndSupport');
      },
    },
  ];

  return (
    <View
      style={[
        { gap: theme.spacing.large, paddingBottom: theme.spacing.medium, height: HEIGHT_FULL - 160},
      ]}
    >
      <TouchableOpacity
        style={[
          flexRow,
          {
            gap: theme.spacing.small,
            borderRadius: theme.borderRadius.radius20,
            borderWidth: theme.borderWidth.thin,
            padding: theme.spacing.medium,
            borderColor: theme.colors.border,
            height: theme.height.height1 * 69,
          },
          alignItemsCenter,
        ]}
        onPress={handleProfile}
      >
        <Image
          source={{ uri: user?.profilePhoto }}
          height={40}
          width={40}
          resizeMode="cover"
          borderRadius={100}
        />
        <View style={[flex1, { paddingVertical: theme.spacing.small }]}>
          <Text
            fontSize={theme.fontSize.large}
            fontWeight={'600'}
            color={theme.colors.textPrimary}
          >
            {user?.fullName}
          </Text>
          <Text color={theme.colors.textSecondaryLight}>{user?.userName}</Text>
        </View>
        <RightArrowIcon />
      </TouchableOpacity>
      <Divider />
      <View style={[flex1]}>
        <FlatList
          data={SideOptions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <>
              <TouchableOpacity
                onPress={item.onClick}
                style={[
                  flexRow,
                  { padding: theme.spacing.medium },
                  alignItemsCenter,
                ]}
              >
                {item.icon}
                <Text
                  color={theme.colors.textDrawer}
                  style={[{ marginLeft: theme.spacing.small }, flex1]}
                >
                  {item.label}
                </Text>
                {item.rightIcon}
              </TouchableOpacity>
              {item.divider && <Divider />}
            </>
          )}
        />
      </View>
      <TouchableOpacity
        style={[
          {
            borderWidth: theme.borderWidth.thin,
            borderRadius: theme.borderRadius.medium,
            borderColor: theme.colors.error,
            paddingHorizontal: theme.spacing.medium,
            gap: theme.spacing.small,
            height: theme.height.height1 * 44,
          },
          flexRow,
          alignItemsCenter,
        ]}
        onPress={handleLogOut}
      >
        <LogoutIcon />
        <Text style={[flex1]} color={theme.colors.error}>
          Log out
        </Text>
        <RightArrowIcon fill={theme.colors.error} />
      </TouchableOpacity>
    </View>
  );
};

export default Drawer;
