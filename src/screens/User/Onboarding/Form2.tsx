import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';

import CustomInput from '../../../styles/components/Input';
import Text from '../../../styles/components/Text';
import { useAppSelector } from '../../../store/hooks';
import { UserInputChangeHandler } from '../../../utils/types/Function';
import { REQUIRED_USER_FIELDS } from '.';

interface FormProps {
  handleInputsChange: UserInputChangeHandler;
}

const Form: React.FC<FormProps> = ({ handleInputsChange }) => {
  const theme = useTheme();
  const { spacing, colors } = theme;
  const { user } = useAppSelector(state => state.auth);

  const clothingOptions = useMemo(
    () => [
      { value: 'xs', label: 'XS' },
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL' },
      { value: 'xxl', label: 'XXL' },
    ],
    []
  );

  return (
    <View style={[styles.container, { gap: spacing.large }]}>
      <CustomInput
        formKey="skinTone"
        type="color"
        label="What is your skin tone?"
        required={REQUIRED_USER_FIELDS.skinTone}
        inputProps={{ placeholder: 'Enter full name' }}
        value={user?.skinTone || ''}
        onChange={handleInputsChange}
      />

      <View style={[styles.innerContainer, { gap: spacing.small / 2 }]}>
        <CustomInput
          formKey="clothingSize"
          type="dropdown"
          label="Clothing size"
          required={REQUIRED_USER_FIELDS.clothingSize}
          options={clothingOptions}
          value={user?.clothingSize || ''}
          onChange={handleInputsChange}
        />
        <Text color={colors.textSecondaryLight}>
          Help us understand your clothing size to improve your fitting.
        </Text>
      </View>

      <CustomInput
        formKey="profilePhoto"
        type="imagepicker"
        label="Profile photo"
        required={REQUIRED_USER_FIELDS.profilePhoto}
        value={user?.profilePhoto || ''}
        onChange={handleInputsChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  innerContainer: {
    flexDirection: 'column',
  },
});

export default Form;
