import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import theme from '../../theme';
import Text from '../Text';
import { flexCenter } from '../../mixins';
import { DropdownComponentProps, DropdownOption } from '../../../utils/types/components';

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  value,
  onChange,
  placeholder,
  options,
}) => {
  const renderItem = (item: DropdownOption) => (
    <View
      style={[flexCenter, { height: theme.height.height100 * (22 / 100) }]}
    >
      <Text style={styles.textItem}>{item.label}</Text>
    </View>
  );

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={options}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      onChange={(item: DropdownOption) => {
        onChange(item.value);
      }}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 48,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.border,
    borderRadius: 12,
    padding: 12,
  },
  textItem: {
    flex: 1,
    fontSize: theme.fontSize.medium,
  },
  placeholderStyle: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.textSecondaryLight,
  },
  selectedTextStyle: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.primary,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: theme.fontSize.medium,
  },
});
