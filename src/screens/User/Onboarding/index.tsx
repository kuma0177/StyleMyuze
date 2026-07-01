import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import Layout from '../../../styles/components/Layout';
import {
  alignItemsCenter,
  flex1,
  justifyContentBetween,
} from '../../../styles/mixins';
import GetToKnow from './Form1';
import HelpFindFit from './Form2';
import YourStyle from './Form3';
import BodyShape from './Form4';
import CustomButton from '../../../styles/components/Button';
import TitleHeader from '../../../styles/components/TitleHeader';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { populateUser } from '../../../store/slices/AuthSlice';
import { User } from '../../../utils/types/Auth';
import { UserInputChangeHandler } from '../../../utils/types/Function';
import { formTypeTitles } from '../../../constants/data';
import useAppNavigation from '../../../utils/hooks/useNavigation';
import { useFirebaseContext } from '../../../utils/hooks/useFirebaseContext';
import { getMissingUserFields } from '../../../utils/const/helpers/validate';
import {
  clearError,
  setError,
  startLoading,
  stopLoading,
} from '../../../store/slices/Async';
import { showToast } from '../../../utils/const/helpers/toast';
import { ERROR_MESSAGES } from '../../../utils/const/helpers/errorMessages';
import { Asset } from 'react-native-image-picker';
import useAsync from '../../../utils/hooks/useAsync';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagePickerBox from '../../../styles/components/Input/ImagePicker';

export const REQUIRED_USER_FIELDS: Partial<Record<keyof User, boolean>> = {
  fullName: true,
  userName: true,
  gender: true,
  dateOfBirth: true,
  skinTone: true,
  clothingSize: true,
  profilePhoto: true,
  preferredStyles: false,
  bodyShape: false,
};

const Onboarding = () => {
  const theme = useTheme();
  const { spacing } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        topSection: {
          gap: spacing.xLarge,
        },
        bottomSection: {
          gap: spacing.medium,
          marginTop: spacing.xxLarge * 2,
        },
      }),
    [spacing],
  );

  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const scrollRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  const { getUser, localState, updateUser, uploadToCloudinary } =
    useFirebaseContext();
  const { user } = useAppSelector(state => state.auth);
  const exec = useAsync();

  const getUserRef = useRef(getUser);

  useEffect(() => {
    getUserRef.current = getUser;
  }, [getUser]);

  useEffect(() => {
    const refreshUser = async () => {
      const res = await exec(() => getUserRef.current(String(user?.id)));
      dispatch(populateUser(res as Partial<User>));
    };
    refreshUser();
  }, [exec, user?.id, dispatch]);

  const handleInputsChange: UserInputChangeHandler = useCallback(
    (key, value) => {
      if (key === 'gender') {
        dispatch(
          populateUser({
            preferredStyles: [],
            bodyShape: '',
          }),
        );
      }

      dispatch(populateUser({ [key]: value } as Partial<User>));
    },
    [dispatch],
  );

  const [formType, setFormType] = useState(formTypeTitles[0]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [formType.index]);

  const validateInput = useCallback(
    (rFields: string[]) => {
      const missing = getMissingUserFields(user || {}, rFields);
      if (missing.length) {
        const errorNew = Object.fromEntries(missing.map(k => [k, true]));
        dispatch(setError(errorNew));
        return { ok: false, missing };
      }
      dispatch(clearError());
      return { ok: true, missing: [] };
    },
    [user, dispatch],
  );

  const stepGroups = useMemo(
    () => [
      ['fullName', 'userName', 'gender', 'dateOfBirth'],
      ['skinTone', 'clothingSize'],
      ['preferredStyles'],
    ],
    [],
  );

  const handleFormSubmit = useCallback(async () => {
    const { ok } = validateInput(stepGroups[formType.index]);
    const profile = localState.localProfilePhoto as Asset | undefined;
    const profilePhoto = profile?.uri || user?.profilePhoto;

    if (!ok || (formType.index === 1 && !profilePhoto)) {
      showToast('error', ERROR_MESSAGES.REQUIRED_FIELDS);
      return;
    }

    if (formType.index === formTypeTitles.length - 1) {
      dispatch(startLoading());
      if (ok && profilePhoto) {
        try {
          const newUser = user?.isNew;
          let finalPhoto = user?.profilePhoto;
          if (profile?.uri) {
            const result = await uploadToCloudinary({
              uri: profile.uri,
              uploadPreset: 'prince8320@',
              folder: 'myuze/users',
            });
            finalPhoto = result.secure_url;
          }

          const updatedUser = {
            ...user,
            profilePhoto: finalPhoto,
            isNew: false,
          };

          dispatch(populateUser(updatedUser));
          await updateUser(String(user?.id), updatedUser);
          navigation.reset({ index: 0, routes: [{ name: 'App' }] });
        } catch (e) {
          console.log('Error >> ', e);
          showToast('error', 'Something went wrong. Please try again.');
        } finally {
          dispatch(stopLoading());
        }
      }
      return;
    }

    navigation.setParams({
      current: formType.index + 1,
      total: formTypeTitles.length,
    });
    setFormType(prev => formTypeTitles[prev.index + 1]);
  }, [
    formType,
    stepGroups,
    localState.localProfilePhoto,
    user,
    validateInput,
    uploadToCloudinary,
    updateUser,
    dispatch,
    navigation,
  ]);

  const handleCancel = useCallback(() => {
    if (formType.index === 0) {
      navigation.navigate('App');
      return;
    }
    navigation.setParams({
      current: formType.index - 1,
      total: formTypeTitles.length,
    });
    setFormType(prev => formTypeTitles[prev.index - 1]);
  }, [formType.index, navigation]);

  const renderForm = useCallback(() => {
    switch (formType.index) {
      case 0:
        return <GetToKnow handleInputsChange={handleInputsChange} />;
      case 1:
        return <HelpFindFit handleInputsChange={handleInputsChange} />;
      case 2:
        return <YourStyle handleInputsChange={handleInputsChange} />;
      case 3:
        return <BodyShape handleInputsChange={handleInputsChange} />;
      default:
        return null;
    }
  }, [formType.index, handleInputsChange]);

  return (
    <Layout>
      <ScrollView ref={scrollRef} style={[flex1, { padding: spacing.xLarge }]}>
        <View style={[flex1, justifyContentBetween]}>
          <View style={styles.topSection}>
            {!user?.isNew ? (
              formType.index === 0 && (
                <View style={[alignItemsCenter]}>
                  <ImagePickerBox type="circle" />
                </View>
              )
            ) : (
              <TitleHeader
                title={formType.title}
                subTitle={formType.subTitle}
              />
            )}
            {renderForm()}
          </View>

          <View
            style={[
              styles.bottomSection,
              { paddingBottom: insets.bottom || 32 },
            ]}
          >
            <CustomButton
              buttonType="primary"
              title={
                formType.index === formTypeTitles.length - 1
                  ? 'Save'
                  : 'Continue'
              }
              onPress={handleFormSubmit}
            />
            {(formType.index > 0 || !user?.isNew) && (
              <CustomButton
                buttonType="secondary"
                title="Cancel"
                onPress={handleCancel}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Onboarding;
