const theme = {
  colors: {
    // Primary brand colors
    primary: '#030318', // Use for main buttons, highlights
    primaryLight: '#C6F8FF', // Lighter variation for gradients/backgrounds
    background: '#EDEDED', // Main background color
    backgroundLight: '#E3E7F0', // Lighter background for cards or sections
    surface: '#FFFFFF', // Card or surface background
    success: '#3CB179',
    error: '#E5484D',

    // Text colors
    textPrimary: '#030318', // Most important text
    textPrimaryLight: '#282A37',
    textSecondary: '#EDEDED', // Secondary text
    textSecondaryLight: '#8288A0', // Disabled or less important text
    textRequired: '#E5484D',
    textDrawer: '#00272E',

    // Grayscale (use a consistent scale for all grays)
    gray50: '#F6F7F9',
    gray100: '#E6E7EC',
    gray200: '#D9DBE2',
    gray300: '#D4DAE3',
    gray400: '#636369', // Former gray2
    gray500: '#4E617B', // Former gray3
    gray600: '#2F4366', // navy2
    gray700: '#1D2F4E', // navy3
    gray900: '#343640',

    // Accent colors
    accent: '#2972FF',

    border: '#D9DBE2',
    border2: '#E6E7EC',

    gradients: {
      primary: ['#595CFF', '#C6F8FF'],
    },

    white: '#ffffff',
  },
  fonts: {
    regular: 'Helvetica Neue',
    medium: 'Inter',
  },
  spacing: {
    none: 0,
    xsmall: 4,
    small: 8,
    medium: 12,
    large: 16,
    xLarge: 24,
    xxLarge: 32,
  },
  fontSize: {
    small: 12,
    medium: 14,
    large: 16,
    xLarge: 24,
    xxLarge: 24,
  },
  weight: {
    regular: "400",
    medium: 500,
    semibold: "600",
    bold: "700",
  },
  borderRadius: {
    none: 0,
    radius20: 20,
    xsmall: 50,
    small: 100,
    medium: 200,
    large: 300,
    xLarge: 400,
  },
  borderWidth: {
    none: 0,
    thin: 1,
    medium: 2,
    thick: 3,
  },
  height: {
    height0: 0,
    height1: 1,
    height32: 32,
    height50: 50,
    height100: 100,
    height150: 150,
    height200: 200,
    height250: 250,
    height300: 300,
  },
  width: {
    width0: 0,
    width32: 32,
    width50: 50,
    width80: 80,
    width100: 100,
    width120: 120,
    width150: 150,
    width200: 200,
    width250: 250,
    width300: 300,
  }
};

export default theme;
