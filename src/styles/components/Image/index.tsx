import React, { useEffect, useRef, useState, ReactNode } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  type DimensionValue,
  type ImageStyle,
  type StyleProp,
} from 'react-native';
import { flexCenter } from '../../mixins';
import theme from '../../theme';

type Props = {
  url?: string | null;
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  imageStyle?: StyleProp<ImageStyle>;
  backgroundColor?: string;
  overlayButton?: ReactNode; // Button JSX passed from parent
};

const CustomImage: React.FC<Props> = ({
  url,
  width = '100%' as `${number}%`,
  height = 200,
  borderRadius = 0,
  imageStyle,
  backgroundColor = theme.colors.gray200,
  overlayButton,
}) => {
  const [loading, setLoading] = useState<boolean>(!!url);

  const pulse = useRef(new Animated.Value(0.3)).current;
  const imgOpacity = useRef(new Animated.Value(0)).current;
  const buttonPulse = useRef(new Animated.Value(0.6)).current;

  // Reset when URL changes
  useEffect(() => {
    setLoading(!!url);
    imgOpacity.setValue(0);
  }, [url, imgOpacity]);

  // Start pulse for skeleton & button if loading
  useEffect(() => {
    let loop: Animated.CompositeAnimation | null = null;

    if (loading || !url) {
      loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 0.3,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      );
      loop.start();
    }

    return () => {
      loop?.stop?.();
    };
  }, [loading, url, pulse]);

  // Button pulsating effect (only if overlayButton exists)
  useEffect(() => {
    if (!overlayButton) return;
    if (loading) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(buttonPulse, {
            toValue: 1,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(buttonPulse, {
            toValue: 0.6,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      );
      loop.start();
      return () => loop.stop();
    } else {
      buttonPulse.stopAnimation();
      buttonPulse.setValue(1);
    }
  }, [overlayButton, loading, buttonPulse]);

  const onLoaded = () => {
    setLoading(false);
    Animated.timing(imgOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
      style={[{ width, height, borderRadius, overflow: 'hidden' }, flexCenter]}
    >
      {/* Image */}
      {url ? (
        <Animated.Image
          source={{ uri: url }}
          style={[StyleSheet.absoluteFill, { opacity: imgOpacity }, imageStyle]}
          resizeMode="cover"
          onLoadEnd={onLoaded}
          onError={() => setLoading(true)}
        />
      ) : null}

      {/* Loader pulse */}
      {(loading || !url) && (
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, { opacity: pulse, backgroundColor }]}
        />
      )}

      {/* Overlay button if provided */}
      {overlayButton && (
        <Animated.View
          style={[
            styles.overlayButtonContainer,
            { opacity: loading ? buttonPulse : 1 },
          ]}
        >
          {overlayButton}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlayButtonContainer: {
    position: 'absolute',
    bottom: 10,
  },
});

export default CustomImage;
