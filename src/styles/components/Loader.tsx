import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import theme from '../theme';
import { flex1, flexCenter } from '../mixins';
import Logo from '../../assets/icons/Logo';
import LinearGradient from 'react-native-linear-gradient';
import { HEIGHT_FULL, WIDTH_FULL } from '../../utils/const/screenFractions';

const Loader = () => {
  return (
    <View style={[flex1, flexCenter, { gap: theme.spacing.medium }]}>
      <LinearGradient
        colors={['#D3C6FF40', '#B5E7FE40', '#FFD0A540', '#D0F9FB40']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[
          flexCenter,
          { height: HEIGHT_FULL, width: WIDTH_FULL },
          { gap: theme.spacing.medium },
        ]}
      >
        <Logo />
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </LinearGradient>
    </View>
  );
};

export default Loader;
