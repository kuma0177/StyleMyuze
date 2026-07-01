import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useTheme } from 'styled-components';

import Text from '../Text';
import { alignItemsCenter, flex1, flexCenter, flexRow } from '../../mixins';
import SkinTonePicker from './ColorPicker';
import DropdownComponent from './Dropdown';
import ImagePickerBox from './ImagePicker';
import DateIcon from '../../../assets/icons/DateIcon';
import CustomDatePicker from './DatePicker';
import { CustomInputProps } from '../../../utils/types/components';
import theme from '../../theme';

const OTP_LENGTH = 4;

const OtpInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const { colors } = useTheme();
  const inputs = useMemo(() => Array.from({ length: OTP_LENGTH }), []);
  const refs = useRef<(TextInput | null)[]>([]);

  const handleChange = useCallback(
    (text: string, idx: number) => {
      let newVal = value.split('');
      const digit = text.replace(/[^0-9]/g, '').slice(-1);

      if (digit) {
        newVal[idx] = digit;
        if (idx < OTP_LENGTH - 1) refs.current[idx + 1]?.focus();
      } else {
        newVal[idx] = '';
      }

      onChange(newVal.join('').slice(0, OTP_LENGTH));
    },
    [value, onChange],
  );

  const handleKeyPress = useCallback(
    (e: any, idx: number) => {
      if (e.nativeEvent.key === 'Backspace' && !value[idx] && idx > 0) {
        refs.current[idx - 1]?.focus();
      }
    },
    [value],
  );

  return (
    <View style={styles.otpContainer}>
      {inputs.map((_, idx) => (
        <TextInput
          key={idx}
          style={[styles.otpBox, value[idx] ? styles.otpBoxFilled : {}]}
          value={value[idx] || ''}
          onChangeText={text => handleChange(text, idx)}
          maxLength={1}
          keyboardType="number-pad"
          ref={el => {
            refs.current[idx] = el;
          }}
          onKeyPress={e => handleKeyPress(e, idx)}
          autoFocus={idx === 0}
          selectionColor={colors.primary}
        />
      ))}
    </View>
  );
};

const CustomInput: React.FC<CustomInputProps> = ({
  formKey,
  label,
  type = 'text',
  value,
  onChange,
  options = [],
  inputProps,
  required = false,
  error = false,
}) => {
  const theme = useTheme();
  const { colors, borderWidth, spacing } = theme;

  const [showDate, setShowDate] = useState(false);

  const handleChange = useCallback(
    (val: any) => {
      onChange(formKey, val);
    },
    [formKey, onChange],
  );

  const renderInput = useCallback(() => {
    switch (type) {
      case 'text':
      case 'email':
        return (
          <TextInput
            style={[styles.input, { borderColor: colors.border }]}
            value={value}
            onChangeText={handleChange}
            autoCapitalize="none"
            spellCheck={true}
            autoCorrect={false}
            keyboardType={type === 'email' ? 'email-address' : 'default'}
            placeholderTextColor={colors.textSecondaryLight}
            {...inputProps}
          />
        );
      case 'dropdown':
        return (
          <DropdownComponent
            value={value}
            options={options}
            onChange={handleChange}
            placeholder="Select..."
          />
        );
      case 'date':
        return (
          <>
            <TouchableOpacity
              style={[
                styles.dateInputRow,
                { borderColor: colors.border, borderWidth: borderWidth.thin },
              ]}
              onPress={() => setShowDate(prev => !prev)}
              activeOpacity={0.85}
            >
              <Text
                color={value ? colors.textPrimary : colors.textSecondaryLight}
                style={flex1}
              >
                {value
                  ? new Date(value).toLocaleDateString()
                  : 'Enter your birth'}
              </Text>
              <DateIcon />
            </TouchableOpacity>

            <CustomDatePicker
              visible={showDate}
              value={value ? new Date(value) : new Date()}
              onChange={(_, val) => {
                // For Android, the date picker will handle closing via onConfirm/onCancel
                // For iOS, we still need to handle the onChange for real-time updates
                if (Platform.OS === 'ios' && val) {
                  // On iOS, this is called when user scrolls the picker
                  // Don't close the modal or update the final value yet
                  console.log('Date changed on iOS:', val);
                }
              }}
              onConfirm={(val: Date | undefined) => {
                // This is called when user confirms the selection
                if (val) {
                  handleChange(val.toISOString());
                }
                setShowDate(false);
              }}
              onCancel={() => setShowDate(false)}
            />
          </>
        );
      case 'checkbox':
        return (
          <View style={styles.checkboxGroup}>
            {options.map(option => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.checkboxOption,
                  { borderColor: colors.border, borderWidth: borderWidth.thin },
                  flexCenter,
                  value === option.value && { borderColor: colors.primary },
                ]}
                onPress={() => handleChange(option.value)}
                activeOpacity={0.85}
              >
                <Text color={colors.textPrimaryLight}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'otp':
        return <OtpInput value={value} onChange={handleChange} />;
      case 'color':
        return <SkinTonePicker value={value} onChange={handleChange} />;
      case 'imagepicker':
        return <ImagePickerBox />;
      default:
        return null;
    }
  }, [
    type,
    value,
    options,
    inputProps,
    colors,
    borderWidth,
    handleChange,
    showDate,
  ]);

  return (
    <View style={[styles.container, { gap: spacing.small }]}>
      {type !== 'otp' && (
        <View style={[flexRow, alignItemsCenter, { gap: spacing.xsmall }]}>
          <Text
            color={error ? colors.error : colors.textPrimaryLight}
            accessibilityLabel={`${label}${required ? ', required' : ''}`}
          >
            {label}
          </Text>
          {required && <Text color={colors.textRequired}>*</Text>}
        </View>
      )}
      {renderInput()}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: { margin: 0, padding: 0 },
  input: {
    borderWidth: 1,
    height: 48,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  checkboxGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkboxOption: {
    borderRadius: 12,
    flex: 1,
    height: 48,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  otpBox: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderRadius: 16,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#fff',
  },
  otpBoxFilled: {
    borderColor: 'blue', // dynamic via theme in render
  },
  dateInputRow: {
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
