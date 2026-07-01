import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { TextInputProps } from "react-native";

export type DropdownOption = { label: string; value: string };

export type InputType =
  | 'text'
  | 'email'
  | 'dropdown'
  | 'date'
  | 'checkbox'
  | 'otp'
  | 'imagepicker'
  | 'color';

export interface CustomInputProps {
  formKey: any;
  label: string;
  type?: InputType;
  value: any;
  onChange: any;
  options?: DropdownOption[];
  inputProps?: TextInputProps;
  required?: boolean;
  error?: boolean;
}

export interface DropdownComponentProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: DropdownOption[];
}

export interface CustomDatePickerModalProps {
  visible: boolean;
  value: Date;
  onChange: (event: DateTimePickerEvent, date?: Date) => void;
  onConfirm: (val: Date|undefined) => void;
  onCancel: () => void;
}


export type ButtonType = 'primary' | 'secondary' | 'outline' | 'ghost';

export interface CustomButtonProps {
  Icon?: React.ComponentType<any>;
  title?: string;
  onPress?: () => void;
  buttonType?: ButtonType;
  disabled?: boolean;
  style?: any;
  buttonTextStyle?: any;
}
