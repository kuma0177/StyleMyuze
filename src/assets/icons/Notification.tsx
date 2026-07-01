import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const NotificationIcon = ({
  width = 40,
  height = 40,
  color = '#141B34',        // Bell and line color
  strokeColor = '#D9D9D9',  // Outer Circle color
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
      d="M23.5 26C23.5 27.933 21.933 29.5 20 29.5C18.067 29.5 16.5 27.933 16.5 26"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M27.2311 26H12.7689C11.7919 26 11 25.208 11 24.2311C11 23.762 11.1864 23.3121 11.5181 22.9803L12.1213 22.3771C12.6839 21.8145 13 21.0514 13 20.2558V17.5C13 13.634 16.134 10.5 20 10.5C23.866 10.5 27 13.634 27 17.5V20.2558C27 21.0514 27.3161 21.8145 27.8787 22.3771L28.4819 22.9803C28.8136 23.3121 29 23.762 29 24.2311C29 25.208 28.208 26 27.2311 26Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default NotificationIcon;
