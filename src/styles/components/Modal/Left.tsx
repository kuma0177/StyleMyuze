import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import Modal from 'react-native-modal';
import CancelIcon from '../../../assets/icons/CancelIcon';

type Props = {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const LeftSlidingModal: React.FC<Props> = ({ visible, onClose, children }) => {
  // useEffect(() => {
  //   StatusBar.setHidden(visible, 'fade');
  //   return () => {
  //     StatusBar.setHidden(false, 'fade');
  //   };
  // }, [visible]);

  return (
    <Modal
      isVisible={visible}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={0}
      useNativeDriver={false}
      useNativeDriverForBackdrop
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      backdropOpacity={0.4}
      coverScreen
      propagateSwipe
    >
      <View style={styles.content}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <CancelIcon />
        </TouchableOpacity>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  content: {
    width: '80%',
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 16,
    paddingTop: 16,
    elevation: 7,
  },
  closeBtn: { alignSelf: 'flex-end', marginBottom: 12 },
});

export default LeftSlidingModal;
