import { createBox } from '@shopify/restyle';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { isIos } from '../../constants';
import { Theme } from '../../constants/theme';

import ScrollBox, { ScrollBoxProps } from './ScrollBox';

const IosAware = createBox<
  Theme,
  React.ComponentProps<typeof KeyboardAwareScrollView> & {
    children?: React.ReactNode;
  }
>(KeyboardAwareScrollView);

type IosAwareProps = React.ComponentProps<typeof IosAware>;

type KeyBoardAwareScrollBoxProps =
  | (IosAwareProps & {
      children: React.ReactNode;
    })
  | (ScrollBoxProps & {
      children: React.ReactNode;
    });

export default function KeyBoardAwareScrollBox({
  children,
  ...rest
}: KeyBoardAwareScrollBoxProps) {
  if (isIos) {
    return (
      <IosAware flex={1} {...rest}>
        {children}
      </IosAware>
    );
  }

  return (
    <ScrollBox flex={1} {...rest}>
      {children}
    </ScrollBox>
  );
}
