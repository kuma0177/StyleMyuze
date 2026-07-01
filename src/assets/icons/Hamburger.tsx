import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const HamburgerIcon = ({
  width = 40,
  height = 40,
  lineColor = '#141B34',
  strokeColor = '#D9D9D9',
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 40 40"
    fill="none"
    {...props}
  >
    <Circle
      cx="20"
      cy="20"
      r="19.5"
      stroke={strokeColor}
    />
    <Path
      d="M12 13H28"
      stroke={lineColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 20H28"
      stroke={lineColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 27H28"
      stroke={lineColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default HamburgerIcon;
