import { GestureResponderEvent } from 'react-native';
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutDown,
} from 'react-native-reanimated';

import { ActivityIndicator, Box, Icon, IconName } from '../Base';
import { Text, TextProps } from '../Typography';
import { useTheme } from '../../constants/theme';

import Pressable, { PressableProps } from './Pressable';

const AnimatedBox = Animated.createAnimatedComponent(Box);

export type ButtonProps = PressableProps & {
  icon?: IconName;
  isloading?: boolean;
  label: string;
  labelProps?: TextProps;
  variant?: 'primary' | 'secondary';
};

/**
 * Custom `Button` component with two variants (primary & secondary)
 * inherits Pressable Props
 * @see {@link PressableProps}
 */
function Button({
  icon,
  isloading = false,
  label,
  labelProps,
  variant = 'primary',
  onPress,
  ...rest
}: ButtonProps) {
  const { spacing } = useTheme();
  const handlePress = (event?: GestureResponderEvent | undefined) => {
    if (isloading) return;
    if (onPress) {
      onPress(event);
    }
  };
  return (
    <Pressable
      alignItems='center'
      backgroundColor={variant === 'primary' ? 'white' : 'black'}
      borderRadius={4}
      justifyContent='center'
      onPress={handlePress}
      paddingVertical='lg'
      type='scale'
      {...rest}
    >
      {isloading ? (
        <AnimatedBox
          entering={FadeInUp}
          exiting={FadeOutDown}
          key={`${isloading}`}
        >
          <ActivityIndicator
            size={16}
            type={variant === 'primary' ? 'light' : 'dark'}
          />
        </AnimatedBox>
      ) : (
        <AnimatedBox
          alignItems='center'
          entering={FadeIn}
          exiting={FadeOut}
          flexDirection='row'
          justifyContent='center'
        >
          {/* {icon ? (
            <Icon
              name={icon as IconName}
              size='m'
              style={{ marginRight: spacing.xs }}
            />
          ) : undefined} */}
          <Text
            color={variant === 'primary' ? 'mainBackground' : 'black'}
            textAlign='justify'
            variant='button'
            {...labelProps}
          >
            {label}
          </Text>
        </AnimatedBox>
      )}
    </Pressable>
  );
}

export default Button;
