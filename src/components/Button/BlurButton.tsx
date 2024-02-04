import { StyleSheet } from 'react-native';

import { blurRectangle } from '../../assets/images';
import { Box, Icon, IconName, IconProps, ImageBackground } from '../Base';

import { Text } from '../Typography';
import { wp } from '../../constants';

import Pressable, { PressableProps } from './Pressable';

const styles = StyleSheet.create({
  blur: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
});

export type BlurButtonProps = PressableProps & {
  icon?: IconName;
  iconProps?: IconProps;
  label: string;
};

export default function BlurButton({
  label,
  icon,
  iconProps,
  ...rest
}: BlurButtonProps) {
  return (
    <Pressable
      alignItems='center'
      alignSelf='center'
      height={wp(54)}
      justifyContent='center'
      marginBottom='sl'
      type='opacity'
      width='100%'
      {...rest}
    >
      <ImageBackground source={blurRectangle} style={styles.blur}>
        <Box alignItems='center' flexDirection='row'>
          <Text color='white' marginRight='sm' variant='bold16'>
            {label}
          </Text>
          {/* {icon ? <Icon name={icon} {...iconProps} /> : null} */}
        </Box>
      </ImageBackground>
    </Pressable>
  );
}
