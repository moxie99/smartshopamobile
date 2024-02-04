import { createBox } from '@shopify/restyle';
import { ImageBackground as NativeImageBackground } from 'react-native';

import { Theme } from '../../constants/theme';

const ImageBackground = createBox<
  Theme,
  React.ComponentProps<typeof NativeImageBackground> & {
    children?: React.ReactNode;
  }
>(NativeImageBackground);

export type ImageBackgroundProps = React.ComponentProps<typeof ImageBackground>;

export default ImageBackground;
