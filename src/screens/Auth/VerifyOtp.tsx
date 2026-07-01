import { View } from 'react-native';
import Layout from '../../styles/components/Layout';
import {
  flex1,
  flexCenter,
  flexRow,
  justifyContentBetween,
} from '../../styles/mixins';
import Text from '../../styles/components/Text';
import theme from '../../styles/theme';
import CustomInput from '../../styles/components/Input';
import CustomButton from '../../styles/components/Button';
import { useAppDispatch } from '../../store/hooks';
import { loginSuccess } from '../../store/slices/AuthSlice';
import { useState } from 'react';

const VerifyOtp = () => {
  const dispatch = useAppDispatch();
  const [otp, setOpt] = useState('');

  const handleChangeOtp = (_: string, val: string) => {
    setOpt(val);
  };

  const handleOptVerification = () => {
    dispatch(loginSuccess({ user: null, token: 'sample-token' }));
  };

  return (
    <Layout>
      <View
        style={[
          flex1,
          justifyContentBetween,
          { padding: theme.spacing.xLarge },
        ]}
      >
        <View style={[{ gap: theme.spacing.xxLarge }]}>
          <View style={[{ gap: theme.spacing.medium }, flexCenter]}>
            <Text
              fontSize={theme.fontSize.xLarge}
              fontWeight={'500'}
              color={theme.colors.textPrimaryLight}
            >
              Check Email for code
            </Text>
            <View style={[{ gap: theme.spacing.small / 2 }, flexCenter]}>
              <Text color={theme.colors.textSecondaryLight}>
                Please enter your email address to receive
              </Text>
              <Text color={theme.colors.textSecondaryLight}>
                a verification code
              </Text>
            </View>
          </View>
          <CustomInput
            formKey={'otp'}
            type="otp"
            label=""
            value={otp}
            onChange={handleChangeOtp}
          />
          <View style={[flexCenter, flexRow, { gap: theme.spacing.small }]}>
            <Text
              fontSize={theme.fontSize.medium}
              color={theme.colors.textSecondaryLight}
            >
              Didn't recieve a code?
            </Text>
            <Text color={theme.colors.textPrimary} fontWeight={'500'}>
              Resend
            </Text>
          </View>
        </View>
        <CustomButton
          buttonType="primary"
          title="Verify code"
          onPress={handleOptVerification}
        />
      </View>
    </Layout>
  );
};

export default VerifyOtp;
