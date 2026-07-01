import { Dimensions } from 'react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export const HEIGHT_FULL = screenHeight;
export const HEIGHT_HALF = screenHeight * 0.5;
export const HEIGHT_QUARTER = screenHeight * 0.25;
export const HEIGHT_THREE_QUARTER = screenHeight * 0.75;

export const WIDTH_FULL = screenWidth;
export const WIDTH_HALF = screenWidth * 0.5;
export const WIDTH_QUARTER = screenWidth * 0.25;
export const WIDTH_THREE_QUARTER = screenWidth * 0.75;
