import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const BackIcon = ({
  width = 40,
  height = 40,
  color = '#282A37',        // Arrow color
  strokeColor = '#D9D9D9',  // Circle stroke color
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 40 40"
    fill="none"
    // xmlns="http://www.w3.org/2000/Svg"
    {...props}
  >
    <Circle
      cx="20"
      cy="20"
      r="19.5"
      stroke={strokeColor}
    />
    <Path
      d="M22.1956 14.1953C22.4559 13.9349 22.8779 13.9349 23.1383 14.1953C23.3986 14.4556 23.3986 14.8776 23.1383 15.138L18.2763 19.9999L23.1383 24.8619L23.1843 24.9122C23.3979 25.1741 23.3824 25.5605 23.1383 25.8046C22.8942 26.0487 22.5078 26.0642 22.2459 25.8506L22.1956 25.8046L16.8623 20.4713C16.6019 20.2109 16.6019 19.7889 16.8623 19.5286L22.1956 14.1953Z"
      fill={color}
    />
  </Svg>
);

export default BackIcon;
