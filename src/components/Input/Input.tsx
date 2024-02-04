/* eslint-disable no-nested-ternary */
import { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';

import { Pressable } from '../Button';
import { TextProps } from '../Typography';
import { isAndroid } from '../../constants';
import { useTheme } from '../../constants/theme';
import { Box, BoxProps, Icon, IconName } from '../Base';

export interface InputProps extends Omit<TextInputProps, 'onBlur' | 'onFocus'> {
  containerProps?: BoxProps;
  disabled?: boolean;
  footer?: string;
  footerProps?: TextProps;
  label?: string;
  labelProps?: TextProps;
  renderSearchIcon?: boolean;
  renderLoadingIcon?: boolean;
  rightIcon?: IconName;
  onRightIconPress?(): void;
  variant?: 'dark' | 'light';
  whenBlurred?: () => void;
  whenFocused?: () => void;
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'bento-regular',
    fontSize: 12,
    fontWeight: '400',
    marginRight: 12,
    textAlign: 'left',
  },
});

/**
 * Custom  animated`TextInput` component.
 */
function Input(
  {
    containerProps,
    renderSearchIcon,
    renderLoadingIcon,
    rightIcon,
    onRightIconPress,
    variant = 'light',
    whenBlurred,
    whenFocused,
    ...inputProps
  }: InputProps,
  ref: React.Ref<TextInput | null>
) {
  const blurOpacity = 0.2;
  const isLight = variant === 'light';
  const color = isLight ? { b: 39, g: 34, r: 33 } : { b: 255, g: 255, r: 255 };

  const { colors } = useTheme();
  const inputRef = useRef<TextInput>(null);

  const onBlur = () => {
    if (whenBlurred) {
      whenBlurred();
    }
  };
  const onFocus = () => {
    if (whenFocused) {
      whenFocused();
    }
  };

  useImperativeHandle(ref, () => inputRef.current);

  return (
    <Box marginBottom='md' {...containerProps}>
      <Pressable onPress={() => inputRef.current?.focus()}>
        <Box
          borderColor='black8'
          borderRadius={6}
          borderWidth={1}
          flexDirection='row'
          height={40}
          marginBottom='xs'
          paddingHorizontal='sml'
        >
          {renderSearchIcon ? (
            <Box flex={0.1} justifyContent='center' marginRight='sm'>
              <Icon name='search-icon' />
            </Box>
          ) : null}
          <TextInput
            autoCapitalize='none'
            onBlur={onBlur}
            onFocus={onFocus}
            placeholderTextColor={
              isLight
                ? colors.secondary
                : `rgba(${color.r}, ${color.g}, ${color.b}, ${blurOpacity})`
            }
            ref={inputRef}
            selectionColor={!isAndroid ? colors.classicBlue : undefined}
            style={[
              styles.input,
              {
                color: isLight ? colors.textColor : colors.mainBackground,
                flex: renderSearchIcon ? 0.8 : 0.9,
              },
            ]}
            {...inputProps}
          />
          {renderLoadingIcon ? (
            <Box
              alignItems='flex-end'
              flex={0.1}
              justifyContent='center'
              marginLeft='sm'
            >
              <ActivityIndicator />
            </Box>
          ) : null}
          {rightIcon ? (
            <Box
              alignItems='flex-end'
              flex={0.1}
              justifyContent='center'
              marginLeft='sm'
            >
              <Pressable onPress={onRightIconPress}>
                <Icon name={rightIcon} size='m' />
              </Pressable>
            </Box>
          ) : null}
        </Box>
      </Pressable>
    </Box>
  );
}

export default forwardRef(Input);
