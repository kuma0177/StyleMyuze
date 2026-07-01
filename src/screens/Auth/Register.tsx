import React,{ useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'styled-components';

import Button from '../../styles/components/Button';
import Logo from '../../assets/icons/Logo';
import GoogleIcon from '../../assets/icons/Google';
import FacebookIcon from '../../assets/icons/Facebook';
import {
  alignItemsCenter,
  flex1,
  flexCenter,
  flexGrow,
  flexRow,
} from '../../styles/mixins';
import Text from '../../styles/components/Text';
import CustomInput from '../../styles/components/Input';
import TitleHeader from '../../styles/components/TitleHeader';
import Loader from '../../styles/components/Loader';

import { HEIGHT_HALF } from '../../utils/const/screenFractions';
import useAppNavigation from '../../utils/hooks/useNavigation';
import { useFirebaseContext } from '../../utils/hooks/useFirebaseContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startLoading, stopLoading } from '../../store/slices/Async';
import { populateUser } from '../../store/slices/AuthSlice';
import { User } from '../../utils/types/Auth';

const Register = () => {
  const theme = useTheme();
  const { colors, spacing, fontSize, borderWidth, height } = theme;

  const navigation = useAppNavigation();
  const { loading } = useAppSelector(state => state.async);
  const { googleSignIn, createUser } = useFirebaseContext();
  const dispatch = useAppDispatch();

  const handleGoogleSignIn = async () => {
    dispatch(startLoading());

    try {
      let user = await googleSignIn() as User;
      if (user?.isNew) {
        await createUser(user);
      }

      dispatch(populateUser(user));
    } catch(e) {
      console.log("Error in google sign in >> ", e);
    } finally {
      dispatch(stopLoading());
    }
  };

  const gradientColors = useMemo(
    () => ['#D3C6FF40', '#B5E7FE40', '#FFD0A540', '#D0F9FB40'],
    []
  );

  if (loading) return <Loader />;

  return (
    <View style={[flex1, { backgroundColor: colors.white }]}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[flexCenter, { height: HEIGHT_HALF * (5 / 6) }]}
      >
        <View style={[flexCenter, { gap: spacing.small }]}>
          <View style={styles.logoWrapper}>
            <Logo />
          </View>
          <Text fontSize={fontSize.large} color={colors.textSecondaryLight}>
            Find your style with AI.
          </Text>
          <Text fontSize={fontSize.large} color={colors.textSecondaryLight}>
            Try it on. Own it.
          </Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={[flexGrow]}>
        <View style={[flex1, { gap: spacing.large, padding: spacing.xLarge }]}>
          <TitleHeader
            title="Sign in"
            subTitle="Enter your email address to complete sign in"
          />

          <View style={{ gap: spacing.medium }}>
            <Button
              Icon={GoogleIcon}
              title="Continue with google"
              onPress={handleGoogleSignIn}
              buttonType="outline"
            />
            <Button
              Icon={FacebookIcon}
              title="Continue with facebook"
              onPress={() => {}}
              buttonType="outline"
            />
          </View>

          <View style={[flexRow, alignItemsCenter, { gap: spacing.small }]}>
            <View
              style={[
                styles.divider,
                { borderColor: colors.backgroundLight, borderWidth: borderWidth.thin, height: height.height0 },
              ]}
            />
            <Text color={colors.gray400}>Or sign in with</Text>
            <View
              style={[
                styles.divider,
                { borderColor: colors.backgroundLight, borderWidth: borderWidth.thin, height: height.height0 },
              ]}
            />
          </View>

          <CustomInput
            formKey="email"
            type="email"
            label="Enter address"
            value=""
            onChange={(text: string) => console.log(text)}
            inputProps={{ placeholder: 'Enter your email address' }}
          />

          <Button
            title="Sign in"
            onPress={() => navigation.navigate('VerifyOtp')}
            buttonType="primary"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  logoWrapper: {
    transform: [{ translateX: -4 }],
  },
  divider: {
    flex: 1,
  },
});

export default Register;
