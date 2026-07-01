import React from 'react';
import Svg, { Path } from 'react-native-svg';

const FacebookIcon = ({
  width = 20,
  height = 20,
  color = '#1877F3',
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M24 12.0736C24 5.40633 18.6274 0 12 0C5.37258 0 0 5.40633 0 12.0736C0 18.1018 4.3882 23.0949 10.125 23.9775V15.5597H7.07812V12.0736H10.125V9.41419C10.125 6.4075 11.9162 4.78116 14.6576 4.78116C15.9706 4.78116 17.3438 5.00237 17.3438 5.00237V7.96416H15.8306C14.3391 7.96416 13.875 8.89451 13.875 9.84844V12.0736H17.2031L16.6711 15.5597H13.875V23.9775C19.6118 23.0949 24 18.1018 24 12.0736Z"
      fill={color}
    />
  </Svg>
);

export default FacebookIcon;
