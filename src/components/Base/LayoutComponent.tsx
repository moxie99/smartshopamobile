import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Box from './Box';
import Icon from './Icon';
import { Text } from '../Typography';
import { wp } from '../../constants';
import { resetNavigation } from '../../navigation/ResetNavigator';

import useStore from '../../store/useStore';
import SafeAreaBox, { SafeAreaBoxProps } from './SafeAreaBox';

export type LayoutComponentProps = SafeAreaBoxProps & {
  isIcon?: boolean;
  label: string;
  children?: JSX.Element | JSX.Element[];
};

const styles = StyleSheet.create({
  blank: {
    width: wp(30),
  },
  iconImage: {
    color: 'white',
    marginRight: wp(10),
  },
  image: {
    borderRadius: 10,
    height: 300,
    width: '100%',
  },
  rotate: {
    transform: [{ rotate: '180deg' }],
  },
});

export default function LayoutComponent({
  label,
  isIcon = false,
  children,
  ...rest
}: LayoutComponentProps) {
  const navigation = useNavigation();
  const { setAccountOpeningData } = useStore((state) => state);

  const homeAlert = () =>
    Alert.alert(
      'Return to Dashboard?',
      'All your data will be cleared and you will return to dashboard',
      [
        {
          onPress: () => {},
        },
        {
          onPress: () => {
            setAccountOpeningData({});
            resetNavigation('HomeScreen');
          },
          text: 'Proceed',
        },
      ]
    );

  return (
    <Box backgroundColor='primary' flex={1}>
      <SafeAreaBox edges={['bottom', 'top']} flex={1} {...rest}>
        <Box
          alignItems='center'
          flexDirection='row'
          marginBottom='lg'
          marginTop='md'
          paddingHorizontal='md'
        >
          <Pressable onPress={navigation.goBack}>
            <AntDesign name='leftcircle' size={24} color='white' />
          </Pressable>
          <Box alignItems='center' flex={1} justifyContent='center'>
            <Text color='white' marginTop='xs' variant='bold16'>
              {label}
            </Text>
          </Box>
          {isIcon ? (
            <Pressable onPress={() => homeAlert()}>
              <Ionicons name='home' size={24} color='white' />
            </Pressable>
          ) : (
            // <Image source={sibLogo} style={styles.iconImage} />
            <Box style={styles.blank} />
          )}
        </Box>
        {children}
      </SafeAreaBox>
    </Box>
  );
}
