import React, { useMemo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';

import CustomCheckbox from '../../../styles/components/CustomCheckbox';
import { User } from '../../../utils/types/Auth';
import { femaleStyleData, maleStyleData } from '../../../constants/data';
import { useAppSelector } from '../../../store/hooks';
import { UserInputChangeHandler } from '../../../utils/types/Function';

interface FormProps {
  handleInputsChange: UserInputChangeHandler;
}

const Form: React.FC<FormProps> = ({ handleInputsChange }) => {
  const theme = useTheme();
  const { spacing } = theme;

  const { user } = useAppSelector(state => state.auth);

  // Pick data based on gender, recompute only if gender changes
  const styleData = useMemo(
    () => (user?.gender === 'female' ? femaleStyleData : maleStyleData),
    [user?.gender]
  );

  // Stable change handler
  const handleChange = useCallback(
    (formKey: keyof User, value: string) => {
      let styles = user?.preferredStyles || [];
      if (styles.includes(value)) {
        styles = styles.filter(item => item !== value);
      } else {
        styles = [...styles, value];
      }
      handleInputsChange(formKey, styles);
    },
    [user?.preferredStyles, handleInputsChange]
  );

  return (
    <View style={[styles.container, { gap: spacing.large }]}>
      {styleData.map(item => (
        <CustomCheckbox
          key={item.value}
          formKey="preferredStyles"
          imageUrl={item.imageUrl}
          value={item.value}
          desc={item.desc}
          selected={user?.preferredStyles?.includes(item.value) || false}
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
