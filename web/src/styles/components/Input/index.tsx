import React, { useRef, useState, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import { CustomInputProps, InputOption } from '../../../utils/types/Components';

const OTP_LENGTH = 4;

const Label = styled.label<{ $error?: boolean }>`
  font-size: 14px;
  color: ${({ $error, theme }) => ($error ? theme.colors.error : theme.colors.textPrimaryLight)};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Required = styled.span`
  color: ${({ theme }) => theme.colors.textRequired};
`;

const StyledInput = styled.input<{ $error?: boolean }>`
  border: 1px solid ${({ $error, theme }) => ($error ? theme.colors.error : theme.colors.border)};
  border-radius: 12px;
  height: 48px;
  padding: 0 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  width: 100%;
  outline: none;
  background: #fff;
  &:focus { border-color: ${({ theme }) => theme.colors.primary}; }
  &::placeholder { color: ${({ theme }) => theme.colors.textSecondaryLight}; }
`;

const CheckboxRow = styled.div`
  display: flex;
  gap: 8px;
`;

const CheckboxOption = styled.button<{ $selected: boolean }>`
  flex: 1;
  height: 48px;
  border-radius: 12px;
  border: 1px solid ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.border)};
  background: transparent;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimaryLight};
  cursor: pointer;
`;

const OtpContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
`;

const OtpBox = styled.input<{ $filled: boolean }>`
  width: 70px;
  height: 70px;
  border: 1px solid ${({ $filled, theme }) => ($filled ? theme.colors.accent : theme.colors.border)};
  border-radius: 16px;
  text-align: center;
  font-size: 18px;
  outline: none;
  &:focus { border-color: ${({ theme }) => theme.colors.primary}; }
`;

const ColorGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ColorSwatch = styled.button<{ $color: string; $selected: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  border: 3px solid ${({ $selected, theme }) => ($selected ? theme.colors.primary : 'transparent')};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.border};
  cursor: pointer;
`;

const SKIN_TONES = [
  '#FDDBB4', '#F5C698', '#E8A87C', '#C68642', '#8D5524', '#4A2912',
];

const ImagePickerBox = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondaryLight};
  font-size: 14px;
  overflow: hidden;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const OtpInput: React.FC<{ value: string; onChange: (val: string) => void }> = ({ value, onChange }) => {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (text: string, idx: number) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const chars = value.split('');
    if (digit) {
      chars[idx] = digit;
      if (idx < OTP_LENGTH - 1) refs.current[idx + 1]?.focus();
    } else {
      chars[idx] = '';
    }
    onChange(chars.join('').slice(0, OTP_LENGTH));
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Backspace' && !value[idx] && idx > 0) refs.current[idx - 1]?.focus();
  };

  return (
    <OtpContainer>
      {Array.from({ length: OTP_LENGTH }).map((_, idx) => (
        <OtpBox
          key={idx}
          $filled={!!value[idx]}
          value={value[idx] || ''}
          onChange={e => handleChange(e.target.value, idx)}
          onKeyDown={e => handleKeyDown(e, idx)}
          maxLength={1}
          inputMode="numeric"
          ref={el => { refs.current[idx] = el; }}
          autoFocus={idx === 0}
        />
      ))}
    </OtpContainer>
  );
};

const CustomInput: React.FC<CustomInputProps> = ({
  formKey, label, type = 'text', value, onChange, options = [], inputProps, required = false, error = false,
}) => {
  const theme = useTheme();
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = useCallback((val: any) => onChange(formKey, val), [formKey, onChange]);

  const renderInput = () => {
    switch (type) {
      case 'text':
      case 'email':
        return (
          <StyledInput
            type={type}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
            $error={error}
            {...(inputProps as any)}
          />
        );
      case 'date':
        return (
          <StyledInput
            type="date"
            value={value ? value.slice(0, 10) : ''}
            onChange={e => handleChange(new Date(e.target.value).toISOString())}
            $error={error}
            max={new Date().toISOString().slice(0, 10)}
          />
        );
      case 'checkbox':
        return (
          <CheckboxRow>
            {options.map((opt: InputOption) => (
              <CheckboxOption
                key={opt.value}
                $selected={value === opt.value}
                onClick={() => handleChange(opt.value)}
                type="button"
              >
                {opt.label}
              </CheckboxOption>
            ))}
          </CheckboxRow>
        );
      case 'otp':
        return <OtpInput value={value} onChange={handleChange} />;
      case 'color':
        return (
          <ColorGrid>
            {SKIN_TONES.map(tone => (
              <ColorSwatch
                key={tone}
                $color={tone}
                $selected={value === tone}
                onClick={() => handleChange(tone)}
                type="button"
                title={tone}
              />
            ))}
          </ColorGrid>
        );
      case 'dropdown':
        return (
          <StyledInput
            as="select"
            value={value}
            onChange={(e: any) => handleChange(e.target.value)}
            $error={error}
          >
            <option value="">Select…</option>
            {options.map((opt: InputOption) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </StyledInput>
        );
      case 'imagepicker':
        return (
          <ImagePickerBox onClick={() => document.getElementById(`picker-${formKey}`)?.click()}>
            {preview
              ? <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
              : <span>Tap to upload photo</span>
            }
            <input
              id={`picker-${formKey}`}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={e => {
                const file = e.target.files?.[0];
                if (!file) return;
                const url = URL.createObjectURL(file);
                setPreview(url);
                handleChange(url);
              }}
            />
          </ImagePickerBox>
        );
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      {type !== 'otp' && (
        <Label $error={error}>
          {label}
          {required && <Required>*</Required>}
        </Label>
      )}
      {renderInput()}
    </Wrapper>
  );
};

export default CustomInput;
