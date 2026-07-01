import React, { useMemo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';

import CustomCheckbox from '../../../styles/components/CustomCheckbox';
import { User } from '../../../utils/types/Auth';
import { femaleBodyTypes, maleBodyTypes } from '../../../constants/data';
import { useAppSelector } from '../../../store/hooks';
import { UserInputChangeHandler } from '../../../utils/types/Function';

interface FormProps {
  handleInputsChange: UserInputChangeHandler;
}

const Form: React.FC<FormProps> = ({ handleInputsChange }) => {
  const theme = useTheme();
  const { spacing } = theme;

  const { user } = useAppSelector(state => state.auth);

  // Memoise gender-specific data
  const bodyTypeData = useMemo(
    () => (user?.gender === 'female' ? femaleBodyTypes : maleBodyTypes),
    [user?.gender]
  );

  // Stable handler
  const handleChange = useCallback(
    (formKey: keyof User, value: string) => {
      handleInputsChange(formKey, value);
    },
    [handleInputsChange]
  );

  return (
    <View style={[styles.container, { gap: spacing.large }]}>
      {bodyTypeData.map(item => (
        <CustomCheckbox
          key={item.value}
          formKey="bodyShape"
          value={item.value}
          desc={item.desc}
          icon={false}
          selected={user?.bodyShape === item.value}
          onPress={handleChange}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
});

export default Form;
