import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const LookBookIcon = ({
  width = 25,
  height = 24,
  color = '#7E7D90',
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 25 24"
    fill="none"
    // xmlns="http://www.w3.org/2000/Svg"
    {...props}
  >
    <Path
      d="M4.30664 3.87305V13.4662V18.9998C4.30664 20.3805 5.42593 21.4998 6.80664 21.4998H17.6935C19.0742 21.4998 20.1935 20.3805 20.1935 18.9998V13.4662V7.43254C20.1935 6.32797 19.298 5.43254 18.1935 5.43254H12.2501"
      stroke={color}
      strokeWidth="1.3"
    />
    <Path
      d="M9.87988 15.9736H14.6208"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <Rect
      x="9.40527"
      y="9.50439"
      width="5.68916"
      height="2.94646"
      rx="1.47323"
      stroke={color}
      strokeWidth="1.3"
    />
    <Path
      d="M4.30664 3.96541C4.30664 3.15609 4.96273 2.5 5.77205 2.5H16.9161C18.0207 2.5 18.9161 3.39543 18.9161 4.5V5.43082H5.77205C4.96273 5.43082 4.30664 4.77474 4.30664 3.96541V3.96541Z"
      stroke={color}
      strokeWidth="1.3"
    />
  </Svg>
);

export default LookBookIcon;
