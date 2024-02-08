import { useRef, useState } from 'react';
import { Control, Path, RegisterOptions, useController } from 'react-hook-form';
import { StyleSheet, TextInput as NativeInput } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { Box, BoxProps, Icon, IconName } from '../Base';
import { Theme, useTheme } from '../../constants/theme';
import { Capitalize } from '../../utils/helpers';

import { Pressable, PressableProps } from '../Button';
import { Text, TextProps } from '../Typography';
import TextInput, { TextInputProps } from './TextInput';

type TRule = Omit<
  RegisterOptions,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs'
>;

export type RuleType<T> = { [name in keyof T]: TRule };
export type InputControllerType<T> = {
  name: Path<T>;
  control: Control<T>;
  rules?: TRule;
};

type MaterialProps<T> = TextInputProps &
  InputControllerType<T> & {
    boxProps?: BoxProps;
    containerProps?: PressableProps;
    icon?: boolean;
    label: string;
    labelProps?: TextProps;
  };

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedText = Animated.createAnimatedComponent(Text);

const styles = StyleSheet.create({
  icon: {
    marginLeft: 8,
  },
  input: {
    flex: 1,
  },
  labelStyle: {
    height: 10,
  },
});

export default function FormInput<T>({
  control,
  name,
  rules,
  boxProps,
  containerProps,
  icon,
  label,
  labelProps,
  ...rest
}: MaterialProps<T>) {
  const { spacing } = useTheme();
  const value = (
    containerProps && containerProps.paddingVertical
      ? containerProps.paddingVertical
      : 'xl'
  ) as keyof Theme['spacing'];

  const [secureEntry, setSecureEntry] = useState<boolean>(true);
  const fontSize = useSharedValue(14);
  const translateY = useSharedValue(spacing[value] - spacing.sml);
  const animatedStyle = useAnimatedStyle(
    () => ({
      top: translateY.value,
    }),
    []
  );
  const animatedTextStyle = useAnimatedStyle(
    () => ({
      fontSize: fontSize.value,
    }),
    []
  );

  const inputRef = useRef<NativeInput>(null);

  const { field, fieldState } = useController({
    control,
    name,
    rules,
  });

  const startAnimation = () => {
    translateY.value = withSpring(spacing[value] / 3);
    fontSize.value = withTiming(10);
  };

  const onBlur = () => {
    if (!field.value) {
      translateY.value = withSpring(spacing[value] - spacing.sml);
      fontSize.value = withTiming(14);
    }
  };

  return (
    <Box marginBottom='md' {...boxProps}>
      <Pressable
        borderColor='white'
        borderRadius={4}
        borderWidth={1}
        onPress={() => inputRef.current?.focus()}
        paddingBottom='md'
        paddingLeft='sm'
        paddingRight='sm'
        paddingTop={value}
        width='100%'
        {...containerProps}
      >
        <AnimatedBox
          alignItems='flex-start'
          paddingLeft='sm'
          position='absolute'
          style={[animatedStyle]}
        >
          <AnimatedText
            color='white'
            style={animatedTextStyle}
            textAlign='justify'
            variant='regular14'
            {...labelProps}
          >
            {label}
          </AnimatedText>
        </AnimatedBox>
        <Box flexDirection='row'>
          <TextInput
            color='white'
            lineHeight={0}
            onBlur={onBlur}
            onChangeText={field.onChange}
            onFocus={startAnimation}
            ref={inputRef}
            secureTextEntry={secureEntry}
            style={[styles.input]}
            variant='regular14'
            {...rest}
          />
          {icon ? (
            <Pressable
              onPress={() => {
                setSecureEntry((s) => !s);
              }}
              type='scale'
            >
              <Feather
                name={secureEntry ? 'eye-off' : 'eye'}
                size={24}
                color='white'
              />
            </Pressable>
          ) : null}
        </Box>
      </Pressable>
      {fieldState.error ? (
        <AnimatedText
          color='white'
          entering={FadeIn}
          exiting={FadeOut}
          fontSize={12}
          variant='medium12'
        >
          {Capitalize(fieldState.error.message)}
        </AnimatedText>
      ) : null}
    </Box>
  );
}
