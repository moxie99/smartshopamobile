import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Box, Icon, IconName, IconProps } from '../Base';
import { palette } from '../../constants/theme';

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: palette.primary,
    borderColor: palette.primary,
    borderRadius: 10,
    borderWidth: 1,
    height: RFValue(55),
    justifyContent: 'center',
    width: '100%',
  },
});

export type NextButtonProps = {
  icon?: IconName;
  iconProps?: IconProps;
  label?: string;
  color?: string;
  labelStyle?: any;
  isLoading?: boolean;
  onPress?: (argument?: any) => void;
  contentStyle?: any;
};

export default function NextButton({
  label,
  icon,
  iconProps,
  color,
  isLoading,
  labelStyle,
  onPress,
  contentStyle,
  ...rest
}: NextButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      style={[styles.containerStyle, contentStyle]}
      {...rest}
    >
      <Box alignItems='center' flexDirection='row'>
        {isLoading ? (
          <ActivityIndicator color='white' />
        ) : (
          <Text
            style={[
              { color: color || 'white', fontSize: 16, fontWeight: 'bold' },
              labelStyle,
            ]}
          >
            {label || 'Next'}
          </Text>
        )}
        {/* {icon ? <Icon name={icon} {...iconProps} /> : null} */}
      </Box>
    </TouchableOpacity>
  );
}
