export type ButtonType = 'primary' | 'secondary' | 'outline' | 'ghost';
export type InputType = 'text' | 'email' | 'otp' | 'date' | 'checkbox' | 'color' | 'imagepicker' | 'dropdown';

export interface CustomButtonProps {
  title?: string;
  onPress?: () => void;
  buttonType?: ButtonType;
  disabled?: boolean;
  Icon?: React.FC<any>;
  style?: React.CSSProperties;
  buttonTextStyle?: React.CSSProperties;
  className?: string;
}

export interface InputOption {
  value: string;
  label: string;
}

export interface CustomInputProps {
  formKey: string;
  label: string;
  type?: InputType;
  value: string;
  onChange: (key: string, value: string) => void;
  options?: InputOption[];
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  required?: boolean;
  error?: boolean;
}
