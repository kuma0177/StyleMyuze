import React from "react";
import Svg, { Path } from "react-native-svg";

const CancelIcon = () => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085"
      stroke="#141B34"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CancelIcon;
