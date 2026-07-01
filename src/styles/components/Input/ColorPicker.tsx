import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  View,
  TextInput,
  PanResponder,
  Animated,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native';
import theme from '../../theme';
import { flex1 } from '../../mixins';

export const SKIN_TONES = [
  { label: 'Porcelain', color: '#F7E7DE' },
  { label: 'Shell', color: '#ECC5B2' },
  { label: 'Sand', color: '#EBCFAE' },
  { label: 'Ivory', color: '#F3DFCA' },
  { label: 'Limestone', color: '#EFC08D' },
  { label: 'Caramel', color: '#D2AD88' },
  { label: 'Honey', color: '#C29060' },
  { label: 'Amber', color: '#B87736' },
  { label: 'Chestnut', color: '#A05B2C' },
  { label: 'Mocha', color: '#763F25' },
  { label: 'Cocoa', color: '#4B2B1B' },
];

interface SkinTonePickerProps {
  value: string;
  onChange: (val: string) => void;
}

const KNOB_SIZE = 20;
const KNOB_HALF = KNOB_SIZE / 2;
const BAR_HEIGHT = theme.height.height100 * (44 / 100);

const SkinTonePicker: React.FC<SkinTonePickerProps> = ({ value, onChange }) => {
  const [barWidth, setBarWidth] = useState(0);
  const knobX = useRef(new Animated.Value(0)).current;

  const selectedIdx =
    SKIN_TONES.findIndex(st => st.label === value) >= 0
      ? SKIN_TONES.findIndex(st => st.label === value)
      : 0;

  useEffect(() => {
    if (barWidth <= 0) return;
    const target = (selectedIdx * barWidth) / (SKIN_TONES.length - 1);
    Animated.timing(knobX, {
      toValue: target,
      duration: 120,
      useNativeDriver: false,
    }).start();
  }, [selectedIdx, barWidth, knobX]);

  const handleLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    setBarWidth(w);
    const init = (selectedIdx * w) / (SKIN_TONES.length - 1);
    knobX.setValue(init);
  };

  // Handle touch gestures
  const handleGesture = useCallback(
    (locX: number) => {
      if (barWidth <= 0) return;
      const x = Math.max(0, Math.min(locX, barWidth));
      knobX.setValue(x);
      const idx = Math.round((x / barWidth) * (SKIN_TONES.length - 1));
      onChange(SKIN_TONES[idx].label);
    },
    [barWidth, onChange, knobX],
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: evt => {
          handleGesture(evt.nativeEvent.locationX);
        },
        onPanResponderMove: evt => {
          handleGesture(evt.nativeEvent.locationX);
        },
        onPanResponderRelease: () => {},
      }),
    [handleGesture],
  );

  return (
    <View>
      <TextInput
        style={styles.input}
        value={value}
        editable={false}
        placeholder="Select Skin Tone"
        placeholderTextColor={theme.colors.textSecondaryLight}
      />
      <View style={styles.barContainer} onLayout={handleLayout}>
        {/* Color segments */}
        <View style={styles.bar}>
          {SKIN_TONES.map((tone, i) => (
            <View
              key={tone.label}
              style={[
                flex1,
                {
                  backgroundColor: tone.color,
                  borderTopLeftRadius:
                    i === 0
                      ? theme.borderRadius.small
                      : theme.borderRadius.none,
                  borderBottomLeftRadius:
                    i === 0
                      ? theme.borderRadius.small
                      : theme.borderRadius.none,
                  borderTopRightRadius:
                    i === SKIN_TONES.length - 1
                      ? theme.borderRadius.small
                      : theme.borderRadius.none,
                  borderBottomRightRadius:
                    i === SKIN_TONES.length - 1
                      ? theme.borderRadius.small
                      : theme.borderRadius.none,
                },
              ]}
            />
          ))}
        </View>
        {/* Gesture overlay */}
        <View style={styles.overlay} {...panResponder.panHandlers} />
        {/* Knob */}
        <Animated.View
          style={[
            styles.knob,
            {
              left: Animated.subtract(knobX, KNOB_HALF),
              backgroundColor: SKIN_TONES[selectedIdx]?.color,
            },
          ]}
          pointerEvents="none"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    marginBottom: 8,
    backgroundColor: '#fff',
    color: theme.colors.textPrimary,
  },
  barContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 8,
    height: BAR_HEIGHT,
  },
  bar: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  knob: {
    position: 'absolute',
    top: -(KNOB_HALF - BAR_HEIGHT / 2),
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_HALF,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    zIndex: 2,
  },
});

export default SkinTonePicker;
