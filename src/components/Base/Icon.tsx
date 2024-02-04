import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import caretDown from '../../assets/svg/caret-down.svg';
import caretRight from '../../assets/svg/caret-right.svg';
import eye from '../../assets/svg/eye.svg';
import filter from '../../assets/svg/filter.svg';
import home from '../../assets/svg/home.svg';
import logout from '../../assets/svg/logout.svg';
import plus from '../../assets/svg/plus.svg';
import search from '../../assets/svg/search.svg';
import wifi from '../../assets/svg/wifi.svg';
import xIcon from '../../assets/svg/x.svg';
import { Theme, useTheme } from '../../constants/theme';

type IconFunction = React.FC<SvgProps>;

export const IconPack = {
  'caret-down-icon': caretDown,
  'caret-right-icon': caretRight,
  'eye-icon': eye,
  'filter-icon': filter,
  home,
  'logout-icon': logout,
  'plus-icon': plus,
  'search-icon': search,
  'wifi-icon': wifi,
  'x-icon': xIcon,
};

export type IconName = keyof typeof IconPack;
export type IconProps = SvgProps & {
  name: IconName;
  size?: keyof Theme['iconsizes'];
  style?: StyleProp<ViewStyle>;
  stroke?: string;
  outerStroke?: string;
};

/**
 * Custom Icon component based on design systems used in the figma
 */
function Icon({ name, size = 'l', style, ...props }: IconProps) {
  const { iconsizes } = useTheme();

  const IconImpl: IconFunction = IconPack[name as IconName];
  const iconsize = iconsizes[size];

  return IconImpl ? <IconImpl style={style} {...iconsize} {...props} /> : null;
}

export default Icon;
