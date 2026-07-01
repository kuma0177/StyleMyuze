import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const TryOnIcon = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle
      cx={12.8348}
      cy={12}
      r={4.90219}
      stroke="#8288A0"
      strokeWidth={1.3}
    />
    <Path
      d="M12.4385 9.39948V12.3486L14.4657 13.8233"
      stroke="#8288A0"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.8345 21.2809C17.9602 21.2809 22.1154 17.1257 22.1154 12C22.1154 6.87428 17.9602 2.71906 12.8345 2.71906C7.7088 2.71906 3.55358 6.87428 3.55358 12M3.55358 12L1.88574 10.0907M3.55358 12L5.3872 10.7819"
      stroke="#8288A0"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default TryOnIcon;
