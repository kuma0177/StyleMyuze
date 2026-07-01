import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from '../../assets/icons/Checkbox';
import CheckboxTick from '../../assets/icons/CheckboxTicked';
import theme from '../theme';
import Text from './Text';
import {
  alignItemsCenter,
  flexRow,
  justifyContentBetween,
} from '../mixins';
import { User } from '../../utils/types/Auth';

interface CustomCheckboxProps {
  formKey: keyof User;
  imageUrl?: any;
  value: string;
  desc: string;
  selected: boolean;
  icon?: boolean;
  onPress: <K extends keyof User>(key: K, value: string) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  formKey, 
  imageUrl,
  value,
  desc,
  selected,
  onPress,
  icon = true,
}) => {
  const handlePres = () => {
    onPress(formKey, value);
  }

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { borderColor: selected ? theme.colors.primary : theme.colors.border },
      ]}
      onPress={handlePres}
      activeOpacity={0.85}
    >
      {imageUrl && <Image source={imageUrl} style={styles.image} resizeMode="contain" />}
      <View style={styles.content}>
        <View style={[justifyContentBetween, flexRow, alignItemsCenter]}>
          <Text color={theme.colors.textPrimary} fontWeight={'500'}>
            {value}
          </Text>
          {icon && (selected ? <CheckboxTick /> : <Checkbox />)}
        </View>
        <Text
          color={theme.colors.textSecondaryLight}
        >
          {desc}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    gap: 12,
    alignItems: 'center',
  },
  image: {
    width: 72,
    height: 88,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    minWidth: 0,
    gap: 8,
  },
});


export default CustomCheckbox;
