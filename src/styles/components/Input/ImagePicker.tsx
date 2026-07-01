import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  CameraOptions,
  Asset,
} from 'react-native-image-picker';
import Text from '../Text';
import theme from '../../theme';
import MaleBodyIcon from '../../../assets/icons/MaleBody';
import {
  alignItemsCenter,
  flex1,
  flexRow,
  justifyContentBetween,
  justifyContentCenter,
} from '../../mixins';
import TickCircle from '../../../assets/icons/TickCircle';
import CustomButton from '../Button';
import { useAppSelector } from '../../../store/hooks';
import FemaleBody from '../../../assets/icons/FemaleBody';
import { useFirebaseContext } from '../../../utils/hooks/useFirebaseContext';
import CameraIcon from '../../../assets/icons/CameraIcon';

async function requestCameraPermission() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'We need access to your camera to take photos.',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}

const Info = () => {
  const imageInfoText = [
    'Please keep the shooting environment clean and lighting appropriate for best fitting effect.',
    'Please wear fitted clothes and keep your hands out of your pockets.',
    'Your photo stays private and securely stored — never shared!',
  ];

  return (
    <View style={[{ gap: theme.spacing.small }]}>
      {imageInfoText.map((text, idx) => (
        <View
          key={idx}
          style={[flexRow, alignItemsCenter, { gap: theme.spacing.small }]}
        >
          <TickCircle />
          <View style={[flex1]}>
            <Text
              color={theme.colors.textSecondaryLight}
              style={styles.infoTextStyle}
            >
              {text}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

type Props = {
  type?: 'circle' | 'square'; // default: square
};

const ImagePickerBox: React.FC<Props> = ({ type = 'square' }) => {
  const { user } = useAppSelector(state => state.auth);
  const { localState, setLocalState } = useFirebaseContext();
  const gender = user?.gender;

  const pickImage = async (from: 'gallery' | 'camera') => {
    const options: ImageLibraryOptions & CameraOptions = {
      mediaType: 'photo',
      maxWidth: 512,
      maxHeight: 512,
      quality: 0.8,
    };

    const callback = (res: any) => {
      if (res.didCancel || res.errorCode) return;
      if (res.assets && res.assets.length > 0) {
        const asset = res.assets[0];
        if (asset?.uri) {
          setLocalState(prev => ({ ...prev, localProfilePhoto: asset }));
        }
      }
    };

    if (from === 'camera') {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) return;
      launchCamera(options, callback);
    } else {
      launchImageLibrary(options, callback);
    }
  };

  const localImage = localState.localProfilePhoto as Asset;
  const uriToShow = localImage?.uri ?? user?.profilePhoto ?? '';

  if (type === 'circle') {
    return (
      <View
        style={[
          {
            borderRadius: theme.borderRadius.large,
            height: theme.height.height100,
            width: theme.width.width100,
          },
        ]}
      >
        <View style={[flex1, { position: 'relative', overflow: 'hidden' }]}>
          {uriToShow ? (
            <TouchableOpacity onPress={() => pickImage('gallery')}>
              <Image
                source={{ uri: String(uriToShow) }}
                resizeMode="cover"
                height={100}
                width={100}
                borderRadius={100}
              />
            </TouchableOpacity>
          ) : gender === 'female' ? (
            <FemaleBody />
          ) : (
            <MaleBodyIcon />
          )}
          <TouchableOpacity
            style={[
              justifyContentCenter,
              alignItemsCenter,
              {
                height: 40,
                width: 40,
                display: 'flex',
                borderRadius: theme.borderRadius.large,
                backgroundColor: theme.colors.white,
                position: 'absolute',
                bottom: 0,
                right: 0,
              },
            ]}
            onPress={() => pickImage('camera')}
          >
            <CameraIcon />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[{ gap: theme.spacing.medium }]}>
      <View style={styles.wrapper}>
        <View style={styles.box}>
          {uriToShow ? (
            <Image
              source={{ uri: String(uriToShow) }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : gender === 'female' ? (
            <FemaleBody />
          ) : (
            <MaleBodyIcon />
          )}
        </View>
        <View
          style={[
            flexRow,
            {
              gap: theme.spacing.medium,
              padding: theme.spacing.large,
              borderTopWidth: theme.borderWidth.thin,
              borderTopColor: theme.colors.border,
            },
          ]}
        >
          <CustomButton
            buttonType="ghost"
            title="Gallery"
            onPress={() => pickImage('gallery')}
            style={[flex1, styles.buttonHeight]}
          />
          <CustomButton
            buttonType="ghost"
            title="Camera"
            onPress={() => pickImage('camera')}
            style={[flex1, styles.buttonHeight]}
          />
        </View>
      </View>
      <Info />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    borderColor: theme.colors.border,
    borderWidth: 1,
    alignItems: 'center',
  },
  box: {
    borderRadius: 12,
    width: 260,
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  infoTextStyle: {
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  buttonHeight: {
    height: 32,
  },
});

export default ImagePickerBox;
