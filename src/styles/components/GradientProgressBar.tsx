import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// OR: import LinearGradient from 'react-native-linear-gradient';

const GradientProgressBar = ({ progress = 0.5, height = 10 }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 1); // Ensure 0–1

  return (
    <View style={[styles.container, { height }]}>
      <LinearGradient
        colors={['#595CFF', '#C6F8FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.progress,
          {
            height,
            width: `${clampedProgress * 100}%`,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F6F8',
    borderRadius: 50,
    overflow: 'hidden',
    width: '100%',
  },
  progress: {
    borderRadius: 100,
  },
});

export default GradientProgressBar;
