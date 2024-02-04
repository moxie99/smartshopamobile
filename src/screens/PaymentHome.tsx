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

let numbersArray: number[] = [];

for (let i = 1; i <= 100; i++) {
  numbersArray.push(i);
}
const PaymentHome = () => {
  return (
    <LayoutComponent label='Payments' isIcon>
      <KeyBoardAwareScrollBox
        backgroundColor='white'
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
        paddingHorizontal='md'
      >
        <Text marginVertical={'lg'} color={'primary'} variant={'bold24'}>
          Payment Summary
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
            Total Sales
          </Text>
          <Text color={'white'} variant={'bold14'}>
            #3450900
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
            Available Amount
          </Text>
          <Text color={'white'} variant={'bold14'}>
            #3456789.00
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
            Withdrawn Amount
          </Text>
          <Text color={'white'} variant={'bold14'}>
            #345678900
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
            Pending Withdrawal
          </Text>
          <Text color={'white'} variant={'bold14'}>
            #0.00
          </Text>
        </Box>
        <LineCharts />
        <PieCharts />
      </KeyBoardAwareScrollBox>
    </LayoutComponent>
  );
};

export default PaymentHome;

const styles = StyleSheet.create({});
