import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';

import CustomInput from '../../../styles/components/Input';
import { useAppSelector } from '../../../store/hooks';
import { UserInputChangeHandler } from '../../../utils/types/Function';
import { REQUIRED_USER_FIELDS } from '.';
import { InputType } from '../../../utils/types/components';

interface FormProps {
  handleInputsChange: UserInputChangeHandler;
}

const Form: React.FC<FormProps> = ({ handleInputsChange }) => {
  const theme = useTheme();
  const { spacing } = theme;

  const { user } = useAppSelector(state => state.auth);
  const { error } = useAppSelector(state => state.async);

  const fields = useMemo(
    () => [
      {
        formKey: 'fullName',
        type: 'text',
        label: 'Full name',
        required: REQUIRED_USER_FIELDS.fullName,
        inputProps: { placeholder: 'Enter full name' },
        value: user?.fullName ?? '',
        onChange: handleInputsChange,
        error: error?.fullName,
      },
      {
        formKey: 'userName',
        type: 'text',
        label: 'Username',
        required: REQUIRED_USER_FIELDS.userName,
        inputProps: { placeholder: 'Enter username' },
        value: user?.userName ?? '',
        onChange: handleInputsChange,
        error: error?.userName,
      },
      {
        formKey: 'gender',
        type: 'checkbox',
        label: 'Gender',
        required: REQUIRED_USER_FIELDS.gender,
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ],
        value: user?.gender ?? '',
        onChange: handleInputsChange,
        error: error?.gender,
      },
      {
        formKey: 'dateOfBirth',
        type: 'date',
        label: 'Date of birth',
        required: REQUIRED_USER_FIELDS.dateOfBirth,
        inputProps: { placeholder: 'Enter your birth' },
        value: user?.dateOfBirth ?? '',
        onChange: handleInputsChange,
        error: error?.dateOfBirth,
      },
    ],
    [user, error, handleInputsChange]
  );

  return (
    <View style={[styles.container, { gap: spacing.large }]}>
      {fields.map(field => (
        <CustomInput
          key={field.formKey}
          formKey={field.formKey}
          required={field.required}
          type={field.type as InputType}
          label={field.label}
          options={field.options}
          inputProps={field.inputProps}
          value={field.value}
          onChange={field.onChange}
          error={field.error}
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
