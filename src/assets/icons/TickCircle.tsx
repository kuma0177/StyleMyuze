import React from 'react';
import Svg, { Path } from 'react-native-svg';

const TickCircle = ({
  width = 16,
  height = 16,
  color = 'black',
  tickColor = 'white',
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <Path
      d="M7.99967 14.6668C11.6663 14.6668 14.6663 11.6668 14.6663 8.00016C14.6663 4.3335 11.6663 1.3335 7.99967 1.3335C4.33301 1.3335 1.33301 4.3335 1.33301 8.00016C1.33301 11.6668 4.33301 14.6668 7.99967 14.6668Z"
      fill={color}
    />
    <Path
      d="M5.16699 7.99995L7.05366 9.88661L10.8337 6.11328"
      stroke={tickColor}
      strokeLinecap="round"
    />
  </Svg>
);

export default TickCircle;
