import { StyleSheet } from 'react-native';
import React from 'react';
import {
  Box,
  KeyBoardAwareScrollBox,
  LayoutComponent,
} from '../components/Base';
import { Text } from '../components/Typography';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MainBoard = () => {
  return (
    <LayoutComponent label='Products' isIcon>
      <KeyBoardAwareScrollBox
        backgroundColor='white'
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
        paddingHorizontal='md'
      >
        <Box
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          marginVertical={'sm'}
          backgroundColor={'primary'}
          padding={'lg'}
          style={{ borderRadius: 10 }}
        >
          <Box>
            <Text variant={'bold14'} color={'white'}>
              8
            </Text>
            <Text variant={'bold14'} color={'white'}>
              Products
            </Text>
          </Box>
          <FontAwesome5 name='product-hunt' size={24} color='white' />
        </Box>
        <Box
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          marginVertical={'sm'}
          backgroundColor={'primary'}
          padding={'lg'}
          style={{ borderRadius: 10 }}
        >
          <Box>
            <Text variant={'bold14'} color={'white'}>
              NGN 234567
            </Text>
            <Text variant={'bold14'} color={'white'}>
              Total Revenues
            </Text>
          </Box>
          <MaterialCommunityIcons name='cash' size={24} color='white' />
        </Box>
        <Box
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          marginVertical={'sm'}
          backgroundColor={'primary'}
          padding={'lg'}
          style={{ borderRadius: 10 }}
        >
          <Box>
            <Text variant={'bold14'} color={'white'}>
              34
            </Text>
            <Text variant={'bold14'} color={'white'}>
              Total Orders
            </Text>
          </Box>
          <MaterialCommunityIcons name='cart' size={24} color='white' />
        </Box>
        <Text variant={'bold14'} color={'primary'} textAlign={'center'}>
          Recent Messages
        </Text>
      </KeyBoardAwareScrollBox>
    </LayoutComponent>
  );
};

export default MainBoard;

const styles = StyleSheet.create({});
