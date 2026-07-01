import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import Myuze from '../../assets/icons/Myuze';

type AnimatedValue = Animated.Value;

const BotTypingLoader: React.FC = () => {
  const dot1 = useRef<AnimatedValue>(new Animated.Value(0));
  const dot2 = useRef<AnimatedValue>(new Animated.Value(0));
  const dot3 = useRef<AnimatedValue>(new Animated.Value(0));

  useEffect(() => {

    const createAnimation = (ref: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(ref, {
            toValue: -7,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(ref, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.delay(450 - delay), // Maintain consistent total cycle
        ])
      );

    const anim1 = createAnimation(dot1.current, 0);
    const anim2 = createAnimation(dot2.current, 150);
    const anim3 = createAnimation(dot3.current, 300);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, []);

  return (
    <View style={typingStyles.container}>
      <Myuze />
      <View style={typingStyles.dotsRow}>
        <Animated.View style={[typingStyles.dot, { transform: [{ translateY: dot1.current }] }]} />
        <Animated.View style={[typingStyles.dot, { transform: [{ translateY: dot2.current }] }]} />
        <Animated.View style={[typingStyles.dot, { transform: [{ translateY: dot3.current }] }]} />
      </View>
    </View>
  );
};

const typingStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 6,
    height: 40,
    marginRight: 60,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F6F7F9',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3.5,
    backgroundColor: '#282A37',
    marginHorizontal: 1,
  },
});

export default BotTypingLoader;
