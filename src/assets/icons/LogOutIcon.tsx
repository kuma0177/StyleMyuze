import React from 'react';
import Svg, { Path, Defs, ClipPath, Rect, G } from 'react-native-svg';

const LogoutIcon = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0)">
      <Path
        d="M14.5981 18.6076H17.205C18.3161 18.6076 19.2168 17.7069 19.2168 16.5958V15.1996M14.5981 4.97571H17.205C18.3161 4.97571 19.2168 5.87643 19.2168 6.98753V8.38368"
        stroke="#F84D64"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.0586 11.9733H23.4791M23.4791 11.9733L21.6551 9.19324M23.4791 11.9733L21.6553 14.8063"
        stroke="#F84D64"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.9204 2.65341L4.95745 4.56899C4.08432 4.8092 3.47929 5.60317 3.47929 6.50874V17.1292C3.47929 18.0088 4.05072 18.7864 4.89017 19.0491L11.8531 21.2285C13.1487 21.634 14.4658 20.6661 14.4658 19.3085V4.59316C14.4658 3.26477 13.2012 2.30105 11.9204 2.65341Z"
        stroke="#F84D64"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.1318 10.5898V13.4103"
        stroke="#F84D64"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default LogoutIcon;
