import React from 'react';
import Svg, { Rect } from 'react-native-svg';

const Checkbox = ({
  width = 20,
  height = 20,
  color = 'white',
  borderColor = '#D4DAE3',
  borderWidth = 1.5,
  borderRadius = 3.25,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    {/* Box fill */}
    <Rect
      x={0.75}
      y={0.75}
      width={18.5}
      height={18.5}
      rx={borderRadius}
      fill={color}
    />
    {/* Border */}
    <Rect
      x={0.75}
      y={0.75}
      width={18.5}
      height={18.5}
      rx={borderRadius}
      stroke={borderColor}
      strokeWidth={borderWidth}
    />
  </Svg>
);

export default Checkbox;
