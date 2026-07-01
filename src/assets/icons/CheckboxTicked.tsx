import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

const CheckboxTick = ({
  width = 20,
  height = 20,
  color = '#030318',
  tickColor = 'white',
  borderRadius = 4,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <Rect
      width={20}
      height={20}
      rx={borderRadius}
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.8408 6.15922C16.0531 6.37152 16.0531 6.71573 15.8408 6.92802L8.95011 13.8187C8.73782 14.031 8.39361 14.031 8.18131 13.8187L5.15923 10.7967C4.94693 10.5844 4.94692 10.2402 5.15922 10.0279C5.37152 9.81564 5.71572 9.81564 5.92802 10.0279L8.5657 12.6655L15.072 6.15922C15.2843 5.94693 15.6285 5.94692 15.8408 6.15922Z"
      fill={tickColor}
    />
  </Svg>
);

export default CheckboxTick;
