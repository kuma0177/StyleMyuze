import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { alignItemsCenter, flex1 } from '../../mixins';
import { CustomDatePickerModalProps } from '../../../utils/types/components';

const isValidDate = (d: any): d is Date =>
  d instanceof Date && !isNaN(d.getTime());

const CustomDatePickerModal: React.FC<CustomDatePickerModalProps> = ({
  visible = false,
  value = new Date(),
  onChange,
  onConfirm,
  onCancel,
}) => {
  const getValidDate = (dateValue: any): Date => {
    return isValidDate(dateValue) ? dateValue : new Date(2000, 0, 1);
  };

  const [date, setDate] = useState<Date>(getValidDate(value));

  useEffect(() => {
    const validDate = getValidDate(value);
    setDate(validDate);
  }, [value]);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      // On Android, handle both confirm and cancel cases
      if (event.type === 'set' && selectedDate && isValidDate(selectedDate)) {
        setDate(selectedDate);
        onChange?.(event, selectedDate);
        onConfirm?.(selectedDate);
      } else if (event.type === 'dismissed') {
        onCancel?.();
      }
    } else {
      // iOS handling - just update the date, don't call onConfirm yet
      if (selectedDate && isValidDate(selectedDate)) {
        setDate(selectedDate);
        onChange?.(event, selectedDate);
      }
    }
  };

  const handleConfirm = () => {
    if (isValidDate(date)) {
      onConfirm?.(date);
    }
  };

  if (Platform.OS === 'android') {
    return visible ? (
      <DateTimePicker
        testID="datePicker"
        value={date}
        mode="date"
        display="default"
        onChange={handleChange}
        maximumDate={new Date()}
      />
    ) : null;
  }

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onCancel}
      useNativeDriver={false}
      hideModalContentWhileAnimating 
      backdropOpacity={0.4}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.actionBar}>
          <TouchableOpacity onPress={onCancel} style={styles.actionButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <View style={[flex1]} />
          <TouchableOpacity onPress={handleConfirm} style={styles.actionButton}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>

        <DateTimePicker
          testID="datePicker"
          value={date}
          mode="date"
          display="spinner"
          onChange={handleChange}
          style={[alignItemsCenter]}
          maximumDate={new Date()}
        />
      </View>
    </Modal>
  );
};

export default CustomDatePickerModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  container: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    paddingBottom: 12,
  },
  actionBar: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d1d1d6',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: Platform.OS === 'ios' ? 'System' : undefined,
  },
  confirmText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : undefined,
  },
});