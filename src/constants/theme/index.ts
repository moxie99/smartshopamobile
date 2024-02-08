import { createTheme, useTheme as useRestyleTheme } from '@shopify/restyle';
import { PixelRatio } from 'react-native';

import { wp } from '../layout';

const fontScale = (fontsize: number) => PixelRatio.getFontScale() * fontsize;

export const palette = {
  black: '#000000',
  black8: '#D8D8D8',
  blackTint: '#696977',
  blue: '#3878B8',
  blueb6: '#006FB6',
  burgundy: '#AC145A',
  burgundy16: '#B93A74',
  classicBlue: '#0033AA',
  classicBlue16: '#2954B8',
  darkBlue: '#001648',
  deepBlue: '#005CC8',
  deepBlue12: '#E0EBF8',
  deepBlue8: '#EBF2FB',
  error: '#E25825',
  fadeBlue: '#616E88',
  grey: '#C1C7CF',
  harsh: '#EFEFEF',
  lightblue: 'rgba(0, 92, 200, 0.08)',
  lightgray: '#EFEFEF',
  primary: '#CC5500',
  purple: '#665EC7',
  purple16: '#A4A0DE',
  secondary: '#878681',
  success: '#97E225',
  success2: '#007200',
  success3: '#045206',
  transparent: 'transparent',
  white: '#FBFBFB',
  red: 'red',
};

const theme = createTheme({
  breakpoints: {
    bigscreen: 412,
    phone: 0,
    tablet: 768,
  },
  colors: {
    ...palette,
    blockBg: palette.grey,
    buttonPry: palette.primary,
    mainBackground: palette.white,
    textColor: palette.black,
    textColorTint: palette.blackTint,
  },
  iconsizes: {
    l: {
      height: wp(24),
      width: wp(24),
    }, // large
    m: {
      height: wp(16),
      width: wp(16),
    }, // medium
    s: {
      height: wp(8),
      width: wp(8),
    }, // small
    xl: {
      height: wp(32),
      width: wp(32),
    }, // extra large
    xs: {
      height: wp(4),
      width: wp(4),
    }, // extra small
    xxl: {
      height: wp(48),
      width: wp(48),
    }, // extra extra large
  },
  spacing: {
    Ml: wp(60), // mega large
    lg: wp(24), // large
    md: wp(16), // medium
    sl: wp(20), // semi large
    sm: wp(12), // semi medium
    sml: wp(8), // small
    xl: wp(32), // extra large
    xs: wp(4), // extra small
    xxl: wp(40), // extra extra large
    xxs: wp(2), // extra extra small
  },
  textVariants: {
    body: {
      color: 'textColorTint',
      fontFamily: 'harmonia-rg',
      fontSize: fontScale(14),
      fontWeight: '400',
      lineHeight: fontScale(20),
    },
    bold14: {
      color: 'textColor',
      fontFamily: 'bento-bold',
      fontSize: fontScale(14),
      fontWeight: '700',
    },
    bold16: {
      color: 'textColor',
      fontFamily: 'bento-bold',
      fontSize: fontScale(16),
      fontWeight: '700',
    },
    bold24: {
      color: 'textColor',
      fontFamily: 'bento-bold',
      fontSize: fontScale(24),
      fontWeight: '700',
      lineHeight: fontScale(25),
    },
    boldBody: {
      color: 'textColorTint',
      fontFamily: 'harmonia-bd',
      fontSize: fontScale(14),
      fontWeight: '700',
      lineHeight: fontScale(20),
    },
    button: {
      color: 'mainBackground',
      fontFamily: 'bento-bold',
      fontSize: fontScale(16),
      fontWeight: '700',
    },
    header: {
      color: 'textColor',
      fontFamily: 'harmonia-sbd',
      fontSize: fontScale(24),
      fontWeight: '600',
      lineHeight: fontScale(36),
    },
    medium12: {
      color: 'textColor',
      fontFamily: 'bento-medium',
      fontSize: fontScale(12),
      fontWeight: '400',
      lineHeight: fontScale(20),
    },
    medium14: {
      color: 'textColor',
      fontFamily: 'bento-medium',
      fontSize: fontScale(14),
      fontWeight: '400',
    },
    medium16: {
      color: 'textColor',
      fontFamily: 'bento-medium',
      fontSize: fontScale(16),
      fontWeight: '400',
    },
    regular12: {
      color: 'textColor',
      fontFamily: 'bento-regular',
      fontSize: fontScale(12),
      fontWeight: '400',
      lineHeight: fontScale(14),
    },
    regular14: {
      color: 'textColor',
      fontFamily: 'bento-regular',
      fontSize: fontScale(14),
      fontWeight: '400',
      lineHeight: fontScale(20),
    },
    subHeading: {
      color: 'textColor',
      fontFamily: 'harmonia-sbd',
      fontSize: fontScale(18),
      fontWeight: '600',
      lineHeight: fontScale(21),
    },
  },
});

export type Theme = typeof theme;

export const useTheme = () => useRestyleTheme<Theme>();

export default theme;
