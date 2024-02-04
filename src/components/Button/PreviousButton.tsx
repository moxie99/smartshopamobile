import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Box, Icon, IconName, IconProps } from '../Base';

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E5E5',
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
};

export default function NextButton({
  label,
  icon,
  iconProps,
  color,
  isLoading,
  labelStyle,
  onPress,
  ...rest
}: NextButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      style={styles.containerStyle}
      {...rest}
    >
      <Box alignItems='center' flexDirection='row'>
        {isLoading ? (
          <ActivityIndicator color='white' />
        ) : (
          <Text
            style={[
              { color: color || '#616E88', fontSize: 16, fontWeight: 'bold' },
              labelStyle,
            ]}
          >
            {label || 'Previous'}
          </Text>
        )}
        {icon ? <Icon name={icon} {...iconProps} /> : null}
      </Box>
    </TouchableOpacity>
  );
}
