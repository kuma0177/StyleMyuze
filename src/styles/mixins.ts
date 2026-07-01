// styles/utils.ts
import { ViewStyle } from 'react-native';

/** Flexbox Utilities */
export const flex1: ViewStyle = { flex: 1 };
export const flexGrow: ViewStyle = { flexGrow: 1 };
export const flexShrink: ViewStyle = { flexShrink: 1 };
export const flexCenter: ViewStyle = { justifyContent: 'center', alignItems: 'center' };
export const flexRow: ViewStyle = { flexDirection: 'row' };
export const flexColumn: ViewStyle = { flexDirection: 'column' };
export const flexWrap: ViewStyle = { flexWrap: 'wrap' };

/** Alignment */
export const alignItemsCenter: ViewStyle = { alignItems: 'center' };
export const alignItemsStart: ViewStyle = { alignItems: 'flex-start' };
export const alignItemsEnd: ViewStyle = { alignItems: 'flex-end' };
export const justifyContentCenter: ViewStyle = { justifyContent: 'center' };
export const justifyContentBetween: ViewStyle = { justifyContent: 'space-between' };
export const justifyContentAround: ViewStyle = { justifyContent: 'space-around' };
export const justifyContentEnd: ViewStyle = { justifyContent: 'flex-end' };

/** Self Alignment */
export const alignSelfCenter: ViewStyle = { alignSelf: 'center' };
export const alignSelfStart: ViewStyle = { alignSelf: 'flex-start' };
export const alignSelfEnd: ViewStyle = { alignSelf: 'flex-end' };

export const halfWidth: ViewStyle = { width: '50%' };