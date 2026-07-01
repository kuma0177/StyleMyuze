import React from 'react';
import Svg, { Path } from 'react-native-svg';

const RightArrowIcon = (props: any) => (
  <Svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M14.7537 12.4999C14.7537 12.6919 14.6807 12.8839 14.5337 13.0299L10.5337 17.0299C10.2407 17.3229 9.76568 17.3229 9.47268 17.0299C9.17968 16.7369 9.17968 16.2618 9.47268 15.9688L12.9427 12.4989L9.47268 9.02891C9.17968 8.73591 9.17968 8.26087 9.47268 7.96787C9.76568 7.67487 10.2407 7.67487 10.5337 7.96787L14.5337 11.9679C14.6807 12.1159 14.7537 12.3079 14.7537 12.4999Z"
      fill={props.fill || "#707070"}
    />
  </Svg>
);

export default RightArrowIcon;
