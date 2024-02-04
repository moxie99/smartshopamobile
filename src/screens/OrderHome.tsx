import { StyleSheet } from 'react-native';
import React from 'react';
import {
  Box,
  KeyBoardAwareScrollBox,
  LayoutComponent,
} from '../components/Base';
import { Text } from '../components/Typography';
import { heightPixel } from '../utils';
import { LineCharts } from '../components/Cards/LineChart';
import { PieCharts } from '../components/Cards/PieChart';

const OrderHome = () => {
  return (
    <LayoutComponent label='Orders' isIcon>
      <KeyBoardAwareScrollBox
        backgroundColor='white'
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
        paddingHorizontal='md'
      >
        <Text marginVertical={'lg'} color={'primary'} variant={'bold24'}>
          Orders Summary
        </Text>
        <Box
          backgroundColor={'primary'}
          flexDirection={'row'}
          height={heightPixel(70)}
          marginVertical={'sm'}
          alignItems={'center'}
          justifyContent={'space-between'}
          paddingHorizontal={'md'}
          style={{
            elevation: 2,
            borderRadius: 12,
          }}
        >
          <Text color={'white'} variant={'medium12'}>
            Successsful Orders
          </Text>
          <Text color={'white'} variant={'bold14'}>
            8
          </Text>
        </Box>
        <Box
          backgroundColor={'primary'}
          flexDirection={'row'}
          height={heightPixel(70)}
          marginVertical={'sm'}
          alignItems={'center'}
          justifyContent={'space-between'}
          paddingHorizontal={'md'}
          style={{
            elevation: 2,
            borderRadius: 12,
          }}
        >
          <Text color={'white'} variant={'medium12'}>
            Cancelled Order
          </Text>
          <Text color={'white'} variant={'bold14'}>
            0
          </Text>
        </Box>
        <Box
          backgroundColor={'primary'}
          flexDirection={'row'}
          height={heightPixel(70)}
          marginVertical={'sm'}
          alignItems={'center'}
          justifyContent={'space-between'}
          paddingHorizontal={'md'}
          style={{
            elevation: 2,
            borderRadius: 12,
          }}
        >
          <Text color={'white'} variant={'medium12'}>
            Ongoing Order
          </Text>
          <Text color={'white'} variant={'bold14'}>
            18
          </Text>
        </Box>
        <Box
          backgroundColor={'primary'}
          flexDirection={'row'}
          height={heightPixel(70)}
          marginVertical={'sm'}
          alignItems={'center'}
          justifyContent={'space-between'}
          paddingHorizontal={'md'}
          style={{
            elevation: 2,
            borderRadius: 12,
          }}
        >
          <Text color={'white'} variant={'medium12'}>
            Pending Order
          </Text>
          <Text color={'white'} variant={'bold14'}>
            12
          </Text>
        </Box>
        <LineCharts />
        <PieCharts />
      </KeyBoardAwareScrollBox>
    </LayoutComponent>
  );
};

export default OrderHome;

const styles = StyleSheet.create({});
